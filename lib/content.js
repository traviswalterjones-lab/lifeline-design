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

// John Donnelly's bylined Boston Globe dispatches — the reporting that became the book.
export const CLIPPINGS = [
  { src: "/assets/tiles/t1.jpg", title: "“None of them had to die”", meta: "The Boston Globe" },
  { src: "/assets/tiles/t2.jpg", title: "“Now what?”", meta: "Boston Sunday Globe · Focus" },
  { src: "/assets/tiles/t3.jpg", title: "Africa and its children", meta: "The Boston Globe" },
  { src: "/assets/tiles/t4.jpg", title: "“Please, father, cover me.”", meta: "Boston Sunday Globe" },
  { src: "/assets/tiles/t5.jpg", title: "Living with HIV, he offers hope", meta: "The Boston Globe" },
  { src: "/assets/tiles/t6.jpg", title: "The AIDS fight in Nigeria", meta: "The Boston Globe · Jos" },
  { src: "/assets/tiles/t7.jpg", title: "Back to basics", meta: "Globe · Health & Science" },
  { src: "/assets/tiles/t8.jpg", title: "As AIDS besets Africa", meta: "The Boston Globe" },
];

export const STATS = [
  { to: 26, suffix: "M+", label: "Lives saved by PEPFAR" },
  { to: 2003, plain: true, label: "The year PEPFAR was created" },
  { to: 30, suffix: " yrs", label: "Reporting global health" },
  { to: 4, label: "Continents on the story" },
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
      "Donnelly has brilliantly captured the heroic efforts to establish PEPFAR — and how the US can save millions of lives.",
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
      "A gripping saga, teeming with colorful characters, of a high-octane race to control the AIDS pandemic — a handbook for how to handle the next major global emergency.",
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
