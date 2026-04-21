const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
} = require("docx");

// Colors
const NAVY = "1B3A5C";
const DARK_BLUE = "2E5090";
const ACCENT_BLUE = "4A90D9";
const LIGHT_BLUE_BG = "E8F0FE";
const GREEN_BG = "E8F5E9";
const GREEN_ACCENT = "2E7D32";
const PURPLE_BG = "F3E8FD";
const PURPLE = "5C2D91";
const AMBER_BG = "FFF8E1";
const GRAY_TEXT = "666666";
const BORDER_GRAY = "CCCCCC";
const WHITE = "FFFFFF";
const ORANGE = "E65100";

const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const border = { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 100, bottom: 100, left: 150, right: 150 };
const PAGE_WIDTH = 9360;

function spacer(pts = 120) {
  return new Paragraph({ spacing: { before: pts, after: 0 }, children: [] });
}

function divider() {
  return new Paragraph({
    spacing: { before: 300, after: 300 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: ACCENT_BLUE, space: 1 } },
    children: [],
  });
}

function exerciseHeader(num, title, time, color = NAVY) {
  const colNum = 900;
  const colTitle = PAGE_WIDTH - colNum - 1600;
  const colTime = 1600;
  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: [colNum, colTitle, colTime],
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: noBorders,
          shading: { fill: color, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 80, right: 80 },
          width: { size: colNum, type: WidthType.DXA },
          verticalAlign: "center",
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(num), bold: true, font: "Arial", size: 36, color: WHITE })] })],
        }),
        new TableCell({
          borders: noBorders,
          shading: { fill: color, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 160, right: 80 },
          width: { size: colTitle, type: WidthType.DXA },
          verticalAlign: "center",
          children: [new Paragraph({ children: [new TextRun({ text: title, bold: true, font: "Arial", size: 26, color: WHITE })] })],
        }),
        new TableCell({
          borders: noBorders,
          shading: { fill: color, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 80, right: 120 },
          width: { size: colTime, type: WidthType.DXA },
          verticalAlign: "center",
          children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: time, font: "Arial", size: 20, color: WHITE, italics: true })] })],
        }),
      ],
    })],
  });
}

function body(runs, opts = {}) {
  return new Paragraph({
    spacing: { before: 40, after: 40, line: 300 },
    ...opts,
    children: runs.map(r => typeof r === "string" ? new TextRun({ text: r, font: "Arial", size: 22 }) : new TextRun({ font: "Arial", size: 22, ...r })),
  });
}

function promptBox(label, text, accentColor = ACCENT_BLUE) {
  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: [PAGE_WIDTH],
    rows: [
      new TableRow({
        children: [new TableCell({
          borders: { top: { style: BorderStyle.SINGLE, size: 4, color: accentColor }, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 4, color: accentColor }, right: noBorder },
          shading: { fill: "F8FAFC", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 0, left: 160, right: 160 },
          width: { size: PAGE_WIDTH, type: WidthType.DXA },
          children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, font: "Arial", size: 18, color: accentColor })] })],
        })],
      }),
      new TableRow({
        children: [new TableCell({
          borders: { top: noBorder, bottom: { style: BorderStyle.SINGLE, size: 4, color: accentColor }, left: { style: BorderStyle.SINGLE, size: 4, color: accentColor }, right: noBorder },
          shading: { fill: "F8FAFC", type: ShadingType.CLEAR },
          margins: { top: 40, bottom: 100, left: 160, right: 160 },
          width: { size: PAGE_WIDTH, type: WidthType.DXA },
          children: [new Paragraph({ spacing: { line: 280 }, children: [new TextRun({ text, italics: true, font: "Arial", size: 21, color: "333333" })] })],
        })],
      }),
    ],
  });
}

function tipBox(text) {
  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: [PAGE_WIDTH],
    rows: [new TableRow({
      children: [new TableCell({
        borders: { top: { style: BorderStyle.SINGLE, size: 4, color: "B8860B" }, bottom: noBorder, left: noBorder, right: noBorder },
        shading: { fill: AMBER_BG, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 200, right: 200 },
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        children: [new Paragraph({ spacing: { line: 280 }, children: [
          new TextRun({ text: "Tip: ", bold: true, font: "Arial", size: 20, color: "B8860B" }),
          new TextRun({ text, font: "Arial", size: 20 }),
        ] })],
      })],
    })],
  });
}

function adventureOption(letter, title, description, bgColor, accentColor) {
  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: [PAGE_WIDTH],
    rows: [
      new TableRow({
        children: [new TableCell({
          borders: { top: { style: BorderStyle.SINGLE, size: 4, color: accentColor }, bottom: noBorder, left: noBorder, right: noBorder },
          shading: { fill: bgColor, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 40, left: 200, right: 200 },
          width: { size: PAGE_WIDTH, type: WidthType.DXA },
          children: [new Paragraph({ children: [
            new TextRun({ text: `Option ${letter}: `, bold: true, font: "Arial", size: 22, color: accentColor }),
            new TextRun({ text: title, bold: true, font: "Arial", size: 22, color: accentColor }),
          ] })],
        })],
      }),
      new TableRow({
        children: [new TableCell({
          borders: noBorders,
          shading: { fill: bgColor, type: ShadingType.CLEAR },
          margins: { top: 40, bottom: 120, left: 200, right: 200 },
          width: { size: PAGE_WIDTH, type: WidthType.DXA },
          children: [new Paragraph({ spacing: { line: 280 }, children: [new TextRun({ text: description, italics: true, font: "Arial", size: 21, color: "333333" })] })],
        })],
      }),
    ],
  });
}

function cheatCategory(category, prompts, bgColor, accentColor) {
  const rows = [];
  rows.push(new TableRow({
    children: [new TableCell({
      borders: { top: { style: BorderStyle.SINGLE, size: 4, color: accentColor }, bottom: noBorder, left: noBorder, right: noBorder },
      shading: { fill: bgColor, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 60, left: 200, right: 200 },
      width: { size: PAGE_WIDTH, type: WidthType.DXA },
      children: [new Paragraph({ children: [new TextRun({ text: category, bold: true, font: "Arial", size: 22, color: accentColor })] })],
    })],
  }));
  prompts.forEach(p => {
    rows.push(new TableRow({
      children: [new TableCell({
        borders: noBorders,
        shading: { fill: bgColor, type: ShadingType.CLEAR },
        margins: { top: 20, bottom: 20, left: 400, right: 200 },
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        children: [new Paragraph({ spacing: { line: 260 }, children: [new TextRun({ text: `\u201C${p}\u201D`, italics: true, font: "Arial", size: 20, color: "444444" })] })],
      })],
    }));
  });
  rows.push(new TableRow({
    children: [new TableCell({
      borders: noBorders, shading: { fill: bgColor, type: ShadingType.CLEAR },
      margins: { top: 0, bottom: 0, left: 200, right: 200 },
      width: { size: PAGE_WIDTH, type: WidthType.DXA },
      children: [new Paragraph({ spacing: { before: 40 }, children: [] })],
    })],
  }));
  return new Table({ width: { size: PAGE_WIDTH, type: WidthType.DXA }, columnWidths: [PAGE_WIDTH], rows });
}

const doc = new Document({
  styles: { default: { document: { run: { font: "Arial", size: 22 } } } },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
      },
      {
        reference: "questions",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: NAVY, space: 6 } },
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "Haas School of Business", bold: true, font: "Arial", size: 18, color: NAVY }),
            new TextRun({ text: "  |  Executive Education", font: "Arial", size: 18, color: GRAY_TEXT }),
          ],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: BORDER_GRAY, space: 6 } },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", font: "Arial", size: 16, color: GRAY_TEXT }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: GRAY_TEXT }),
            new TextRun({ text: "  |  Claude Code Hands-On Exercises", font: "Arial", size: 16, color: GRAY_TEXT }),
          ],
        })],
      }),
    },
    children: [
      // ==================== TITLE ====================
      new Paragraph({
        spacing: { before: 300, after: 40 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Claude Code Hands-On Exercises", bold: true, font: "Arial", size: 44, color: NAVY })],
      }),
      new Paragraph({
        spacing: { before: 0, after: 60 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Session 3: AI-Powered HR Analytics", font: "Arial", size: 26, color: GRAY_TEXT })],
      }),
      divider(),

      // ==================== EXERCISE 1 ====================
      exerciseHeader(1, "Guided Walkthrough \u2014 Turnover Analysis", "15 min", NAVY),
      spacer(60),
      body([
        { text: "Dataset: ", bold: true },
        "TechNova Inc. (~2,000 employees, fast-growing tech company experiencing high attrition)",
      ]),
      spacer(40),
      body([{ text: "Follow along with the facilitator. Type these prompts into Claude Code one at a time.", italics: true }]),
      spacer(80),

      promptBox("Prompt 1 \u2014 Load the data",
        "Please download the CSV file from this URL and save it in the current folder: https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/technova_employees.csv"),
      spacer(60),
      promptBox("Prompt 2 \u2014 Explore the data",
        "Examine this employee dataset. Summarize the key characteristics of the workforce and identify any patterns in employee turnover."),
      spacer(60),
      promptBox("Prompt 3 \u2014 Regression analysis",
        "What factors best predict whether an employee will leave? Run a logistic regression and show me the key drivers."),
      spacer(60),
      promptBox("Prompt 4 \u2014 Visualize",
        "Create a visualization showing turnover rates by department and tenure group."),

      // ==================== EXERCISE 2 ====================
      divider(),
      exerciseHeader(2, "Semi-Guided \u2014 Pay Equity Analysis", "15 min", DARK_BLUE),
      spacer(60),
      body([
        { text: "Dataset: ", bold: true },
        "MedView Health (~3,000 employees, regional healthcare system with pay equity concerns)",
      ]),
      spacer(40),
      body([{ text: "Now it\u2019s your turn. Load the MedView Health dataset and investigate the questions below. You decide how to prompt Claude Code.", italics: true }]),
      spacer(80),

      promptBox("First \u2014 Load the data",
        "Please download the CSV file from this URL and save it in the current folder: https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/medview_employees.csv"),
      spacer(80),

      body([{ text: "Investigate these questions:", bold: true }]),
      spacer(40),

      // Question boxes
      ...[
        "Is there a gender pay gap at MedView Health? If so, where is it concentrated?",
        "Are there disparities in promotion rates across demographic groups?",
        "What recommendations would you make to the CHRO based on your findings?",
      ].flatMap((q, i) => [
        new Table({
          width: { size: PAGE_WIDTH, type: WidthType.DXA },
          columnWidths: [600, PAGE_WIDTH - 600],
          rows: [new TableRow({
            children: [
              new TableCell({
                borders: noBorders,
                shading: { fill: DARK_BLUE, type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 80, right: 40 },
                width: { size: 600, type: WidthType.DXA },
                verticalAlign: "center",
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(i + 1), bold: true, font: "Arial", size: 24, color: WHITE })] })],
              }),
              new TableCell({
                borders: noBorders,
                shading: { fill: LIGHT_BLUE_BG, type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 160, right: 120 },
                width: { size: PAGE_WIDTH - 600, type: WidthType.DXA },
                children: [new Paragraph({ spacing: { line: 280 }, children: [new TextRun({ text: q, font: "Arial", size: 22 })] })],
              }),
            ],
          })],
        }),
        spacer(40),
      ]),

      spacer(40),
      tipBox("You don\u2019t need to use these exact words. Try rephrasing in your own language \u2014 Claude Code understands natural conversation."),

      // ==================== EXERCISE 3 ====================
      divider(),
      exerciseHeader(3, "Choose Your Own Adventure", "15 min", ACCENT_BLUE),
      spacer(60),
      body([{ text: "Pick ONE of the tasks below. This shows how Claude Code goes beyond data analysis.", italics: true }]),
      spacer(80),

      adventureOption("A", "Policy Drafting", "Using the insights from the MedView Health analysis, draft a memo to the executive team proposing a pay equity remediation plan.", LIGHT_BLUE_BG, DARK_BLUE),
      spacer(60),
      adventureOption("B", "Board Presentation", "Create a 5-slide board presentation summarizing the turnover analysis from TechNova, including charts and recommendations.", GREEN_BG, GREEN_ACCENT),
      spacer(60),
      adventureOption("C", "Survey Analysis", "Please download the exit interview data from https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/exit_interviews_technova.csv \u2014 then categorize the main themes and analyze the sentiment.", PURPLE_BG, PURPLE),

      // ==================== EXERCISE 4 ====================
      divider(),
      exerciseHeader(4, "Open Exploration", "10 min", "546E7A"),
      spacer(60),
      body([{ text: "Free time! Try anything you like. Here are some ideas:", italics: true }]),
      spacer(40),

      ...[
        "Combine both datasets and compare the two organizations",
        "Ask Claude Code to create an executive dashboard",
        "Draft a job description for a new role",
        "Ask Claude Code to explain a statistical concept from Sessions 1\u20132",
        "Bring your own question \u2014 what would you ask an analyst if you had one at your desk right now?",
      ].map(item => new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { before: 40, after: 40, line: 300 },
        children: [new TextRun({ text: item, font: "Arial", size: 22 })],
      })),

      // ==================== PAGE BREAK — CHEAT SHEET ====================
      new Paragraph({ children: [new PageBreak()] }),

      new Paragraph({
        spacing: { before: 200, after: 40 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Prompt Cheat Sheet", bold: true, font: "Arial", size: 40, color: NAVY })],
      }),
      new Paragraph({
        spacing: { before: 0, after: 80 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Keep this for future reference", font: "Arial", size: 22, color: GRAY_TEXT })],
      }),
      divider(),

      cheatCategory("Data Analysis", [
        "Analyze [file] and summarize the key findings",
        "What factors predict [outcome]? Run a regression.",
        "Compare [group A] vs [group B] on [metric]",
        "Create a visualization of [variable] broken down by [category]",
      ], LIGHT_BLUE_BG, DARK_BLUE),
      spacer(80),

      cheatCategory("Reports & Presentations", [
        "Create a [N]-slide board presentation on [topic] with charts",
        "Write an executive summary of these findings for [audience]",
        "Generate a PDF report with the key metrics and recommendations",
      ], GREEN_BG, GREEN_ACCENT),
      spacer(80),

      cheatCategory("Policy & Documents", [
        "Draft a [policy type] policy that addresses [issue]",
        "Review this policy and suggest improvements",
        "Write a memo to [audience] recommending [action]",
      ], PURPLE_BG, PURPLE),
      spacer(80),

      cheatCategory("Survey & Text Analysis", [
        "Analyze these open-ended survey responses and categorize the themes",
        "What is the overall sentiment? Show me the distribution",
        "Identify the top 5 concerns and provide supporting quotes",
      ], AMBER_BG, "B8860B"),
      spacer(80),

      // Tips section
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [PAGE_WIDTH],
        rows: [
          new TableRow({
            children: [new TableCell({
              borders: { top: { style: BorderStyle.SINGLE, size: 4, color: NAVY }, bottom: noBorder, left: noBorder, right: noBorder },
              shading: { fill: "ECEFF1", type: ShadingType.CLEAR },
              margins: { top: 100, bottom: 60, left: 200, right: 200 },
              width: { size: PAGE_WIDTH, type: WidthType.DXA },
              children: [new Paragraph({ children: [new TextRun({ text: "Tips for Better Results", bold: true, font: "Arial", size: 22, color: NAVY })] })],
            })],
          }),
          ...[
            ["Be specific: ", "tell Claude who the audience is and what format you want"],
            ["Iterate: ", "if the first result isn\u2019t right, give feedback and refine"],
            ["Ask why: ", "\u201CExplain your methodology\u201D or \u201CWhy did you choose this approach?\u201D"],
            ["Set context: ", "\u201CI\u2019m a CHRO presenting to the board\u201D changes how Claude writes"],
          ].map(([label, desc]) => new TableRow({
            children: [new TableCell({
              borders: noBorders,
              shading: { fill: "ECEFF1", type: ShadingType.CLEAR },
              margins: { top: 30, bottom: 30, left: 400, right: 200 },
              width: { size: PAGE_WIDTH, type: WidthType.DXA },
              children: [new Paragraph({ spacing: { line: 280 }, children: [
                new TextRun({ text: label, bold: true, font: "Arial", size: 20, color: NAVY }),
                new TextRun({ text: desc, font: "Arial", size: 20 }),
              ] })],
            })],
          })),
          new TableRow({
            children: [new TableCell({
              borders: noBorders, shading: { fill: "ECEFF1", type: ShadingType.CLEAR },
              margins: { top: 0, bottom: 0, left: 200, right: 200 },
              width: { size: PAGE_WIDTH, type: WidthType.DXA },
              children: [new Paragraph({ spacing: { before: 40 }, children: [] })],
            })],
          }),
        ],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/mathijsdevaan/Claude Projects/CHRO Claude/participant_handout.docx", buffer);
  console.log("Created participant_handout.docx successfully");
});
