import { QuizQuestion } from '../types';

export const AWARENESS_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "Fundamentals",
    question: "What is phishing?",
    options: [
      "A legal fishing technique used in digital gaming",
      "A deceptive cybercrime where attackers impersonate trusted entities to steal confidential information like passwords and card numbers",
      "A computer program that automatically speeds up your internet connection",
      "A method of formatting your hard drive to delete old cookies"
    ],
    correctIndex: 1,
    explanation: "Phishing is a social engineering cybercrime where fraudsters pose as reputable institutions (banks, postal services, tech providers) to deceive individuals into revealing sensitive credentials, OTPs, or financial data."
  },
  {
    id: 2,
    category: "Immediate Response",
    question: "What should you do if you receive a suspicious link via email or SMS?",
    options: [
      "Click the link immediately to see if it is real or fake",
      "Forward the link to all your friends to ask their opinion",
      "Do NOT click the link; delete it or verify independently through the company's official app or website",
      "Reply with your credit card number to test if the recipient is authorized"
    ],
    correctIndex: 2,
    explanation: "Never click suspicious links! Malicious links can harvest credentials or trigger drive-by malware downloads. Always open the verified official app or type the verified web address yourself."
  },
  {
    id: 3,
    category: "Banking & OTP",
    question: "Should you share an OTP (One-Time Password) with someone claiming to be bank staff?",
    options: [
      "Yes, if they sound polite and speak from the head office",
      "Yes, as long as they promise to credit cashback into your account",
      "NEVER share your OTP with anyone; bank staff will never ask for your secret OTP or PIN",
      "Only if they ask for it within 60 seconds of sending"
    ],
    correctIndex: 2,
    explanation: "Bank employees, card providers, and customer support representatives NEVER need your OTP. An OTP is meant solely for authorising a transaction that YOU initiated. Anyone asking for OTP over a call or chat is a scammer."
  },
  {
    id: 4,
    category: "Website Identification",
    question: "Which of the following is a classic warning sign of a fake website?",
    options: [
      "The URL contains slight misspellings or deceptive subdomains (e.g., paypa1-verify.com)",
      "The website has a terms of service and privacy policy page",
      "The website loads fast on both mobile and desktop",
      "The website has a search bar at the top"
    ],
    correctIndex: 0,
    explanation: "Typosquatting and deceptive domain names (like using '1' instead of 'l', extra words, or weird extensions like .xyz / .online) are primary indicators of cloned phishing websites."
  },
  {
    id: 5,
    category: "Payment Apps & UPI",
    question: "When receiving money through UPI (like Google Pay, PhonePe, or Paytm), do you need to enter your UPI PIN?",
    options: [
      "Yes, entering your PIN confirms you accept the incoming money",
      "No! You NEVER need to enter a UPI PIN or scan a QR code to RECEIVE money",
      "Yes, but only if the payment is above ₹10,000",
      "Only if the buyer sends an army cantonment receipt"
    ],
    correctIndex: 1,
    explanation: "The Golden Rule of UPI: Entering your UPI PIN is STRICTLY for DEBITING (sending) money from your bank account. To receive funds, no PIN or QR code scanning is ever required."
  },
  {
    id: 6,
    category: "Tech Support & Vishing",
    question: "A caller claiming to be technical support warns that your computer is infected and asks you to install AnyDesk or TeamViewer. What should you do?",
    options: [
      "Follow their instructions immediately so your computer isn't locked",
      "Hang up immediately; legitimate tech companies never cold-call users to install remote access tools",
      "Give them your online banking password so they can scan it for viruses",
      "Pay them with gift cards so they clean your hard drive"
    ],
    correctIndex: 1,
    explanation: "Tech companies like Microsoft, Apple, or Google never make unsolicited phone calls about device infections. Allowing remote desktop access gives fraudsters full control over your files, browser passwords, and banking apps."
  },
  {
    id: 7,
    category: "Smishing & Deliveries",
    question: "You get an SMS claiming a package is delayed and requires a $1.20 redelivery fee via a link. How should you verify this?",
    options: [
      "Pay the small fee right away since $1.20 is very low risk",
      "Visit the official courier portal directly by searching your original order tracking ID, ignoring the text link",
      "Reply with your credit card PIN number directly to the SMS",
      "Call the mobile number from which the SMS was received"
    ],
    correctIndex: 1,
    explanation: "The small amount ($1 or ₹10) is a psychological bait to lower your guard. The fake payment gateway will steal your full card number, CVV, and intercept the real OTP to drain much larger amounts."
  },
  {
    id: 8,
    category: "Account Security",
    question: "Why is Two-Factor Authentication (2FA) critical in protecting your online accounts?",
    options: [
      "It requires a second verification step (like an authenticator code), stopping hackers even if they steal your password",
      "It guarantees you will never need a password again",
      "It increases your download speed and memory",
      "It prevents your computer screen from turning off"
    ],
    correctIndex: 0,
    explanation: "Even if an attacker tricks you into revealing your password through a phishing form, 2FA prevents them from signing in because they do not have your physical device or authenticator token."
  },
  {
    id: 9,
    category: "Browser Security",
    question: "What does the padlock icon (HTTPS) in a browser address bar guarantee?",
    options: [
      "It guarantees the website is 100% trustworthy and owned by a legitimate company",
      "It only means communication between your browser and that server is encrypted, not that the website owner is honest",
      "It proves that the site cannot contain any phishing or fake forms",
      "It means the government has audited the website's honesty"
    ],
    correctIndex: 1,
    explanation: "A padlock / HTTPS only means the connection is encrypted. Scammers can and do set up free SSL certificates on phishing domains every single day. Always check the actual domain name!"
  },
  {
    id: 10,
    category: "Social Engineering",
    question: "A close friend messages you on Instagram urgently asking for a cash transfer to an unfamiliar account. What should you do first?",
    options: [
      "Send the money immediately because true friends always help",
      "Call your friend directly via a known regular phone call or voice line to confirm their account wasn't hacked",
      "Ask them to send you an Amazon gift card in exchange",
      "Post their bank details publicly on your story"
    ],
    correctIndex: 1,
    explanation: "Social media account takeovers are rampant. Hackers impersonate friends to exploit emotional trust. Always verify urgent money requests through an independent, direct voice or video call."
  }
];
