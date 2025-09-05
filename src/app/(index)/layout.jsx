import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ProviderWrapper from "@/app/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitTrack Pro | Your Personal Workout Companion",
  description:
    "Track workouts, monitor progress, and stay motivated with FitTrack Pro – your ultimate fitness management platform.",
  icons: {
    icon: "/project-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1 min-h-screen">
          <Toaster position="top-center" reverseOrder={false} />
          <ProviderWrapper>{children}</ProviderWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
