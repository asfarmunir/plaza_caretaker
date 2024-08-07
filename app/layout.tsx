import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/lib/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Plaza service limited",
  description: " A platform for managing your caretaking services",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <NextTopLoader
          color="green"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          showSpinner={false}
          crawl={true}
          easing="ease"
          speed={200}
          shadow="0 0 5px #2299DD,0 0 5px #2299DD"
        />
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
