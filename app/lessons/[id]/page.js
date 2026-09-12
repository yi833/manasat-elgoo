"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LessonPage({ params }) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, []);

  async function loadLesson() {
    const { id } = await params;

    const { data, error } = await supabase
      .from("lessons")
      .select(`
        id,
        title,
        video_url,
        content,
        course_id,
        courses (
          title
        )
      `)
      .eq("id", id)
      .single();

    if (!error) {
      setLesson(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial",
        }}
      >
        جاري تحميل الدرس...
      </main>
    );
  }

  if (!lesson) {
    return (
      <main
        dir="rtl"
        style={{
          padding: "40px",
          textAlign: "center",
          fontFamily: "Arial",
        }}
      >
        <h2>الدرس غير موجود ❌</h2>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <p style={{ color: "#16a34a", fontWeight: "bold" }}>
            {lesson.courses?.title || "الكورس"}
          </p>

          <h1>{lesson.title}</h1>

          {lesson.video_url && (
            <div style={{ marginTop: "25px" }}>
              <video
                src={lesson.video_url}
                controls
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  borderRadius: "15px",
                  background: "#000",
                }}
              >
                المتصفح لا يدعم تشغيل الفيديو.
              </video>
            </div>
          )}

          {lesson.content && (
            <div
              style={{
                marginTop: "25px",
                lineHeight: "2",
                fontSize: "17px",
                whiteSpace: "pre-wrap",
              }}
            >
              {lesson.content}
            </div>
          )}

          <button
            onClick={() =>
              (window.location.href =
                `/courses/${lesson.course_id}`)
            }
            style={{
              marginTop: "25px",
              padding: "13px 20px",
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            الرجوع للكورس
          </button>
        </div>
      </div>
    </main>
  );
          }
