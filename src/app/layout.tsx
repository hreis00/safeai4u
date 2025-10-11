import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/navigation/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import { BASE_SEO, generateOrganizationStructuredData } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: BASE_SEO.defaultTitle,
    template: BASE_SEO.titleTemplate,
  },
  description: BASE_SEO.defaultDescription,
  keywords: BASE_SEO.defaultKeywords,
  authors: [{ name: BASE_SEO.author }],
  creator: BASE_SEO.author,
  publisher: BASE_SEO.organization,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: BASE_SEO.type,
    locale: BASE_SEO.locale,
    url: BASE_SEO.siteUrl,
    siteName: BASE_SEO.siteName,
    title: BASE_SEO.defaultTitle,
    description: BASE_SEO.defaultDescription,
    images: [
      {
        url: `${BASE_SEO.siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: BASE_SEO.defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BASE_SEO.defaultTitle,
    description: BASE_SEO.defaultDescription,
    creator: "@safeai4u",
    images: [`${BASE_SEO.siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: BASE_SEO.siteUrl,
  },
  category: "Technology",
  verification: {
    google: "google-site-verification-code", // To be replaced with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationStructuredData = generateOrganizationStructuredData();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
              success: {
                iconTheme: {
                  primary: 'hsl(var(--primary))',
                  secondary: 'hsl(var(--primary-foreground))',
                },
              },
              error: {
                iconTheme: {
                  primary: 'hsl(var(--destructive))',
                  secondary: 'hsl(var(--destructive-foreground))',
                },
              },
            }}
          />
        </ErrorBoundary>
      </body>
    </html>
  );
}
