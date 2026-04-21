# Getting Started with Claude Code

## What is Claude Code?

Claude Code is an AI assistant that goes beyond conversation. While regular Claude (the chatbot) can answer questions and discuss ideas, Claude Code can actually *do things*: analyze your data, create charts and reports, write documents, build presentations, and automate tasks — all from plain English instructions.

Think of it as having a highly capable analyst on your team who works at the speed of thought.

## Why does Claude Code need access to my files?

To analyze your data, Claude Code needs to be able to read your files — just like a human analyst would need access to your spreadsheets. There are two ways this works:

- **Local access** (Desktop App or Terminal): Claude Code works within a folder on your computer. You can ask it to download files from the internet into that folder.
- **Cloud access** (Web App): Claude Code works within a GitHub repository (an online file storage platform). You can ask it to fetch files from the internet into that repository.

## Choose Your Setup

Below are three options for accessing Claude Code. We recommend starting with **Option A (Desktop App)** — it's the most straightforward. If you can't install software on your machine, use **Option B (Web App)**.

---

## Option A: Desktop App (Recommended)

The Desktop App is the easiest way to get started. You download and install it like any other application, then open the "Code" tab to start working.

**Pros:**
- No GitHub account needed
- Simple, visual interface
- Works offline after setup

**Cons:**
- Requires installing software (some corporate laptops may block this)

### Setup Steps

**1. Download the app**
Go to **claude.ai/download** and download the version for your computer (Mac or Windows).

**2. Install**
- **Mac:** Open the downloaded .dmg file and drag the app into your Applications folder.
- **Windows:** Run the downloaded installer and follow the prompts.

**3. Open and log in**
Open the Claude app and log in with the email address associated with your Haas Claude account.
- On Mac, if you see a "developer cannot be verified" warning, go to System Settings → Privacy & Security, scroll down, and click "Open Anyway."

**4. Create a working folder**
Create a new folder on your computer where Claude Code will save its work. For example, create a folder called **Claude Session** on your Desktop.

**5. Open the Code tab**
Once logged in, you'll see tabs at the top of the app. Click the **Code** tab. This is where you'll do your work during our session.

**6. Navigate to your working folder**
At the bottom of the desktop app, you'll see a file path. Click it and navigate to the **Claude Session** folder you just created.

**7. Test it — Prompt 1: Fetch the data**
Type the following prompt and press Enter:

> Please download the CSV file from this URL and save it in the current folder: https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/toy_hr_data.csv

Claude will download the file and confirm it has been saved. You should see a message indicating the file has been successfully downloaded.

**8. Test it — Prompt 2: Visualize the data**
Now type this prompt and press Enter:

> Plot the distribution of salary in the dataset you just downloaded. Add two vertical lines: one showing the mean (in red) and one showing the median (in blue). Label both lines with their values.

Claude should create a histogram or density plot of the salary data with two clearly marked vertical lines. If you see a chart, you're all set!

---

## Option B: Web App (Best if you can't install software)

The Web App runs entirely in your browser — no downloads or installation needed. However, it requires a free GitHub account because Claude Code on the web reads files from GitHub (an online file storage platform) rather than from your computer.

**Pros:**
- No software installation required — works in any browser
- Nothing to download to your computer
- Ideal if your corporate laptop restricts app installations

**Cons:**
- Requires creating a free GitHub account
- A few more setup steps

### Setup Steps

**1. Create a GitHub account**
If you already have one, skip to step 2.
- Go to **github.com** and click **Sign up**
- Enter your email, create a password, and choose a username
- Complete the verification and check your email for a confirmation code
- **Tip:** Use a personal email if your corporate email blocks signups for external services

**2. Create a repository on GitHub**
A "repository" is simply a project folder on GitHub. Claude Code on the web needs one to work in.
- Log into GitHub and click the **+** button in the top right, then **New repository**
- For **Repository name**, type **claude-session**
- Make sure **Public** is selected
- Click **Create repository**

**3. Go to Claude Code on the web**
- Open your browser and go to **claude.ai/code**
- Log in with your Haas Claude account email

**4. Connect your GitHub account**
- You'll be prompted to connect GitHub. Click **Connect GitHub**
- Follow the prompts to authorize the connection
- If the Claude GitHub App is not yet installed, you will be asked to install it — click **Install**, select your **claude-session** repository, and click **Install & Authorize**
- If you are not prompted to install the app, go to **github.com/apps/claude**, click **Install** (or **Configure**), grant access to your **claude-session** repository, and click **Save**

**5. Create your environment**
- You'll see a "Create your environment" form
- For **Name**, type anything (e.g., "Session Workspace")
- Leave all other settings at their defaults
- Click **Create environment**

**6. Select your repository**
- In the Claude Code interface, look for a **repository selector** near the bottom of the screen
- Click it and select **claude-session**
- Make sure the branch is set to **main**

**7. Test it — Prompt 1: Fetch the data**
Type the following prompt and press Enter:

> Please download the CSV file from this URL and save it in the current folder: https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/toy_hr_data.csv

Claude will download the file and confirm it has been saved. You should see a message indicating the file has been successfully downloaded.

**8. Test it — Prompt 2: Visualize the data**
Now type this prompt and press Enter:

> Plot the distribution of salary in the dataset you just downloaded. Add two vertical lines: one showing the mean (in red) and one showing the median (in blue). Label both lines with their values.

Claude should create a histogram or density plot of the salary data with two clearly marked vertical lines. If you see a chart, you're all set!

---

## Option C: Terminal (For the technically adventurous)

The Terminal option gives you the most powerful and flexible Claude Code experience. It requires using the command line, which is the text-based interface programmers use to interact with their computers. Choose this only if you're comfortable with (or curious about) the command line.

**Pros:**
- Most powerful version of Claude Code
- No GitHub account needed
- Full access to all features

**Cons:**
- Requires comfort with the command line
- Requires installing Node.js (a programming tool)
- Less visual interface

### Setup Steps

**1. Open your terminal**
- **Mac:** Open the app called "Terminal" (search for it in Spotlight with Cmd + Space)
- **Windows:** Open "Command Prompt" or "PowerShell" from the Start menu

**2. Check if Node.js is installed**
Type this and press Enter:

```
node --version
```

If you see a version number (e.g., v20.11.0), skip to step 4.
If you see "command not found," continue to step 3.

**3. Install Node.js**
- Go to **nodejs.org** and download the **LTS** version
- Run the installer (accept all defaults)
- Close and reopen your terminal
- Verify by typing `node --version` again

**4. Install Claude Code**
Type this and press Enter:

```
npm install -g @anthropic-ai/claude-code
```

Wait for the installation to complete. (On Mac, if you get a "permission denied" error, try: `sudo npm install -g @anthropic-ai/claude-code`)

**5. Create a working folder and launch Claude Code**
Create a folder for the session and start Claude Code there:

```
mkdir ~/Desktop/claude-session && cd ~/Desktop/claude-session && claude
```

Follow the prompts to log in with your Haas Claude account.

**6. Test it — Prompt 1: Fetch the data**
Type the following prompt and press Enter:

> Please download the CSV file from this URL and save it in the current folder: https://raw.githubusercontent.com/mathijsdevaan/haas-chro-claude-session/main/toy_hr_data.csv

Claude will download the file and confirm it has been saved.

**7. Test it — Prompt 2: Visualize the data**
Now type this prompt and press Enter:

> Plot the distribution of salary in the dataset you just downloaded. Add two vertical lines: one showing the mean (in red) and one showing the median (in blue). Label both lines with their values.

Claude should create a chart. If you see it, you're all set!

---

## Before Our Session — Checklist

- [ ] I chose one of the three options above
- [ ] I completed the setup steps for my chosen option
- [ ] I ran Prompt 1 and Claude successfully downloaded the data file
- [ ] I ran Prompt 2 and Claude created a salary distribution chart with mean and median lines

**If you get stuck:** Don't worry — just get as far as you can. We'll have time at the start of the session to troubleshoot. If all else fails, Option B (Web App) will work as long as you can access a browser.

---

## Troubleshooting

**"My corporate laptop won't let me install the Desktop App"**
Use Option B (Web App) instead — it runs entirely in your browser.

**"I can't create a GitHub account with my work email"**
Use a personal email address instead.

**"Claude Code asks me to connect GitHub but nothing happens"**
Try using Google Chrome. Some corporate browsers block the pop-ups needed for GitHub authorization.

**"I don't see the repository in the selector"**
On GitHub, go to Settings → Applications → Claude → Configure, and make sure your claude-session repository has access.

**"Claude couldn't download the file"**
Make sure you copied the full URL from Prompt 1. Try asking Claude: "Can you access the internet? Try fetching https://github.com"

**"I'm on a corporate network and can't access the site"**
Try a personal Wi-Fi network or your phone's hotspot.

**Still stuck?**
Come to the session with whatever you've completed. We'll help you get the rest set up.

---

## Quick Reference

| What | Where |
|------|-------|
| Claude Desktop App | claude.ai/download |
| Claude Code (web) | claude.ai/code |
| GitHub | github.com |

See you at the session!
