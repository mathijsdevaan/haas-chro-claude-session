# CHRO Claude Code Session — Project Context

## What This Project Is
Materials for a 90-minute hands-on session on Claude Code for ~40 CHRO executives at UC Berkeley Haas School of Business. This is Session 3 in a series; Sessions 1-2 covered regression analysis and RCTs within organizations.

## Audience
- ~40 Chief Human Resources Officers (CHROs) — senior executives, not technical
- Low comfort with data analysis tools; prior sessions were their first exposure to regression/RCTs
- Many have corporate-managed laptops that may restrict software installation
- They have Haas Claude Team plan accounts (standard claude.ai login)

## Key Design Decisions

### Platform
- **Default: Claude Desktop App** (Code tab) — no GitHub required, simplest path
- **Fallback: Web (claude.ai/code)** — for participants who can't install software; requires GitHub account + forking a repo
- **Advanced: Terminal CLI** — for technically adventurous participants
- The web version (claude.ai/code) requires GitHub integration; the desktop app and terminal do not

### GitHub
- Professor's GitHub username: **mathijsdevaan**
- Session repo: **haas-chro-claude-session** (to be created on GitHub)
- Toy dataset for setup testing: `toy_hr_data.csv` (50 employees, right-skewed salary)
- All session datasets are fetched via URL prompts (participants give Claude Code a raw GitHub URL rather than downloading files manually)

### Session Structure (90 min)
- **Part 1: Lecture (30 min)** — What is Claude Code, key concepts (skills, MCPs), use cases for CHROs, prompting tips
- **Part 2: Hands-on (60 min)** — Progressive exercises:
  1. Guided turnover analysis (TechNova dataset, ~2,000 employees)
  2. Semi-guided pay equity analysis (MedView Health dataset, ~3,000 employees)
  3. Choose-your-own-adventure (policy drafting, board presentation, or survey analysis)
  4. Open exploration

### Datasets
- **TechNova Inc.** — turnover/retention focus. Embedded patterns: high attrition in engineering among mid-tenure employees, low engagement predicts exit, manager quality is key driver
- **MedView Health** — pay equity/DEI focus. Embedded patterns: gender pay gap in clinical roles, ethnicity disparities in promotion rates, compression for long-tenured staff
- **Exit interviews** — simulated open-ended responses for survey analysis exercise
- Light connection to Sessions 1-2 (regression concepts surface naturally, no explicit RCT embedded)

## Deliverables

| File | Status | Description |
|------|--------|-------------|
| `setup_instructions.md` | Done | Content for pre-session setup guide |
| `setup_instructions.docx` | Needs regeneration | Formatted version — needs update to match latest .md content |
| `generate_setup_doc.js` | Needs update | Generator script — needs to match latest setup_instructions.md |
| `toy_hr_data.csv` | Done | 50-row test dataset for setup verification |
| `participant_handout.docx` | Done | Exercise prompts + prompt cheat sheet |
| `generate_handout.js` | Done | Generator script for handout |
| `technova_employees.csv` | Not started | Main dataset 1: turnover/retention (~2,000 rows) |
| `medview_employees.csv` | Not started | Main dataset 2: pay equity/DEI (~3,000 rows) |
| `exit_interviews_technova.csv` | Not started | Simulated exit interview responses (~100 rows) |
| `session_outline.md` | Not started | Detailed facilitator guide |
| `lecture_slides.pptx` | Not started | 12-slide deck for Part 1 |

## Style Notes
- All .docx files use navy/blue color scheme (NAVY=#1B3A5C, DARK_BLUE=#2E5090, ACCENT_BLUE=#4A90D9)
- Header: "Haas School of Business | Executive Education"
- Footer: page numbers + document name
- Font: Arial throughout, US Letter size
- Generated via docx-js (Node.js `docx` package installed locally in this project)
