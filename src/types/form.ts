export type PartyType = "wedding" | "birthday" | "christening" | "other";

export type BackgroundMediaType = "image" | "video" | "none";
export type RSVPDestination = "email" | "google-form" | "database";
export type PrivacyType = "public" | "password-protected";

export interface FormData {
  // Basic Info
  partyType: PartyType;
  otherPartyType?: string;
  names: string;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  events: string[];

  // Style
  theme: string;
  colors: string;
  fonts: string;
  mainMessage: string;
  countdown: boolean;

  // Media
  hasPhotos: boolean;
  backgroundMedia: string;
  backgroundMediaType: BackgroundMediaType;
  music: boolean;
  musicFile?: string;

  // RSVP
  rsvp: boolean;
  rsvpFields: string[];
  rsvpDestination: RSVPDestination;
  rsvpEmail?: string;
  rsvpDeadline?: string;

  // Extras
  registryLink: string;
  accommodationInfo: string;
  dressCode: string;
  faq: string;
  customDomain: string;
  privacy: PrivacyType;
  password?: string;
}

export type FormStep = {
  id: number;
  name: string;
  component: React.ComponentType<any>;
};
