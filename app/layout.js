export const metadata = {
  title: "منصات الجو",
  description: "منصة الجو - منصة كورسات تعليمية عربية",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
    }
