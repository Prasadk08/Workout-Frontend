import { Toaster } from "react-hot-toast";
import "../globals.css";
import  ProviderWrapper  from "@/app/provider";

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
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
