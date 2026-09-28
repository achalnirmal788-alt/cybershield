export interface SafetyRule {
  id: string;
  number: number;
  title: string;
  tagline: string;
  icon: string;
  doList: string[];
  dontList: string[];
  proTip: string;
}

export const SAFETY_RULES: SafetyRule[] = [
  {
    id: "dont-click-links",
    number: 1,
    title: "Don't Click Suspicious Links",
    tagline: "Always navigate independently rather than tapping unsolicited links.",
    icon: "ExternalLink",
    doList: [
      "Hover over any link on desktop to preview the real destination URL before clicking.",
      "Manually open a new browser tab and type the official URL yourself.",
      "Use official bookmarks or search directly for the official portal."
    ],
    dontList: [
      "Never click shortened links (bit.ly, tinyurl, t.co) sent in unexpected security texts.",
      "Never click buttons in emails warning that your account is about to be deleted or frozen.",
      "Never tap on popup advertisements claiming your phone is infected with 39 viruses."
    ],
    proTip: "If a text message from your bank says 'Click to authorize', ignore the link completely and open your bank's official app from your phone's home screen."
  },
  {
    id: "verify-sender",
    number: 2,
    title: "Verify the Sender Identity",
    tagline: "Names can be faked; inspect the exact sender email domain and phone number.",
    icon: "ShieldCheck",
    doList: [
      "Click or tap the sender name to expand the full email address behind the display name.",
      "Verify that the domain after the '@' matches the official company website exactly.",
      "For SMS, check if it comes from an authentic sender header or a random 10-digit mobile number."
    ],
    dontList: [
      "Never trust display names alone; scammers easily set their name to 'Netflix Billing' or 'FBI Director'.",
      "Don't rely on logos or letterheads; any fraudster can copy-paste high-resolution brand logos in seconds.",
      "Never call back numbers given inside a suspicious email or text."
    ],
    proTip: "A sender like 'Apple Support <billing-support@apple-security-center.ru>' has 'apple' in the text, but the real domain is the Russian server 'apple-security-center.ru'!"
  },
  {
    id: "never-share-otp",
    number: 3,
    title: "Never Share OTP / PIN / Passwords",
    tagline: "Your One-Time Password is your digital signature. No legitimate staff will ever ask for it.",
    icon: "KeyRound",
    doList: [
      "Read the full SMS text of every OTP carefully; it specifies the exact amount and merchant being authorized.",
      "Remember that OTPs are for authorising transactions you initiated, not for receiving funds.",
      "Treat your UPI PIN, banking passwords, and CVVs as strictly confidential."
    ],
    dontList: [
      "Never share OTP with anyone over the phone, even if they claim to be the Bank Branch Manager.",
      "Never enter your UPI PIN to 'receive' cashback, prize money, or buyer payment.",
      "Never share screen-sharing codes (AnyDesk/TeamViewer 9-digit session code)."
    ],
    proTip: "Bank customer service representatives have zero technical capability or legal authority to ask for your OTP or debit card PIN. The moment someone asks for OTP on a call, it is 100% fraud."
  },
  {
    id: "check-website-address",
    number: 4,
    title: "Check Website Addresses Carefully",
    tagline: "Watch for typosquatting, deceptive subdomains, and fake security padlocks.",
    icon: "Globe2",
    doList: [
      "Inspect the domain part directly before the first single slash `/`.",
      "Look for subtle character swaps: '0' for 'O', '1' for 'l', 'rn' for 'm', or extra hyphens.",
      "Check if the site uses valid HTTPS and a legitimate certificate."
    ],
    dontList: [
      "Don't assume a padlock icon alone means a site is safe; fraudsters can install free SSL certificates too!",
      "Don't fall for tricky subdomains like `bank.com.scam-domain.xyz` (the real domain is `scam-domain.xyz`).",
      "Don't proceed if your browser triggers an 'Untrusted SSL Certificate' or 'Deceptive Site' warning."
    ],
    proTip: "To identify the real domain: start from the first single forward slash `/` (or end of URL) and read backwards to the preceding dot. That is the actual host domain."
  },
  {
    id: "use-strong-passwords",
    number: 5,
    title: "Use Strong, Unique Passwords",
    tagline: "Never reuse the same master password across banking, email, and social accounts.",
    icon: "Lock",
    doList: [
      "Use passphrases of 14+ characters combining random words, uppercase, lowercase, numbers, and symbols.",
      "Use an encrypted password manager (Bitwarden, 1Password, Apple Keychain, Google Password Manager).",
      "Have a completely unique password for your primary email account, as it can reset all other accounts."
    ],
    dontList: [
      "Never use personal info (birthdays, pet names, family names, car models).",
      "Never use predictable patterns like 'Password@123' or 'Summer2026!'.",
      "Never write passwords down on sticky notes attached to your monitor."
    ],
    proTip: "Passphrases like `Crimson#Giraffe-Dancing88!` are vastly stronger and much easier to remember than short jumbles like `Kj#9$x`."
  },
  {
    id: "enable-2fa",
    number: 6,
    title: "Enable Two-Factor Authentication (2FA)",
    tagline: "A stolen password is useless to hackers if your second factor is required.",
    icon: "ShieldAlert",
    doList: [
      "Turn on 2FA on every service: email, banking, social media, shopping apps, and cloud accounts.",
      "Prefer Authenticator apps (Google Authenticator, Microsoft Authenticator) or hardware keys (YubiKey) over SMS.",
      "Save your 2FA backup/recovery codes in a secure, encrypted offline vault."
    ],
    dontList: [
      "Never approve push notification login prompts (MFA fatigue) that you did not trigger yourself.",
      "Don't rely solely on SMS 2FA for high-value cryptocurrency or banking when app-based 2FA is available.",
      "Never share backup recovery codes with tech support."
    ],
    proTip: "If you get a push notification saying 'Are you trying to sign in from Russia?' when you are sitting in your living room, tap 'NO, IT'S NOT ME' and immediately change your password."
  },
  {
    id: "keep-devices-updated",
    number: 7,
    title: "Keep Apps and Devices Updated",
    tagline: "Security patches seal the vulnerabilities cybercriminals exploit to spy on your device.",
    icon: "RefreshCw",
    doList: [
      "Turn on automatic operating system updates on iOS, Android, macOS, and Windows.",
      "Keep web browsers (Chrome, Edge, Safari, Firefox) updated to block zero-day phishing exploits.",
      "Download apps strictly from official app stores (Google Play, Apple App Store)."
    ],
    dontList: [
      "Never download and install `.apk` files or `.exe` programs sent over WhatsApp or Telegram.",
      "Don't ignore system update reminders for weeks; security vulnerabilities are actively exploited.",
      "Never disable built-in security features like Google Play Protect or Windows Defender."
    ],
    proTip: "Over 80% of automated device exploits target known security flaws that were already patched in recent software updates."
  }
];

export const URL_INSPECTION_EXAMPLES = [
  {
    display: "https://www.paypal.com/signin",
    isLegitimate: true,
    domain: "paypal.com",
    notes: "Official second-level domain `paypal` under generic TLD `.com`."
  },
  {
    display: "https://www.paypal.com.account-verify-secure.net/login",
    isLegitimate: false,
    domain: "account-verify-secure.net",
    notes: "Deceptive subdomain! The actual domain receiving your credentials is `account-verify-secure.net`, not PayPal."
  },
  {
    display: "https://www.hdfcbank.com/personal",
    isLegitimate: true,
    domain: "hdfcbank.com",
    notes: "Legitimate corporate banking website with trusted domain."
  },
  {
    display: "http://hdfc-netbanking-kyc.online/update",
    isLegitimate: false,
    domain: "hdfc-netbanking-kyc.online",
    notes: "Rogue domain created to impersonate HDFC Bank. Uses unsecured HTTP and cheap '.online' TLD."
  },
  {
    display: "https://accounts.google.com/ServiceLogin",
    isLegitimate: true,
    domain: "google.com",
    notes: "Legitimate subdomain `accounts` on the authentic `google.com` master domain."
  },
  {
    display: "https://google-security-recovery.top/pass-reset",
    isLegitimate: false,
    domain: "google-security-recovery.top",
    notes: "Fake brand-jacking domain using hyphenated keywords and a '.top' domain commonly used in malware."
  }
];
