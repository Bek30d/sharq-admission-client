import Head from "next/head";
import { siteConfig } from "@/config/site.config";
import { ReactNode } from "react";

export interface SeoProps {
  children: ReactNode;
  metaTitle?: string;
  metaDescription?: string;
  author?: string;
  metaKeywords?: string;
}

const SEO = ({
  children,
  author = siteConfig.author,
  metaDescription = siteConfig.metaDescription,
  metaKeywords = siteConfig.metaKeywords,
  metaTitle = siteConfig.metaTitle,
}: SeoProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <title>{metaTitle}</title>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="keyword" content={metaKeywords} />
        <meta name="author" content={author} />
        <meta name="description" content={metaDescription} />
        <link rel="shortcut icon" href={"/favicon.ico"} type="image/x-icon" />
      </Head>
      {children}
    </>
  );
};

export default SEO;
