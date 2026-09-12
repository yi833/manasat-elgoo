"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // الكورسات هتتضاف من لوحة الأدمن لاحقًا
    setCourses([]);
  }, []);

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          background: "#111827",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>منصات الجو</h1>
        <p style={{ margin: "8px 0 0", color: "#d1d5db" }}>
          منصة الكورسات التعليمية
        </p>
      </header>

      <section
        style={{
          maxWidth: "1100px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "35px 20px",
            textAlign: "center",
            boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>
            أهلاً بيك في منصات الجو 👋
          </h2>

          <p style={{ color: "#6b7280", fontSize: "18px" }}>
            اختار الكورس اللي عايز تتعلمه
          </p>
        </div>

        <h2 style={{ marginTop: "40px" }}>الكورسات</h2>

        {courses.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
              color: "#6b7280",
              marginTop: "20px",
            }}
          >
            لا توجد كورسات متاحة حاليًا
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "15px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                }}
              >
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer
        style={{
          textAlign: "center",
          padding: "25px",
          color: "#6b7280",
        }}
      >
        © 2026 منصات الجو
      </footer>
    </main>
  );
}
