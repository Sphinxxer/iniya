export type ProductSlug =
  | "recycled-cotton-hard-waste"
  | "recycled-clipping-waste"
  | "processed-fibres"
  | "recycled-yarn"
  | "cotton-yarn"
  | "coloured-yarn"
  | "poly-cotton-yarn";

export type ProductGroupId = "recycled-materials" | "fibres" | "yarns";

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

export type ProductPriority = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ConfirmedSpecification = {
  readonly label: CustomisationOption;
  readonly value: string;
  readonly context: string;
};

type ProductBase = {
  readonly name: string;
  readonly slug: ProductSlug;
  readonly group: ProductGroupId;
  readonly category: ProductCategory;
  readonly priority: ProductPriority;
  readonly shortDescription: string;
  readonly longDescription: string;
  readonly image: `/images/products/${string}.webp`;
  readonly imageAlt: string;
  readonly confirmedSpecifications: readonly ConfirmedSpecification[];
  readonly enquiryFields: readonly Exclude<CustomisationOption, "Quantity">[];
  readonly qualityGuidance?: string;
  readonly relatedSlugs: readonly ProductSlug[];
  readonly seo: {
    readonly title: string;
    readonly description: string;
  };
};

export type RecycledYarnProduct = ProductBase & {
  readonly slug: "recycled-yarn";
  readonly countRange: "6s–40s";
};

export type ProductWithoutCountRange = ProductBase & {
  readonly slug: Exclude<ProductSlug, "recycled-yarn">;
  readonly countRange?: never;
};

export type Product = RecycledYarnProduct | ProductWithoutCountRange;

export const enquiryFieldGuidance = {
  "Fibre type": "Share the fibre or source material needed.",
  Blend: "Add the requested fibre blend where it applies.",
  Colour: "Specify the required colour or shade.",
  "Yarn count": "Add the yarn count needed for the intended use.",
  Grade: "Describe the required grade or quality reference.",
  Quantity: "Include the requested quantity and unit.",
} as const satisfies Record<CustomisationOption, string>;

const yarnQualityGuidance = (productName: string) =>
  `For ${productName.toLowerCase()}, Iniya Fiber's own laboratory can check yarn count, hank, and CSP where those checks apply to the agreed requirement.`;

export const productGroups = [
  {
    id: "recycled-materials",
    label: "Recycled Materials",
    copy: "Recovered textile inputs for further processing and supply discussions.",
  },
  {
    id: "fibres",
    label: "Fibres",
    copy: "Processed fibre options shaped around the material brief.",
  },
  {
    id: "yarns",
    label: "Yarns",
    copy: "Yarn requirements discussed by the parameters that apply.",
  },
] as const satisfies readonly {
  readonly id: ProductGroupId;
  readonly label: string;
  readonly copy: string;
}[];

export const products = [
  {
    name: "Recycled Cotton Hard Waste",
    slug: "recycled-cotton-hard-waste",
    group: "recycled-materials",
    category: "Recycled textile material",
    priority: 1,
    shortDescription:
      "Recycled cotton hard waste for further textile processing and spinning requirements.",
    longDescription:
      "Iniya Fiber supplies recycled cotton hard waste for further textile processing and spinning requirements.",
    image: "/images/products/recycled-cotton-hard-waste.webp",
    imageAlt:
      "Recycled cotton hard waste shown in compressed bales for textile processing",
    confirmedSpecifications: [],
    enquiryFields: ["Fibre type", "Grade"],
    relatedSlugs: ["recycled-clipping-waste", "processed-fibres"],
    seo: {
      title: "Recycled Cotton Hard Waste | Iniya Fiber",
      description:
        "Recycled cotton hard waste from Iniya Fiber in Tirupur for textile processing and spinning supply discussions.",
    },
  },
  {
    name: "Recycled Clipping Waste",
    slug: "recycled-clipping-waste",
    group: "recycled-materials",
    category: "Recycled textile material",
    priority: 2,
    shortDescription:
      "Recycled clipping waste for material-led textile supply requirements.",
    longDescription:
      "Iniya Fiber supplies recycled clipping waste for further textile processing against an agreed material and quantity brief.",
    image: "/images/products/recycled-clipping-waste.webp",
    imageAlt: "Recycled textile clipping waste shown in sorted bulk form",
    confirmedSpecifications: [],
    enquiryFields: ["Fibre type", "Grade"],
    relatedSlugs: ["recycled-cotton-hard-waste", "processed-fibres"],
    seo: {
      title: "Recycled Clipping Waste | Iniya Fiber",
      description:
        "Recycled clipping waste from Iniya Fiber in Tirupur for material and quantity-focused supply discussions.",
    },
  },
  {
    name: "Processed Fibres",
    slug: "processed-fibres",
    group: "fibres",
    category: "Processed fibres",
    priority: 3,
    shortDescription:
      "Processed fibre options shaped around the buyer's material brief.",
    longDescription:
      "Iniya Fiber provides processed fibre options shaped around the fibre type, blend, colour, grade, and quantity in the buyer's brief.",
    image: "/images/products/processed-fibres.webp",
    imageAlt: "Processed textile fibres shown in loose form",
    confirmedSpecifications: [],
    enquiryFields: ["Fibre type", "Blend", "Colour", "Grade"],
    relatedSlugs: [
      "recycled-cotton-hard-waste",
      "recycled-clipping-waste",
      "recycled-yarn",
    ],
    seo: {
      title: "Processed Fibres | Iniya Fiber",
      description:
        "Processed fibres from Iniya Fiber in Tirupur, discussed by fibre type, blend, colour, grade, and quantity.",
    },
  },
  {
    name: "Recycled Yarn",
    slug: "recycled-yarn",
    group: "yarns",
    category: "Yarn solution",
    priority: 4,
    shortDescription: "Recycled yarn available from 6s–40s count.",
    longDescription:
      "Iniya Fiber supplies recycled yarn from 6s–40s count for specification-led textile requirements.",
    image: "/images/products/recycled-yarn.webp",
    imageAlt: "Recycled yarn packages arranged for textile production",
    confirmedSpecifications: [
      {
        label: "Yarn count",
        value: "6s–40s",
        context: "Available recycled-yarn count range.",
      },
    ],
    enquiryFields: ["Fibre type", "Blend", "Colour", "Yarn count", "Grade"],
    countRange: "6s–40s",
    qualityGuidance: yarnQualityGuidance("Recycled Yarn"),
    relatedSlugs: ["cotton-yarn", "coloured-yarn", "poly-cotton-yarn"],
    seo: {
      title: "Recycled Yarn 6s–40s | Iniya Fiber",
      description:
        "Recycled yarn from 6s–40s count, supplied by Iniya Fiber in Tirupur for specification-led enquiries.",
    },
  },
  {
    name: "Cotton Yarn",
    slug: "cotton-yarn",
    group: "yarns",
    category: "Yarn solution",
    priority: 5,
    shortDescription:
      "Cotton yarn discussed against the parameters in the supply brief.",
    longDescription:
      "Iniya Fiber supplies cotton yarn against the applicable colour, yarn count, grade, and order quantity.",
    image: "/images/products/cotton-yarn.webp",
    imageAlt: "Cotton yarn packages arranged for textile production",
    confirmedSpecifications: [],
    enquiryFields: ["Colour", "Yarn count", "Grade"],
    qualityGuidance: yarnQualityGuidance("Cotton Yarn"),
    relatedSlugs: ["recycled-yarn", "coloured-yarn", "poly-cotton-yarn"],
    seo: {
      title: "Cotton Yarn Supplier | Iniya Fiber",
      description:
        "Cotton yarn from Iniya Fiber in Tirupur, discussed by applicable colour, count, grade, and quantity.",
    },
  },
  {
    name: "Coloured Yarn",
    slug: "coloured-yarn",
    group: "yarns",
    category: "Yarn solution",
    priority: 6,
    shortDescription:
      "Coloured yarn discussed against the required shade and yarn parameters.",
    longDescription:
      "Iniya Fiber supplies coloured yarn against the applicable shade, yarn count, grade, and order quantity.",
    image: "/images/products/coloured-yarn.webp",
    imageAlt: "Coloured yarn packages arranged in multiple shades",
    confirmedSpecifications: [],
    enquiryFields: ["Colour", "Yarn count", "Grade"],
    qualityGuidance: yarnQualityGuidance("Coloured Yarn"),
    relatedSlugs: ["cotton-yarn", "recycled-yarn", "poly-cotton-yarn"],
    seo: {
      title: "Coloured Yarn | Iniya Fiber",
      description:
        "Coloured yarn from Iniya Fiber in Tirupur, discussed by shade, count, grade, and quantity.",
    },
  },
  {
    name: "Poly-Cotton Yarn",
    slug: "poly-cotton-yarn",
    group: "yarns",
    category: "Yarn solution",
    priority: 7,
    shortDescription:
      "Poly-cotton yarn discussed against the required blend and yarn parameters.",
    longDescription:
      "Iniya Fiber supplies poly-cotton yarn against the applicable blend, colour, yarn count, grade, and order quantity.",
    image: "/images/products/poly-cotton-yarn.webp",
    imageAlt: "Poly-cotton yarn packages arranged for textile production",
    confirmedSpecifications: [],
    enquiryFields: ["Blend", "Colour", "Yarn count", "Grade"],
    qualityGuidance: yarnQualityGuidance("Poly-Cotton Yarn"),
    relatedSlugs: ["cotton-yarn", "recycled-yarn", "coloured-yarn"],
    seo: {
      title: "Poly-Cotton Yarn | Iniya Fiber",
      description:
        "Poly-cotton yarn from Iniya Fiber in Tirupur, discussed by blend, colour, count, grade, and quantity.",
    },
  },
] as const satisfies readonly Product[];

export const productSlugs: readonly ProductSlug[] = products.map(
  (product) => product.slug,
);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsInGroup(group: ProductGroupId) {
  return products.filter((product) => product.group === group);
}
