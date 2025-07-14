import BioClient from './BioClient';

export const metadata = {
  title: "AI Instagram Bio Generator - InstaGenius",
  description: "Create perfect Instagram bios with AI. Professional, creative bios optimized for profiles.",
  alternates: {
    canonical: 'https://www.instagenius.xyz/bio',
  },
  openGraph: {
    title: "AI Instagram Bio Generator - InstaGenius",
    description: "Generate professional Instagram bios in seconds",
    url: "https://www.instagenius.xyz/bio",
    images: [
      {
        url: "/icon_1.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Instagram Bio Generator - InstaGenius",
    description: "Generate professional Instagram bios in seconds",
    images: ["/icon_1.png"],
  },
};

export default function BioPage() {
  return <BioClient />;
}