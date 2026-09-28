import { PhishingChallengeItem } from '../types';

export const PHISHING_CHALLENGE_ITEMS: PhishingChallengeItem[] = [
  {
    id: "challenge-1",
    title: "Netflix Account Suspension Alert",
    format: "Email",
    senderDisplay: "Netflix Customer Center",
    senderAddress: "account-update@net-flix-billing-notice.com",
    timestamp: "Today, 10:14 AM",
    subject: "Urgent: Your Netflix membership is on hold (Payment declined)",
    body: "Hi Dear Customer,\n\nWe were unable to process your payment for the next billing cycle. As a result, your streaming subscription will be terminated within 24 hours unless you update your payment information.\n\nPlease click below to re-enter your credit card or debit card details to continue watching.",
    embeddedLink: {
      displayText: "Update Payment Information",
      actualUrl: "http://netflix-billing-update-994.com/renew"
    },
    isSuspicious: true,
    verdictReason: "🚨 SUSPICIOUS: This is a fraudulent credential and credit card harvesting attack.",
    keyClues: [
      "The sender address uses a lookalike domain 'net-flix-billing-notice.com' instead of the authentic 'netflix.com'.",
      "Generic greeting 'Hi Dear Customer' instead of the account holder's name.",
      "The hyperlink target points to an unverified third-party URL ('http://netflix-billing-update-994.com').",
      "Urgent 24-hour ultimatum to trigger emotional haste."
    ],
    safetyLesson: "Never update payment credentials through links in emails. Always go directly to netflix.com or open your Netflix app -> Account Settings."
  },
  {
    id: "challenge-2",
    title: "Google Security Alert: New Sign-In",
    format: "Email",
    senderDisplay: "Google",
    senderAddress: "no-reply@accounts.google.com",
    timestamp: "Yesterday, 3:42 PM",
    subject: "Security alert for your linked Google Account",
    body: "A new sign-in was detected on a Windows device (Chrome browser in Chicago, IL, USA).\n\nIf this was you, you don't need to do anything. If you don't recognize this activity, we recommend reviewing your devices in your Google Account Security Dashboard.",
    embeddedLink: {
      displayText: "Check activity",
      actualUrl: "https://myaccount.google.com/notifications"
    },
    isSuspicious: false,
    verdictReason: "✅ GENUINE: This is an authentic automated security alert from Google.",
    keyClues: [
      "The sender domain is the authentic '@accounts.google.com' with valid DKIM & SPF signatures.",
      "The link directs directly to 'https://myaccount.google.com/notifications' (official HTTPS Google domain).",
      "The message does not ask you to reply with your password, PIN, or sensitive personal data.",
      "No artificial panic or threats of immediate deactivation."
    ],
    safetyLesson: "Genuine security alerts provide factual location/device logs and lead strictly to official root domains without requesting sensitive codes."
  },
  {
    id: "challenge-3",
    title: "Electricity Power Disconnection Threat",
    format: "SMS",
    senderDisplay: "+91-91203-88412",
    senderAddress: "Personal Mobile Number",
    timestamp: "Today, 6:05 PM",
    body: "Dear consumer, your electricity power supply will be disconnected tonight at 9:30 PM from the power office because your previous month bill was not updated. Please immediately contact our electricity officer Mr. Sharma at 9120388412 or install bill update apk: http://bit.ly/power-pay-update",
    embeddedLink: {
      displayText: "http://bit.ly/power-pay-update",
      actualUrl: "http://bit.ly/power-pay-update"
    },
    isSuspicious: true,
    verdictReason: "🚨 SUSPICIOUS: This is a notorious power cutoff smishing scam aimed at installing malicious remote APKs.",
    keyClues: [
      "Official utility companies send SMS alerts via registered government/enterprise alphanumeric headers (e.g., 'BP-BSES' or 'MD-MSEB'), never individual personal 10-digit mobile numbers.",
      "Threatens immediate power disconnection within hours (utility disconnections require written legal notices).",
      "Asks the user to download an APK or call a personal cell number.",
      "Uses a shortened Bitly link instead of the official state utility portal."
    ],
    safetyLesson: "Never install APK files sent via SMS or WhatsApp. Always check electricity dues via your state electricity board's official consumer portal."
  },
  {
    id: "challenge-4",
    title: "Bank Transaction Debit Alert",
    format: "SMS",
    senderDisplay: "VK-HDFCBK",
    senderAddress: "Official Bank Sender ID",
    timestamp: "Today, 1:15 PM",
    body: "Alert: INR 450.00 debited from A/C **4910 on 24-SEP-26 at STARBUCKS CAFE via Debit Card. Avail Bal: INR 34,210.50. If not done by you, call 18002583838 or SMS BLOCK to 5676712.",
    isSuspicious: false,
    verdictReason: "✅ GENUINE: This is an authentic transactional debit notification from the bank.",
    keyClues: [
      "Sent from registered national bank header 'VK-HDFCBK' containing legitimate banking protocol routing.",
      "Only masks sensitive data (masks account number as **4910).",
      "Contains no links to external web pages or forms.",
      "Provides official national toll-free helpline number (1800-XXX) and standard shortcode to block the card if unauthorized."
    ],
    safetyLesson: "Legitimate bank debit alerts notify you of real activity without forcing you to click suspicious external links."
  },
  {
    id: "challenge-5",
    title: "WhatsApp Part-Time HR Task Job",
    format: "WhatsApp",
    senderDisplay: "+62 821-4992-1084 (Indonesia)",
    senderAddress: "+6282149921084",
    timestamp: "Today, 11:30 AM",
    body: "Greetings! I am Priya from Global Recruiters Agency. We have high-paying work from home openings. You can earn ₹5,000 - ₹12,000 per day by just giving 5-star ratings to luxury hotels on Google Maps. No experience needed. Payout every hour via UPI. Join our Telegram manager here to claim ₹500 welcome bonus: https://t.me/Global_VIP_Tasks_Job",
    embeddedLink: {
      displayText: "https://t.me/Global_VIP_Tasks_Job",
      actualUrl: "https://t.me/Global_VIP_Tasks_Job"
    },
    isSuspicious: true,
    verdictReason: "🚨 SUSPICIOUS: This is an international task investment fraud / Telegram scam.",
    keyClues: [
      "Message originates from an unknown foreign country code (+62 Indonesia) claiming to be a domestic Indian recruiting agency.",
      "Exaggerated pay (₹12,000/day for 15 minutes of rating places).",
      "Directs the user off the platform onto Telegram to evade automated spam filtering.",
      "Offers an unearned 'welcome bonus' to hook victims into prepaid task traps."
    ],
    safetyLesson: "Legitimate corporate recruiters never cold-message candidates via WhatsApp from foreign cell numbers offering instant cash for trivial ratings."
  },
  {
    id: "challenge-6",
    title: "Apple iCloud Storage Exceeded Notice",
    format: "Email",
    senderDisplay: "Apple Cloud Notification",
    senderAddress: "icloud-notification@apple-storage-renewal.top",
    timestamp: "Yesterday, 8:20 PM",
    subject: "Notice: Your iCloud storage is 100% full. All photos will be permanently deleted.",
    body: "Your 50GB iCloud storage plan has reached capacity today. If you do not upgrade within 24 hours, all backed up photos, messages, and device backups will be scheduled for permanent removal.\n\nAs a loyal customer, you have been selected for a free 50GB loyalty expansion. Tap below to claim your free storage.",
    embeddedLink: {
      displayText: "Claim Free 50GB iCloud Storage",
      actualUrl: "http://icloud-apple-free50gb.top/login"
    },
    isSuspicious: true,
    verdictReason: "🚨 SUSPICIOUS: Cloned Apple phishing attack aiming to hijack Apple IDs and iCloud keys.",
    keyClues: [
      "Sender domain is 'apple-storage-renewal.top' instead of the authentic 'apple.com'.",
      "Apple never deletes your existing backed up data overnight for exceeding storage limits.",
      "The lure offers 'Free loyalty expansion' which does not exist.",
      "Destination URL uses high-risk disposable TLD (.top) with unencrypted HTTP."
    ],
    safetyLesson: "Check your storage status directly in iOS Settings -> Your Name -> iCloud, rather than tapping links in urgent emails."
  },
  {
    id: "challenge-7",
    title: "Courier Redelivery Fee SMS",
    format: "SMS",
    senderDisplay: "+1 202 555 0173",
    senderAddress: "Unregistered Number",
    timestamp: "Today, 9:45 AM",
    body: "USPS Notice: Your package could not be delivered on 24/09 due to an incomplete street address. Please update your address and pay redelivery fee ($0.75) within 24h: https://usps-re-delivery-portal.xyz/track",
    embeddedLink: {
      displayText: "https://usps-re-delivery-portal.xyz/track",
      actualUrl: "https://usps-re-delivery-portal.xyz/track"
    },
    isSuspicious: true,
    verdictReason: "🚨 SUSPICIOUS: Standard postal smishing scheme aimed at credit card exfiltration.",
    keyClues: [
      "USPS operates on 'usps.com', never '.xyz' domains.",
      "The tracking link does not provide a legitimate 22-digit USPS tracking barcode number.",
      "Small nominal fee ($0.75) lowers skepticism to trick users into submitting credit card and CVV details."
    ],
    safetyLesson: "USPS and national postal services do not text customers for address corrections unless you explicitly registered for text updates with a specific tracking number on their official site."
  },
  {
    id: "challenge-8",
    title: "GitHub Two-Factor Authentication Confirmation",
    format: "Email",
    senderDisplay: "GitHub",
    senderAddress: "noreply@github.com",
    timestamp: "3 days ago, 2:10 PM",
    subject: "[GitHub] Two-factor authentication successfully enabled",
    body: "Hi developer,\n\nWe wanted to let you know that two-factor authentication has been enabled for your account 'octo-coder'.\n\nIf you recently turned on two-factor authentication, you don't need to take any action. If you did not make this change, please visit your account security settings immediately to secure your account.",
    embeddedLink: {
      displayText: "Review Account Security",
      actualUrl: "https://github.com/settings/security"
    },
    isSuspicious: false,
    verdictReason: "✅ GENUINE: Legitimate security transaction notification from GitHub.",
    keyClues: [
      "Official sender email address ending in '@github.com'.",
      "Personalized with the user's actual registered username ('octo-coder').",
      "Hyperlink targets authentic 'https://github.com/settings/security'.",
      "Does not ask to reply with recovery codes, passwords, or tokens."
    ],
    safetyLesson: "Authentic services confirm security changes you performed and provide direct links to standard in-app settings."
  }
];
