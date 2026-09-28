import { PhishingType } from '../types';

export const PHISHING_OVERVIEW = {
  definition: "Phishing is a deceptive cybercrime where attackers impersonate reputable organizations, banks, employers, or friends to manipulate victims into revealing confidential information such as passwords, OTPs, credit card numbers, or social security details.",
  dangerStats: [
    { label: "Of data breaches involve human phishing/social engineering", stat: "82%+" },
    { label: "New phishing websites launched daily globally", stat: "3.4M+" },
    { label: "Of corporate cyber threats start with a fraudulent email", stat: "91%" },
    { label: "Average time an attacker spends exploiting compromised credentials", stat: "< 12m" }
  ],
  lifecycleStages: [
    {
      step: 1,
      name: "Target Selection & Reconnaissance",
      icon: "Radar",
      desc: "Attackers gather emails, phone numbers, or social profiles from data breaches, LinkedIn, or social media to personalize fraudulent attacks."
    },
    {
      step: 2,
      name: "Crafting the Bait & Clone Asset",
      icon: "FileCode",
      desc: "Scammers clone legitimate banking portals, logos, or create forged urgency (e.g. 'account blocked', 'unclaimed refund', 'job offer')."
    },
    {
      step: 3,
      name: "Lure Delivery",
      icon: "Send",
      desc: "The deceptive message is sent across SMS, WhatsApp, Email, QR code stickers, or automated VoIP calls masquerading as official numbers."
    },
    {
      step: 4,
      name: "Victim Deception & Interaction",
      icon: "MousePointerClick",
      desc: "The panic-induced victim clicks the shortened or fake link, downloads a remote desktop APK, or feeds their OTP and banking PIN into a fake form."
    },
    {
      step: 5,
      name: "Exfiltration & Unauthorized Exploitation",
      icon: "Unlock",
      desc: "Attackers instantly hijack accounts, drain connected wallets or bank accounts via instant payment gateways, and sell data on dark web forums."
    }
  ]
};

export const PHISHING_TYPES: PhishingType[] = [
  {
    id: "email-phishing",
    name: "Email Phishing",
    alias: "Deceptive & Spear Phishing",
    icon: "Mail",
    severity: "Critical",
    shortDesc: "Fraudulent emails mimicking trusted companies to steal login credentials, reset tokens, or push malicious attachments.",
    fullDesc: "Email phishing remains the most prevalent cyber weapon. Criminals forge the sender address (spoofing) or register lookalike domain names (e.g., `support@paypa1-security.com`) to send panic-inducing notifications like 'Your Netflix subscription failed' or 'Suspicious login detected'.",
    howItWorks: [
      "Attacker sends mass emails featuring official logos and CSS stylesheets copied from real companies.",
      "The message demands immediate action within 24 hours under penalty of account termination.",
      "Hyperlinks point to fake credential-harvesting landing pages rather than the actual service domain.",
      "Any username, password, or security question entered is relayed directly to the fraudster."
    ],
    realWorldScenario: "An email appearing to come from your human resources department warns that you must review an 'updated holiday bonus policy' by downloading a macro-enabled Excel sheet.",
    keyIndicators: [
      "Sender email domain differs slightly from the official brand (e.g. @support-apple-billing.co instead of @apple.com)",
      "Generic greetings like 'Dear Customer' or 'Valued Member' rather than your real registered name",
      "Artificial countdown timer or severe consequences if you do not click immediately",
      "Hidden hyperlink destinations that don't match the written text when hovered over"
    ]
  },
  {
    id: "sms-smishing",
    name: "SMS Phishing",
    alias: "Smishing",
    icon: "MessageSquare",
    severity: "High",
    shortDesc: "Text messages masquerading as courier services, banks, or utilities asking you to tap a short link.",
    fullDesc: "Smishing leverages the inherent high trust people place in SMS. Scammers spoof alphanumeric sender headers (like 'VK-HDFCBK' or 'USPS-ALERT') to deliver alerts regarding undelivered parcels, expiring electricity connections, or uncompleted KYC checks.",
    howItWorks: [
      "Fraudsters blast bulk SMS through rogue gateways or SIM boxes with spoofed caller IDs.",
      "The text contains a bit.ly or shortened link claiming your package address is incomplete or account suspended.",
      "Tapping the link loads a mobile-optimized fake portal requesting credit card details or installing an APK."
    ],
    realWorldScenario: "'ALERT: Your postal package #US99281 cannot be delivered due to wrong house number. Update details within 12 hours: http://usps-track-now.info/update or package will be returned.'",
    keyIndicators: [
      "Urgent delivery notifications for parcels you never ordered",
      "Shortened or suspicious URLs (e.g., bit.ly, tinyurl, or random alphanumeric domains)",
      "Demands for small processing fees (like $1.20 or ₹15) requiring credit card entry",
      "SMS coming from personal 10-digit mobile numbers claiming to represent national banks"
    ]
  },
  {
    id: "voice-vishing",
    name: "Voice Phishing",
    alias: "Vishing & Digital Arrest Scams",
    icon: "PhoneCall",
    severity: "Critical",
    shortDesc: "Phone calls from impersonators pretending to be police, tax authorities, bank managers, or tech support.",
    fullDesc: "Vishing relies on psychological manipulation, high-pressure vocal intimidation, and background sound effects (call center noise, police radios). Attackers claim a package with narcotics was intercepted in your name, or your computer is infected with viruses.",
    howItWorks: [
      "Scammers use VoIP spoofing tools so your phone displays official police, FBI, or bank customer care numbers.",
      "The caller fabricates a high-stakes emergency, threatening immediate arrest, passport cancellation, or financial freeze.",
      "They order the victim to stay on the line, isolate themselves, and transfer money to 'safe government escrow accounts'."
    ],
    realWorldScenario: "A caller claiming to be from Microsoft Support warns that your computer is broadcasting dangerous hacking signals and instructs you to download AnyDesk or TeamViewer.",
    keyIndicators: [
      "Caller demands you maintain strict confidentiality and not tell family or bank staff",
      "Refusal to let you hang up and call back via the publicly verified official telephone line",
      "Request to install remote desktop software (TeamViewer, AnyDesk, QuickSupport)",
      "Demands payment via cryptocurrency, gift cards, wire transfers, or unknown UPI IDs"
    ]
  },
  {
    id: "social-media-scams",
    name: "Social Media Phishing",
    alias: "Account Takeover & Impersonation",
    icon: "Share2",
    severity: "High",
    shortDesc: "Hacked friend accounts, fake copyright strike warnings, and fraudulent giveaway contests.",
    fullDesc: "Criminals hijack social media profiles and message all contacts asking for emergency financial loans, or send DMs claiming your page is scheduled for deletion due to trademark violation unless you appeal via an external link.",
    howItWorks: [
      "Attacker compromises an acquaintance's account or creates an exact clone using public profile pictures.",
      "They send direct messages claiming: 'Help, I am stranded in an airport, can you wire me $200 until tomorrow?'",
      "Alternatively, they send automated messages about winning crypto or entering an influencer ambassador contest."
    ],
    realWorldScenario: "You receive an Instagram DM from 'Meta Support Center' with an official Meta logo: 'Your account will be permanently deactivated in 24 hours due to Copyright Infringement. Verify here: https://meta-appeal-case-991.com'",
    keyIndicators: [
      "DMs from verified-looking accounts sending external non-official domain links",
      "Sudden unusual requests for money, gift card codes, or verification codes from close friends",
      "Promises of guaranteed 500% returns in Telegram crypto trading groups",
      "Pressure to vote for someone in an online contest requiring you to forward an SMS code"
    ]
  },
  {
    id: "fake-websites",
    name: "Fake Websites & Clones",
    alias: "Typosquatting & Lookalike Domains",
    icon: "Globe",
    severity: "Critical",
    shortDesc: "Identical clones of banking, shopping, and airline portals designed to steal credentials and card details.",
    fullDesc: "Typosquatting and spoofed websites take advantage of common typing mistakes or visual domain trickery (punycode, replacing 'o' with '0', or adding extra words like `chase-security-login.com`). These sites replicate authentic CSS, logos, and security badges.",
    howItWorks: [
      "Attackers register domains resembling famous brands (e.g. `amaz0n-support.com` or `wellsfarg0.net`).",
      "They purchase sponsored ads on search engines so their fake link appears at the very top of search results.",
      "Victims searching for 'customer care login' click the top sponsored ad and type in credentials."
    ],
    realWorldScenario: "Searching 'Airline customer service' on Google shows a sponsored result with a toll-free number that actually routes to a fraudulent scam call center.",
    keyIndicators: [
      "Spelling alterations in the domain bar (e.g., `netfIix.com` with a capital 'i' instead of 'l')",
      "Subdomains used deceptively, such as `paypal.com.fraudulent-domain.ru`",
      "Absence of genuine site navigation; clicking footer links does nothing or leads back to login",
      "Browser warns 'Deceptive Site Ahead' or SSL certificate issued to an unknown individual"
    ]
  },
  {
    id: "qr-code-scams",
    name: "QR Code Scams",
    alias: "Quishing & Tampered QR Fraud",
    icon: "QrCode",
    severity: "High",
    shortDesc: "Malicious QR stickers pasted over legitimate merchant codes, parking meters, or 'Scan to Receive Money' tricks.",
    fullDesc: "Because human eyes cannot decipher the destination URL or payment command encoded inside a QR code matrix, attackers overlay malicious stickers onto real payment points or send payment request QRs claiming you will receive cash by scanning them.",
    howItWorks: [
      "Physical: Fraudsters paste paper QR stickers over public parking payment meters, leading to fake payment gateways.",
      "Digital: On peer-to-peer marketplaces (OLX, Facebook Marketplace), a buyer says: 'Scan this QR code on your UPI app to receive your selling price.'",
      "Scanning the code triggers a debit request that empties the victim's account when they enter their UPI PIN."
    ],
    realWorldScenario: "A buyer on an online classifieds site wants to buy your used sofa and sends a QR code: 'Please scan this code and input your 6-digit PIN to receive ₹15,000 into your bank account immediately.'",
    keyIndicators: [
      "The claim that you must enter your banking PIN or passcode to 'RECEIVE' money (PIN is ONLY needed to SEND money!)",
      "Physical QR codes with edges peeling or showing signs of being stuck over an existing sign",
      "QR scanners opening unexpected redirected URL shorteners rather than official municipal apps",
      "QR codes sent in emails to bypass corporate email security spam filters"
    ]
  }
];
