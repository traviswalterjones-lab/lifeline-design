import { HARPER_URL } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <div className="fname">John Donnelly</div>
            <p>
              Author of <em>Lifeline: The Story of PEPFAR, the Greatest
              Humanitarian Initiative of Our Time</em> (HarperCollins, October 2026).
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="foot-cover"
              src="/assets/footer/cover.jpg"
              width="1100"
              height="1661"
              alt="Lifeline book cover"
            />
          </div>

          <div className="foot-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#top">Home</a></li>
              <li><a href="#reporting">The reporting</a></li>
              <li><a href="#author">The author</a></li>
              <li><a href="#praise">Praise</a></li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>The book</h4>
            <ul>
              <li><a href={HARPER_URL} target="_blank" rel="noopener">Pre-order</a></li>
              <li><a href="#buy">Hardcover</a></li>
              <li><a href="#buy">E-book</a></li>
              <li><a href="#buy">Audiobook</a></li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Inquiries</h4>
            <ul>
              <li><a href="#buy">Press &amp; media</a></li>
              <li><a href="#buy">Speaking</a></li>
              <li><a href="#buy">Booksellers</a></li>
              <li><a href="#buy">Rights</a></li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <div className="copy">© 2026 John Donnelly</div>
          <div className="legal">
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
            <a href="#buy">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
