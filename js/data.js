/* ==========================================================================
   CHUKS MEDICAL LABORATORY CENTER — SITE DATA
   Single source of truth. Edit this file to update the whole site.

   RULES
   - Anything left as '' / null / [] is NOT yet supplied by the laboratory.
     The site shows a safe fallback ("please contact the laboratory") and
     never invents the fact.
   - Set showDraftNotes to false before launch to hide the "to be confirmed"
     chips used for client review.
   ========================================================================== */
window.CHUKS = {
  showDraftNotes: true,

  site: {
    url: 'https://chukslab.example',          // TODO: replace with live domain (also in each page <head> + sitemap.xml)
    credit: { name: 'MB CoreX', url: '' }
  },

  business: {
    name: 'CHUKS Medical Laboratory Center',
    tagline: 'Reliable laboratory diagnostics, closer to you.',
    locality: 'Onitsha',
    area: 'Inland Town',
    region: 'Anambra State',
    country: 'Nigeria',
    countryCode: 'NG',
    streetAddress: '',                         // TODO: street address / landmark from client
    geo: null,                                 // TODO: { lat: 6.xxxx, lng: 6.xxxx } once confirmed
    mapQuery: 'CHUKS Medical Laboratory Center, Inland Town, Onitsha, Anambra State, Nigeria',
    mapEmbed: null                             // TODO: paste the "Embed a map" src from Google Maps once the listing exists
  },

  contact: {
    phone: '',            // international format, e.g. '+2348012345678'
    phoneDisplay: '',     // e.g. '0801 234 5678'
    whatsapp: '',         // digits only with country code, e.g. '2348012345678'
    email: ''
  },

  // e.g. [{ days: 'Monday – Friday', hours: '8:00am – 5:00pm' }]
  openingHours: [],

  // e.g. { facebook: 'https://…', instagram: 'https://…' }
  social: {},

  nav: [
    { key: 'home',     label: 'Home',         href: 'index.html' },
    { key: 'about',    label: 'About',        href: 'about.html' },
    { key: 'services', label: 'Services',     href: 'services.html' },
    { key: 'patient',  label: 'Patient Info', href: 'patient-info.html' },
    { key: 'contact',  label: 'Contact',      href: 'contact.html' }
  ],

  /* DEMO SERVICES — names are placeholders (confirmed:false).
     Replace with the laboratory's real service list. */
  services: [
    { id: 'haematology',  confirmed: false, img: 'tubes',      title: 'Haematology',
      short: 'Blood-based testing that supports a wider picture of health.',
      long: 'Placeholder description — replace with the laboratory’s own wording for this service.' },
    { id: 'chemistry',    confirmed: false, img: 'pipette',    title: 'Clinical Chemistry',
      short: 'Measurements from blood and other samples to help guide clinical decisions.',
      long: 'Placeholder description — replace with the laboratory’s own wording for this service.' },
    { id: 'microbiology', confirmed: false, img: 'microscope', title: 'Microbiology',
      short: 'Investigation of samples to help identify what may be causing an infection.',
      long: 'Placeholder description — replace with the laboratory’s own wording for this service.' },
    { id: 'urinalysis',   confirmed: false, img: 'gloves',     title: 'Urine & Stool Analysis',
      short: 'Routine sample examination, clearly explained.',
      long: 'Placeholder description — replace with the laboratory’s own wording for this service.' },
    { id: 'serology',     confirmed: false, img: 'cells',      title: 'Serology & Immunology',
      short: 'Tests that look at the body’s response to specific conditions.',
      long: 'Placeholder description — replace with the laboratory’s own wording for this service.' },
    { id: 'collection',   confirmed: false, img: 'scientist',  title: 'Sample Collection',
      short: 'Careful, professional collection of the samples your tests need.',
      long: 'Placeholder description — replace with the laboratory’s own wording for this service.' }
  ],

  principles: [
    { n: '01', title: 'Accuracy',            text: 'Methodical handling and checking at every stage, because a result is only useful if it can be relied on.' },
    { n: '02', title: 'Professional care',   text: 'Respectful, discreet service for every patient who walks through the door.' },
    { n: '03', title: 'Reliable service',    text: 'A laboratory you can find, contact and return to — close to home in Inland Town, Onitsha.' },
    { n: '04', title: 'Patient confidence',  text: 'Clear communication, so you know what to expect before, during and after your visit.' }
  ],

  /* answer: null  →  site shows "please contact the laboratory" until supplied.
     Use the token {location} to insert the formatted location line. */
  faqs: [
    { q: 'Where is CHUKS Medical Laboratory Center located?',
      a: 'We are in {location}.' },
    { q: 'What are your opening hours?',            a: null },
    { q: 'How can I contact the laboratory?',       a: null },
    { q: 'Do I need an appointment?',               a: null },
    { q: 'How can I find out whether a particular test is available?',
      a: 'Contact the laboratory directly and ask about the test you need. Our team can confirm availability before you travel.' },
    { q: 'Do I need to prepare before my test?',
      a: 'Preparation depends on the test. Some tests may need specific preparation, so please confirm with the laboratory and follow any instructions from your doctor.' }
  ],

  // Verified credentials / affiliations, e.g. [{ title: '', issuer: '', note: '' }]
  credentials: [],

  /* IMAGES — temporary Unsplash photography.
     To use a real CHUKS photo: replace  id: '…'  with  src: 'img/your-photo.jpg'
     (keep alt text accurate). pos controls the crop focus. */
  images: {
    hero:       { id: '1579154204601-01588f351e67', pos: '50% 50%', alt: 'A scientist working in a long, bright, modern medical laboratory' },
    scientist:  { id: '1581093588401-fbb62a02f120', pos: '40% 40%', alt: 'Close-up of a laboratory scientist wearing protective eyewear' },
    tubes:      { id: '1581594693702-fbdc51b2763b', pos: '50% 50%', alt: 'Blood sample tubes in a laboratory rack' },
    microscope: { id: '1582719471384-894fbb16e074', pos: '55% 45%', alt: 'Laboratory scientist examining a sample under a microscope' },
    pipette:    { id: '1532187863486-abf9dbad1b69', pos: '50% 50%', alt: 'Pipette loading samples into a laboratory tray' },
    gloves:     { id: '1614935151651-0bea6508db6b', pos: '50% 40%', alt: 'Gloved hands pipetting a sample into test tubes' },
    cells:      { id: '1576086213369-97a306d36557', pos: '50% 50%', alt: 'Microscopic view of stained cells' },
    bottles:    { id: '1583912267550-d974311a9a6e', pos: '50% 50%', alt: 'Reagent bottles lined up on a laboratory shelf' },
    patient:    { id: '1631815588090-d4bfec5b1ccb', pos: '50% 40%', alt: 'A healthcare worker attending to a patient' }
  }
};
