// import CaptionGenerator from './CaptionGenerator';/ // We'll create this component

import CaptionGenerator  from "./CaptionGenerator";

export function generateMetadata() {
  return {
    title: "AI Instagram Caption Generator - InstaGenius",
    description: "Free AI-powered Instagram caption generator with hashtags.",
    alternates: {
      canonical: 'https://www.instagenius.xyz',
    },
    openGraph: {
      title: "AI Instagram Caption Generator - InstaGenius",
      description: "Generate viral Instagram captions with AI",
      url: "https://www.instagenius.xyz",
      images: [
        {
          url: "/icon_1.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    keywords: [
      "instagram caption generator",
      "ai instagram captions",
      "free instagram captions",
      "best instagram captions",
      "instagram reel captions",
      // ... all your other keywords
    ],
  };
}

export default function Home() {
  return <CaptionGenerator />;
}