export type ProductSlug =
  | "recycled-cotton-hard-waste"
  | "recycled-clipping-waste"
  | "processed-fibres"
  | "recycled-yarn"
  | "cotton-yarn"
  | "coloured-yarn"
  | "poly-cotton-yarn";

export type ProductGroupId = "recycled-materials" | "fibres" | "yarns";

export type ProductPriority = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type CustomisationOption =
  | "Fibre type"
  | "Blend"
  | "Colour"
  | "Yarn count"
  | "Grade";

type ProductBase = {
  readonly name: string;
  readonly slug: ProductSlug;
  readonly group: ProductGroupId;
  readonly priority: ProductPriority;
  readonly shortDescription: string;
  readonly catalogueDescription: string;
  readonly enquiryFields: readonly CustomisationOption[];
  readonly image: `/images/products/${string}.webp`;
  readonly imageAlt: string;
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

export const productGroups = [
  {
    id: "recycled-materials",
    label: "Recycled Materials",
    copy: "Recovered textile inputs for further processing and supply discussions.",
  },
  {
    id: "fibres",
    label: "Fibres",
    copy: "Processed fibre options supplied to the required specification.",
  },
  {
    id: "yarns",
    label: "Yarns",
    copy: "Yarn options defined by count, colour, blend, and grade.",
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
    priority: 1,
    shortDescription:
      "Recycled cotton hard waste for further textile processing and spinning requirements.",
    catalogueDescription:
      "Recycled cotton hard waste is supplied for further textile processing and spinning requirements. Grade, quantity, and intended use are confirmed before supply.",
    enquiryFields: ["Fibre type", "Grade"],
    image: "/images/products/recycled-cotton-hard-waste.webp",
    imageAlt:
      "Recycled cotton hard waste shown in compressed bales for textile processing",
  },
  {
    name: "Recycled Clipping Waste",
    slug: "recycled-clipping-waste",
    group: "recycled-materials",
    priority: 2,
    shortDescription:
      "Recycled clipping waste for material-led textile supply requirements.",
    catalogueDescription:
      "Recycled clipping waste is supplied for further textile processing. Fibre details, grade, quantity, and intended use are confirmed before processing or dispatch is planned.",
    enquiryFields: ["Fibre type", "Grade"],
    image: "/images/products/recycled-clipping-waste.webp",
    imageAlt: "Recycled textile clipping waste shown in sorted bulk form",
  },
  {
    name: "Processed Fibres",
    slug: "processed-fibres",
    group: "fibres",
    priority: 3,
    shortDescription:
      "Processed fibre options shaped around the buyer's material brief.",
    catalogueDescription:
      "Processed fibre options are defined by the required fibre type, blend, colour, and grade. Quantity and intended use are confirmed before supply.",
    enquiryFields: ["Fibre type", "Blend", "Colour", "Grade"],
    image: "/images/products/processed-fibres.webp",
    imageAlt: "Processed textile fibres shown in loose form",
  },
  {
    name: "Recycled Yarn",
    slug: "recycled-yarn",
    group: "yarns",
    priority: 4,
    shortDescription: "Recycled yarn available from 6s–40s count.",
    catalogueDescription:
      "Recycled yarn is available in the confirmed 6s–40s count range. Fibre type, blend, colour, grade, quantity, and intended use are confirmed before supply.",
    enquiryFields: ["Fibre type", "Blend", "Colour", "Yarn count", "Grade"],
    image: "/images/products/recycled-yarn.webp",
    imageAlt: "Recycled yarn packages arranged for textile production",
    countRange: "6s–40s",
  },
  {
    name: "Cotton Yarn",
    slug: "cotton-yarn",
    group: "yarns",
    priority: 5,
    shortDescription:
      "Cotton yarn discussed against the parameters in the supply brief.",
    catalogueDescription:
      "Cotton yarn is supplied according to the required colour, count, grade, and quantity. Intended textile use is confirmed before the specification is agreed.",
    enquiryFields: ["Colour", "Yarn count", "Grade"],
    image: "/images/products/cotton-yarn.webp",
    imageAlt: "Cotton yarn packages arranged for textile production",
  },
  {
    name: "Coloured Yarn",
    slug: "coloured-yarn",
    group: "yarns",
    priority: 6,
    shortDescription:
      "Coloured yarn discussed against the required shade and yarn parameters.",
    catalogueDescription:
      "Coloured yarn is reviewed against the required shade, count, grade, and quantity. Intended use is confirmed before the supply specification is agreed.",
    enquiryFields: ["Colour", "Yarn count", "Grade"],
    image: "/images/products/coloured-yarn.webp",
    imageAlt: "Coloured yarn packages arranged in multiple shades",
  },
  {
    name: "Poly-Cotton Yarn",
    slug: "poly-cotton-yarn",
    group: "yarns",
    priority: 7,
    shortDescription:
      "Poly-cotton yarn discussed against the required blend and yarn parameters.",
    catalogueDescription:
      "Poly-cotton yarn is reviewed against the required blend, colour, count, grade, and quantity. End use is confirmed before the supply specification is agreed.",
    enquiryFields: ["Blend", "Colour", "Yarn count", "Grade"],
    image: "/images/products/poly-cotton-yarn.webp",
    imageAlt: "Poly-cotton yarn packages arranged for textile production",
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
