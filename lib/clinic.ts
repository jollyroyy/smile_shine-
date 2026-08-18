/**
 * Every real-world claim the site makes, in one place.
 *
 * Nothing in here is verified. The numbers, names, credentials and review
 * counts are placeholders carried over from the first draft of the site, and
 * publishing them as-is would put unverified claims about a medical practice
 * in front of patients. Replace each one with something the practice can
 * evidence, then delete this paragraph.
 *
 * Data protection: an Indian practice falls under the Digital Personal Data
 * Protection Act, 2023 -- not HIPAA, which is US law and does not apply here.
 */

export const CLINIC = {
  name: 'Smile Shine',
  descriptor: 'Dental practice',
  city: 'Vadodara',
  neighbourhood: 'Alkapuri',

  // --- CONTACT -----------------------------------------------------------
  phone: '+91 98250 12345',
  phoneHref: 'tel:+919825012345',
  whatsapp: 'https://wa.me/919825012345',
  email: 'hello@smileshine.in',
  address: {
    line1: '301-304, Signature Elite Arcade',
    line2: 'RC Dutt Road, Alkapuri',
    city: 'Vadodara, Gujarat 390007',
  },
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Alkapuri+Vadodara+Gujarat',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.68202061266!2d73.10304620025732!3d22.307158814725357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',

  hours: [
    { days: 'Monday – Friday', time: '9:00 – 18:00' },
    { days: 'Saturday', time: '10:00 – 16:00' },
    { days: 'Sunday', time: 'Closed' },
  ],
  emergencyNote: 'Existing patients can call the same number out of hours.',

  // --- BOOKING -----------------------------------------------------------
  // Same Cal.com account and embed approach as the technoon.ai site. Swap the
  // event slug for a dental consultation event once one exists on the account.
  cal: {
    url: 'https://cal.com/sudeshna-pal-ruww5f/technoon.ai',
    origins: ['https://cal.com', 'https://app.cal.com'],
    theme: 'dark',
    brandColor: '8FC9BE',
  },

  // --- CLAIMS TO VERIFY --------------------------------------------------
  // Four plain, checkable facts beat four superlatives. Confirm each.
  facts: [
    { value: '12', unit: 'years', label: 'in Alkapuri' },
    { value: '3', unit: 'rooms', label: 'one appointment at a time' },
    { value: '1', unit: 'visit', label: 'to scan, plan and quote' },
    { value: '5', unit: 'years', label: 'warranty on ceramics' },
  ],

  // Names and qualifications are unverified placeholders. Confirm before launch,
  // including each registration number with the Gujarat State Dental Council.
  team: [
    {
      initials: 'NP',
      name: 'Dr. Nisha Patel',
      qualification: 'BDS, MDS — Prosthodontics',
      role: 'Veneers, crowns and full-mouth planning',
      note: 'Plans every ceramic case herself and matches the shade at the chair rather than sending it out.',
    },
    {
      initials: 'KS',
      name: 'Dr. Kunal Shah',
      qualification: 'BDS, MDS — Oral & Maxillofacial Surgery',
      role: 'Implants and extractions',
      note: 'Places implants from a CBCT scan and a printed guide, so the position is decided before the day.',
    },
    {
      initials: 'AJ',
      name: 'Dr. Aditi Joshi',
      qualification: 'BDS, MDS — Orthodontics',
      role: 'Aligners and braces',
      note: 'Takes the cases other practices call borderline, and says so plainly when aligners are the wrong tool.',
    },
  ],

  // Payment is a booking objection in its own right here, so it is stated
  // rather than buried. Confirm which of these the practice actually accepts.
  payment: ['UPI', 'Cards', 'Cash', 'EMI on treatments over ₹25,000'],

  languages: ['English', 'हिन्दी', 'ગુજરાતી'],

  // Review count and rating are unverified. Replace with the live Google figure.
  reviews: { rating: '4.9', count: '500+', source: 'Google' },
} as const;

export type Clinic = typeof CLINIC;
