import Image from "next/image";

type BrandLogoProps = {
  size?: "header" | "footer" | "feature";
  priority?: boolean;
};

const sizes = {
  header: { width: 58, height: 59 },
  footer: { width: 82, height: 83 },
  feature: { width: 280, height: 283 },
};

export function BrandLogo({ size = "header", priority = false }: BrandLogoProps) {
  const dimensions = sizes[size];
  return (
    <span className={`brand-logo brand-logo-${size}`}>
      <Image
        src="/brand-logo.png"
        width={dimensions.width}
        height={dimensions.height}
        alt="새벽별 심리상담센터 로고"
        priority={priority}
      />
    </span>
  );
}
