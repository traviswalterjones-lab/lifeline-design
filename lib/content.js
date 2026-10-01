// Shared content for the Lifeline site.

export const HARPER_URL =
  "https://www.harpercollins.com/products/lifeline-john-donnelly?variant=44717895581730&utm_source=aps&utm_medium=advt&utm_campaign=aps";

export const RETAILERS = [
  { name: "HarperCollins", url: HARPER_URL },
  { name: "Amazon", url: "https://www.amazon.com/dp/0063483084?tag=hcads-20" },
  { name: "Apple Books", url: "https://books.apple.com/us/book/lifeline/id6756780798" },
  {
    name: "Barnes & Noble",
    url: "https://www.barnesandnoble.com/w/lifeline-john-donnelly/1148956571?ean=9780063483088",
  },
  { name: "Books-A-Million", url: "https://www.booksamillion.com/p/9780063483088" },
  {
    name: "Bookshop.org",
    url: "https://bookshop.org/p/books/lifeline-the-story-of-pepfar-the-greatest-humanitarian-initiative-of-our-time-john-donnelly/684d17bd1c0a743b?ean=9780063483088&affiliate=397",
  },
];

export const ON_SALE = "On sale October 13, 2026";

// Book tour. `rsvp` is an external ticket link, or null when details aren't
// live yet (rendered as a non-clickable "Details soon"). `month` groups rows
// on the full /events page; the *Teaser fields feed the shorter homepage row.
export const EVENTS = [
  {
    day: "02", dow: "Fri", mon: "Oct", month: "October", dateLabel: "Oct 02, 2026",
    city: "Washington, D.C.",
    venue: "Politics & Prose · 5015 Connecticut Ave NW",
    venueTeaser: "Politics & Prose",
    format: "Talk + signing", time: "7:00 PM", timeTeaser: "7:00 PM",
    rsvp: "https://politics-prose.com/john-donnelly10226",
  },
  {
    day: "20", dow: "Tue", mon: "Oct", month: "October", dateLabel: "Oct 20, 2026",
    city: "Indianapolis, IN",
    venue: "Indiana University Center for Global Health",
    venueTeaser: "IU Center for Global Health · Fireside chat",
    format: "Fireside chat", time: "6:00 – 8:00 PM", timeTeaser: "6:00 PM",
    rsvp: "https://www.eventbrite.com/e/fireside-chat-about-lifeline-the-story-of-pepfar-with-author-john-donnelly-tickets-1997027642437",
  },
  {
    day: "27", dow: "Tue", mon: "Oct", month: "October", dateLabel: "Oct 27, 2026",
    city: "Washington, D.C.",
    venue: "Center for Strategic and International Studies",
    venueTeaser: "Center for Strategic and International Studies",
    format: "", time: "", timeTeaser: "",
    rsvp: null,
  },
  {
    day: "04", dow: "Wed", mon: "Nov", month: "November", dateLabel: "Nov 04, 2026",
    city: "Hanover, NH",
    venue: "Dartmouth College",
    venueTeaser: "Dartmouth College",
    format: "", time: "", timeTeaser: "",
    rsvp: null,
  },
  {
    day: "12", dow: "Thu", mon: "Nov", month: "November", dateLabel: "Nov 12, 2026",
    city: "Seattle, WA",
    venue: "PATH",
    venueTeaser: "PATH",
    format: "", time: "", timeTeaser: "",
    rsvp: null,
  },
  {
    day: "01", dow: "Tue", mon: "Dec", month: "December", dateLabel: "Dec 01, 2026",
    city: "Dallas, TX",
    venue: "George W. Bush Presidential Center",
    venueTeaser: "George W. Bush Presidential Center",
    format: "", time: "", timeTeaser: "",
    rsvp: null,
  },
  {
    day: "02", dow: "Wed", mon: "Dec", month: "December", dateLabel: "Dec 02, 2026",
    city: "Atlanta, GA",
    venue: "Venue to be announced",
    venueTeaser: "Venue to be announced",
    format: "", time: "", timeTeaser: "",
    rsvp: null,
  },
  {
    day: "15", dow: "Tue", mon: "Dec", month: "December", dateLabel: "Dec 15, 2026",
    city: "San Francisco, CA",
    venue: "University of California, San Francisco",
    venueTeaser: "University of California, San Francisco",
    format: "Grand Rounds lecture", time: "", timeTeaser: "",
    rsvp: null,
  },
];

export const PRAISE_HERO = {
  quote:
    "John Donnelly has told one of the great untold stories of the century. Admirers of George W. Bush will be pleased. Detractors of George W. Bush will be astonished—and will never think of him the same way again.",
  name: "David Shribman",
  title: "Pulitzer-winning editor · Pittsburgh Post-Gazette",
};

export const PRAISE_MORE = [
  {
    quote:
      "A roadmap and a reminder of what is possible when evidence, empathy, and sustained global commitment align.",
    name: "Dr. Sanjay Gupta",
    title: "New York Times bestselling author",
  },
  {
    quote:
      "A masterful yet uplifting chronicle. It should be required reading for politicians and diplomats.",
    name: "Max Essex",
    title: "Lasker Professor Emeritus, Harvard University",
  },
  {
    quote:
      "Donnelly has brilliantly captured the heroic efforts to establish PEPFAR—and how the US can save millions of lives.",
    name: "Michael Merson",
    title: "Former Director, WHO Global Program on AIDS",
  },
  {
    quote:
      "There was a time, not long ago, when a group of imperfect leaders faced a global tragedy and chose to do the right thing. <em>Lifeline</em> tends the embers of that spirit.",
    name: "Helen Epstein",
    title: "Author of <em>The Invisible Cure</em>",
  },
  {
    quote:
      "A gripping saga, teeming with colorful characters, of a high-octane race to control the AIDS pandemic—a handbook for how to handle the next major global emergency.",
    name: "Sally H. Jacobs",
    title: "Author of <em>Althea</em>",
  },
  {
    quote:
      "A powerful account of how Kenya and many African countries confronted the HIV crisis through partnerships, innovation and lots of courage.",
    name: "Dr. Doris Macharia",
    title: "President, Elizabeth Glaser Pediatric AIDS Foundation",
  },
  {
    quote:
      "Donnelly tells this medical, political, and above all human story with verve and pace. Everyone in the public health field should read this book.",
    name: "J. R. McNeill",
    title: "Georgetown University · author of <em>Something New Under the Sun</em>",
  },
];
