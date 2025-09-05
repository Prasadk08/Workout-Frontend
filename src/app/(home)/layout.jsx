// app/home/layout.js
import HomeSidebar from "@/components/homeSidebar";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import ProviderWrapper from "@/app/provider";
// import SidebarLayout from "@/components/SideBarLayout";

export const metadata = {
  title: "FitTrack Pro | Your Personal Workout Companion",
  description:
    "Track workouts, monitor progress, and stay motivated with FitTrack Pro – your ultimate fitness management platform.",
  icons: {
    icon: "/project-icon.png",
  },
};

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100">
        <HomeSidebar />
        <main className="flex-1 md:ms-64">
          <Toaster position="top-center" reverseOrder={false} />
          <ProviderWrapper>{children}</ProviderWrapper>
        </main>
      </body>
    </html>
  );
}
