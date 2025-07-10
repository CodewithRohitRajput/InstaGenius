import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from './components/footer/page'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "InstaGenius",
  description: "Free AI powered Instagram caption generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon_1.png" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* < Footer/> */}
        
      </body>
    </html>
  );
}
