export type ProductSlug =
  | "recycled-cotton-hard-waste"
  | "recycled-clipping-waste"
  | "processed-fibres"
  | "recycled-yarn"
  | "cotton-yarn"
  | "coloured-yarn"
  | "poly-cotton-yarn";

export type ProductCategory =
  | "Recycled textile material"
  | "Processed fibres"
  | "Yarn solution";

export type CustomisationOption =
  | "Fibre type"
  | "Blend"
  | "Colour"
  | "Yarn count"
  | "Grade"
  | "Quantity";

export type CustomerGroup =
  | "Open-end spinning units"
  | "Textile manufacturers"
  | "Exporters";

export type ProductPriority = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type ProductBase = {
  readonly name: string;
  readonly category: ProductCategory;
  readonly priority: ProductPriority;
  readonly shortDescription: string;
  readonly longDescription: string;
  readonly image: `/images/products/${string}.webp`;
  readonly imageAlt: string;
  readonly availableCustomisation: readonly CustomisationOption[];
  readonly customerGroups: readonly CustomerGroup[];
  readonly qualityNote: string;
  readonly seo: {
    readonly title: string;
    readonly description: string;
  };
};

export type RecycledYarnProduct = ProductBase & {
  readonly slug: "recycled-yarn";
  readonly countRange: "6s to 40s";
};

export type ProductWithoutCountRange = ProductBase & {
  readonly slug: Exclude<ProductSlug, "recycled-yarn">;
  readonly countRange?: never;
};

export type Product = RecycledYarnProduct | ProductWithoutCountRange;

const allCustomerGroups = [
  "Open-end spinning units",
  "Textile manufacturers",
  "Exporters",
] as const satisfies readonly CustomerGroup[];

const materialQualityNote =
  "Iniya Fiber follows an internal quality-control process to support consistent quality.";

const yarnQualityNote =
  "Iniya Fiber’s own testing laboratory checks yarn count, hank, and CSP as part of its internal quality-control process.";

export const products = [
  {
    name: "Recycled Cotton Hard Waste",
    slug: "recycled-cotton-hard-waste",
    category: "Recycled textile material",
    priority: 1,
    shortDescription:
      "Recycled cotton hard waste supplied for further textile processing and spinning requirements.",
    longDescription:
      "Iniya Fiber supplies recycled cotton hard waste for further textile processing and spinning requirements. Processing is handled in-house to support closer control over agreed customer requirements.",
    image: "/images/products/recycled-cotton-hard-waste.webp",
    imageAlt:
      "AI-generated industrial concept showing compressed bales and a sorted pile of recycled cotton hard waste",
    availableCustomisation: ["Fibre type", "Grade", "Quantity"],
    customerGroups: allCustomerGroups,
    qualityNote: materialQualityNote,
    seo: {
      title: "Recycled Cotton Hard Waste | Iniya Fiber",
      description:
        "Explore recycled cotton hard waste supplied by Iniya Fiber in Tirupur for further textile processing and spinning requirements.",
    },
  },
  {
    name: "Recycled Clipping Waste",
    slug: "recycled-clipping-waste",
    category: "Recycled textile material",
    priority: 2,
    shortDescription:
      "Recycled clipping waste supplied according to customer material and quantity requirements.",
    longDescription:
      "Iniya Fiber supplies recycled clipping waste according to customer material and quantity requirements. Processing is handled in-house to support closer control over agreed specifications.",
    image: "/images/products/recycled-clipping-waste.webp",
    imageAlt:
      "AI-generated industrial concept showing bulk sorted textile clippings in a mill cage beside a compressed bale",
    availableCustomisation: ["Fibre type", "Grade", "Quantity"],
    customerGroups: allCustomerGroups,
    qualityNote: materialQualityNote,
    seo: {
      title: "Recycled Clipping Waste | Iniya Fiber",
      description:
        "Explore recycled clipping waste supplied by Iniya Fiber in Tirupur according to customer material and quantity requirements.",
    },
  },
  {
    name: "Processed Fibres",
    slug: "processed-fibres",
    category: "Processed fibres",
    priority: 3,
    shortDescription:
      "Processed fibre options customised by fibre type, blend, colour, grade, and quantity.",
    longDescription:
      "Iniya Fiber provides processed fibre options customised by fibre type, blend, colour, grade, and quantity. Processing is handled in-house to support customer-specific textile requirements.",
    image: "/images/products/processed-fibres.webp",
    imageAlt:
      "AI-generated industrial concept showing opened fibres moving through a processing line",
    availableCustomisation: [
      "Fibre type",
      "Blend",
      "Colour",
      "Grade",
      "Quantity",
    ],
    customerGroups: allCustomerGroups,
    qualityNote: materialQualityNote,
    seo: {
      title: "Processed Fibres | Iniya Fiber",
      description:
        "Explore processed fibres from Iniya Fiber, customised by fibre type, blend, colour, grade, and quantity in Tirupur.",
    },
  },
  {
    name: "Recycled Yarn",
    slug: "recycled-yarn",
    category: "Yarn solution",
    priority: 4,
    shortDescription:
      "Customisable recycled yarn available from 6s to 40s count.",
    longDescription:
      "Iniya Fiber supplies customisable recycled yarn from 6s to 40s count. Requirements can be discussed across fibre type, blend, colour, yarn count, grade, and quantity.",
    image: "/images/products/recycled-yarn.webp",
    imageAlt:
      "AI-generated industrial concept showing rows of full-size muted melange recycled yarn packages on a trolley",
    availableCustomisation: [
      "Fibre type",
      "Blend",
      "Colour",
      "Yarn count",
      "Grade",
      "Quantity",
    ],
    countRange: "6s to 40s",
    customerGroups: allCustomerGroups,
    qualityNote: yarnQualityNote,
    seo: {
      title: "Recycled Yarn 6s to 40s | Iniya Fiber",
      description:
        "Explore customisable recycled yarn from 6s to 40s count, supplied by Iniya Fiber from Tirupur, India.",
    },
  },
  {
    name: "Cotton Yarn",
    slug: "cotton-yarn",
    category: "Yarn solution",
    priority: 5,
    shortDescription:
      "Cotton yarn supplied according to agreed count, grade, colour, and quantity requirements.",
    longDescription:
      "Iniya Fiber supplies cotton yarn according to agreed count, grade, colour, and quantity requirements. In-house operations and quality checks support consistency against agreed specifications.",
    image: "/images/products/cotton-yarn.webp",
    imageAlt:
      "AI-generated industrial concept showing repeated rows of full-size undyed cotton yarn packages on a mill trolley",
    availableCustomisation: ["Colour", "Yarn count", "Grade", "Quantity"],
    customerGroups: allCustomerGroups,
    qualityNote: yarnQualityNote,
    seo: {
      title: "Cotton Yarn Supplier | Iniya Fiber",
      description:
        "Explore cotton yarn supplied by Iniya Fiber according to agreed count, grade, colour, and quantity requirements.",
    },
  },
  {
    name: "Coloured Yarn",
    slug: "coloured-yarn",
    category: "Yarn solution",
    priority: 6,
    shortDescription:
      "Coloured yarn customised around required colour, count, grade, and quantity.",
    longDescription:
      "Iniya Fiber supplies coloured yarn customised around required colour, count, grade, and quantity. In-house operations and quality checks support consistency against agreed specifications.",
    image: "/images/products/coloured-yarn.webp",
    imageAlt:
      "AI-generated industrial concept showing coloured yarn packages in consistent rust, indigo, and ochre shade lots",
    availableCustomisation: ["Colour", "Yarn count", "Grade", "Quantity"],
    customerGroups: allCustomerGroups,
    qualityNote: yarnQualityNote,
    seo: {
      title: "Coloured Yarn | Iniya Fiber",
      description:
        "Explore coloured yarn from Iniya Fiber, customised around required colour, count, grade, and quantity.",
    },
  },
  {
    name: "Poly-Cotton Yarn",
    slug: "poly-cotton-yarn",
    category: "Yarn solution",
    priority: 7,
    shortDescription:
      "Poly-cotton yarn customised by blend, colour, yarn count, grade, and quantity.",
    longDescription:
      "Iniya Fiber supplies poly-cotton yarn customised by blend, colour, yarn count, grade, and quantity. In-house operations and quality checks support consistency against agreed specifications.",
    image: "/images/products/poly-cotton-yarn.webp",
    imageAlt:
      "AI-generated industrial concept showing rows of full-size neutral yarn packages in a packing area",
    availableCustomisation: [
      "Blend",
      "Colour",
      "Yarn count",
      "Grade",
      "Quantity",
    ],
    customerGroups: allCustomerGroups,
    qualityNote: yarnQualityNote,
    seo: {
      title: "Poly-Cotton Yarn | Iniya Fiber",
      description:
        "Explore poly-cotton yarn from Iniya Fiber, customised by blend, colour, yarn count, grade, and quantity.",
    },
  },
] as const satisfies readonly Product[];

export const productSlugs: readonly ProductSlug[] = products.map(
  (product) => product.slug,
);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
