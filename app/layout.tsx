import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  title: "LinEnum.sh - Don't Be a Dumbass | Security Education",
  description: "Scripted Local Linux Enumeration & Privilege Escalation Checks - Learn why you shouldn't blindly execute scripts from the internet",
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
    description: 'Learn why you should never blindly execute scripts from the internet. Educational security project.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LinEnum.sh - Security Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinEnum.sh - Don\'t Be a Dumbass',
    description: 'Scripted Local Linux Enumeration & Privilege Escalation Checks - Learn security best practices',
    images: ['/og-image.png'],
    creator: '@thedr0pperx',
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
      </head>
      <body className={inter.className}>
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

