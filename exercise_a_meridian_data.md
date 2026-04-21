# Exercise A — Meridian Workforce Data

**Your task:** Use Claude Code to investigate a real CHRO question on a real-looking dataset. You have ~20 minutes.

---

## The scenario

You've just joined **Meridian Technologies** — a fictional SaaS company of ~2,500 employees — as the new Chief People Officer. You're 90 days in. At your next board meeting the chair is going to ask you:

> **"What are our biggest retention risks, and what would you do about them?"**

You don't yet know the data. You're not a full-time analyst. But you do have Claude Code.

---

## Your data

Two files are available. Pick whichever you prefer (or use both).

| File | What it is | Rows |
|---|---|---|
| `meridian_snapshot.csv` | One row per employee, latest observed month | 2,500 |
| `meridian_panel.csv.gz` | Monthly panel, Apr 2023 – Mar 2026 | ~58,000 |

**Download URLs** (ask Claude Code to fetch and save these):

- <https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/meridian_snapshot.csv>
- <https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/meridian_panel.csv.gz>
- <https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/meridian_data_dictionary.md>

The **data dictionary** (`meridian_data_dictionary.md`) describes every column. Grab it too — it'll save you questions.

**Tip — silent departures:** About 15% of employees who leave Meridian have no `termination_month` filled. They simply stop appearing in later panel rows. If you want all departures, you need *both* the non-null `termination_month` rows *and* anyone whose last observation is before 2026-03-01.

---

## Getting started (run these verbatim, in order)

**Prompt 1 — Download the files**

```
Please download the following files and save them in the current folder:
- https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/meridian_snapshot.csv
- https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/meridian_panel.csv.gz
- https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/meridian_data_dictionary.md
```

**Prompt 2 — Get oriented**

```
Read the data dictionary first so you understand the columns. Then load
meridian_snapshot.csv and give me a one-paragraph summary: how many
employees, which functions and locations are most represented, and
what does the overall attrition picture look like. Flag anything that
jumps out.
```

---

## Your investigation

Now you're on your own. Use the board's question as your compass:

> **What are Meridian's biggest retention risks, and what would you do about them?**

**You do not need to find all the patterns.** Find one or two things that would change what you'd say at the board meeting. Claude Code will happily do the number-crunching — your job is to ask the right questions and interpret the answers.

---

## If you get stuck — pattern-level prompts to try

These are not "the right answers." They're directions that CHROs typically explore. Pick one that sounds interesting.

- *"Which managers have the highest team attrition? Control for team size."*
- *"Does attrition vary by hire source? Compare referrals, direct hires, campus, agency, and acquired."*
- *"Plot voluntary attrition by function over time. Are any functions getting worse?"*
- *"Compare performance-rating distributions across functions. Are some functions rating people more harshly than others?"*
- *"Break down average base salary at Senior Software Engineer level by gender."*

---

## Stretch prompts (if you have time)

- *"Build me a two-page board summary of the top three retention risks with recommended actions."*
- *"For the highest-risk manager you found, describe the team — who are they, what do they work on, what's their tenure distribution?"*
- *"Are there any functions where top-performers (rating 5) are leaving at unusual rates?"*

---

## Share with your breakout

In the last minute or two of your breakout, each person shares **one surprising finding**. Not a plan, not a full answer — just one thing that made you look twice. We'll hear a few of these back in the main room.

---

## A note on the data

Meridian is fictional. The data is fully synthetic and safe to share. Any resemblance to real companies, real patterns, or real employees is by design (we modeled it on publicly available workforce structures) but none of it is real.
