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
const LIGHT_GRAY_BG = "F5F5F5";
const AMBER_BG = "FFF8E1";
const GREEN_BG = "E8F5E9";
const GREEN_ACCENT = "2E7D32";
const GRAY_TEXT = "666666";
const BORDER_GRAY = "CCCCCC";
const WHITE = "FFFFFF";
const ORANGE = "E65100";
const PURPLE = "5C2D91";

const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const border = { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 100, bottom: 100, left: 150, right: 150 };
const PAGE_WIDTH = 9360;

const DATA_URL = "https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/toy_hr_data.csv";
const REPO_URL = "github.com/mathijsdevaan/haas-chro-claude-session";

// ============ HELPERS ============

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

function sectionTitle(text, color = NAVY) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, font: "Arial", size: 32, color })],
  });
}

function optionHeader(letter, title, tagText, tagColor) {
  const colTitle = PAGE_WIDTH - 2200;
  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: [colTitle, 2200],
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: { top: noBorder, bottom: { style: BorderStyle.SINGLE, size: 4, color: tagColor }, left: noBorder, right: noBorder },
          margins: { top: 60, bottom: 80, left: 0, right: 0 },
          width: { size: colTitle, type: WidthType.DXA },
          children: [new Paragraph({ children: [
            new TextRun({ text: `Option ${letter}: `, bold: true, font: "Arial", size: 34, color: NAVY }),
            new TextRun({ text: title, bold: true, font: "Arial", size: 34, color: NAVY }),
          ] })],
        }),
        new TableCell({
          borders: { top: noBorder, bottom: { style: BorderStyle.SINGLE, size: 4, color: tagColor }, left: noBorder, right: noBorder },
          margins: { top: 60, bottom: 80, left: 0, right: 0 },
          width: { size: 2200, type: WidthType.DXA },
          shading: { fill: tagColor, type: ShadingType.CLEAR },
          verticalAlign: "center",
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: tagText, bold: true, font: "Arial", size: 20, color: WHITE })] })],
        }),
      ],
    })],
  });
}

function prosConsBox(pros, cons) {
  const half = Math.floor(PAGE_WIDTH / 2);
  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: [half, half],
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: noBorders, shading: { fill: GREEN_BG, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 150, right: 80 },
          width: { size: half, type: WidthType.DXA },
          children: [
            new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "Pros", bold: true, font: "Arial", size: 20, color: GREEN_ACCENT })] }),
            ...pros.map(p => new Paragraph({ spacing: { before: 30, after: 30, line: 260 }, children: [new TextRun({ text: "\u2713  " + p, font: "Arial", size: 20, color: GREEN_ACCENT })] })),
          ],
        }),
        new TableCell({
          borders: noBorders, shading: { fill: "FFEBEE", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 150, right: 80 },
          width: { size: half, type: WidthType.DXA },
          children: [
            new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "Cons", bold: true, font: "Arial", size: 20, color: "C62828" })] }),
            ...cons.map(c => new Paragraph({ spacing: { before: 30, after: 30, line: 260 }, children: [new TextRun({ text: "\u2717  " + c, font: "Arial", size: 20, color: "C62828" })] })),
          ],
        }),
      ],
    })],
  });
}

function step(num, runs) {
  const colNum = 480;
  const colText = PAGE_WIDTH - colNum;
  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: [colNum, colText],
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: noBorders, shading: { fill: ACCENT_BLUE, type: ShadingType.CLEAR },
          margins: { top: 50, bottom: 50, left: 80, right: 40 },
          width: { size: colNum, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(num), bold: true, font: "Arial", size: 24, color: WHITE })] })],
        }),
        new TableCell({
          borders: noBorders, shading: { fill: "F8FAFC", type: ShadingType.CLEAR },
          margins: { top: 50, bottom: 50, left: 160, right: 80 },
          width: { size: colText, type: WidthType.DXA },
          children: [new Paragraph({ spacing: { line: 280 }, children: runs.map(r => typeof r === "string" ? new TextRun({ text: r, font: "Arial", size: 22 }) : new TextRun({ font: "Arial", size: 22, ...r })) })],
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

function subBody(runs) {
  return new Paragraph({
    spacing: { before: 20, after: 20, line: 280 },
    indent: { left: 640 },
    children: runs.map(r => typeof r === "string" ? new TextRun({ text: r, font: "Arial", size: 20 }) : new TextRun({ font: "Arial", size: 20, ...r })),
  });
}

function promptBox(label, text, accentColor = GREEN_ACCENT) {
  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: [PAGE_WIDTH],
    rows: [
      new TableRow({ children: [new TableCell({
        borders: { top: { style: BorderStyle.SINGLE, size: 4, color: accentColor }, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 4, color: accentColor }, right: noBorder },
        shading: { fill: GREEN_BG, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 0, left: 160, right: 160 },
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, font: "Arial", size: 18, color: accentColor })] })],
      })] }),
      new TableRow({ children: [new TableCell({
        borders: { top: noBorder, bottom: { style: BorderStyle.SINGLE, size: 4, color: accentColor }, left: { style: BorderStyle.SINGLE, size: 4, color: accentColor }, right: noBorder },
        shading: { fill: GREEN_BG, type: ShadingType.CLEAR },
        margins: { top: 40, bottom: 100, left: 160, right: 160 },
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        children: [new Paragraph({ spacing: { line: 280 }, children: [new TextRun({ text, italics: true, font: "Arial", size: 21, color: "333333" })] })],
      })] }),
    ],
  });
}

function callout(title, items, bgColor, accentColor) {
  const rows = [];
  rows.push(new TableRow({ children: [new TableCell({
    borders: { top: { style: BorderStyle.SINGLE, size: 6, color: accentColor }, bottom: noBorder, left: noBorder, right: noBorder },
    shading: { fill: bgColor, type: ShadingType.CLEAR },
    margins: { top: 120, bottom: 40, left: 200, right: 200 },
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    children: [new Paragraph({ children: [new TextRun({ text: title, bold: true, font: "Arial", size: 22, color: accentColor })] })],
  })] }));
  items.forEach(item => {
    rows.push(new TableRow({ children: [new TableCell({
      borders: noBorders, shading: { fill: bgColor, type: ShadingType.CLEAR },
      margins: { top: 30, bottom: 30, left: 400, right: 200 },
      width: { size: PAGE_WIDTH, type: WidthType.DXA },
      children: [new Paragraph({ spacing: { line: 280 }, children: item.map(r => typeof r === "string" ? new TextRun({ text: r, font: "Arial", size: 20 }) : new TextRun({ font: "Arial", size: 20, ...r })) })],
    })] }));
  });
  rows.push(new TableRow({ children: [new TableCell({
    borders: noBorders, shading: { fill: bgColor, type: ShadingType.CLEAR },
    margins: { top: 0, bottom: 0, left: 200, right: 200 },
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    children: [new Paragraph({ spacing: { before: 60 }, children: [] })],
  })] }));
  return new Table({ width: { size: PAGE_WIDTH, type: WidthType.DXA }, columnWidths: [PAGE_WIDTH], rows });
}

function codeBox(text) {
  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: [PAGE_WIDTH],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: border, bottom: border, left: { style: BorderStyle.SINGLE, size: 6, color: ACCENT_BLUE }, right: border },
      shading: { fill: "F8F9FA", type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 200, right: 200 },
      width: { size: PAGE_WIDTH, type: WidthType.DXA },
      children: [new Paragraph({ children: [new TextRun({ text, font: "Courier New", size: 21 })] })],
    })] })],
  });
}

// ============ PROMPT TEXTS ============

const PROMPT1_TEXT = `Please download the CSV file from this URL and save it in the current folder: ${DATA_URL}`;
const PROMPT2_TEXT = "Plot the distribution of salary in the dataset you just downloaded. Add two vertical lines: one showing the mean (in red) and one showing the median (in blue). Label both lines with their values.";

// ============ DOCUMENT ============

const doc = new Document({
  styles: { default: { document: { run: { font: "Arial", size: 22 } } } },
  numbering: {
    config: [{
      reference: "checklist",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u25A1", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
    }],
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
            new TextRun({ text: "  |  Claude Code Setup Guide", font: "Arial", size: 16, color: GRAY_TEXT }),
          ],
        })],
      }),
    },
    children: [
      // ==================== TITLE ====================
      new Paragraph({
        spacing: { before: 400, after: 40 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Getting Started with Claude Code", bold: true, font: "Arial", size: 48, color: NAVY })],
      }),
      new Paragraph({
        spacing: { before: 0, after: 80 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Pre-Session Setup Guide", font: "Arial", size: 26, color: GRAY_TEXT })],
      }),
      divider(),

      // ==================== WHAT IS CLAUDE CODE ====================
      sectionTitle("What is Claude Code?"),
      spacer(40),
      body([
        "Claude Code is an AI assistant that goes beyond conversation. While regular Claude (the chatbot) can answer questions and discuss ideas, Claude Code can actually ",
        { text: "do things", italics: true },
        ": analyze your data, create charts and reports, write documents, build presentations, and automate tasks \u2014 all from plain English instructions.",
      ]),
      spacer(60),
      body(["Think of it as having a highly capable analyst on your team who works at the speed of thought."]),

      // ==================== WHY FILE ACCESS ====================
      spacer(100),
      sectionTitle("Why does Claude Code need access to my files?"),
      spacer(40),
      body(["To analyze your data, Claude Code needs to be able to read your files \u2014 just like a human analyst would need access to your spreadsheets. There are two ways this works:"]),
      spacer(60),

      // Two-column explanation
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [Math.floor(PAGE_WIDTH / 2), Math.floor(PAGE_WIDTH / 2)],
        rows: [new TableRow({
          children: [
            new TableCell({
              borders: noBorders, shading: { fill: LIGHT_BLUE_BG, type: ShadingType.CLEAR },
              margins: { top: 100, bottom: 100, left: 150, right: 100 },
              width: { size: Math.floor(PAGE_WIDTH / 2), type: WidthType.DXA },
              children: [
                new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "Local Access", bold: true, font: "Arial", size: 22, color: DARK_BLUE })] }),
                new Paragraph({ spacing: { line: 260 }, children: [new TextRun({ text: "Desktop App or Terminal", font: "Arial", size: 20, color: GRAY_TEXT })] }),
                new Paragraph({ spacing: { before: 60, line: 260 }, children: [new TextRun({ text: "Claude Code works within a folder on your computer. You can ask it to download files from the internet into that folder.", font: "Arial", size: 20 })] }),
              ],
            }),
            new TableCell({
              borders: noBorders, shading: { fill: "F3E8FD", type: ShadingType.CLEAR },
              margins: { top: 100, bottom: 100, left: 150, right: 100 },
              width: { size: Math.floor(PAGE_WIDTH / 2), type: WidthType.DXA },
              children: [
                new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "Cloud Access", bold: true, font: "Arial", size: 22, color: PURPLE })] }),
                new Paragraph({ spacing: { line: 260 }, children: [new TextRun({ text: "Web App", font: "Arial", size: 20, color: GRAY_TEXT })] }),
                new Paragraph({ spacing: { before: 60, line: 260 }, children: [new TextRun({ text: "Claude Code works within a GitHub repository (an online file storage platform). You can ask it to fetch files from the internet into that repository.", font: "Arial", size: 20 })] }),
              ],
            }),
          ],
        })],
      }),

      // ==================== CHOOSE YOUR SETUP ====================
      spacer(120),
      sectionTitle("Choose Your Setup"),
      spacer(40),
      body([
        "Below are three options for accessing Claude Code. We recommend starting with ",
        { text: "Option A (Desktop App)", bold: true },
        " \u2014 it\u2019s the most straightforward. If you can\u2019t install software on your machine, use ",
        { text: "Option B (Web App)", bold: true },
        ".",
      ]),

      // ==================== OPTION A: DESKTOP APP ====================
      divider(),
      optionHeader("A", "Desktop App", "RECOMMENDED", GREEN_ACCENT),
      spacer(60),
      body(["The Desktop App is the easiest way to get started. You download and install it like any other application, then open the \u201CCode\u201D tab to start working."]),
      spacer(60),
      prosConsBox(
        ["No GitHub account needed", "Simple, visual interface", "Works offline after setup"],
        ["Requires installing software (some corporate laptops may block this)"],
      ),

      spacer(80),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Setup Steps", bold: true, font: "Arial", size: 26, color: DARK_BLUE })] }),
      spacer(40),
      step(1, ["Go to ", { text: "claude.ai/download", bold: true, color: DARK_BLUE }, " and download the version for your computer (Mac or Windows)"]),
      spacer(30),
      step(2, [{ text: "Install the app. ", bold: true }, "Mac: open the .dmg and drag to Applications. Windows: run the installer and follow prompts."]),
      spacer(30),
      step(3, ["Open the app and ", { text: "log in", bold: true }, " with your Haas Claude account email"]),
      spacer(10),
      subBody(["On Mac, if you see a \u201Cdeveloper cannot be verified\u201D warning, go to System Settings \u2192 Privacy & Security \u2192 \u201COpen Anyway\u201D"]),
      spacer(30),
      step(4, [{ text: "Create a working folder. ", bold: true }, "Create a new folder on your computer where Claude Code will save its work. For example, create a folder called ", { text: "Claude Session", bold: true }, " on your Desktop."]),
      spacer(30),
      step(5, ["Click the ", { text: "Code", bold: true }, " tab at the top of the app. This is where you\u2019ll do your work during our session."]),
      spacer(30),
      step(6, [{ text: "Navigate to your working folder. ", bold: true }, "At the bottom of the desktop app, you\u2019ll see a file path. Click it and navigate to the ", { text: "Claude Session", bold: true }, " folder you just created."]),

      // Test prompts for Option A
      spacer(80),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Test It!", bold: true, font: "Arial", size: 26, color: DARK_BLUE })] }),
      spacer(40),
      body(["Type each prompt below into Claude Code and press Enter."]),
      spacer(60),
      promptBox("Prompt 1 \u2014 Fetch the data", PROMPT1_TEXT),
      spacer(40),
      body(["Claude will download the file and confirm it has been saved."]),
      spacer(60),
      promptBox("Prompt 2 \u2014 Visualize the data", PROMPT2_TEXT),
      spacer(40),
      body(["Claude should create a histogram of the salary data with two clearly marked vertical lines. If you see a chart, ", { text: "you\u2019re all set!", bold: true }]),

      // ==================== OPTION B: WEB APP ====================
      new Paragraph({ children: [new PageBreak()] }),
      optionHeader("B", "Web App", "IF YOU CAN\u2019T INSTALL SOFTWARE", ORANGE),
      spacer(60),
      body(["The Web App runs entirely in your browser \u2014 no downloads or installation needed. However, it requires a free GitHub account because Claude Code on the web reads files from GitHub rather than from your computer."]),
      spacer(60),
      prosConsBox(
        ["No software installation required", "Works in any browser", "Ideal if your corporate laptop restricts app installations"],
        ["Requires creating a free GitHub account", "A few more setup steps"],
      ),

      spacer(80),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Setup Steps", bold: true, font: "Arial", size: 26, color: DARK_BLUE })] }),
      spacer(40),
      step(1, [{ text: "Create a GitHub account. ", bold: true }, "Go to github.com, click Sign up, and follow the prompts. Use a personal email if your corporate email blocks external signups."]),
      spacer(30),
      step(2, [{ text: "Create a repository on GitHub. ", bold: true }, "Log into GitHub, click the + button in the top right, then New repository. Name it ", { text: "claude-session", bold: true }, ", make sure Public is selected, and click Create repository."]),
      spacer(30),
      step(3, [{ text: "Go to claude.ai/code ", bold: true }, "and log in with your Haas Claude account email."]),
      spacer(30),
      step(4, [{ text: "Connect your GitHub account. ", bold: true }, "You\u2019ll be prompted to connect GitHub. Click Connect GitHub and follow the prompts to authorize the connection. If the Claude GitHub App is not yet installed, you will be asked to install it \u2014 click Install, select your ", { text: "claude-session", bold: true }, " repository, and click Install & Authorize. If you are not prompted, go to ", { text: "github.com/apps/claude", bold: true, color: DARK_BLUE }, ", click Install (or Configure), grant access to your ", { text: "claude-session", bold: true }, " repository, and click Save."]),
      spacer(30),
      step(5, [{ text: "Create your environment. ", bold: true }, "Type a name (e.g., \u201CSession Workspace\u201D), leave all other settings at defaults, and click Create environment."]),
      spacer(30),
      step(6, [{ text: "Select your repository. ", bold: true }, "In the repository selector near the bottom of the screen, choose ", { text: "claude-session", bold: true }, ". Branch should be \u201Cmain.\u201D"]),

      // Test prompts for Option B
      spacer(80),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Test It!", bold: true, font: "Arial", size: 26, color: DARK_BLUE })] }),
      spacer(40),
      body(["Type each prompt below into Claude Code and press Enter."]),
      spacer(60),
      promptBox("Prompt 1 \u2014 Fetch the data", PROMPT1_TEXT),
      spacer(40),
      body(["Claude will download the file and confirm it has been saved."]),
      spacer(60),
      promptBox("Prompt 2 \u2014 Visualize the data", PROMPT2_TEXT),
      spacer(40),
      body(["Claude should create a histogram of the salary data with two clearly marked vertical lines. If you see a chart, ", { text: "you\u2019re all set!", bold: true }]),

      // ==================== OPTION C: TERMINAL ====================
      divider(),
      optionHeader("C", "Terminal", "FOR THE TECHNICALLY ADVENTUROUS", PURPLE),
      spacer(60),
      body(["The Terminal option gives you the most powerful Claude Code experience. It uses the command line \u2014 the text-based interface programmers use to interact with their computers. Choose this only if you\u2019re comfortable with (or curious about) the command line."]),
      spacer(60),
      prosConsBox(
        ["Most powerful version", "No GitHub account needed", "Full access to all features"],
        ["Requires comfort with the command line", "Requires installing Node.js", "Less visual interface"],
      ),

      spacer(80),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Setup Steps", bold: true, font: "Arial", size: 26, color: DARK_BLUE })] }),
      spacer(40),
      step(1, [{ text: "Open your terminal. ", bold: true }, "Mac: search for \u201CTerminal\u201D in Spotlight (Cmd + Space). Windows: open \u201CCommand Prompt\u201D or \u201CPowerShell.\u201D"]),
      spacer(30),
      step(2, [{ text: "Check if Node.js is installed. ", bold: true }, "Type ", { text: "node --version", font: "Courier New" }, " and press Enter. If you see a version number, skip to step 4."]),
      spacer(30),
      step(3, [{ text: "Install Node.js. ", bold: true }, "Go to nodejs.org, download the LTS version, run the installer, then reopen your terminal."]),
      spacer(30),
      step(4, [{ text: "Install Claude Code. ", bold: true }, "Type the following and press Enter:"]),
      spacer(20),
      codeBox("npm install -g @anthropic-ai/claude-code"),
      spacer(30),
      step(5, [{ text: "Create a working folder and launch Claude Code:", bold: true }]),
      spacer(20),
      codeBox("mkdir ~/Desktop/claude-session && cd ~/Desktop/claude-session && claude"),
      spacer(10),
      subBody(["Follow the prompts to log in with your Haas Claude account."]),

      // Test prompts for Option C
      spacer(80),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun({ text: "Test It!", bold: true, font: "Arial", size: 26, color: DARK_BLUE })] }),
      spacer(40),
      body(["Type each prompt below into Claude Code and press Enter."]),
      spacer(60),
      promptBox("Prompt 1 \u2014 Fetch the data", PROMPT1_TEXT),
      spacer(40),
      body(["Claude will download the file and confirm it has been saved."]),
      spacer(60),
      promptBox("Prompt 2 \u2014 Visualize the data", PROMPT2_TEXT),
      spacer(40),
      body(["Claude should create a chart. If you see it, ", { text: "you\u2019re all set!", bold: true }]),

      // ==================== CHECKLIST ====================
      new Paragraph({ children: [new PageBreak()] }),
      sectionTitle("Before Our Session \u2014 Checklist"),
      spacer(60),
      ...[
        "I chose one of the three options above",
        "I completed the setup steps for my chosen option",
        "I ran Prompt 1 and Claude successfully downloaded the data file",
        "I ran Prompt 2 and Claude created a salary distribution chart with mean and median lines",
      ].map(item => new Paragraph({
        numbering: { reference: "checklist", level: 0 },
        spacing: { before: 60, after: 60, line: 300 },
        children: [new TextRun({ text: "  " + item, font: "Arial", size: 22 })],
      })),

      spacer(80),
      callout(
        "If you get stuck",
        [
          ["Don\u2019t worry \u2014 just get as far as you can. We\u2019ll have time at the start of the session to troubleshoot."],
          ["If all else fails, Option B (Web App) will work as long as you can access a browser."],
        ],
        LIGHT_BLUE_BG, DARK_BLUE
      ),

      // ==================== TROUBLESHOOTING ====================
      divider(),
      sectionTitle("Troubleshooting"),
      spacer(40),
      ...[
        { q: "\u201CMy corporate laptop won\u2019t let me install the Desktop App\u201D", a: "Use Option B (Web App) instead \u2014 it runs entirely in your browser." },
        { q: "\u201CI can\u2019t create a GitHub account with my work email\u201D", a: "Use a personal email address instead." },
        { q: "\u201CClaude Code asks me to connect GitHub but nothing happens\u201D", a: "Try using Google Chrome. Some corporate browsers block the pop-ups needed for GitHub authorization." },
        { q: "\u201CI don\u2019t see the repository in the selector\u201D", a: "On GitHub, go to Settings \u2192 Applications \u2192 Claude \u2192 Configure, and make sure your claude-session repository has access." },
        { q: "\u201CClaude couldn\u2019t download the file\u201D", a: "Make sure you copied the full URL from Prompt 1. Try asking Claude: \u201CCan you access the internet? Try fetching https://github.com\u201D" },
        { q: "\u201CI\u2019m on a corporate network and can\u2019t access the site\u201D", a: "Try a personal Wi-Fi network or your phone\u2019s hotspot." },
      ].flatMap(({ q, a }) => [
        new Paragraph({ spacing: { before: 120, after: 40 }, children: [new TextRun({ text: q, bold: true, font: "Arial", size: 22, color: DARK_BLUE })] }),
        body([a]),
      ]),

      spacer(100),
      callout(
        "Still stuck?",
        [["Come to the session with whatever you\u2019ve completed. We\u2019ll help you get the rest set up."]],
        LIGHT_BLUE_BG, DARK_BLUE
      ),

      // ==================== QUICK REFERENCE ====================
      divider(),
      sectionTitle("Quick Reference"),
      spacer(40),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [3800, 5560],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, margins: cellMargins, width: { size: 3800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "What", bold: true, font: "Arial", size: 22, color: WHITE })] })] }),
              new TableCell({ borders, shading: { fill: NAVY, type: ShadingType.CLEAR }, margins: cellMargins, width: { size: 5560, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Where", bold: true, font: "Arial", size: 22, color: WHITE })] })] }),
            ],
          }),
          ...[
            ["Claude Desktop App", "claude.ai/download"],
            ["Claude Code (web)", "claude.ai/code"],
            ["GitHub", "github.com"],
          ].map(([what, where]) => new TableRow({
            children: [
              new TableCell({ borders, margins: cellMargins, width: { size: 3800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: what, bold: true, font: "Arial", size: 22 })] })] }),
              new TableCell({ borders, margins: cellMargins, width: { size: 5560, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: where, font: "Arial", size: 22, color: DARK_BLUE })] })] }),
            ],
          })),
        ],
      }),

      spacer(200),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "See you at the session!", font: "Arial", size: 26, color: NAVY, bold: true })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/mathijsdevaan/Claude Projects/CHRO Claude/setup_instructions.docx", buffer);
  console.log("Created setup_instructions.docx successfully");
});
