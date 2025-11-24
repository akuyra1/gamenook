import type { Metadata } from "next";
import "@/app/styles/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata: Metadata = {
  title: "42 Games Later",
  description: "An online database of all video games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="body-container h-full m-0 p-0 overflow-x-hidden">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
