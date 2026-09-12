"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function CoursePage({ params }) {
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, []);

  async function loadCourse() {
    const { id } = await params;

    const { data: courseData } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    const { data: lessonsData } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", id)
      .order("created_at", { ascending: true });

    setCourse(courseData);
    setLessons(lessonsData || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        style={{
          padding: "40px",
          textAlign: "center",
          fontFamily: "Arial",
        }}
      >
        جاري تحميل الكورس...
      </main>
    );
  }

  if (!course) {
    return (
      <main
        dir="rtl"
        style={{
          padding: "40px",
          textAlign: "center",
          fontFamily: "Arial",
        }}
      >
        <h2>الكورس غير موجود</h2>
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
            marginBottom: "25px",
          }}
        >
          {course.image_url && (
            <img
              src={course.image_url}
              alt={course.title}
              style={{
                width: "100%",
                maxHeight: "350px",
                objectFit: "cover",
                borderRadius: "15px",
                marginBottom: "20px",
              }}
            />
          )}

          <h1 style={{ color: "#16a34a" }}>
            {course.title}
          </h1>

          <p style={{ color: "#666", lineHeight: "1.8" }}>
            {course.description}
          </p>
        </div>

        <h2>دروس الكورس 📚</h2>

        {lessons.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            لا توجد دروس في هذا الكورس حتى الآن.
          </div>
        ) : (
          lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "15px",
                marginBottom: "15px",
              }}
            >
              <h3>
                {index + 1}. {lesson.title}
              </h3>

              {lesson.content && (
                <p
                  style={{
                    color: "#555",
                    lineHeight: "1.8",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {lesson.content}
                </p>
              )}

              {lesson.video_url && (
                <a
                  href={lesson.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    padding: "12px 20px",
                    background: "#16a34a",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                >
                  مشاهدة الفيديو ▶️
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
                    }
