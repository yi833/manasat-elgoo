import Navigation from "./components/Navigation";

export const metadata = {
  title: "منصات الجو",
  description: "منصة منصات الجو التعليمية",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0 }}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
