import Image from "next/image";

type BrandLogoProps = {
  size?: "header" | "footer" | "feature";
  priority?: boolean;
};

const sizes = {
  header: { width: 60, height: 40 },
  footer: { width: 72, height: 48 },
  feature: { width: 360, height: 240 },
};

export function BrandLogo({ size = "header", priority = false }: BrandLogoProps) {
  const dimensions = sizes[size];
  return (
    <span className={`brand-logo brand-logo-${size}`}>
      <Image
        src="/brand-symbol.png"
        width={dimensions.width}
        height={dimensions.height}
        alt="새벽별 별 캐릭터 심벌"
        priority={priority}
      />
    </span>
  );
}

