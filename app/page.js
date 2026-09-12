"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setCourses(data || []);
    }

    setLoading(false);
  }

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
          background: "#16a34a",
          color: "#fff",
          padding: "18px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>منصات الجو 🎓</h1>
        <p style={{ margin: "8px 0 0" }}>
          منصة الكورسات التعليمية
        </p>
      </header>

      <section
        style={{
          maxWidth: "1000px",
          margin: "auto",
          padding: "30px 20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "30px 20px",
            borderRadius: "20px",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ color: "#16a34a" }}>
            أهلاً بيك في منصات الجو 👋
          </h2>

          <p style={{ color: "#666", lineHeight: "1.8" }}>
            اختار الكورس اللي عايز تتعلمه وابدأ دراستك.
          </p>
        </div>

        <h2>الكورسات 📚</h2>

        {loading ? (
          <p>جاري تحميل الكورسات...</p>
        ) : courses.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            لا توجد كورسات متاحة حاليًا.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.07)",
                }}
              >
                {course.image_url && (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div style={{ padding: "18px" }}>
                  <h3>{course.title}</h3>

                  <p
                    style={{
                      color: "#666",
                      lineHeight: "1.7",
                    }}
                  >
                    {course.description}
                  </p>

                  <button
                    onClick={() =>
                      (window.location.href =
                        `/courses/${course.id}`)
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "#16a34a",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    دخول الكورس
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
        }
