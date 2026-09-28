export interface EmergencyStep {
  step: number;
  title: string;
  action: string;
  detail: string;
  icon: string;
  urgency: 'Immediate (0-15 mins)' | 'Within 1 hour' | 'Within 24 hours';
}

export interface OfficialAuthority {
  country: string;
  flag: string;
  name: string;
  hotline: string;
  website: string;
  description: string;
  emailOrSmsReport?: string;
}

export const EMERGENCY_RESPONSE_STEPS: EmergencyStep[] = [
  {
    step: 1,
    title: "Freeze Bank Accounts & Cards Immediately",
    action: "Call your bank's 24/7 emergency card blocking number or toggle 'Lock Card' inside your bank's mobile app.",
    detail: "Every bank provides an instant debit card switch-off feature in their mobile app. This cuts off any additional fraudulent recurring transactions or POS swipes while you report the incident.",
    icon: "CreditCard",
    urgency: "Immediate (0-15 mins)"
  },
  {
    step: 2,
    title: "Call National Financial Fraud Helpline (Golden Hour)",
    action: "Report financial loss within the first 1-2 hours to trigger inter-bank lien freezing.",
    detail: "In countries like India, calling 1930 connects you with law enforcement and banking liaison officers who freeze the destination mule account before scammers can withdraw the cash from ATMs.",
    icon: "PhoneCall",
    urgency: "Immediate (0-15 mins)"
  },
  {
    step: 3,
    title: "Change Master Passwords & Revoke Sessions",
    action: "Update passwords for your email, bank, and social accounts, and click 'Sign out of all other sessions'.",
    detail: "If you clicked a deceptive link and entered credentials, immediately change your password and reset your 2FA security keys from a clean, secure device.",
    icon: "Key",
    urgency: "Within 1 hour"
  },
  {
    step: 4,
    title: "Isolate & Scan Your Device (If APK / File Downloaded)",
    action: "Turn on Airplane Mode, disconnect Wi-Fi, uninstall unknown apps (AnyDesk, APKs), and run an antivirus scan.",
    detail: "If fraudsters coerced you into downloading an APK or remote sharing utility, sever internet connectivity immediately to stop live background screen mirroring and SMS theft.",
    icon: "SmartphoneNfc",
    urgency: "Within 1 hour"
  },
  {
    step: 5,
    title: "Preserve Digital Evidence for Formal FIR",
    action: "Take clear screenshots of chat threads, transaction IDs (UTR/RRN), caller phone numbers, and website links.",
    detail: "Do not delete the scammer's chat or messages. Cyber police require transaction reference numbers, exact timestamps, and recipient wallet/account details to file an official FIR.",
    icon: "FileText",
    urgency: "Within 24 hours"
  }
];

export const OFFICIAL_AUTHORITIES: OfficialAuthority[] = [
  {
    country: "India",
    flag: "🇮🇳",
    name: "National Cyber Crime Reporting Portal (MHA)",
    hotline: "1930 (Toll Free National Cyber Fraud Helpline)",
    website: "https://cybercrime.gov.in",
    description: "Official Government of India portal for reporting financial fraud, online harassment, and cyber crimes. Calling 1930 immediately triggers beneficiary bank hold requests.",
    emailOrSmsReport: "Chakshu Portal on sancharsaathi.gov.in for reporting suspected fraud calls/SMS"
  },
  {
    country: "United States",
    flag: "🇺🇸",
    name: "FBI Internet Crime Complaint Center (IC3) & FTC",
    hotline: "1-877-FTC-HELP (1-877-382-4357)",
    website: "https://www.ic3.gov",
    description: "The primary U.S. government hub for reporting internet-facilitated crimes, wire fraud, ransomware, and identity theft.",
    emailOrSmsReport: "Forward spam SMS to 7726 (SPAM) & email to reportphishing@apwg.org"
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    name: "Action Fraud & National Cyber Security Centre (NCSC)",
    hotline: "0300 123 2040",
    website: "https://www.actionfraud.police.uk",
    description: "UK national fraud and cyber crime reporting center. Reports are sent to the National Fraud Intelligence Bureau.",
    emailOrSmsReport: "Forward suspicious emails to report@phishing.gov.uk and texts to 7726"
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    name: "Scamwatch & ReportCyber (ACSC)",
    hotline: "1300 795 995",
    website: "https://www.scamwatch.gov.au",
    description: "Run by the Australian Competition and Consumer Commission (ACCC), helping Australians spot and report cyber scams.",
    emailOrSmsReport: "Report cyber security incidents via cyber.gov.au/report"
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    name: "Canadian Anti-Fraud Centre (CAFC)",
    hotline: "1-888-495-8501 (Toll-Free)",
    website: "https://www.antifraudcentre-centreantifraude.ca",
    description: "Joint agency of the RCMP and Competition Bureau collecting intelligence on scams targeting Canadians.",
    emailOrSmsReport: "Forward deceptive emails to info@antifraudcentre.ca"
  },
  {
    country: "European Union / Global",
    flag: "🇪🇺",
    name: "Europol European Cybercrime Centre (EC3)",
    hotline: "112 (EU Emergency Services)",
    website: "https://www.europol.europa.eu/report-a-crime",
    description: "Coordinates cross-border cyber investigations across EU member states against organized financial fraud syndicates.",
    emailOrSmsReport: "Contact your local national police cyber division"
  }
];
