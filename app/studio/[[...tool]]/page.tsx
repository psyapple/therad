import type { Metadata } from "next";
import StudioLoader from "../StudioLoader";

export const metadata: Metadata = {
  title: "새벽별 · Studio",
  robots: { index: false, follow: false },
};
export default function StudioPage() {
  return <StudioLoader />;
}
