export type SocialAccount = {
  readonly label: string;
  readonly href: string;
};

export type SiteConfig = {
  readonly companyName: string;
  readonly registeredBusinessName?: string;
  readonly location: string;
  readonly email?: string;
  readonly phone?: string;
  readonly whatsapp?: string;
  readonly whatsappUrl?: string;
  readonly streetAddress?: string;
  readonly googleMapsUrl?: string;
  readonly siteUrl?: string;
  readonly privacyEffectiveDate?: string;
  readonly privacyEmail?: string;
  readonly privacyRetentionPeriod?: string;
  readonly privacyServiceProviders: readonly string[];
  readonly cookieAnalyticsStatement?: string;
  readonly socialAccounts: readonly SocialAccount[];
  readonly proposition: string;
  readonly description: string;
  readonly businessCategories: readonly string[];
};

export const siteConfig = {
  companyName: "Iniya Fiber",
  registeredBusinessName: "",
  location: "Tirupur, India",
  email: "",
  phone: "",
  whatsapp: "",
  whatsappUrl: "",
  streetAddress: "",
  googleMapsUrl: "",
  siteUrl: "",
  privacyEffectiveDate: "",
  privacyEmail: "",
  privacyRetentionPeriod: "",
  privacyServiceProviders: [],
  cookieAnalyticsStatement: "",
  socialAccounts: [],
  proposition: "Fibres and yarns, made to your specification.",
  description:
    "Iniya Fiber is a Tirupur-based manufacturer, supplier, trader, and exporter of recycled textile materials, processed fibres, and customised yarn solutions for open-end spinning units, textile manufacturers, and exporters.",
  businessCategories: ["Manufacturer", "Supplier", "Trader", "Exporter"],
} as const satisfies SiteConfig;
