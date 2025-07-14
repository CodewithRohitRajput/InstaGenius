import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { FiCopy, FiRefreshCw, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
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
        url: "/icon_1.png",
        width: 600,
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
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <footer className="py-6 border-t border-amber-600 pt-10 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2">
                <Image 
                  src="/ig_bg.png"
                  width={100}
                  height={100}
                  alt='Logo'
                />
              </div>
              
              <div className="mt-4 md:mt-0 text-center md:text-right">
                <p className="text-sm text-black dark:text-white">
                  The ultimate AI-powered Instagram bio generator
                </p>
                <p className="text-xs text-black dark:text-white mt-1">
                  © {new Date().getFullYear()} InstaGenius. All rights reserved.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-4">
                <a href="#" className="text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  <FiTwitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  <FiLinkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  <FiGithub className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 flex flex-col md:flex-row justify-between items-center">
              <nav className="flex flex-wrap justify-center space-x-4 md:space-x-6">
                <a href="/terms" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Terms</a>
                <a href="/privacy-policy" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Privacy</a>
                <a href="/about" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">About</a>
                <a href="/contact" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Contact</a>
              </nav>
              
              <div className="mt-4 md:mt-0">
                <p className="text-xs text-black dark:text-white">
                  Made by ROHIT SINGH RAJPUT
                </p>
              </div>
            </div>
          </div>
        </footer>
        {/* ✅ AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8809333825398998"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}