export async function verifyRecaptcha(token: string): Promise<boolean> {
  // Skip in development
  if (process.env.NODE_ENV !== "production") return true;

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) throw new Error("Missing RECAPTCHA_SECRET_KEY");

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    }
  );

  const data = await response.json();
  console.log("reCAPTCHA verification response:", data);
  return data.success && data.score >= 0.3; // Adjust threshold as needed
}
