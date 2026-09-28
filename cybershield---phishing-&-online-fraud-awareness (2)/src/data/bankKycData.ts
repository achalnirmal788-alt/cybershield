/**
 * Bank KYC Scam Process & Real Scam Messages Comprehensive Threat Intelligence
 */

export interface KycScamPhase {
  phase: number;
  title: string;
  subtitle: string;
  iconName: string;
  scammerTactic: string;
  victimExperience: string;
  underTheHood: string;
  redFlags: string[];
  goldenRule: string;
}

export interface BankKycSimStep {
  id: number;
  title: string;
  screenType: 'sms' | 'browser' | 'caller' | 'app_install' | 'otp' | 'outcome';
  headerText: string;
  interactiveContent?: {
    sender?: string;
    message?: string;
    url?: string;
    callerName?: string;
    callerNumber?: string;
    audioScript?: string;
    formFields?: { label: string; placeholder: string; isSensitive: boolean }[];
    appPermissions?: string[];
    otpNotification?: string;
  };
  scamAnalysis: string;
  safetyCheckQuestion: string;
  correctChoice: 'reject' | 'report' | 'block';
  learningTakeaway: string;
}

export interface ScamMessageItem {
  id: string;
  title: string;
  channel: 'SMS' | 'WhatsApp' | 'Email' | 'UPI' | 'Phone';
  senderDisplay: string;
  category: 'Bank KYC' | 'Electricity & Utility' | 'Fake Job' | 'Courier Delivery' | 'UPI Payment' | 'Customer Care' | 'Tax Refund' | 'Social Media';
  riskLevel: 'Severe' | 'High' | 'Moderate';
  receivedTime: string;
  messageBody: string;
  maliciousLink?: string;
  psychologicalTrigger: string;
  hiddenDangers: string[];
  highlightKeywords: string[];
  safeActionGuideline: string;
}

// 5 Complete Stages of Bank KYC Scam Process
export const BANK_KYC_PROCESS_STAGES: KycScamPhase[] = [
  {
    phase: 1,
    title: "Stage 1: The Panic Lure (The Hook)",
    subtitle: "Threatening account suspension within 24 hours to induce panic",
    iconName: "AlertTriangle",
    scammerTactic: "Mass-delivers SMS messages or WhatsApp broadcasts spoofing popular banks (e.g. SBI, HDFC, ICICI, PNB). The text uses artificial urgency, stating PAN/Aadhaar is expired and accounts or cards will be permanently blocked today.",
    victimExperience: "Victim receives a notification: 'Dear Customer, your NetBanking is BLOCKED. Update KYC immediately at bit.ly/bank-kyc-doc'. In panic of losing access to funds, victim reacts without consulting their branch.",
    underTheHood: "Criminals use bulk SMS gateways or SIM boxes. They buy mobile number databases leaked from commerce sites and send automated blasts across thousands of numbers.",
    redFlags: [
      "Originates from standard 10-digit phone number (+91-98XXX...) instead of official 6-character bank sender ID (e.g., AD-HDFCBK, VK-SBIBNK).",
      "Artificial deadline: 'Within 24 hours' or 'Tonight by 10 PM'.",
      "Shortened links (bit.ly, tinyurl) or fake domains (.xyz, .online, .site)."
    ],
    goldenRule: "Real banks NEVER freeze an account without formal advance written notices, and they NEVER ask you to update KYC via SMS links."
  },
  {
    phase: 2,
    title: "Stage 2: Deceptive Vector (Fake Link or Rogue APK)",
    subtitle: "Leading victim to a clone website or an Android APK installation",
    iconName: "Globe",
    scammerTactic: "The link in the SMS directs victim to a pixel-perfect replica of their bank's portal, or triggers automatic download of an unknown Android application (e.g., 'SBI_KYC_Verif_v2.apk').",
    victimExperience: "The victim sees their bank's familiar blue or red branding, logos, and security badges. The page requests 'Enter Account Number, PAN, and Mobile to begin KYC'.",
    underTheHood: "Phishing kits hosted on bulletproof servers capture keystrokes in real time. If an APK is downloaded, it requests high-risk Android permissions like RECEIVE_SMS and BIND_ACCESSIBILITY_SERVICE.",
    redFlags: [
      "URL address does not match official bank domain (e.g., 'hdfcbank.com' vs 'hdfc-kyc-verify-portal.in').",
      "Browser warns of 'Unverified / Insecure Connection' or 'Install unknown apps'.",
      "Requests Debit Card PIN or NetBanking Password directly on an alleged 'KYC' page."
    ],
    goldenRule: "Never install APK files sent via WhatsApp or SMS. Always download bank apps exclusively from Google Play Store or Apple App Store."
  },
  {
    phase: 3,
    title: "Stage 3: Social Engineering & Remote Access Coercion",
    subtitle: "Scammer calls posing as Bank Senior Verification Executive",
    iconName: "Headset",
    scammerTactic: "If the victim hesitates or doesn't complete the web form, the fraudster rings immediately. Posing as a courteous bank manager, they speak fluent formal English/Hindi and offer to 'assist in digital KYC verification'.",
    victimExperience: "The caller warns: 'Sir, your account is queued for freezing. To assist you immediately without branch visit, please install AnyDesk, QuickSupport, or RustDesk from Play Store and read me the 9-digit code.'",
    underTheHood: "Remote desktop apps (AnyDesk, TeamViewer QuickSupport) mirror the victim's entire screen to the fraudster. The fraudster can now view everything that appears on the phone screen in real time.",
    redFlags: [
      "Caller urges you to install screen-sharing software (AnyDesk, RustDesk, TeamViewer).",
      "Caller asks for the 9-digit remote access code or OTP.",
      "Caller discourages you from visiting your physical bank branch ('Branch will take 15 days, I can do it in 2 minutes')."
    ],
    goldenRule: "NO bank employee will EVER ask you to install AnyDesk or share your screen. Screen sharing = Total phone handover."
  },
  {
    phase: 4,
    title: "Stage 4: OTP Sniffing & Credential Interception",
    subtitle: "Silently reading one-time passwords to authorize money transfers",
    iconName: "Key",
    scammerTactic: "The fraudster initiates an unauthorized IMPS / NEFT / UPI fund transfer or adds a new beneficiary on the bank's portal using the harvested netbanking credentials.",
    victimExperience: "The fraudster tells the victim: 'A verification SMS has arrived for KYC registration, please forward it or read the verification number.' In other cases with rogue APKs, the malicious app hides the SMS notification automatically!",
    underTheHood: "The malicious APK uses Android's SmsReceiver to automatically read incoming OTP messages from the bank and transmit them via HTTP POST or Telegram Bot API to the criminal's command center.",
    redFlags: [
      "Bank SMS explicitly states: 'OTP for transfer of INR 50,000 to XXXX. Do NOT share with anyone.'",
      "Scammer claims: 'This OTP is to verify your Aadhaar, it will not deduct any money.'",
      "Multiple OTP messages arriving in rapid succession."
    ],
    goldenRule: "An OTP is ALWAYS an authorization to SPEND money or change security credentials. You NEVER enter or share an OTP to receive funds or update KYC."
  },
  {
    phase: 5,
    title: "Stage 5: Instant Fund Siphoning & Mule Networks",
    subtitle: "Draining savings within 180 seconds into multiple untraceable accounts",
    iconName: "CreditCard",
    scammerTactic: "The criminal inputs the OTP. Within seconds, money is debited. To prevent recall or freezing, funds are immediately split across 4–10 layered 'Money Mule' accounts, then withdrawn from ATMs or converted to crypto.",
    victimExperience: "Victim receives unexpected debit alerts: 'INR 95,000 debited from Acct ending XX12'. The scammer abruptly hangs up and blocks the number.",
    underTheHood: "Organized cyber syndicates operate 'Mule Networks' using compromised bank accounts of vulnerable citizens. Funds are layered across multiple UPI and crypto exchanges before cyber police can intervene.",
    redFlags: [
      "Sudden phone call disconnection by the caller right after an OTP is generated.",
      "Instant multi-transaction debit notifications.",
      "Victim is locked out of net banking due to password resets made by the attacker."
    ],
    goldenRule: "If funds are debited, the first 2 hours are the 'GOLDEN HOUR'. Dial 1930 immediately or visit cybercrime.gov.in to freeze the mule accounts in real time!"
  }
];

// Interactive Step-by-Step Bank KYC Simulation
export const BANK_KYC_SIMULATOR_STEPS: BankKycSimStep[] = [
  {
    id: 1,
    title: "Step 1: The Urgent SMS Alert",
    screenType: "sms",
    headerText: "Incoming SMS Notification",
    interactiveContent: {
      sender: "+91-98745-12093 (Unknown Mobile)",
      message: "ALERT: Dear Customer, your SBI account will be INACTIVATED today by 10:00 PM due to pending PAN Card KYC. Update your KYC immediately to keep account active: http://sbi-kyc-portal.xyz/pan",
      url: "http://sbi-kyc-portal.xyz/pan"
    },
    scamAnalysis: "Notice the sender is an ordinary 10-digit mobile number, NOT the bank's official registered sender ID (like 'AD-SBIBNK'). The domain '.xyz' is an untrusted extension, and there is a panic-inducing 10:00 PM deadline.",
    safetyCheckQuestion: "What is your immediate safe reaction to this SMS?",
    correctChoice: "report",
    learningTakeaway: "Banks never deliver KYC warning SMS messages from personal 10-digit mobile phone numbers."
  },
  {
    id: 2,
    title: "Step 2: The Cloned Phishing Portal",
    screenType: "browser",
    headerText: "Fake Browser Window Opened",
    interactiveContent: {
      url: "http://sbi-kyc-portal.xyz/login-pan-verify",
      formFields: [
        { label: "Account / CIF Number", placeholder: "e.g. 3089472190", isSensitive: false },
        { label: "Registered Mobile Number", placeholder: "e.g. 98XXXXXXXX", isSensitive: false },
        { label: "Debit Card ATM PIN & CVV", placeholder: "Enter 4-digit ATM PIN", isSensitive: true },
        { label: "NetBanking Login Password", placeholder: "Enter your password", isSensitive: true }
      ]
    },
    scamAnalysis: "The webpage displays genuine bank logos, but check the form fields! It asks for Debit Card ATM PIN and NetBanking Password. Genuine KYC requires proof of identity (Aadhaar/Passport/PAN), NEVER confidential passwords or ATM PINs!",
    safetyCheckQuestion: "Why should you never fill in this form?",
    correctChoice: "block",
    learningTakeaway: "A legitimate KYC update form will NEVER demand ATM PINs, CVV codes, or Internet Banking passwords."
  },
  {
    id: 3,
    title: "Step 3: The Fraudster's 'Assistance' Phone Call",
    screenType: "caller",
    headerText: "Incoming Phone Call",
    interactiveContent: {
      callerName: "Bank Officer Rajesh (Fraudster)",
      callerNumber: "+91-88220-43210",
      audioScript: "'Hello Sir, I am calling from Bank Central Head Office. Your KYC is failing on our server. To prevent immediate account freeze, please open Google Play Store, install AnyDesk app, and read me the 9-digit address so our technical team can complete biometric validation.'"
    },
    scamAnalysis: "The caller is attempting to trick you into downloading AnyDesk, a remote desktop tool that gives the caller full control over your smartphone screen, keypad, and incoming SMS messages.",
    safetyCheckQuestion: "How should you respond to this call?",
    correctChoice: "reject",
    learningTakeaway: "No bank officer is ever authorized to ask customers to install screen-sharing software like AnyDesk or RustDesk."
  },
  {
    id: 4,
    title: "Step 4: The Deceptive OTP Lure",
    screenType: "otp",
    headerText: "SMS Notification During Call",
    interactiveContent: {
      otpNotification: "Bank Alert: OTP 849201 is your authorization code for IMPS transfer of INR 48,500 to beneficiary MULE_COMMERCE. Valid for 5 mins. DO NOT SHARE."
    },
    scamAnalysis: "The caller insists: 'Sir, read the 6-digit verification code you just received, it is to cancel the account freeze.' But the message explicitly states it is for an IMPS transfer of INR 48,500!",
    safetyCheckQuestion: "What must you do right now?",
    correctChoice: "reject",
    learningTakeaway: "Always read the full SMS text of an OTP. An OTP specifies the transaction type and amount — it is NEVER a 'verification code' to stop account freezes."
  },
  {
    id: 5,
    title: "Step 5: Safe Outcome & Incident Defense Protocol",
    screenType: "outcome",
    headerText: "Defense Summary: Attack Thwarted!",
    scamAnalysis: "By refusing to click the link, refusing to enter your ATM PIN, rejecting remote screen sharing, and never sharing the OTP, you protected your hard-earned savings. If you had entered details, immediate reporting to helpline 1930 within the Golden Hour is crucial.",
    safetyCheckQuestion: "You successfully identified all red flags in the Bank KYC fraud sequence!",
    correctChoice: "report",
    learningTakeaway: "Remember: KYC is NEVER updated via SMS links. Visit your branch or use the official verified bank app."
  }
];

// Curated Showcase of Real Scam Messages
export const REAL_SCAM_MESSAGES: ScamMessageItem[] = [
  {
    id: "msg-kyc-1",
    title: "Bank Account Suspension & PAN Card KYC SMS",
    channel: "SMS",
    senderDisplay: "+91-91280-48219 (Fake Bank)",
    category: "Bank KYC",
    riskLevel: "Severe",
    receivedTime: "Today, 11:42 AM",
    messageBody: "Dear Customer, your SBI / HDFC Bank Account will be BLOCKED today within 24 hrs due to pending PAN KYC. Update your PAN card immediately to avoid penalty: http://sbi-pan-kyc-update.xyz/login",
    maliciousLink: "http://sbi-pan-kyc-update.xyz/login",
    psychologicalTrigger: "Fear of losing access to money, high panic from 'blocked today' ultimatum.",
    hiddenDangers: [
      "Harvests net banking username, password, and card PIN.",
      "Installs rogue background SMS-forwarder APK if opened on Android.",
      "Triggers rapid IMPS fund withdrawal."
    ],
    highlightKeywords: ["BLOCKED today", "within 24 hrs", "penalty", ".xyz/login"],
    safeActionGuideline: "Delete and report SMS to 1909 (TRAI DND spam) or forward to your bank's fraud reporting email. Never click the link."
  },
  {
    id: "msg-electricity-2",
    title: "Electricity Power Disconnection Alert Tonight",
    channel: "SMS",
    senderDisplay: "+91-98120-77341 (Personal SIM)",
    category: "Electricity & Utility",
    riskLevel: "Severe",
    receivedTime: "Today, 4:15 PM",
    messageBody: "Dear Consumer, your electricity power will be DISCONNECTED tonight at 9:30 PM from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer Mr. Sharma at 98120-XXXXX.",
    maliciousLink: "Contact: +91-98120-XXXXX",
    psychologicalTrigger: "Panic of power blackout at home tonight, pushing victim to act impulsively.",
    hiddenDangers: [
      "Victim calls the fake officer who claims only a ₹10 bill update is needed via a sent link.",
      "The link installs AnyDesk or steals debit card credentials, emptying bank balance."
    ],
    highlightKeywords: ["DISCONNECTED tonight at 9:30 PM", "contact our electricity officer", "personal phone number"],
    safeActionGuideline: "Electricity distribution companies NEVER use personal 10-digit mobile numbers for disconnection notices. Check your bill on the official state DISCOM portal or app."
  },
  {
    id: "msg-job-3",
    title: "Part-Time Remote Work / YouTube Task Job Scam",
    channel: "WhatsApp",
    senderDisplay: "Elena (Global Talent HR) [+44 7911 123456]",
    category: "Fake Job",
    riskLevel: "High",
    receivedTime: "Yesterday, 2:30 PM",
    messageBody: "Hello! Our HR agency selected your profile for part-time remote work. Just like YouTube videos or review hotels on Google Maps. Earn ₹3,000–₹8,000 daily! Only 30 minutes needed. Tap to join Telegram VIP group.",
    maliciousLink: "t.me/Global_VIP_Tasks_Job",
    psychologicalTrigger: "Easy money lure, zero skill requirement, work from home fantasy.",
    hiddenDangers: [
      "Initial small real payouts (₹200) to gain trust, followed by mandatory 'investment/prepaid tasks' of ₹50,000+ which are never refunded.",
      "Extortion through fake 'frozen funds' and 'tax payment' demands."
    ],
    highlightKeywords: ["Earn ₹3,000–₹8,000 daily", "Only 30 minutes needed", "Telegram VIP group"],
    safeActionGuideline: "Legitimate corporations never recruit via unsolicited WhatsApp messages from overseas numbers. Any job asking you to deposit money is 100% fraud."
  },
  {
    id: "msg-delivery-4",
    title: "Incomplete Address & Parcel Delivery Hold SMS",
    channel: "SMS",
    senderDisplay: "+1 (415) 890-2194 (Spoofed Courier)",
    category: "Courier Delivery",
    riskLevel: "High",
    receivedTime: "Today, 8:10 AM",
    messageBody: "USPS / IndiaPost Notice: Your package with tracking #IN892014 could not be delivered due to an incomplete street address. Please update your details and pay $0.35 / ₹25 re-delivery fee within 12 hours: http://indiapost-parcel-reschedule.top",
    maliciousLink: "http://indiapost-parcel-reschedule.top",
    psychologicalTrigger: "Curiosity and fear of missing a package, seemingly tiny $0.35 / ₹25 fee to disarm suspicion.",
    hiddenDangers: [
      "The checkout page captures full card credentials (number, expiry, CVV) for international recurring subscriptions or unauthorized debits.",
      "Victim thinks they are paying ₹25, but the hidden authorization is for hundreds of dollars."
    ],
    highlightKeywords: ["incomplete street address", "pay re-delivery fee", ".top domain"],
    safeActionGuideline: "Verify parcel tracking directly on the official courier website (indiapost.gov.in, usps.com, dhl.com). Postal agencies do not ask for card details via SMS."
  },
  {
    id: "msg-upi-5",
    title: "Marketplace 'Scan QR Code to Receive Money' Scam",
    channel: "UPI",
    senderDisplay: "Buyer 'Col. Sharma' (Marketplace Scam)",
    category: "UPI Payment",
    riskLevel: "Severe",
    receivedTime: "Yesterday, 6:05 PM",
    messageBody: "I have transferred ₹28,000 for your used furniture on OLX. Due to military merchant account limitations, please open GooglePay/PhonePe, SCAN this QR code, and type your 6-digit UPI PIN to credit funds into your account.",
    maliciousLink: "Deceptive 'Receive Money' QR Code",
    psychologicalTrigger: "Greed and relief of making a quick sale, authority bias (impersonating army officer).",
    hiddenDangers: [
      "Typing a UPI PIN ALWAYS transfers money OUT of your bank account. Entering the PIN debits ₹28,000 immediately instead of receiving it."
    ],
    highlightKeywords: ["SCAN this QR code", "type your 6-digit UPI PIN to credit", "military merchant"],
    safeActionGuideline: "GOLDEN UPI RULE: You NEVER need to enter a UPI PIN, scan a QR code, or approve a collect request to RECEIVE money. UPI PIN is only for debiting funds."
  },
  {
    id: "msg-care-6",
    title: "Fake Customer Care Number from Google Search Ad",
    channel: "Phone",
    senderDisplay: "Google Ad: 'Swiggy / Amazon 24x7 Helpline'",
    category: "Customer Care",
    riskLevel: "Severe",
    receivedTime: "2 days ago",
    messageBody: "Toll Free Helpline: +91-70020-XXXXX. 24x7 Instant Refund Support & Stuck Order Resolution. Call now for instant refund of failed transaction.",
    maliciousLink: "Dial: +91-70020-XXXXX",
    psychologicalTrigger: "Frustration from an existing failed transaction, seeking immediate human support.",
    hiddenDangers: [
      "Scammers buy Google Ads to show their phone number at the top of search queries.",
      "When victim calls, the fake agent asks them to download AnyDesk or pay a ₹1 'verification charge' which drains the account."
    ],
    highlightKeywords: ["Toll Free Helpline (personal 10-digit number)", "Instant Refund Support"],
    safeActionGuideline: "Never search Google for customer support phone numbers. Always use the built-in Help or Contact Us section inside the verified official app."
  },
  {
    id: "msg-tax-7",
    title: "Income Tax Refund Approval Notification",
    channel: "Email",
    senderDisplay: "tax-refund-support@income-tax-gov-portal.xyz",
    category: "Tax Refund",
    riskLevel: "High",
    receivedTime: "3 days ago",
    messageBody: "Subject: Tax Refund Approved - INR 28,490. Dear Taxpayer, An overpayment of tax has been approved. Please verify your bank account details and submit your debit card credentials to credit the refund amount directly within 48 hours: https://incometax-efiling-refund.in/claim",
    maliciousLink: "https://incometax-efiling-refund.in/claim",
    psychologicalTrigger: "Free unexpected money, official authority deception.",
    hiddenDangers: [
      "Asks for debit card number and PIN to 'credit' funds (impossible; cards are debited, not credited via PIN).",
      "Steals tax filing identity and banking access."
    ],
    highlightKeywords: ["Tax Refund Approved", "submit your debit card credentials", ".xyz email domain"],
    safeActionGuideline: "Income tax departments never ask for debit card numbers or PINs to deposit refunds. Refunds are credited directly via pre-validated bank accounts on the official government portal (incometax.gov.in)."
  },
  {
    id: "msg-social-8",
    title: "Instagram / Meta Copyright Violation Warning DM",
    channel: "WhatsApp",
    senderDisplay: "@meta_security_support_desk",
    category: "Social Media",
    riskLevel: "High",
    receivedTime: "Yesterday",
    messageBody: "Official Notice: Copyright infringement detected on your account posts. Your account will be permanently deleted within 24 hours. If this is an error, submit your objection appeal here: https://meta-copyright-appeal-center.net/case-449",
    maliciousLink: "https://meta-copyright-appeal-center.net",
    psychologicalTrigger: "Fear of losing followers, account access, and digital identity.",
    hiddenDangers: [
      "Harvests login credentials and 2FA authentication codes.",
      "Hijacks social media account to scam the user's followers with cryptocurrency and fake investment pitches."
    ],
    highlightKeywords: ["permanently deleted within 24 hours", "submit your objection appeal", "DMs from 'support'"],
    safeActionGuideline: "Meta and Instagram never send copyright strikes or policy notifications via Direct Messages (DMs). Check official alerts only inside Settings -> Help -> Support Requests in the actual app."
  }
];

// Official KYC Guidelines & Safety Checklist
export const OFFICIAL_KYC_RULES = [
  {
    rule: "Banks NEVER send KYC update links via SMS or WhatsApp",
    explanation: "Regulatory bodies like RBI strictly prohibit banks from distributing clickable links in SMS/WhatsApp messages for customer information updates."
  },
  {
    rule: "Legitimate Re-KYC happens strictly through Verified Channels",
    explanation: "You can update KYC only via: (1) Visiting your physical branch with original documents, or (2) Logging into the bank's official mobile application downloaded from official app stores."
  },
  {
    rule: "KYC NEVER requires ATM PIN, NetBanking Password, or OTP",
    explanation: "KYC stands for 'Know Your Customer' (verifying identity and address). It NEVER involves debit card PINs, CVVs, or OTP authorizations."
  },
  {
    rule: "Never install Screen Sharing apps for 'verification'",
    explanation: "No legitimate financial institution requires AnyDesk, TeamViewer, QuickSupport, or RustDesk for verification."
  },
  {
    rule: "The 1930 'Golden Hour' Rule",
    explanation: "If you accidentally entered your credentials or money was deducted, dial 1930 (National Cybercrime Reporting Portal) within 2 hours. Police can trigger an immediate freeze on the recipient mule accounts."
  }
];
