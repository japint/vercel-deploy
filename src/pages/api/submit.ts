import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { verifyRecaptcha } from "@/lib/recaptcha";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Reject non-POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "Only POST requests are supported",
    });
  }

  try {
    const { recaptchaToken, ...formData } = req.body;

    // Debug logging
    console.log("Received submission:", {
      hasToken: !!recaptchaToken,
      tokenLength: recaptchaToken?.length,
      tokenStart: recaptchaToken?.substring(0, 20) + "...",
      formDataKeys: Object.keys(formData),
    });

    // Verify reCAPTCHA first
    if (!recaptchaToken) {
      console.error("No reCAPTCHA token provided in request");
      return res.status(400).json({
        error: "reCAPTCHA verification failed",
        details: "No verification token provided",
      });
    }

    // TEMPORARY: Skip verification for testing
    // console.log("TEMPORARY: Skipping reCAPTCHA verification for testing");
    // const isHuman = true; // Temporarily bypass

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return res.status(400).json({
        error: "reCAPTCHA verification failed",
        details: "Please complete the verification",
      });
    }

    // Validate required fields
    if (!formData.partyType || !formData.names || !formData.date) {
      return res.status(400).json({
        error: "Missing required fields",
        details: "Party type, names, and date are required",
      });
    }

    // Parse and validate date
    const submissionDate = new Date(formData.date);
    if (isNaN(submissionDate.getTime())) {
      return res.status(400).json({
        error: "Invalid date format",
        details: "Please provide a valid date",
      });
    }

    console.log("Saving to database...");

    // Save to database
    const submission = await prisma.eventSubmission.create({
      data: {
        ...formData,
        date: submissionDate,
        events: formData.events || [],
        rsvpFields: formData.rsvpFields || [],
      },
    });

    console.log("Submission saved:", submission.id);

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "jap1centeno@gmail.com",
        subject: `New Event Submission: ${formData.partyType}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #4CAF50;">🎉 New Event Submission Received</h2>
            
            <h3>Event Overview</h3>
            <ul>
              <li><strong>Type:</strong> ${formData.partyType}</li>
              <li><strong>Names:</strong> ${formData.names}</li>
              <li><strong>Date:</strong> ${formData.date}</li>
              <li><strong>Time:</strong> ${formData.time || "N/A"}</li>
              <li><strong>Venue:</strong> ${formData.venue}</li>
              <li><strong>Venue Address:</strong> ${formData.venueAddress}</li>
            </ul>

            <h3>Style Preferences</h3>
            <ul>
              <li><strong>Theme:</strong> ${formData.theme}</li>
              <li><strong>Colors:</strong> ${formData.colors}</li>
              <li><strong>Fonts:</strong> ${formData.fonts}</li>
              <li><strong>Main Message:</strong> ${formData.mainMessage}</li>
            </ul>

            <h3>Media</h3>
            <ul>
              <li><strong>Countdown:</strong> ${
                formData.countdown ? "Yes" : "No"
              }</li>
              <li><strong>Has Photos:</strong> ${
                formData.hasPhotos ? "Yes" : "No"
              }</li>
              <li><strong>Background Media:</strong> ${
                formData.backgroundMedia
              }</li>
              <li><strong>Media Type:</strong> ${
                formData.backgroundMediaType
              }</li>
              <li><strong>Music:</strong> ${formData.music ? "Yes" : "No"}</li>
            </ul>

            <h3>RSVP</h3>
            <ul>
              <li><strong>Enabled:</strong> ${formData.rsvp ? "Yes" : "No"}</li>
              <li><strong>Fields:</strong> ${
                formData.rsvpFields?.join(", ") || "None"
              }</li>
              <li><strong>Destination:</strong> ${formData.rsvpDestination}</li>
            </ul>

            <h3>Extras</h3>
            <ul>
              <li><strong>Registry Link:</strong> ${formData.registryLink}</li>
              <li><strong>Accommodation Info:</strong> ${
                formData.accommodationInfo
              }</li>
              <li><strong>Dress Code:</strong> ${formData.dressCode}</li>
              <li><strong>FAQ:</strong> ${formData.faq}</li>
              <li><strong>Custom Domain:</strong> ${formData.customDomain}</li>
              <li><strong>Privacy:</strong> ${formData.privacy}</li>
            </ul>

            <h3>Selected Events</h3>
            <ul>
              ${
                formData.events
                  ?.map((event: string) => `<li>${event}</li>`)
                  .join("") || "<li>None</li>"
              }
            </ul>

            <hr />
            <p style="font-size: 0.9em; color: #888;">This is an automated message from your event website creator.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the entire request if email fails
    }

    return res.status(200).json({
      success: true,
      id: submission.id,
      message: "Submission saved and notification sent",
    });
  } catch (error) {
    console.error("Submission error:", error);

    let errorMessage = "Internal server error";
    let errorDetails = undefined;

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Handle Prisma errors
    if (error && typeof error === "object" && "code" in error) {
      const prismaError = error as { code: string; meta?: { target?: string } };
      if (prismaError.code === "P2002") {
        errorMessage = "Duplicate entry detected";
        errorDetails = prismaError.meta?.target;
      }
    }

    return res.status(500).json({
      error: errorMessage,
      details: errorDetails,
    });
  }
}
