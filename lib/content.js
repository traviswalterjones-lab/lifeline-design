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

// Book tour. `rsvp` is an external ticket link (renders "RSVP"); `link` is a
// general event-details link (renders a clickable "Details"); when both are
// null the button is a non-clickable "Details soon". `month` groups rows on the
// full /events page; the *Teaser fields feed the shorter homepage row.
export const EVENTS = [
  {
    iso: "2026-10-02",
    day: "02", dow: "Fri", mon: "Oct", month: "October", dateLabel: "Oct 02, 2026",
    city: "Washington, D.C.",
    venue: "Politics & Prose · 5015 Connecticut Ave NW",
    venueTeaser: "Politics & Prose",
    format: "Talk + signing", time: "7:00 PM", timeTeaser: "7:00 PM",
    rsvp: "https://politics-prose.com/john-donnelly10226",
  },
  {
    iso: "2026-10-20",
    day: "20", dow: "Tue", mon: "Oct", month: "October", dateLabel: "Oct 20, 2026",
    city: "Indianapolis, IN",
    venue: "Indiana University Center for Global Health",
    venueTeaser: "IU Center for Global Health · Fireside chat",
    format: "Fireside chat", time: "6:00 – 8:00 PM", timeTeaser: "6:00 PM",
    rsvp: "https://www.eventbrite.com/e/fireside-chat-about-lifeline-the-story-of-pepfar-with-author-john-donnelly-tickets-1997027642437",
  },
  {
    iso: "2026-10-27",
    day: "27", dow: "Tue", mon: "Oct", month: "October", dateLabel: "Oct 27, 2026",
    city: "Washington, D.C.",
    venue: "Center for Strategic and International Studies",
    venueTeaser: "Center for Strategic and International Studies",
    format: "Talk + signing + webcast", time: "4:00 – 6:00 PM", timeTeaser: "4:00 PM",
    rsvp: null,
    link: "https://www.csis.org/events/book-event-lifeline-john-donnelly",
  },
  {
    iso: "2026-11-04",
    day: "04", dow: "Wed", mon: "Nov", month: "November", dateLabel: "Nov 04, 2026",
    city: "Hanover, NH",
    venue: "Dartmouth College",
    venueTeaser: "Dartmouth College",
    format: "Panel", time: "5:00 – 6:00 PM", timeTeaser: "5:00 PM",
    rsvp: null,
    link: "https://www.eventbrite.com/e/the-greatest-story-seldom-told-pepfar-and-how-it-happened-tickets-1994891225356?aff=ebdssbcategorybrowse",
  },
  {
    iso: "2026-11-12",
    day: "12", dow: "Thu", mon: "Nov", month: "November", dateLabel: "Nov 12, 2026",
    city: "Seattle, WA",
    venue: "PATH",
    venueTeaser: "PATH",
    format: "", time: "", timeTeaser: "",
    rsvp: null,
  },
  {
    iso: "2026-12-01",
    day: "01", dow: "Tue", mon: "Dec", month: "December", dateLabel: "Dec 01, 2026",
    city: "Dallas, TX",
    venue: "George W. Bush Presidential Center",
    venueTeaser: "George W. Bush Presidential Center",
    format: "", time: "", timeTeaser: "",
    rsvp: null,
  },
  {
    iso: "2026-12-02",
    day: "02", dow: "Wed", mon: "Dec", month: "December", dateLabel: "Dec 02, 2026",
    city: "Atlanta, GA",
    venue: "Rollins School of Public Health, Emory University",
    venueTeaser: "Rollins School of Public Health, Emory University",
    format: "", time: "", timeTeaser: "",
    rsvp: null,
  },
  {
    iso: "2026-12-03",
    day: "03", dow: "Thu", mon: "Dec", month: "December", dateLabel: "Dec 03, 2026",
    city: "Washington, D.C.",
    venue: "Business Roundtable · 1000 Maine Ave SW, Suite 500, Washington, DC",
    venueTeaser: "Business Roundtable · 1000 Maine Ave SW, Suite 500, Washington, DC",
    format: "", time: "", timeTeaser: "",
    rsvp: null,
  },
  {
    iso: "2026-12-08",
    day: "08", dow: "Tue", mon: "Dec", month: "December", dateLabel: "Dec 08, 2026",
    city: "Washington, D.C.",
    venue: "Georgetown University",
    venueTeaser: "Georgetown University",
    format: "", time: "", timeTeaser: "",
    rsvp: null,
  },
  {
    iso: "2026-12-15",
    day: "15", dow: "Tue", mon: "Dec", month: "December", dateLabel: "Dec 15, 2026",
    city: "San Francisco, CA",
    venue: "University of California, San Francisco",
    venueTeaser: "University of California, San Francisco",
    format: "Grand Rounds lecture", time: "", timeTeaser: "",
    rsvp: null,
  },
];

// A tour date counts as "past" only once its whole day is over (compared at
// local midnight), so an event still reads as upcoming on the day it happens.
export function isPastEvent(e, now = new Date()) {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return new Date(`${e.iso}T00:00:00`) < today;
}

// The next `n` events that haven't happened yet. Falls back to the final `n`
// once the whole tour is over, so the homepage section is never empty.
export function upcomingEvents(list = EVENTS, n = 3, now = new Date()) {
  const future = list.filter((e) => !isPastEvent(e, now));
  return (future.length ? future : list.slice(-n)).slice(0, n);
}

// Podcasts / interviews for the homepage Media section.
export const MEDIA = [
  {
    kind: "Podcast",
    title: "Softpower/ful Stories",
    desc: "",
    cta: "Listen",
    url: "https://www.softpowerfulstories.org/john-donnelly/",
  },
  {
    kind: "Substack",
    title: "When PEPFAR Became Personal for a US President",
    desc: "Softpower/ful Stories",
    cta: "Read",
    url: "https://christopherwurst.substack.com/p/when-pepfar-became-personal-for-a?utm_source=email&redirect=app-store-no-desktop&inbox=true&utm_campaign=email-read-in-app&triedRedirect=true",
  },
  {
    kind: "Podcast",
    title: "Devex's Theory of Change",
    desc: "",
    cta: "Watch",
    url: "https://www.youtube.com/watch?v=9MICzjS7mmE",
  },
  {
    kind: "Podcast",
    title: "Diplomatic Immunity · Georgetown University",
    desc: "Fighting AIDS: Lifeline, the story of PEPFAR. Interview with journalist John Donnelly",
    cta: "Listen",
    url: "https://diplomaticimmunity.libsyn.com/fighting-aids-lifeline-the-story-of-pepfar-interview-with-journalist-john-donnelly",
  },
  {
    kind: "Podcast",
    title: "The Unpopular View with Michael Brown",
    desc: "Did PEPFAR save 26 million lives at the cost of local healthcare?",
    cta: "Listen",
    url: "https://listentheunpopularview.transistor.fm/episodes/did-pepfar-save-26-million-lives-at-the-cost-of-local-healthcare",
  },
];

// Published reviews (with a link to the full piece). Featured as a pull-quote.
export const REVIEWS = [
  {
    quote:
      "John Donnelly has done more than document the creation of PEPFAR. He has given Americans a story they should know and can be proud of. PEPFAR showed what the United States could accomplish when political leadership, public servants, scientists, advocates, and partners around the world came together around an ambitious goal. It is a remarkable chapter in our country’s history.",
    name: "Jirair Ratevosian",
    pub: "“Lights, Camera, Equity!” · Substack",
    url: "https://ratevosian.substack.com/p/how-america-took-on-aids-a-book-review",
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
