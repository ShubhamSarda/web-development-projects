# Build "Urban Nest" with GitHub Copilot

You already know how to build a site by hand. In this section you'll build one by
*describing* it instead — a responsive, dark-mode-ready website for an interior design
studio called Urban Nest.

There are 19 prompts here, in four phases. Work through them in order. Each one is
deliberately small, because small prompts give you code you can actually read and check.
That's the whole skill: not getting AI to write code, but staying in control of the code
it writes.

Prompts marked *(optional)* are extra practice — skip them if you're short on time and your
site is working without them.

**After every prompt: read what it gave you, run the page, then move on.** If you paste
five prompts in a row without looking, you'll end up with a site you can't debug.

---

## Setup

**The brand colours** (taken from the Urban Nest logo):

| Name | Hex | Where it's used |
|---|---|---|
| `brand` | `#F09B36` | buttons, links, active states |
| `brand-light` | `#F4BB3A` | gradients, hover, accents |
| `sand` | `#F8DB94` | soft backgrounds, badges |
| `ink` | `#111111` | headings on light backgrounds |

**Create this folder and open it in VS Code:**

```
urban-nest/
├── index.html
└── images/
    ├── logo.png
    ├── logo-white.png
    └── favicon.png
```

Set the `images/` folder up *before* you send Prompt 1. Copilot looks at the files in your
open project, so if the images are already there it will use their real names. If they
aren't, it will invent something like `assets/logo.svg` and you'll get a broken image with
nothing to tell you why.

Keep Copilot Chat open in the side panel — all the prompts below go there, not inline in
the file.

> **On Tailwind:** these prompts use the Play CDN (`https://cdn.tailwindcss.com`), so there's
> no build step to worry about. If you're using the Tailwind v4 CLI instead, change
> "config block" to "`@theme` block in `input.css`" in Prompt 1. Everything else stays
> the same.

---

## Phase 1 — Build the page

### Prompt 1 — Scaffold and design system

```
Create index.html for an interior design studio website called "Urban Nest".

Setup:
- Single HTML file, Tailwind via Play CDN, no build step
- Tailwind config block extending colors: brand #F09B36, brand-light #F4BB3A,
  sand #F8DB94, ink #111111
- Font: Poppins from Google Fonts
- darkMode: 'class', with class="dark" toggled on <html>
- Favicon linked from images/favicon.png

Only output the boilerplate with an empty <main>. No sections yet.
```

**Why this comes first:** you just set up a design system before writing a single section.
From now on you can say "brand" instead of `#F09B36`, and Copilot will stay consistent
across every prompt that follows. This one prompt does more for the quality of your site
than any clever wording later on.

### Prompt 2 — Header

```
Add a sticky header to index.html.

- Left: logo (height 40px) — images/logo.png in light mode,
  images/logo-white.png in dark mode
- Center: nav links Home, About, Services, Projects, Contact
- Right: dark mode toggle button (sun/moon inline SVG) and a "Book a Consult" brand button
- Below 768px: hide nav, show hamburger that opens a mobile menu
- Semi-transparent background with backdrop-blur, border-bottom
```

### Prompt 3 — Dark mode logic

```
Add a script at the end of index.html for the dark mode toggle:
- Toggle the "dark" class on <html>
- Save the choice in localStorage
- On page load, apply saved choice, falling back to prefers-color-scheme
- Swap the logo image src to match the mode
Keep it plain JS, no libraries.
```

**Look closely at this one.** Copilot writes it in about two seconds, but ask yourself *why*
the load script has to run before the page paints. Try moving it to the bottom of the body
and reload — you'll see a flash of the wrong theme. That's the kind of detail you only catch
by reading the output.

### Prompt 4 — Hero

```
Add a hero section to <main>.

- Two columns on desktop, stacked on mobile
- Left: H1 "Spaces that feel like you", short paragraph, two buttons
  (filled brand + outlined)
- Right: interior photo from Unsplash (source.unsplash.com or a direct
  images.unsplash.com URL), rounded-2xl, soft shadow
- Light bg: white. Dark bg: neutral-900. Readable text in both.
```

### Prompt 5 — Services

```
Add a "What we do" section: 3 cards in a responsive grid
(1 col mobile, 2 tablet, 3 desktop).

Cards: Residential Design, Commercial Spaces, Space Planning.
Each card: inline SVG icon in brand color, title, 2-line description,
hover lift with transition. Dark mode friendly.
```

### Prompt 6 — Projects gallery

```
Add a "Recent Projects" section: masonry-style gallery, 6 Unsplash interior
photos with real alt text. On hover show a dark overlay with project name
and room type. Grid: 1 / 2 / 3 columns across breakpoints.
```

### Prompt 7 — Testimonials, CTA, footer

```
Add three more sections:
1. Testimonials — 3 quote cards with avatar, name, city
2. CTA band — brand-to-brand-light gradient, heading + "Get a free quote" button
3. Footer — 4 columns (logo + about, quick links, services, contact info),
   social icons, copyright bar
All responsive and dark mode aware.
```

---

## Phase 2 — Change what you built

This phase matters more than Phase 1. Anyone can generate a page; the real skill is steering
one that already exists.

Notice the shape every prompt below follows: **where → what → what not to change.** Say
where in the page you mean, say what you want, and set a limit so Copilot doesn't quietly
rewrite something that was already fine.

### Prompt 8 — Visual change

```
In the services section, change the cards to have a 1px border instead of a
shadow, and add a small brand-colored accent bar on the left edge that
expands on hover. Keep the current spacing.
```

### Prompt 9 — Responsive fix *(optional)*

```
The hero heading overflows on screens under 400px. Reduce the mobile font
size and add responsive padding. Don't change the desktop layout.
```

That last line is doing real work. Without it, you can ask for a small mobile tweak and get
a rebuilt desktop layout back.

### Prompt 10 — Dark mode fix

```
Audit the whole page for dark mode. Find any element with a hardcoded light
background or dark text that has no dark: variant, and list them before
fixing. Then apply fixes.
```

**"List them before fixing" is a trick worth keeping.** It forces Copilot to show you its
reasoning first, so you can approve or reject each change instead of scrolling through a
diff after the fact. Use this phrasing any time a prompt touches a lot of the page at once.

### Prompt 11 — Refactor *(optional)*

```
Extract the repeated Tailwind classes used by all buttons into a reusable
.btn / .btn-primary / .btn-outline set using @apply in a <style> block.
Update the markup to use them.
```

### Prompt 12 — Debug *(optional)*

```
The mobile menu doesn't close when a link is clicked. Fix it and explain in
one line what was wrong.
```

**Describe the symptom, not your guess at the fix.** If you write "add an event listener to
close the menu," you get exactly that patch — even if the real problem was something else.
Describe what you *saw* go wrong and you get a diagnosis instead.

---

## Phase 3 — Add pages and sections

### Prompt 13 — New page, same shell

```
Create about.html. Copy the exact header, footer, dark mode script and
Tailwind config from index.html so the shell is identical. Leave <main>
empty and mark "About" as the active nav link.
```

### Prompt 14 — Fill the page

```
In about.html add three sections:
1. Page banner with heading "About Urban Nest" and breadcrumb
2. Our Story — image left, text right, plus 4 stat counters
   (projects, years, cities, team)
3. Meet the Team — 4 member cards with Unsplash portraits, name, role,
   social icons
Match the existing site's spacing and typography.
```

### Prompt 15 — New section in an existing page

```
In index.html, insert a "Our Process" section between Services and Projects.
4 numbered steps in a horizontal timeline on desktop, vertical on mobile:
Consult, Concept, Design, Install. Connect steps with a line in brand color.
```

### Prompt 16 — Contact page with form

```
Create contact.html using the same shell as about.html.
Sections: page banner, then a two-column layout with a contact form
(name, email, phone, project type select, message, submit) on the left and
studio address, hours and an embedded map placeholder on the right.
Add HTML5 validation and visible focus states.
```

---

## Phase 4 — Test and fix

Your pages all exist now. Try clicking around: **almost nothing works.** The menu links
don't jump anywhere, "About" doesn't open the About page, the buttons do nothing.

Nothing went wrong. Every section was built by its own prompt, and no prompt was ever
responsible for connecting them to each other. This is the most common way AI-built sites
break, and it's why this phase exists.

**Before you open Copilot:** click every link and every button, and write down what's
broken. Do it by hand. Getting used to testing your own work is the point.

### Prompt 17 — Audit the navigation

```
The site navigation doesn't work. Clicking "About" doesn't open about.html,
and #services and the other menu links don't jump to their sections. The
"View Projects" button and "Book a Consult" button do nothing.

Before changing anything, list every link and button in index.html with:
its current href, and where it should go. Include the mobile menu links.
```

**Stop and read the list it gives you.** You'll see a column of `href="#services"` and
`href="#projects"` with no matching `id` anywhere in your HTML. That's the entire bug — the
links were always pointing at sections that never got given an id. You found it by reading,
which is exactly how you'll find bugs in your own projects.

**Now fix it yourself — no prompt for this one.** You have the audit table telling you what
every link should point to. Add the missing `id` attributes, correct the hrefs (including
the mobile menu ones), and point "About" at `about.html` and "Book a Consult" at
`contact.html`. This is plain HTML, and you already know how to do it.

Two things to watch for as you go:

- The same fixes need applying to the mobile menu, not just the desktop nav.
- Once the links jump correctly, your section headings will land hidden behind the sticky
  header. `scroll-margin-top` solves that — no JavaScript needed.

### Prompt 18 — Scroll polish and active state *(optional)*

```
Add scroll-behavior: smooth, and make the nav link for the section currently
in view show an active state.
```

### Prompt 19 — Check the other pages *(optional)*

```
Check about.html and contact.html: the header links there should point back
to index.html#services, index.html#projects and so on, since those sections
don't exist on those pages. List what's wrong, then fix it.
```

**This is the bug Copilot is least likely to spot on its own.** Each page looked perfectly
correct when it was generated, because each was generated alone. Only someone holding the
whole site in their head notices that `#services` does nothing on a page with no services
section. That someone is you.

---

## Optional extras

```
Review index.html for accessibility: missing alt text, heading order,
color contrast, and keyboard focus. List issues with severity, then fix
the high-severity ones.
```

```
Add a scroll-to-top button that appears after 400px of scroll.
```

---

## What to take away

1. **Context beats clever wording.** Prompt 1 improved every prompt after it, just by giving
   Copilot a shared vocabulary for your colours and fonts.
2. **One thing per prompt.** Asking for the header, dark mode logic and hero all at once
   gets you a wall of code nobody can review — including you.
3. **You're the reviewer.** Copilot will confidently write a Tailwind class that doesn't
   exist. You can catch that, because you learnt Tailwind properly first. Never merge code
   you can't explain.
4. **Say what you don't want.** "Don't change the desktop layout" is often the most important
   line in the prompt.
5. **Describe symptoms when debugging**, not the fix you have in mind.
6. **AI builds the parts — you build the system.** Phase 4 happened even though all sixteen
   prompts before it were correct. Nobody had asked for the thing that joins them together.
   That job stays yours.

---

## Your assignment

Add a **blog listing page** and a **single blog post page** to Urban Nest, matching the
existing design, in **6 prompts or fewer**.