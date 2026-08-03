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

export type CustomerGroup =
  | "Open-end spinning units"
  | "Textile manufacturers"
  | "Exporters";

export type ProductPriority = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ProductSpecification = {
  readonly label: CustomisationOption;
  readonly copy: string;
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
  readonly specifications: readonly ProductSpecification[];
  readonly enquiryFields: readonly Exclude<CustomisationOption, "Quantity">[];
  readonly customerGroups: readonly CustomerGroup[];
  readonly qualityNote: string;
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

const allCustomerGroups = [
  "Open-end spinning units",
  "Textile manufacturers",
  "Exporters",
] as const satisfies readonly CustomerGroup[];

const materialQualityNote =
  "Internal quality review supports alignment with the agreed material specification before supply.";

const yarnQualityNote =
  "For yarn products, Iniya Fiber’s own laboratory checks yarn count, hank, and CSP as part of internal quality control.";

export const productGroups = [
  {
    id: "recycled-materials",
    label: "Recycled Materials",
    copy: "Recovered textile inputs for further processing and supply discussions.",
  },
  {
    id: "fibres",
    label: "Fibres",
    copy: "Processed fibre options shaped around material parameters.",
  },
  {
    id: "yarns",
    label: "Yarns",
    copy: "Yarn solutions discussed by applicable count, colour, grade, and quantity.",
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
      "Recycled cotton hard waste for further textile processing and spinning discussions.",
    longDescription:
      "Iniya Fiber supplies recycled cotton hard waste for further textile processing and spinning. The discussion begins with the material type, grade, and quantity needed for the intended supply.",
    image: "/images/products/recycled-cotton-hard-waste.webp",
    imageAlt:
      "Recycled cotton hard waste shown in compressed bales for textile processing",
    specifications: [
      ["Fibre type", "Share the material type needed for the intended process."],
      ["Grade", "State the grade needed for the supply discussion."],
      ["Quantity", "Include the requested quantity and unit."],
    ].map(([label, copy]) => ({ label: label as CustomisationOption, copy })),
    enquiryFields: ["Fibre type", "Grade"],
    customerGroups: allCustomerGroups,
    qualityNote: materialQualityNote,
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
      "Recycled clipping waste in bulk form for material-focused supply discussions.",
    longDescription:
      "Iniya Fiber supplies recycled clipping waste with the material type, grade, and quantity discussed upfront to support a clear supply brief.",
    image: "/images/products/recycled-clipping-waste.webp",
    imageAlt: "Recycled textile clipping waste shown in sorted bulk form",
    specifications: [
      ["Fibre type", "Share the material type required for the selected use."],
      ["Grade", "Identify the grade to be discussed with the team."],
      ["Quantity", "Include the requested quantity and unit."],
    ].map(([label, copy]) => ({ label: label as CustomisationOption, copy })),
    enquiryFields: ["Fibre type", "Grade"],
    customerGroups: allCustomerGroups,
    qualityNote: materialQualityNote,
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
      "Processed fibre options discussed by fibre type, blend, colour, grade, and quantity.",
    longDescription:
      "Iniya Fiber provides processed fibre options for buyers who need to define fibre type, blend, colour, grade, and quantity as part of the supply brief.",
    image: "/images/products/processed-fibres.webp",
    imageAlt: "Processed textile fibres shown in loose form",
    specifications: [
      ["Fibre type", "Define the fibre type needed for the selected material."],
      ["Blend", "Share the requested blend where it applies."],
      ["Colour", "Specify the colour needed for the supply brief."],
      ["Grade", "State the grade to be reviewed internally."],
      ["Quantity", "Include the requested quantity and unit."],
    ].map(([label, copy]) => ({ label: label as CustomisationOption, copy })),
    enquiryFields: ["Fibre type", "Blend", "Colour", "Grade"],
    customerGroups: allCustomerGroups,
    qualityNote: materialQualityNote,
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
      "Iniya Fiber supplies recycled yarn from 6s–40s count. Buyers can share applicable fibre type, blend, colour, count, grade, and quantity details in the enquiry.",
    image: "/images/products/recycled-yarn.webp",
    imageAlt: "Recycled yarn packages arranged for textile production",
    specifications: [
      ["Fibre type", "Share the fibre type relevant to the yarn enquiry."],
      ["Blend", "Describe the requested blend where applicable."],
      ["Colour", "Specify the required colour for the yarn."],
      ["Yarn count", "Recycled yarn is available from 6s–40s count."],
      ["Grade", "State the grade to be discussed with the team."],
      ["Quantity", "Include the requested quantity and unit."],
    ].map(([label, copy]) => ({ label: label as CustomisationOption, copy })),
    enquiryFields: ["Fibre type", "Blend", "Colour", "Yarn count", "Grade"],
    countRange: "6s–40s",
    customerGroups: allCustomerGroups,
    qualityNote: yarnQualityNote,
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
      "Cotton yarn discussed by applicable colour, count, grade, and quantity.",
    longDescription:
      "Iniya Fiber supplies cotton yarn with the applicable colour, yarn count, grade, and quantity clarified as part of the enquiry.",
    image: "/images/products/cotton-yarn.webp",
    imageAlt: "Cotton yarn packages arranged for textile production",
    specifications: [
      ["Colour", "Specify the colour needed for the yarn enquiry."],
      ["Yarn count", "Share the requested yarn count."],
      ["Grade", "State the grade to be discussed with the team."],
      ["Quantity", "Include the requested quantity and unit."],
    ].map(([label, copy]) => ({ label: label as CustomisationOption, copy })),
    enquiryFields: ["Colour", "Yarn count", "Grade"],
    customerGroups: allCustomerGroups,
    qualityNote: yarnQualityNote,
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
      "Coloured yarn discussed by shade, count, grade, and quantity.",
    longDescription:
      "Iniya Fiber supplies coloured yarn with colour, yarn count, grade, and quantity clarified as part of the requested supply.",
    image: "/images/products/coloured-yarn.webp",
    imageAlt: "Coloured yarn packages arranged in multiple shades",
    specifications: [
      ["Colour", "Specify the requested yarn colour."],
      ["Yarn count", "Share the requested yarn count."],
      ["Grade", "State the grade to be discussed with the team."],
      ["Quantity", "Include the requested quantity and unit."],
    ].map(([label, copy]) => ({ label: label as CustomisationOption, copy })),
    enquiryFields: ["Colour", "Yarn count", "Grade"],
    customerGroups: allCustomerGroups,
    qualityNote: yarnQualityNote,
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
      "Poly-cotton yarn discussed by blend, colour, count, grade, and quantity.",
    longDescription:
      "Iniya Fiber supplies poly-cotton yarn with the requested blend, colour, yarn count, grade, and quantity discussed before supply.",
    image: "/images/products/poly-cotton-yarn.webp",
    imageAlt: "Poly-cotton yarn packages arranged for textile production",
    specifications: [
      ["Blend", "Share the requested blend for the yarn enquiry."],
      ["Colour", "Specify the colour needed for the yarn."],
      ["Yarn count", "Share the requested yarn count."],
      ["Grade", "State the grade to be discussed with the team."],
      ["Quantity", "Include the requested quantity and unit."],
    ].map(([label, copy]) => ({ label: label as CustomisationOption, copy })),
    enquiryFields: ["Blend", "Colour", "Yarn count", "Grade"],
    customerGroups: allCustomerGroups,
    qualityNote: yarnQualityNote,
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
