# Exercise B — Meridian Exit Interviews

**Your task:** Use Claude Code to synthesize 60 exit interviews into actionable insight. You have ~20 minutes.

This is the exercise where Claude Code really differentiates from traditional analytics tools. Pulling numbers out of a spreadsheet is straightforward. Making sense of 60 narrative documents in 20 minutes is not — unless you have Claude.

---

## The scenario

You're the same CHRO as Exercise A. It's Friday afternoon. Your executive team meeting is Monday morning. The agenda has one item from the CEO:

> **"What are our people telling us when they leave? What should we double down on, what should we fix, and what should we watch? Three things total."**

You have 60 exit-interview transcripts from the last year. Normally this would take a consultant three weeks and cost $40,000. You have until Monday. You have Claude Code.

---

## Your data

60 exit-interview transcripts from Meridian's last year, ordered chronologically. Each one is a text file, ~250–320 words, with a short header (function, role, location, tenure) plus free-form notes.

**Download:** a single zip archive.

<https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/exit_interviews.zip>

---

## Getting started (run these verbatim, in order)

**Prompt 1 — Download and unzip all transcripts**

```
Please download the following zip file and extract it into an
exit_interviews/ folder in the current directory:
https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/exit_interviews.zip
```

**Prompt 2 — First read**

```
Read all 60 exit interviews in exit_interviews/ and give me a
high-level summary: how many transcripts, what's the distribution
across functions and tenure, and what are the top five themes you
see across all of them.
```

---

## Your investigation

Pretend you're preparing for the Monday meeting:

> **What should we double down on, what should we fix, and what should we watch? Three things total.**

You're not doing sentiment analysis. You're looking for **the story behind the numbers from Exercise A**. Many of these exits map onto the retention risks you might have found in the structured data — if you found pay-equity issues, see who's writing about pay. If you found manager issues, see who's writing about managers. Triangulate.

---

## If you get stuck — pattern-level prompts to try

- *"Which transcripts mention the manager as a primary reason for leaving? Summarize the specific complaints and which functions they're in."*
- *"Find transcripts that mention being 'acquired' or 'from Finch'. What do they say about their experience post-acquisition?"*
- *"Which transcripts discuss compensation or pay equity? Are there patterns by gender or function?"*
- *"Group the transcripts by theme — manager, compensation, work-life balance, career growth, life events, external offer. How many in each bucket?"*
- *"Look at the work-life-balance transcripts. Is there a cluster around any specific team or function?"*

---

## Stretch prompts (if you have time)

- *"Write a one-page memo to the exec team: one thing to double down on, one thing to fix, one thing to watch — with evidence from the transcripts for each."*
- *"If you could forward three specific exit interviews to the CEO — ones that are uniquely clarifying — which would they be and why?"*
- *"Which findings from Exercise A (the structured data) are corroborated by the exit interviews? Which are contradicted?"*

---

## Share with your breakout

Each person shares **one theme that surprised them** and **one action they'd take on Monday**. Think of this as your 30-second board summary.

---

## A note on the data

All 60 exit interviews are fully synthetic, written to support this exercise. No real person wrote any of them. Any names, companies, or personal circumstances that appear are fictional.
