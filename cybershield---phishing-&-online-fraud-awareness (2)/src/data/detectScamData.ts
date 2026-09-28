import { DetectScenario } from '../types';

export const DETECT_SCENARIOS: DetectScenario[] = [
  {
    id: "bank-block-urgent",
    title: "Urgent Bank Account Block Threat",
    channel: "SMS",
    senderInfo: "+91-97210-48291 (Unverified Mobile Number)",
    subjectOrHeader: "URGENT NOTICE",
    messageContent: "Dear Customer, Your account will be blocked today due to pending KYC docs. Click this link immediately to verify identity and update details: http://bit.ly/bank-kyc-reactivate-now or all banking services will be suspended by 11:59 PM.",
    highlightClues: [
      {
        text: "Your account will be blocked today",
        type: "urgency",
        explanation: "Extreme artificial urgency designed to create anxiety and bypass your rational skepticism."
      },
      {
        text: "Click this link immediately",
        type: "urgency",
        explanation: "High-pressure call-to-action preventing you from independently contacting your bank branch."
      },
      {
        text: "http://bit.ly/bank-kyc-reactivate-now",
        type: "link",
        explanation: "Shortened Bitly link hiding the real deceptive destination; genuine banks host KYC portals on their own verified domain (e.g. https://www.bank.com)."
      },
      {
        text: "+91-97210-48291",
        type: "spoofed_identity",
        explanation: "Sent from an unknown individual 10-digit mobile number, not an official registered corporate sender ID."
      },
      {
        text: "verify identity and update details",
        type: "data_request",
        explanation: "Asks you to divulge credentials, net-banking passwords, and confidential identity documents."
      }
    ],
    allOptions: [
      {
        id: "urgent_language",
        label: "Urgent language ('will be blocked today', 'immediately')",
        isCorrect: true,
        explanation: "Threatening that services will be stopped immediately is the #1 psychological trigger used in phishing."
      },
      {
        id: "unknown_link",
        label: "Unknown / shortened link ('http://bit.ly/...')",
        isCorrect: true,
        explanation: "Shortened URLs disguise malicious destinations. No legitimate bank sends generic shortened links for security updates."
      },
      {
        id: "data_request",
        label: "Request for personal / sensitive information",
        isCorrect: true,
        explanation: "The message instructs you to input confidential identity and banking details onto an external page."
      },
      {
        id: "spelling_grammar",
        label: "Spelling / grammar mistakes & unprofessional syntax",
        isCorrect: true,
        explanation: "Awkward phrasing like 'pending KYC docs' and informal capitalization without standard banking disclosures."
      },
      {
        id: "sender_spoof",
        label: "Suspicious / personal sender phone number",
        isCorrect: true,
        explanation: "Legitimate institutions send transactional alerts via registered alpha sender headers, not private 10-digit numbers."
      }
    ],
    explanationSummary: "This is a textbook Smishing (SMS Phishing) attack! It combines high-pressure psychological coercion with a disguised URL to harvest your banking credentials.",
    safeAlternative: "Open your bank's official banking application or website directly by typing its known address into your browser, or call the telephone number stamped on the back of your debit card."
  },
  {
    id: "parcel-customs-smishing",
    title: "Unclaimed Package & Redirection Fee",
    channel: "SMS",
    senderInfo: "ExpressPost-Alert (+1 415 889 0192)",
    messageContent: "Package tracking #US891002 status: Delivery held at distribution depot. Street address missing. Pleas update your delivery address and pay $1.45 re-dispatch fee within 12hrs: https://track-us-pkg-deliver.top/addr",
    highlightClues: [
      {
        text: "Pleas update your delivery address",
        type: "grammar",
        explanation: "Spelling mistake: 'Pleas' instead of 'Please'. Legitimate postal carriers have automated proofreading."
      },
      {
        text: "pay $1.45 re-dispatch fee",
        type: "data_request",
        explanation: "A tiny fee lure: victims think '$1.45 is so small it cannot be a scam', but the page steals the entire credit card number, CVV, and OTP!"
      },
      {
        text: "https://track-us-pkg-deliver.top/addr",
        type: "link",
        explanation: "Uses a generic high-risk top-level domain (.top) instead of official postal carrier domains (.gov or .com)."
      },
      {
        text: "within 12hrs",
        type: "urgency",
        explanation: "Short timeline to rush your judgment before you check whether you even have an active order."
      }
    ],
    allOptions: [
      {
        id: "urgent_language",
        label: "Urgent language ('held at depot', 'within 12hrs')",
        isCorrect: true,
        explanation: "Creates urgency to make you click without checking your recent order receipts."
      },
      {
        id: "unknown_link",
        label: "Unknown / untrusted domain ('.top' domain)",
        isCorrect: true,
        explanation: "Official carriers never host official tracking on disposable domains like '.top' or '.xyz'."
      },
      {
        id: "data_request",
        label: "Request for payment / credit card details",
        isCorrect: true,
        explanation: "The small payment is a pretext to harvest credit card numbers and security CVVs."
      },
      {
        id: "spelling_grammar",
        label: "Spelling / grammar mistakes ('Pleas update')",
        isCorrect: true,
        explanation: "Noticeable typographical error ('Pleas') in standard customer outreach."
      }
    ],
    explanationSummary: "Package redelivery scams have exploded worldwide. Criminals exploit our anticipation of e-commerce packages to trick us into entering payment cards on cloned courier sites.",
    safeAlternative: "Visit the carrier website (e.g. USPS, FedEx, India Post) directly and manually search the tracking number from your original purchase email."
  },
  {
    id: "tax-refund-email",
    title: "Unclaimed Tax Refund Direct Deposit",
    channel: "Email",
    senderInfo: "Refund Notification <support@internal-revenue-refund-portal.org>",
    subjectOrHeader: "CONFIRMATION: You have an outstanding tax refund of $1,850.40",
    messageContent: "Dear Taxpayer, We have determined that you are eligible to receive a tax refund of $1,850.40 from the previous fiscal cycle. Due to invalid banking records on file, your direct deposit failed. Download and submit the attached encrypted PDF or click below to claim your refund within 48 hours: http://tax-deposit-claim-verify.org/portal",
    highlightClues: [
      {
        text: "support@internal-revenue-refund-portal.org",
        type: "spoofed_identity",
        explanation: "Government tax revenue agencies operate exclusively on official government domains (e.g. .gov or .nic.in), never .org or .com."
      },
      {
        text: "Dear Taxpayer",
        type: "spoofed_identity",
        explanation: "Generic greeting. Authentic tax agencies address taxpayers by their full legal name and partial identifier."
      },
      {
        text: "http://tax-deposit-claim-verify.org/portal",
        type: "link",
        explanation: "Unsecured HTTP link leading to an external lookalike page."
      },
      {
        text: "attached encrypted PDF",
        type: "data_request",
        explanation: "Common malware delivery vector containing macros or trojans."
      }
    ],
    allOptions: [
      {
        id: "urgent_language",
        label: "Urgent deadline ('within 48 hours')",
        isCorrect: true,
        explanation: "Rushes the victim into reacting hastily."
      },
      {
        id: "unknown_link",
        label: "Unknown non-government link ('...-verify.org')",
        isCorrect: true,
        explanation: "Real tax authorities always use .gov or official national government TLDs."
      },
      {
        id: "data_request",
        label: "Request for banking records & credentials",
        isCorrect: true,
        explanation: "Claims direct deposit failed to lure you into typing bank account numbers."
      },
      {
        id: "sender_spoof",
        label: "Spoofed / non-government sender email",
        isCorrect: true,
        explanation: "Tax agencies never notify citizens of unclaimed refunds via unsolicited generic emails."
      }
    ],
    explanationSummary: "Tax refund phishing spikes during tax season. Government revenue authorities explicitly state they never initiate contact by email or text message to request personal or financial information.",
    safeAlternative: "Log in exclusively through your country's official tax e-filing portal (e.g. irs.gov or incometax.gov.in) to check genuine refund status."
  }
];
