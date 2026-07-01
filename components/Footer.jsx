export default function Footer() {
  return (
    <footer className="site-footer" data-hide-brand>
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
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Inquiries</h4>
            <ul>
              <li><a href="/contact">Press &amp; media</a></li>
              <li><a href="/contact">Speaking</a></li>
              <li><a href="/contact">Booksellers</a></li>
              <li><a href="/contact">Rights</a></li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <div className="copy">© 2026 John Donnelly</div>
          <div className="legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
