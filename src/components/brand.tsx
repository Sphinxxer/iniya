import Image from "next/image";
import Link from "next/link";

export function Brand({ priority = false }: { priority?: boolean }) {
  return (
    <Link className="wordmark" href="/" aria-label="Iniya Fiber home">
      <Image
        className="wordmark__image"
        src="/images/iniya-fiber-logo.png"
        alt=""
        width={2815}
        height={805}
        priority={priority}
        unoptimized
        sizes="140px"
      />
    </Link>
  );
}
