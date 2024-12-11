import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "config/material-tailwind-theme-provider";
import ReactQueryClientProvider from "config/ReactQueryClientProvider";
import MainLayout from "components/layouts/main-layout";
import Auth from "components/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = false;

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <ThemeProvider>
            {loggedIn ? <MainLayout>{children}</MainLayout> : <Auth />}
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
