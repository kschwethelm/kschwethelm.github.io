# Personal Researcher Website — Design

**Author:** Kristian Schwethelm
**Date:** 2026-04-30
**Repo:** `kschwethelm.github.io` (GitHub Pages, served from repo root)

## Goal

A minimal, single-page personal website for a PhD researcher. Content equivalent to `https://jomoll.github.io` (medium scope), but visually distinct: minimal typography-driven layout, automatic dark/light theme via `prefers-color-scheme`. No build step, no JS framework, no Jekyll.

## Non-Goals

- No separate publications page, blog, talks page, or teaching page.
- No experience/education timeline, awards list, or "currently" grid (those live on the CV).
- No analytics, no animations beyond the status pill's pulsing dot.

## Page Structure

Single page, no top nav. Sections in order:

1. **Status pill** — fixed top-center. Text: `open to LLM research engineer internships →`. Pulsing green dot. `mailto:` link with prefilled subject. Backdrop-blur, rounded-full border.

2. **Hero (two-column on desktop, stacked on mobile)**
   - Left column: circular profile photo, ~180×180px, `assets/avatar.jpg`.
   - Right column:
     - Name: `Kristian Schwethelm` (large, ~32px).
     - Role line: `PhD Student · TU Munich · Chair for AI in Medicine`.
     - Advisors line: `advised by [Daniel Rückert] & [Georgios Kaissis]` (Scholar links).
     - Inline links row: `email · scholar · github · huggingface · cv`.

3. **About** — 2 paragraphs of prose, no header, copied from `index_9.html` about section (trimmed — drop the "Reach me at..." sentence and the "currently" grid).

4. **Latest** — single one-line callout below the about. Format: `Latest · 2026 — Preprint: Iso-Depth Scaling Laws for Looped Language Models →` (links to the project site).

5. **Selected work** — small uppercase tracked label `selected work`, then 4 publications, newest first. Each entry:
   - Venue tag (mono, small): e.g. `Preprint '26`, `TMLR '25`, `SaTML '25`, `ICLR '24`. Preprint tag uses the accent color.
   - Title.
   - Authors line (e.g. `Schwethelm, Rückert, Kaissis`).
   - One-sentence TL;DR (from `index_9.html`).
   - Links row: `site · arxiv · pdf · code · openreview` (only those that apply).
   - Hairline divider between entries.

6. **Footer** — single line, dim text: `© 2026 Kristian Schwethelm`.

## Visual Style

### Typography

- Body: `Geist`, weights 400 / 500.
- Mono (venue tags, small-caps labels): `Geist Mono`.
- Loaded from Google Fonts (single `<link>`).
- Body size 14px, line-height 1.6, letter-spacing -0.01em.

### Theme — auto via `prefers-color-scheme`

CSS custom properties; default to light, override under `@media (prefers-color-scheme: dark)`.

**Light mode:**
- `--bg: #ffffff`
- `--fg: #111111`
- `--dim: #6b6f78`
- `--line: #e5e5e5`
- `--accent: #2563eb`

**Dark mode** (matches `index_15.html`):
- `--bg: #0a0b0d`
- `--fg: #e8e6e0`
- `--dim: #6b6f78`
- `--line: #1f2229`
- `--accent: #4d9aff`

### Layout

- Centered content column, `max-width: 640px`, horizontal padding 32px (24px on mobile).
- Vertical padding: ~140px top (clear of status pill), ~100px bottom.
- Section spacing: ~64px between major blocks.
- Small uppercase tracked labels (10–11px, letter-spacing 2px, dim color) instead of large `<h2>` headings.
- Hairline 1px borders for publication dividers.

### Hero specifics

- Photo: 180×180px, `border-radius: 50%`, no border, no shadow.
- Two-column hero uses CSS grid: `grid-template-columns: auto 1fr; gap: 32px; align-items: center`.
- On `max-width: 600px`: collapse to single column, photo centered, 140×140px.

### Inline links row

- Plain text, separated by middle-dot `·`. Dim color, accent on hover. No underline by default.

### Status pill

Reuse styling from `index_15.html`:
- Fixed top-center, `top: 18px`.
- Padding 8px 16px, `border-radius: 999px`, 1px border in `--line`, semi-transparent backdrop-blurred background.
- Pulsing 6px green dot (`#3fdb7c`) with glow.
- Hover: border becomes `--accent`.

## Content (verbatim)

### About paragraphs

> I'm a PhD student at the **Chair for AI in Medicine** at TU Munich, supervised by Prof. [Daniel Rückert](https://scholar.google.com/citations?user=H0O0WnQAAAAJ) and Prof. [Georgios Kaissis](https://scholar.google.com/citations?user=g-WdmSgAAAAJ). I work on pretraining and fine-tuning large language models — currently focused on *looped (depth-recurrent) transformers*: how recurrence trades off against parameters, how to retrofit it into pretrained models, and how to elicit latent reasoning via RL.
>
> Alongside the architecture work, I'm benchmarking LLM agents in clinical decision workflows, and I've previously published on differentially private learning and hyperbolic neural networks. Best Graduate Award (M.Sc. Applied Computer Science, 2024) and Top Reviewer at NeurIPS 2025.

### Latest

> Latest · 2026 — Preprint: *Iso-Depth Scaling Laws for Looped Language Models* → (links to `https://kschwethelm.github.io/looped-lm-scaling/`)

### Publications

1. **Preprint '26** — *How Much Is One Recurrence Worth? Iso-Depth Scaling Laws for Looped Language Models*. Schwethelm, Rückert, Kaissis. TL;DR: We trained 116 looped LMs to measure the actual exchange rate between recurrence and unique parameters. Looping is never a free lunch — but truncated BPTT makes the trade much worse, while hyper-connections make it considerably better. Links: site, arxiv, pdf, code.

2. **TMLR '25** — *Visual Privacy Auditing with Diffusion Models*. Schwethelm, Kaiser, Knolle, Lockfisch, Rückert, Ziller. TL;DR: Diffusion models, used as image priors, can reconstruct training data from differentially private models — exposing a gap between DP's theoretical bounds and what actually leaks in practice. Links: arxiv, pdf.

3. **SaTML '25** — *Differentially Private Active Learning: Balancing Effective Data Selection and Privacy*. Schwethelm, Kaiser, Kuntzer, Yiğitsoy, Rückert, Kaissis. TL;DR: First framework for combining active learning with DP-SGD in standard supervised settings. We introduce *step amplification* to fix privacy budget waste and show which acquisition functions still work under DP — and which fall apart. Links: arxiv, pdf, code.

4. **ICLR '24** — *Fully Hyperbolic Convolutional Neural Networks for Computer Vision*. Schwethelm\*, Bdeir\*, Landwehr. TL;DR: HCNN: a CNN that lives entirely in hyperbolic space. We generalize the convolutional layer, batchnorm, and the classifier head to the Lorentz model, so the network leverages hyperbolic geometry at every layer instead of just the head. Links: openreview, arxiv, code.

## Files

```
/index.html              # the entire site
/assets/avatar.jpg       # profile photo (copied from ~/Library/Mobile Documents/...)
/cv.pdf                  # optional, user drops in later (link still rendered)
/LICENSE                 # already present
```

No CSS file (inline `<style>` keeps it a single file). No JS at all.

## Accessibility

- All images have `alt` text (photo: `"Kristian Schwethelm"`).
- Links visible without color (underline on hover).
- Color contrast meets WCAG AA in both themes.
- Status pill is a real `<a>`, keyboard-focusable.
- Page works fully without JS (none is used).

## Out of scope / explicit non-features

- No experience timeline, education timeline, awards list, or teaching list.
- No theme toggle button (auto only).
- No RSS, no blog, no projects gallery.
- No favicon work in this iteration (can be added later).
