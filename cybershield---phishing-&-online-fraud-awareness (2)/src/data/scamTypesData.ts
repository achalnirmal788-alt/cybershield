import { ScamType } from '../types';

export const COMMON_SCAM_TYPES: ScamType[] = [
  {
    id: "fake-bank-kyc",
    title: "Fake Bank & KYC Update Scams",
    subtitle: "Threats of immediate account freezing or PAN card delinking",
    category: "Banking & Financial",
    icon: "Landmark",
    riskLevel: "Severe",
    samplePreview: {
      sender: "VM-HDFCBNK / +91-98210-XXXXX",
      channel: "SMS",
      message: "Dear Customer, your HDFC Bank account will be SUSPENDED within 24 hours due to non-updated PAN card KYC. Click here immediately to update: http://hdfc-kyc-verify.online/pan",
      linkOrCallToAction: "http://hdfc-kyc-verify.online/pan"
    },
    modusOperandi: [
      "Fraudster triggers mass SMS with urgent ultimatums stating account suspension, electricity cutoff, or card block.",
      "The link leads to an identical replica of your bank's net-banking login screen.",
      "When you enter your customer ID and password, the fake page prompts for your incoming OTP.",
      "Fraudsters use your OTP in real time to transfer your entire savings to untraceable mule accounts."
    ],
    warningFlags: [
      "Banks NEVER send SMS links asking you to input full passwords or PAN/Aadhaar documents.",
      "Look at the URL domain: genuine banks use domains like 'hdfcbank.com' or 'chase.com', NEVER '.online', '.info', or '.xyz'.",
      "SMS arriving from normal 10-digit mobile phone numbers rather than registered corporate sender IDs.",
      "Artificial 24-hour urgency designed to induce panic before you have time to consult your branch."
    ],
    immediateAction: "Never click the link. Open your bank's official mobile app independently or walk into your local branch to check actual KYC status."
  },
  {
    id: "fake-job-offers",
    title: "Fake Part-Time & Work-From-Home Job Offers",
    subtitle: "Telegram task scams promising $200–$500/day for liking YouTube videos",
    category: "Employment & Career",
    icon: "Briefcase",
    riskLevel: "High",
    samplePreview: {
      sender: "Recruiter 'Elena' (+44 7911 123456)",
      channel: "WhatsApp",
      message: "Hello! Our HR agency selected your profile for part-time remote work. Just like YouTube videos or review hotels on Google Maps. Earn ₹3,000–₹8,000 daily! Only 30 minutes needed. Tap to join Telegram VIP group.",
      linkOrCallToAction: "t.me/Global_VIP_Tasks_Job"
    },
    modusOperandi: [
      "Victim is recruited via WhatsApp or SMS for effortless tasks (liking YouTube videos, reviewing hotels).",
      "Initial phase: They pay small real rewards ($5–$20) to build complete trust.",
      "They invite you to a VIP Telegram group where other bots pretend to earn huge amounts.",
      "Then comes the 'Prepaid Task' or 'Crypto Investment Mission': you must deposit $500 to unlock $1,500.",
      "Once you send funds, your balance shows locked with bogus 'tax/clearance' demands, extorting thousands more."
    ],
    warningFlags: [
      "Unsolicited job offers from unknown international numbers without any interview or resume review.",
      "Unrealistically high remuneration for basic tasks like liking videos or rating products.",
      "Moving the communication to Telegram or encrypted chat platforms.",
      "Any job that demands YOU pay money or deposit security money to get paid."
    ],
    immediateAction: "Block and report the contact immediately on WhatsApp/Telegram. Never send deposits for employment."
  },
  {
    id: "shopping-scams",
    title: "Deceptive Shopping & Fake E-Commerce Websites",
    subtitle: "90% off flash sales on Instagram and Facebook sponsored ads",
    category: "E-Commerce",
    icon: "ShoppingBag",
    riskLevel: "High",
    samplePreview: {
      sender: "LuxuryWear-Discount [Sponsored Ad]",
      channel: "Instagram",
      message: "🔥 MEGA CLEARANCE SALE! Brand new Nike Air Jordans and Sony PS5 consoles at 85% discount! Only for next 2 hours. Free shipping & COD available. Shop now before stock ends!",
      linkOrCallToAction: "www.nike-superclearance-sale.shop"
    },
    modusOperandi: [
      "Criminals run professional-looking sponsored ads on Instagram, Facebook, and TikTok.",
      "Ads showcase genuine luxury products, electronics, or trending fashion at impossible prices (e.g., $400 sneakers for $29).",
      "The checkout page harvests card numbers, CVVs, and expiry dates, or only allows non-refundable upfront UPI/cryptocurrency.",
      "Either nothing arrives, a cheap knockoff plastic item is delivered, or your card is drained repeatedly."
    ],
    warningFlags: [
      "Prices too good to be true (discounts exceeding 70–90% on flagship luxury items).",
      "Domain registered only days ago; check free WHOIS lookup or domain age.",
      "No physical office address, no registered phone number, only a generic Gmail contact.",
      "Customer reviews on the site are hardcoded static images with stock photos."
    ],
    immediateAction: "Only buy from verified official merchant platforms. If you submitted card details, immediately freeze your card in your banking app."
  },
  {
    id: "lottery-prize-scams",
    title: "Lottery, Lucky Draw & Gift Card Scams",
    subtitle: "Kaun Banega Crorepati (KBC), WhatsApp lottery, or Apple iPhone won",
    category: "Impersonation & Fraud",
    icon: "Trophy",
    riskLevel: "Severe",
    samplePreview: {
      sender: "KBC Head Office / WhatsApp Call",
      channel: "WhatsApp",
      message: "🎉 CONGRATULATIONS! Your mobile number won the 25 Lakh INR KBC WhatsApp Lucky Draw 2026! To claim your cash prize directly in your account, contact Manager Rana Pratap with your winner code: KBC-7729.",
      linkOrCallToAction: "Call WhatsApp: +92-301-XXXXXXX"
    },
    modusOperandi: [
      "A flyer with pictures of famous television hosts or corporate logos is sent with an audio recording of excitement.",
      "Victim is informed they won a huge sum in a draw they never entered.",
      "To release the prize money, they demand an initial 'Government GST fee' or 'Processing charge' of ₹15,000 ($200).",
      "After the first payment, scammers invent new fees ('Customs clearance', 'Anti-laundering certificate') until the victim is bankrupt."
    ],
    warningFlags: [
      "You cannot win a lottery or raffle that you NEVER purchased a ticket for!",
      "Legitimate lotteries NEVER demand advance processing fees or tax payments deposited to individual personal accounts.",
      "Sender numbers originating from foreign country codes (+92, +234, +44) claiming to be domestic agencies.",
      "Urgent pressure to keep the winning secret from family."
    ],
    immediateAction: "Delete the message and block the sender. Never send processing money to claim a prize."
  },
  {
    id: "upi-payment-scams",
    title: "UPI & Instant Payment Scams (Scan to Receive)",
    subtitle: "Deceiving marketplace sellers with reverse QR codes and collect requests",
    category: "Payment Apps",
    icon: "QrCode",
    riskLevel: "Severe",
    samplePreview: {
      sender: "Army Officer 'Col. Sharma' (Buyer on OLX)",
      channel: "UPI App",
      message: "I am ready to buy your laptop immediately without bargaining. Since I am in the army cantonment, I can only pay via military merchant QR. Please scan this QR code and type your 6-digit UPI PIN to receive ₹42,000 into your Google Pay.",
      linkOrCallToAction: "Scan QR Code & Enter PIN"
    },
    modusOperandi: [
      "Scammer poses as an eager buyer on classifieds or secondhand marketplaces.",
      "They claim they cannot send direct bank transfers and send a 'Receive Money' QR code or UPI Collect Request.",
      "The victim scans the QR or taps the notification and enters their UPI PIN expecting funds to credit.",
      "Because entering a PIN ALWAYS authorizes money leaving your account, the amount is instantly debited!"
    ],
    warningFlags: [
      "GOLDEN UPI RULE: You NEVER, EVER need to enter a UPI PIN, password, or OTP to RECEIVE money!",
      "Any request telling you to scan a QR code or tap 'Pay' to claim funds is 100% a scam.",
      "Scammers often masquerade as military personnel or government officials with stolen identity cards to deter suspicion.",
      "They rush you over a continuous voice call: 'Scan it right now, the army server timeout is 60 seconds!'"
    ],
    immediateAction: "Disconnect the call immediately. Report the UPI ID or transaction within your payment app (GPay/PhonePe/Paytm)."
  },
  {
    id: "fake-customer-care",
    title: "Fake Customer Care Numbers on Search Engines",
    subtitle: "Rogue Google SEO listings for couriers, airlines, and digital wallets",
    category: "Social Engineering",
    icon: "Headset",
    riskLevel: "Severe",
    samplePreview: {
      sender: "Google Search Result Ad: 'Swiggy / Amazon 24x7 Helpline'",
      channel: "Google Search",
      message: "Toll Free Helpline: +91-70020-XXXXX. 24x7 Refund Support & Fast Resolution. Call now for instant refund of stuck orders.",
      linkOrCallToAction: "Dial +91-70020-XXXXX"
    },
    modusOperandi: [
      "Victim experiences a minor issue: stuck refund on a food app, lost baggage with an airline, or failed courier delivery.",
      "Instead of using the app's internal Help Center, they Google 'XYZ Customer Care Toll Free'.",
      "Scammers purchase Google Sponsored Ads or manipulate Google Maps business listings with their own personal cell numbers.",
      "The victim calls. The 'agent' sounds courteous and instructs them to install AnyDesk/TeamViewer or pay a ₹2 'verification fee' via a sent link.",
      "Once remote access or card credentials are granted, the scammer empties the account."
    ],
    warningFlags: [
      "Modern tech companies (Amazon, Uber, Swiggy, Netflix) rarely publish public toll-free phone numbers on random websites; support is inside their verified app.",
      "The 'support executive' asks you to install AnyDesk, RustDesk, or QuickSupport on your mobile phone.",
      "The agent asks for your card CVV or reads back an OTP sent to your SMS.",
      "The number listed is a standard 10-digit mobile number instead of an official corporate 1800 toll-free line."
    ],
    immediateAction: "Only initiate customer support from inside the authenticated app. Never install screen-sharing tools for an incoming or outgoing support call."
  },
  {
    id: "social-media-account-scams",
    title: "Social Media Account Hijacking & Impersonation",
    subtitle: "Fake copyright strikes, brand ambassador tricks, and urgent friend DMs",
    category: "Identity & Social",
    icon: "UserX",
    riskLevel: "High",
    samplePreview: {
      sender: "@meta_security_case_812",
      channel: "Instagram",
      message: "Notice: Copyright Infringement detected on your account photos. Your account will be disabled in 24 hours. If you believe this is a mistake, submit the official appeal form here: https://meta-appeal-badge-help.com/case-77",
      linkOrCallToAction: "https://meta-appeal-badge-help.com"
    },
    modusOperandi: [
      "Attacker creates a bot account named 'Instagram Copyright Team' with the Meta logo and sends ominous DMs.",
      "The link sends you to an exact replica of the Instagram login page, demanding your username, password, and two-factor code.",
      "Once you submit, attackers immediately change the account email, password, and generate backup codes to lock you out.",
      "They then contact your friends list asking for emergency loans or promote crypto schemes to your followers."
    ],
    warningFlags: [
      "Instagram, Meta, and Twitter NEVER send official policy violations or copyright strikes via Direct Messages (DMs).",
      "Official warnings only appear inside: Settings -> Help -> Support Requests in the actual app.",
      "The URL is not instagram.com or meta.com (e.g. `meta-appeal-case.com`).",
      "Friends sending unusual DMs asking for money without speaking to you on voice/video first."
    ],
    immediateAction: "Check your in-app Security settings. Never click links in DMs claiming to be official platform staff."
  }
];
