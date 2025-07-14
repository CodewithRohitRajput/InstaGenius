import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "InstaGenius - Boost Instagram Profile via AI",
    template: "%s | InstaGenius" // This will add " | InstaGenius" to all page titles
  },
  description: "Free AI-powered Instagram tools for captions and bios. Create trendy, optimized content with hashtags.",
  metadataBase: new URL("https://www.instagenius.xyz"),
  alternates: {
    canonical: "/", // Relative canonical for homepage
  },
  openGraph: {
    title: "InstaGenius - AI Instagram Tools",
    description: "Generate professional, trendy Instagram content using AI",
    siteName: "InstaGenius",
    images: [
      {
        url: "/icon_1.png", // Will be resolved to https://www.instagenius.xyz/icon_1.png
        width: 1200,
        height: 630,
        alt: "InstaGenius Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@instagenius", // Add your Twitter handle if available
    images: {
      url: "/icon_1.png",
      alt: "InstaGenius Logo",
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Footer/>
        {/* ✅ AdSense Script - Consider using next/script for better optimization */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8809333825398998"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}