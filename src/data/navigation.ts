export type NavigationItem = {
  readonly label: string;
  readonly href: `/${string}` | "/";
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Quality", href: "/quality-capabilities" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavigationItem[];
