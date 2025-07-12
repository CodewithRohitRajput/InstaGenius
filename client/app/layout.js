import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from 'next/head'

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
    icon: "/icon_1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <Head>
      <link rel="icon" href="https://www.instagenius.xyz/favicon.ico"  />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8809333825398998"
     crossorigin="anonymous"></script>
    </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
