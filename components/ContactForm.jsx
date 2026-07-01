"use client";

import { useState } from "react";

const REASONS = [
  "Press & media",
  "Speaking & events",
  "Foreign & subsidiary rights",
  "General inquiry",
];

const RECIPIENT = "donnellyglobe@gmail.com";

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    org: "",
    reason: "Press & media",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    // client-side required-field validation
    const errs = {};
    if (!values.name.trim()) errs.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errs.email = true;
    if (!values.message.trim()) errs.message = true;
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // build the mailto: (subject = reason, body = labeled fields)
    const subject = values.reason;
    const lines = [`Name: ${values.name.trim()}`, `Email: ${values.email.trim()}`];
    if (values.org.trim()) lines.push(`Organization: ${values.org.trim()}`);
    lines.push("", "Message:", values.message.trim());
    const body = lines.join("\n");

    const href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  return (
    <form className="cform" onSubmit={handleSubmit} noValidate>
      <div className="cform-title">Send a message</div>

      <div className="cform-row">
        <label className="cfield">
          <span className="cflabel">Name</span>
          <input
            className={`cfinput${errors.name ? " err" : ""}`}
            type="text"
            value={values.name}
            onChange={set("name")}
            aria-invalid={errors.name ? "true" : undefined}
            required
          />
        </label>
        <label className="cfield">
          <span className="cflabel">Email</span>
          <input
            className={`cfinput${errors.email ? " err" : ""}`}
            type="email"
            value={values.email}
            onChange={set("email")}
            aria-invalid={errors.email ? "true" : undefined}
            required
          />
        </label>
      </div>

      <label className="cfield">
        <span className="cflabel">
          Organization <span className="opt">(optional)</span>
        </span>
        <input className="cfinput" type="text" value={values.org} onChange={set("org")} />
      </label>

      <label className="cfield">
        <span className="cflabel">Reason for inquiry</span>
        <select className="cfinput cfselect" value={values.reason} onChange={set("reason")}>
          {REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label className="cfield">
        <span className="cflabel">Message</span>
        <textarea
          className={`cfinput cftextarea${errors.message ? " err" : ""}`}
          rows={6}
          value={values.message}
          onChange={set("message")}
          aria-invalid={errors.message ? "true" : undefined}
          required
        />
      </label>

      <button className="btn cform-submit" type="submit">
        Send message
      </button>
    </form>
  );
}
