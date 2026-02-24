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

export const extensions: ExtensionData[] = []; // Migrated to Database

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
