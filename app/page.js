export default function Home() {
  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* الهيدر */}
      <header
        style={{
          background: "#ffffff",
          padding: "18px 6%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "28px" }}>
          🚀 منصات الجو
        </h1>

        <button
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          تسجيل الدخول
        </button>
      </header>

      {/* الترحيب */}
      <section
        style={{
          textAlign: "center",
          padding: "70px 20px",
          background: "#111827",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: "42px", marginBottom: "15px" }}>
          أهلاً بيك في منصات الجو 🎓
        </h2>

        <p style={{ fontSize: "20px", color: "#d1d5db" }}>
          منصة عربية للتعلم والكورسات التعليمية
        </p>

        <button
          style={{
            marginTop: "20px",
            background: "#22c55e",
            color: "#fff",
            border: "none",
            padding: "14px 30px",
            borderRadius: "10px",
            fontSize: "18px",
          }}
        >
          تصفح الكورسات
        </button>
      </section>

      {/* الكورسات */}
      <section style={{ padding: "50px 6%" }}>
        <h2 style={{ textAlign: "center", fontSize: "30px" }}>
          أحدث الكورسات 📚
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
            marginTop: "35px",
          }}
        >
          <CourseCard
            title="كورس الرياضيات"
            description="تعلم الرياضيات بطريقة سهلة وبسيطة."
          />

          <CourseCard
            title="كورس الكيمياء"
            description="شرح مبسط ومراجعات شاملة."
          />

          <CourseCard
            title="كورس الفيزياء"
            description="افهم الفيزياء خطوة بخطوة."
          />
        </div>
      </section>

      {/* الفوتر */}
      <footer
        style={{
          background: "#111827",
          color: "#fff",
          textAlign: "center",
          padding: "25px",
          marginTop: "30px",
        }}
      >
        © 2026 منصات الجو - جميع الحقوق محفوظة
      </footer>
    </main>
  );
}

function CourseCard({ title, description }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          height: "120px",
          background: "#e5e7eb",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "45px",
        }}
      >
        📚
      </div>

      <h3 style={{ fontSize: "22px" }}>{title}</h3>

      <p style={{ color: "#6b7280", lineHeight: "1.7" }}>
        {description
