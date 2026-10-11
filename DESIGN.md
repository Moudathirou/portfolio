---
name: Saindou Moudathirou Ben — Ingénieur IA
description: A freelance AI engineer's portfolio kept as a clean lab notebook — dated entries, taped-in evidence, stamped verification.
colors:
  paper: "#F2F4F0"
  paper-slip: "#FCFDFB"
  grid: "rgba(45, 93, 168, 0.075)"
  ink: "#1C2A3A"
  ink-2: "#4A5866"
  pen: "#2D5DA8"
  pen-strong: "#234C8C"
  pen-wash: "rgba(45, 93, 168, 0.17)"
  margin-red: "#B23A2E"
  rule: "#C5CFD0"
  rule-strong: "#8F9DA6"
  tape: "rgba(214, 205, 158, 0.6)"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 1.6rem + 3.4vw, 4.375rem)"
    fontWeight: 820
    lineHeight: 0.94
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 70"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 1.35rem + 2.4vw, 3rem)"
    fontWeight: 780
    lineHeight: 1.04
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 76"
  title-lg:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.8vw, 1.6rem)"
    fontWeight: 760
    lineHeight: 1.15
    fontVariation: "'wdth' 84"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 720
    lineHeight: 1.25
    fontVariation: "'wdth' 90"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
    fontVariation: "'wdth' 85"
  small:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  hand:
    fontFamily: "Caveat, Segoe Print, cursive"
    fontSize: "1.6rem"
    fontWeight: 600
    lineHeight: 1.1
rounded:
  hairline: "2px"
  sm: "3px"
  stamp: "5px"
spacing:
  s-1: "0.5rem"
  s-2: "1rem"
  s-3: "1.5rem"
  s-4: "2rem"
  s-5: "3rem"
  s-6: "4rem"
  s-7: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.pen}"
    textColor: "{colors.paper-slip}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.35rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.pen-strong}"
    textColor: "{colors.paper-slip}"
  button-link:
    textColor: "{colors.pen}"
    padding: "0.5rem 0.25rem"
    height: "44px"
  button-link-hover:
    textColor: "{colors.pen-strong}"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.45rem 0.7rem"
    height: "40px"
  tab-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-slip}"
  tag:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.1rem 0.55rem"
  input:
    backgroundColor: "{colors.paper-slip}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "0.65rem 0.75rem"
    height: "48px"
  slip:
    backgroundColor: "{colors.paper-slip}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "{spacing.s-4}"
  source-box:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.hairline}"
    padding: "{spacing.s-2}"
---

# Design System: Saindou Moudathirou Ben — Ingénieur IA

## Overview

**Creative North Star: "The Lab Notebook, Kept Clean"**

The site is a laboratory notebook kept with care: cool squared paper, a double red margin rule down the left, printed entries in dark ink, annotations in blue ballpoint, and evidence printed out and taped onto the page. Verification is not a claim in copy; it is a rubber stamp that lands on the evidence. Every visual device comes from that one physical world, and the world exists to make "every claim traced to its source" visible.

Density is that of a working document, not a showcase: ruled lists, definition rows, tables with provenance, and full-width ledgers instead of card grids. Hierarchy comes from Archivo's width axis (narrow, heavy print for headings, normal width for reading) and from ink colour (ink for content, blue pen for anything you act on or anything annotated, red only for margin, stamp, audit and error). Handwriting (Caveat) is reserved for the human hand: margin notes, proof links, the dates in the margin, and the signature.

The confirmed rejection is the dark AI portfolio of identical cards and violet gradients. The page stays light, paper-toned, and flat except where paper physically sits on paper.

**Key Characteristics:**
- Cool squared paper (24px grid) with a red double margin rule as the constant ground.
- Archivo variable width does the hierarchy work: narrow and heavy for print headings, 100% for body.
- Blue pen is the only interactive colour; red is reserved for margin, stamp, audit marks and errors.
- Evidence is taped in: slips of brighter paper with tape strips and a soft drop shadow.
- Lists are ruled ledgers and definition rows, never grids of identical cards.
- Handwriting appears sparingly, always in pen blue or audit red, always slightly rotated.

## Colors

A restrained, ink-on-paper palette: one cool paper neutral family, one blue-pen accent with a wash, and one red used as a ruling and verification mark.

### Primary
- **Ballpoint Blue** (pen): every action and annotation — primary button fill, links, nav CTA outline, citations `[1]`, protocol step numerals, timeline dates, margin notes, signature, the status dot, focus rings.
- **Pressed Ballpoint** (pen-strong): hover state of pen-coloured actions and links only.
- **Blue Wash** (pen-wash): the highlighter. Fills the `mark` in quoted sources, active citations, verdict strips, input focus halos, nav CTA hover.

### Secondary
- **Margin Red** (margin-red): the double margin rule (at 55% alpha), the "Vérifié" stamp, handwritten "audité" marks, invalid-field borders and error text. Never a fill, never a button.

### Neutral
- **Cool Squared Paper** (paper): page ground, masthead, footer, quoted-source boxes.
- **Fresh Print** (paper-slip): taped-in slips, inputs, pipeline step boxes, text on dark/blue fills.
- **Grid Line** (grid): the 24px squared-paper pattern on the body.
- **Notebook Ink** (ink): all primary text and headings; heavy structural rules (1px under the masthead, 2px over protocol steps and cases); selected tab fill.
- **Faded Ink** (ink-2): secondary text — field labels, intros, tool lists, captions, table provenance column.
- **Pencil Rule** (rule): light 1px row dividers in ledgers, fields, tables, timeline.
- **Graphite Rule** (rule-strong): tab, filter, tag and input outlines; dashed source borders; scrollbar thumb.
- **Tape** (tape): translucent yellowed tape strips on slips.

### Named Rules
**The Two Inks Rule.** Ink is for what you read; blue pen is for what you click or what was annotated by hand. A non-interactive element in pen blue must be a handwritten annotation or a numeral/date in the notebook's own voice.

**The Red Margin Rule.** Red belongs to the notebook's ruling and to verification: margin line, stamp, audit marks, errors. It never fills a surface or labels an action.

## Typography

**Display Font:** Archivo variable (wdth 62–125, wght 100–900), with Helvetica Neue, Arial fallback
**Body Font:** Archivo at 100% width
**Hand Font:** Caveat 500/600, with Segoe Print, cursive fallback

**Character:** One printed family flexed along its width axis, so headings read like a narrow lab-form typeface and body reads like a plain report; one handwriting face for the human in the margins.

### Hierarchy
- **Display** (820, step-4 clamp, 0.94, width 70%): the name in the hero, one per page.
- **Headline** (780, step-3 clamp, 1.04, width 76%): section `h2`s, max 44rem head block.
- **Title Large** (760, step-2 clamp, 1.15, width 84%): case-study titles, hero role line (560 weight, pen blue), lead ledger row.
- **Title** (720, 1.25rem, 1.25, width 90%): ledger rows, protocol steps, timeline entries, inventory terms.
- **Body** (400, 1.0625rem, 1.6): reading text, measured at 60–68ch; intros and ledes step up to 1.125rem.
- **Label** (600, 0.8125rem, width 85%, sentence case, ink-2): field `dt`s, demo labels, source references, captions, table heads. Never uppercase, never tracked out.
- **Small** (400–600, 0.875rem): tools lists, help text, tabs and filters.
- **Hand** (Caveat 600, 1.15–2.25rem, 1.1): margin notes (1.6rem), proof links (1.35rem), margin dates (1.2rem), audit marks (1.15rem), signature (2.25rem).

Numerals in data (citations, step counters, measures, dates) use `tabular-nums`; big measure figures are 760 weight at 78% width. Protocol counters are the lone light weight (300, 3rem, 70% width) in pen blue.

### Named Rules
**The Width-Not-Size Rule.** Before adding a size step, narrow the width. Headings are 70–90% width and 720+ weight; body stays at 100%.

**The Hand-Is-Rare Rule.** Caveat is only for something a person would write in a notebook by hand: a note, a date in the margin, a proof pointer, a check mark, a signature. Never for headings, buttons, or body copy.

## Layout

A single notebook sheet, max 1240px, centred. Content is indented from the left by the margin (`pad-left` 28 / 76 / 120px at <640 / ≥640 / ≥1100px) with the red double rule sitting at 10 / 40 / 72px inside that gutter; the right pad is 16 / 32 / 48px. The 24px paper grid runs behind everything.

Spacing follows an 8px scale (`s-1`…`s-7`, 0.5–6rem). Sections are separated by a 1px pencil rule and 4rem padding (6rem from 1000px). Section heads sit 3rem above their content.

Structure is ruled and columnar rather than boxed: ledgers become a 4-column row (icon, title, body, proof) from 960px; protocol is 1 → 2 → 4 columns (700/1100px); cases are 1 → 2 with a full-width feature (900px); the hero splits 0.9fr / 1.1fr from 1000px; contact 1.7fr / 1fr from 1000px. At ≥1100px the timeline dates move into the red margin in handwriting — the margin is used for dating only where the content is genuinely chronological.

Breakpoints actually used: 640, 700, 800, 900, 960, 1000, 1100px. Touch targets are at least 44px (buttons and inputs 48px).

## Elevation & Depth

The page is flat paper. Depth exists only where a physical object sits on the page: taped-in slips cast a soft, tight drop shadow and carry translucent tape strips; the sticky masthead gains a faint underside shadow once scrolled; the primary button has a slight ink-pressed shadow. No glows, no layered card stacks, no blur.

### Shadow Vocabulary
- **Slip** (`0 1px 1px rgba(28,42,58,0.06), 0 14px 30px -16px rgba(28,42,58,0.38)`): taped-in printouts only.
- **Tape** (`0 1px 1px rgba(28,42,58,0.08)`): tape strips on slips.
- **Masthead scrolled** (`0 10px 24px -20px rgba(28,42,58,0.6)`): state of the sticky header after scroll; the open mobile menu uses a similar `0 18px 30px -24px`.
- **Primary press** (`0 1px 0 rgba(28,42,58,0.2), 0 8px 18px -12px rgba(35,76,140,0.8)`): primary button.
- **Focus halo** (`0 0 0 3px` pen-wash): focused inputs and the status dot.

### Named Rules
**The Paper-On-Paper Rule.** A shadow means an object taped onto the sheet. Content that is printed on the page itself (ledgers, cases, tables, timeline) gets rules, not shadows.

## Shapes

Nearly square: 2px on paper objects (slips, inputs, source boxes, highlights), 3px on controls (buttons, tabs, filters, tags, pipeline steps), 5px only on the rubber stamp; 50% only on the status dot. Lines carry the form language: 1px pencil rules between rows, 1px ink rules to open and close a ledger, 2px ink rules over protocol steps and cases, dashed graphite borders for quoted sources. Slight rotation is a material property, not decoration: slips −0.6deg (desktop), stamp −6deg, margin notes −1.5deg, audit marks −4deg, signature −3deg, tape strips ±4–41deg. Chevrons and arrows are drawn with 1.5px CSS borders or stroked SVG, never glyphs.

## Components

### Buttons
Plain, ink-pressed, confident.
- **Shape:** near-square (3px), 48px min height.
- **Primary:** pen-blue fill, fresh-print text, 650 weight, 0.75rem × 1.35rem padding, small pressed shadow. One per view region; label is the action ("Parler de votre projet").
- **Hover / Focus:** fill shifts to pressed ballpoint; `:active` nudges down 1px; focus is a 2px pen outline offset 3px. Transitions 0.2s on the expo-out curve.
- **Link button:** underlined pen text, 1px underline thickening to 2px on hover, 44px min height. Used for secondary actions beside the primary and for "Rejouer".
- **Nav CTA:** pen text with a 1px pen outline (desktop), wash fill on hover.

### Chips (tabs, filters, tags)
- **Style:** transparent with a 1px graphite outline, ink text, 600 weight at 82% width, 40px min height.
- **State:** hover darkens the outline to ink with a 4% ink tint; selected (`aria-selected` / `aria-pressed`) inverts to an ink fill with fresh-print text. Tags are static: smaller, ink-2 text, no states.

### Cards / Containers
There are no cards. Containers are of two kinds:
- **Taped slip** (signature): fresh-print paper, 1px faint ink border, 2px radius, slip shadow, two tape strips (variants: single centred strip, or corner strips). Padding 1.5rem, 2rem from 640px. Reserved for evidence: the hero demo and reconstructed exhibits.
- **Ruled entry:** no background; a top rule (1px pencil, or 2px ink for cases and protocol steps) and vertical padding.

### Inputs / Fields
- **Style:** fresh-print fill, 1px graphite outline with a 2px ink-2 bottom edge (a writing line), 2px radius, 48px min height; label above in 650 weight.
- **Focus:** border turns pen blue with a 3px blue-wash halo; outline suppressed.
- **Error:** border and bottom edge turn margin red; error text in red 600 below. Help text in ink-2 small.

### Navigation
The masthead is a printed notebook header: fields with small labels ("Titulaire", "Objet") over values, sticky, paper background, 1px ink underline. Links are ink 600 weight, turning pen blue and underlined on hover. Below 900px the nav collapses behind a "Sommaire" outlined button into a full-width panel with pencil-ruled rows.

### Verified Demo (signature)
A taped slip containing tabs, a question/answer with superscript pen citations, a quoted source in a dashed box with wash-highlighted passages (highlight sweeps in via the `--hl` width), and a red rubber stamp ("Vérifié" + count) that lands last, multiply-blended. Active citation and its passage are linked by wash background and a 2px pen underline.

### Ledger
An ordered list ruled top and bottom in ink: stroked 28px pen icon, title, body with tools line, and a handwritten proof link pointing to its evidence case.

## Do's and Don'ts

### Do:
- **Do** keep the squared paper (24px grid on `#F2F4F0`) and the red double margin rule on every page of the site.
- **Do** express hierarchy with Archivo's width axis first (70–90% width, 720+ weight for headings), size second.
- **Do** use pen blue for every interactive element and for handwritten annotation; use pressed ballpoint for hover.
- **Do** present evidence as taped slips (fresh print, tape strips, slip shadow) and everything else as ruled entries.
- **Do** cite with superscript pen numerals and highlight sources with the blue wash, as the demo does.
- **Do** keep labels in sentence case at 0.8125rem, 600, 85% width, ink-2, attached to the field they label.
- **Do** keep touch targets at 44px minimum and focus visible with the 2px pen outline.
- **Do** honour reduced motion: transitions collapse, the demo shows its final verified state.

### Don't:
- **Don't** build the dark AI portfolio: dark backgrounds, grids of identical cards, violet gradients.
- **Don't** use margin red as a fill, a button, or a decorative accent; it is ruling, stamp, audit and error only.
- **Don't** put shadows on content printed on the page; only taped objects and the scrolled masthead lift.
- **Don't** set headings, buttons or paragraphs in Caveat.
- **Don't** add uppercase tracked labels or eyebrow lines above section headings; section heads are a heading and an intro.
- **Don't** use radii above 3px on controls or containers (the 5px stamp is the exception).
- **Don't** draw icons with text glyphs or emoji; use stroked SVG at 1.5–2px in currentColor.
