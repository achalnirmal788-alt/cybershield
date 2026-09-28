# 🛡️ CyberShield - Phishing & Online Fraud Awareness

A cybersecurity awareness platform designed to teach users how to spot and neutralize phishing, smishing, fake KYC alerts, lottery scams, job traps, and payment frauds.

---

## 🚀 How to Run in Visual Studio / Visual Studio Code

You can run this project in Visual Studio or VS Code in **two super easy ways**:

### Option 1: Zero Setup (Pure HTML + JavaScript + CSS) ⚡
*No Node.js or npm needed!*

1. Open the project folder in **Visual Studio Code** or **Visual Studio**.
2. Right-click on **`cyber-shield.html`** (or open `public/standalone.html`).
3. Click **"Open with Live Server"** (in VS Code) or **"View in Browser"** (in Visual Studio), or simply double-click `cyber-shield.html` to open directly in Google Chrome, Microsoft Edge, or Firefox.
4. That's it! Everything works offline and in any modern browser.

---

### Option 2: Full React + Vite Development Mode ⚛️

If you have [Node.js](https://nodejs.org) installed on your system:

1. Open terminal inside the project folder in Visual Studio (`Ctrl + ~` in VS Code).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📂 Project Structure

- `cyber-shield.html` / `public/standalone.html` - Self-contained HTML5, CSS (Tailwind), and vanilla JavaScript version that runs instantly in Visual Studio.
- `src/` - Modular React + TypeScript application source code:
  - `src/components/` - Interactive UI components (Learn, Scam Types, Detect Lab, Safety Tips, Quiz, Challenge, Dashboard, Report, Feedback).
  - `src/data/` - Fraud databases, quizzes, detection scenarios, and national helplines.
  - `src/context/` - Local storage progress tracking.
- `package.json` - Node scripts and dependencies.
- `vite.config.ts` - Vite bundler configuration.

---

## 🌟 Included Features & Modules

1. **Introduction to Phishing & Online Fraud** - Core awareness message and common scam examples.
2. **📚 Learn About Phishing** - What is phishing, 5-stage lifecycle, and 6 types (Email, SMS/Smishing, Vishing, Social Media, Fake Websites, QR/Quishing).
3. **🚨 Common Online Frauds** - Bank KYC, Fake Jobs, Shopping scams, Lotteries, UPI QR tricks, Fake customer care, and Social media account takeovers.
4. **🔍 Scam Detection Lab** - Interactive &ldquo;Is This a Scam?&rdquo; analyzer with warning sign checklist.
5. **🛡️ How to Stay Safe** - The 7 Golden Rules of cyber hygiene.
6. **🧠 Awareness Quiz** - Interactive multiple choice assessment with scoring (`Score: 8/10 🎉`).
7. **🎯 Phishing Challenge** - Real vs fake forensic inspection with detailed explanations.
8. **📊 User Dashboard** - Visual progress tracking, badge counters, and certificate generation.
9. **📢 Report & Help** - Emergency 3-step protocol and official reporting helplines (India 1930, US IC3, UK Action Fraud, etc.).
10. **📝 Feedback Form** - 5-question user review and suggestion form.
