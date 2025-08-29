import "../globals.css";

export default function LoadingLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100">
        <main className="flex-1 md:ms-64">{children}</main>
      </body>
    </html>
  );
}
