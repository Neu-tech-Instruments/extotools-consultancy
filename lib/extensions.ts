export interface ExtensionData {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number; // monthly
  features: string[];
  isBuilt: boolean;
  chromeWebStoreLink?: string;
}

export const extensions: ExtensionData[] = [
  {
    slug: "extension-one",
    name: "Extension One",
    description: "The most powerful tool for productivity. Streamline your workflow with advanced tab management and sync.",
    shortDescription: "Boost your productivity instantly.",
    price: 9,
    features: ["Tab Management", "Cloud Sync", "Power User Shortcuts"],
    isBuilt: true,
  },
  {
    slug: "extension-two",
    name: "Extension Two",
    description: "Unlock the full potential of the web with advanced data scraping and automation. Perfect for market research.",
    shortDescription: "Automate your web tasks.",
    price: 12,
    features: ["No-code Scraper", "API Integration", "Scheduled Runs"],
    isBuilt: true,
  },
  {
    slug: "extension-three",
    name: "Extension Three",
    description: "Secure your browsing experience with advanced privacy controls and ad-blocking that actually works.",
    shortDescription: "Privacy first browsing.",
    price: 7,
    features: ["Ad Blocker", "Tracker Prevention", "Cookie Manager"],
    isBuilt: false, // Placeholder
  },
  {
    slug: "extension-four",
    name: "Extension Four",
    description: "A developer's dream companion. Inspect elements, debug CSS, and analyze network requests with ease.",
    shortDescription: "Dev-tools on steroids.",
    price: 15,
    features: ["CSS Inspector", "Performance Profiler", "Responsive Tester"],
    isBuilt: false, // Placeholder
  },
  {
    slug: "extension-five",
    name: "extension-five",
    description: "Collaborative browsing made simple. Share tabs, chat with teammates, and browse together in real-time.",
    shortDescription: "Browsing for teams.",
    price: 10,
    features: ["Shared Sessions", "Team Chat", "Live Presence"],
    isBuilt: false, // Placeholder
  }
];

export interface BundleData {
  id: string;
  name: string;
  description: string;
  price: number;
  extensionCount: number;
}

export const bundles: BundleData[] = [
  {
    id: "bundle-5",
    name: "Starter Pack (5 Extensions)",
    description: "Get access to our first 5 extensions for a discounted monthly price.",
    price: 35, // Discounted from ~50
    extensionCount: 5,
  },
  {
    id: "bundle-10",
    name: "Pro Pack (10 Extensions)",
    description: "Ultimate value. Access to all current and future extensions (up to 10).",
    price: 60, // Deep discount
    extensionCount: 10,
  }
];
