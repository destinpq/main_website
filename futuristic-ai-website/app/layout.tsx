import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Viewport } from 'next'
import Script from 'next/script'

export const metadata = {
  title: "DestinPQ - Advanced AI Solutions",
  description: "Pioneering AI and machine learning solutions that transform industries",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Script id="viewport-detector" strategy="afterInteractive">
            {`
              function setViewportCookie() {
                document.cookie = "viewport-width=" + window.innerWidth + "; path=/; max-age=86400";
              }
              
              // Set on load
              setViewportCookie();
              
              // Update on resize
              window.addEventListener('resize', function() {
                setViewportCookie();
                
                // If size changes dramatically, reload to get correct version
                const isMobile = window.innerWidth < 768;
                const url = window.location.pathname;
                const onMobilePage = url.startsWith('/mobile');
                
                if ((isMobile && !onMobilePage) || (!isMobile && onMobilePage)) {
                  window.location.reload();
                }
              });
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  )
}