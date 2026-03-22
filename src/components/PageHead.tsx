import { useEffect } from "react";
import { seoConfig } from "@/lib/config";

interface PageHeadProps {
  page: keyof typeof seoConfig.seo;
}

export default function PageHead({ page }: PageHeadProps) {
  const meta = seoConfig.seo[page];

  useEffect(() => {
    if (meta?.title) document.title = meta.title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag && meta?.description) {
      descTag.setAttribute("content", meta.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && meta?.title) ogTitle.setAttribute("content", meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && meta?.description) ogDesc.setAttribute("content", meta.description);
  }, [meta]);

  return null;
}
