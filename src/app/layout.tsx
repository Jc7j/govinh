import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {NextUIProvider} from "@nextui-org/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Govin Huynh | Real Estate Agent",
  description: "Govin Huynh | Real Estate Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source src="https://res.cloudinary.com/ds9k7nemd/video/upload/v1724302607/7578547-uhd_3840_2160_30fps_oolnxo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="content-overlay">
          <NextUIProvider>{children}</NextUIProvider>
        </div>
      </body>
    </html>
  );
}
