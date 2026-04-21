---
title: "Meridian — What Was in the Data"
subtitle: "Answer key to the CHRO Claude Code exercises"
author: "Mathijs de Vaan · Haas School of Business"
date: "April 2026"
---

# The design, briefly

Meridian Technologies is a fully synthetic SaaS company we built for this session. The workforce dataset (~2,500 employees, three years of monthly data) and the 60 exit-interview transcripts were generated from a seeded simulation and written to order, respectively.

Five patterns were planted in the quantitative data, and their qualitative echoes were woven through the exit interviews. The point wasn't to trick you — it was to give you something real enough to investigate and a structure with a known answer, so you could check your own judgment afterward.

This document walks through what was in there, how each piece would surface, and how the two exercises connected.

---

# Exercise A — the five patterns

## 1. Two high-attrition managers in Engineering · [Fix]

Two specific managers in Engineering had team voluntary attrition around **53%** — against a baseline of **~22%** across the rest of Engineering. Their team-level engagement and manager-effectiveness scores sat about **1.5 SD below** their peers.

**How it surfaces:** rank managers by team-level attrition with a minimum sample-size filter (e.g., `n ≥ 10`). The two jump out immediately.

**CHRO move:** coaching-or-replacement decision. Specific managers, immediate.

## 3. Senior Software Engineer gender pay gap · [Fix]

At the **Senior SWE level specifically**, women earned ~7–10% less on base salary than men unadjusted, and ~3% less after controls for tenure and location.

The all-employees average washes this out because of level composition — you have to cut at a specific level to see it.

**How it surfaces:** compare mean base salary by gender within a single level (Senior SWE was the planted one, but look at any level).

**CHRO move:** comp-system audit. Likely legal exposure. Not something you "watch."

## 5. Customer Success rates everyone harshly · [Watch / Fix]

Customer Success had a mean performance rating of **~2.86**. Every other function landed between **~3.30 and ~3.40**. That's a **0.5-point calibration gap**, with no underlying productivity difference — the CS managers are simply using the scale more strictly.

**How it surfaces:** group mean ratings by function. It pops on the first cut.

**CHRO move:** calibration audit across managers. Without intervention, CS employees will be systematically disadvantaged at promotion time.

## 8. Acquired-cohort career stall · [Fix]

Employees with `hire_source == "acquired"` (a cohort from a fictional 2022 Finch acquisition, ~7% of the workforce) showed an **~87% never-promoted rate** vs. **~77%** for direct hires with comparable tenure and performance ratings.

**How it surfaces:** compare progression by `hire_source` — and you have to name the "acquired" category specifically to see it, since it hides inside overall attrition.

**CHRO move:** cohort-specific intervention. Promotion review, named sponsorship, explicit re-leveling conversations.

## 10. Referral outperformance · [Double down]

Referral hires had a **~0.12 higher mean rating** and **~5 percentage points lower attrition** than non-referred hires. This was the clearest bright spot in the dataset.

**How it surfaces:** cut retention and ratings by `hire_source`.

**CHRO move:** increase the referral bonus, invest in the program, feature it in next year's hiring push.

---

# Exercise B — how the exit interviews connected

The 60 transcripts weren't random. Themes were seeded to reinforce (and in a few cases, contradict) the quantitative patterns. Below is the structure, using the same double-down / fix / watch frame.

## [Fix] — the themes that should drive action

| Theme | Transcripts that illustrate it | Connection to Ex A |
|---|---|---|
| Manager as primary driver of exit | `exit_009`, `exit_014`, `exit_035`, `exit_057` (all Engineering) | Pattern 1 |
| Pay equity — gender gap | `exit_036`, `exit_051` (both female Senior SWEs naming the gap explicitly) | Pattern 3 |
| Career stalled after Finch acquisition | `exit_002`, `exit_031`, `exit_048`, `exit_053` | Pattern 8 |
| Infrastructure on-call burnout | `exit_012`, `exit_032`, `exit_049` — the same rotation, three engineers | Naturalistic (not planted, but consistent) |
| Internal mobility broken | `exit_004`, `exit_021`, `exit_028`, `exit_043` across functions | Cross-cutting |

## [Double down] — the bright spots hidden in the exits

These are easy to miss if you only scan for grievances. Every one of these is from an exit interview that is otherwise critical or life-event-driven.

| Signal | Evidence |
|---|---|
| ADA / accommodation process | `exit_044` credits it as "genuinely good" |
| Immigration team handled a hard case | `exit_038` — praises the external counsel through an H-1B loss |
| Employee Assistance Program | `exit_013` calls it "life-changing" during a divorce |
| Strong individual managers named | `exit_033` (FBP during a parent's stroke), `exit_055` (design manager) |
| Design-ops investment | `exit_055` flags that recent hiring has made a real difference |

## [Watch] — quieter signals worth monitoring

| Signal | Evidence |
|---|---|
| Timezone-mismatch remote attrition | `exit_037` — Pacific-TZ engineer on an east-coast-anchored team |
| Re-org fatigue | `exit_023` — retiring Ops director notes 5 reorgs in 8 years |
| Paused SDR-to-AE pipeline | `exit_020` — explicit stall in the Sales career ladder |
| London CS: RTO × book-size growth | `exit_027` — connects a 75-minute commute with a doubled book |

## One transcript worth naming

**`exit_039`** is a senior People Business Partner leaving Meridian for a national education nonprofit. From the other side of the exit-interview table, she aggregates five themes she's seen over her tenure — manager quality, internal mobility, comp transparency, acquired-employee risk, and parental leave. It's the closest thing to a meta-answer-key inside the set, and reading it halves the synthesis time.

---

# The triangulation

The most valuable insights came from connecting the two exercises:

- **Manager attrition cluster in Engineering (data) + four Engineering exit transcripts describing the same experience (text).** Same story, two angles. The data tells you *which managers*; the transcripts tell you *why* people stayed as long as they did — and why they didn't stay longer.

- **Senior SWE gender pay gap in the data + `exit_036` and `exit_051` naming it from the inside.** The comp audit Pattern 3 suggested was already being done by two women who were leaving over it. They had the numbers.

- **Acquired-cohort stall in the data + 4 GROWTH transcripts flagging "since the Finch acquisition."** The quantitative signal and the qualitative narrative line up. The cohort is telling a consistent story.

- **Referral outperformance in the data + praise for specific managers in the transcripts.** Both signals say: the places where Meridian is investing in people well are paying off. Double down on what's working, not just fix what's broken.

## The lesson

The exercise isn't really about Meridian. It's about the shape of CHRO work:

- **Structured data tells you where to look.**
- **Unstructured data tells you why.**
- **Together they take you from *"we have a retention problem in Engineering"* to *"we have a specific manager problem with a specific cluster of engineers who left for specific reasons — here's what I would do, and here's the evidence."***

Claude Code is unusual among AI tools because it can hold both kinds of data in the same working session. Pulling numbers out of a spreadsheet is straightforward. Making sense of 60 narrative documents in 20 minutes is not — unless you have an agent that can read them all and synthesize in parallel. That's the capability this exercise was designed to showcase.

---

# A note on what's real

Everything in these exercises is fully synthetic. Meridian doesn't exist. The five patterns were planted using a seeded, reproducible simulation. The 60 exit interviews were written specifically to support this exercise; no real person wrote any of them.

That design matters for teaching: synthetic-with-planted-signal is the only way to let participants investigate freely while guaranteeing something meaningful to find. For real CHRO work, the same methods — cuts by cohort, triangulation with exit-interview text, attention to bright spots alongside risks — apply directly. Just without the safety net of knowing the answer is in there.
