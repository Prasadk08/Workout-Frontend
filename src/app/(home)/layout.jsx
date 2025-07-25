// app/home/layout.js
import HomeSidebar from "@/components/homeSidebar";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import ProviderWrapper from "@/app/provider";

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100">
        <HomeSidebar />
        <main className="flex-1 p-4">
          <Toaster position="top-center" reverseOrder={false} />
          <ProviderWrapper>{children}</ProviderWrapper>
        </main>
      </body>
    </html>
  );
}
