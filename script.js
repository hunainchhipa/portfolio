const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = matchMedia("(hover: hover)").matches;

// Hero name: split into letters for the load sequence and the width-on-hover effect
const nameEl = document.getElementById("name");
let charIndex = 0;
nameEl.querySelectorAll(".line").forEach((line) => {
  const word = line.textContent.trim();
  line.textContent = "";
  [...word].forEach((c) => {
    const span = document.createElement("span");
    span.className = "ch";
    span.textContent = c;
    span.style.setProperty("--i", charIndex++);
    line.appendChild(span);
  });
});

const chars = [...nameEl.querySelectorAll(".ch")];
if (!reduceMotion && canHover) {
  nameEl.addEventListener("pointermove", (e) => {
    chars.forEach((ch) => {
      const r = ch.getBoundingClientRect();
      const d = Math.hypot(
        e.clientX - (r.left + r.width / 2),
        e.clientY - (r.top + r.height / 2),
      );
      const k = Math.max(0, 1 - d / 260);
      ch.style.setProperty("--w", (100 + k * 25).toFixed(1));
      ch.style.setProperty("--g", (800 + k * 100).toFixed(0));
    });
  });
  nameEl.addEventListener("pointerleave", () => {
    chars.forEach((ch) => {
      ch.style.setProperty("--w", 100);
      ch.style.setProperty("--g", 800);
    });
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

// Stack marquee, doubled so the loop is seamless
const stack = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Hono",
  "PostgreSQL",
  "Drizzle",
  "MongoDB",
  "Express.js",
  "Tailwind CSS",
  "Neon",
];
document.getElementById("track").innerHTML = [...stack, ...stack]
  .map((s) => `<span>${s}</span>`)
  .join("");

// Copy email
const copyBtn = document.getElementById("copy");
const emailEl = document.getElementById("email");
copyBtn.addEventListener("click", () => {
  const done = () => {
    copyBtn.textContent = "Copied";
    setTimeout(() => (copyBtn.textContent = "Copy email"), 1800);
  };
  const fallback = () => {
    const range = document.createRange();
    range.selectNodeContents(emailEl);
    const sel = getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    copyBtn.textContent = "Selected, press Ctrl/Cmd+C";
  };
  try {
    navigator.clipboard.writeText(emailEl.textContent).then(done, fallback);
  } catch {
    fallback();
  }
});

// Contact form via EmailJS
const form = document.getElementById("contact-form");
const sendBtn = document.getElementById("send");
const formStatus = document.getElementById("form-status");
const setStatus = (text, kind = "") => {
  formStatus.textContent = text;
  formStatus.className = `form-status ${kind}`;
};

if (window.emailjs) emailjs.init("P0T0AwGb7qYepWeHx");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    const firstInvalid = form.querySelector(":invalid");
    setStatus(
      firstInvalid.type === "email"
        ? "Enter a valid email address."
        : "Fill in all three fields.",
      "err",
    );
    firstInvalid.focus();
    return;
  }
  if (!window.emailjs) {
    setStatus("The form couldn't load. Email me directly instead.", "err");
    return;
  }

  sendBtn.disabled = true;
  setStatus("Sending…");
  emailjs
    .sendForm("service_povzevn", "template_rn2gimo", form)
    .then(() => {
      form.reset();
      setStatus("Message sent. I'll get back to you soon.", "ok");
    })
    .catch(() =>
      setStatus(
        "Couldn't send right now. Try again, or email me directly.",
        "err",
      ),
    )
    .finally(() => (sendBtn.disabled = false));
});

// Nav: border once scrolled, highlight the section in view
const nav = document.getElementById("nav");

// Mobile menu
const menuToggle = document.getElementById("menu-toggle");
const setMenu = (open) => {
  nav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
menuToggle.addEventListener("click", () =>
  setMenu(!nav.classList.contains("open")),
);
nav
  .querySelectorAll("ul a")
  .forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    setMenu(false);
    menuToggle.focus();
  }
});
document.addEventListener("click", (e) => {
  if (nav.classList.contains("open") && !nav.contains(e.target)) setMenu(false);
});
addEventListener(
  "scroll",
  () => nav.classList.toggle("scrolled", scrollY > 8),
  { passive: true },
);

const navLinks = [...nav.querySelectorAll("ul a")];
const sectionObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) =>
        a.classList.toggle(
          "active",
          a.getAttribute("href") === `#${entry.target.id}`,
        ),
      );
    }),
  { rootMargin: "-45% 0px -50% 0px" },
);
["about", "work", "experience", "contact"].forEach((id) =>
  sectionObserver.observe(document.getElementById(id)),
);

// Reveal only what starts below the fold, so the first frame is always complete
if (!reduceMotion && "IntersectionObserver" in window) {
  const targets = [...document.querySelectorAll(".reveal, .head")].filter(
    (el) => el.getBoundingClientRect().top > innerHeight,
  );
  targets.forEach((el) => el.classList.add("reveal", "pre"));
  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("pre");
        revealObserver.unobserve(entry.target);
      }),
    { rootMargin: "0px 0px -8% 0px" },
  );
  targets.forEach((el) => revealObserver.observe(el));
}
