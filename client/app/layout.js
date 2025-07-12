import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AdsenseScript from "./adsense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "InstaGenius - AI Instagram Caption Generator",
  description: "Free AI-powered Instagram caption generator that helps you create trendy and optimized captions with hashtags.",
  metadataBase: new URL("https://www.instagenius.xyz"),
  openGraph: {
    title: "InstaGenius - AI Caption Generator",
    description: "Generate professional, trendy captions using AI",
    url: "https://www.instagenius.xyz",
    siteName: "InstaGenius",
    images: [
      {
        url: "/icon_1.png", // or full URL if needed
        width: 800,
        height: 600,
        alt: "InstaGenius Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InstaGenius",
    description: "Free AI Instagram caption generator",
    images: ["/icon_1.png"],
  },
  icons: {
    icon: "https://www.instagenius.xyz/icon_1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
         <AdsenseScript /> 
        {children}
      </body>
    </html>
  );
}
