import type { AnchorHTMLAttributes } from "react";

type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

/**
 * Internal navigation that remains a native browser link in every runtime.
 *
 * The public Sites runtime currently cancels `next/link` navigation when its
 * RSC client router fails. A plain anchor preserves standard click, keyboard,
 * open-in-new-tab, and context-menu behaviour while keeping the same markup
 * and styling hooks.
 */
export default function SiteLink({ href, children, ...props }: SiteLinkProps) {
  return <a href={href} {...props}>{children}</a>;
}
