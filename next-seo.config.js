/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "nextjs-with-react-query",
  titleTemplate: "%s | nextjs-with-react-query",
  defaultTitle: "nextjs-with-react-query",
  description: "Next.js + chakra-ui + TypeScript template",
  openGraph: {
    url: "http://localhost:3000",
    title: "nextjs-with-react-query",
    description: "Next.js + chakra-ui + TypeScript template",
    images: [
      {
        url: "http://localhost:3000",
        alt: "nextjs-with-react-query og-image",
      },
    ],
    site_name: "nextjs-with-react-query",
  },
};

export default defaultSEOConfig;
