import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: "LinEnum.sh - Scripted Local Linux Enumeration & Privilege Escalation Checks",
  description: "Automated Linux enumeration and privilege escalation checks for penetration testers and security researchers. Quick identification of privilege escalation vectors.",
  keywords: [
    "linenum",
    "linenum.sh",
    "linux enumeration",
    "privilege escalation",
    "security",
    "pentesting",
    "cybersecurity",
    "linux security",
    "enumeration script",
  ],
  authors: [{ name: "thedr0pperx" }],
  creator: "thedr0pperx",
  publisher: "linenum.sh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://linenum.sh',
    siteName: 'LinEnum.sh',
    title: 'LinEnum.sh - Scripted Local Linux Enumeration & Privilege Escalation Checks',
    description: 'Automated Linux enumeration and privilege escalation checks for penetration testers and security researchers worldwide.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'LinEnum.sh - Security Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinEnum.sh - Linux Enumeration & Privilege Escalation',
    description: 'Automated security enumeration script for penetration testing and security research. Quick privilege escalation checks.',
    images: ['/logo.png'],
    creator: '@thedr0pperx',
  },
  icons: {
    icon: [
      { url: '/favicons/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/favicons/site.webmanifest' },
    ],
  },
  metadataBase: new URL('https://linenum.sh'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="canonical" href="https://linenum.sh" />
        <meta name="google-site-verification" content="your-verification-code" />
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RWQRL9Y09N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RWQRL9Y09N');
          `}
        </Script>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#00FF41',
              color: '#000',
              fontWeight: 'bold',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}

