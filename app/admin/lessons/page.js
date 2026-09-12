"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminLessonsPage() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      window.location.href = "/login";
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      setMessage("غير مسموح لك بالدخول إلى هذه الصفحة");
      setLoading(false);
      return;
    }

    setUser(data.user);

    await loadCourses();
    await loadLessons();

    setLoading(false);
  }

  async function loadCourses() {
    const { data, error } = await supabase
      .from("courses")
      .select("id, title")
      .order("created_at", { ascending: false });

    if (!error) {
      setCourses(data || []);
    }
  }

  async function loadLessons() {
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
      .order("created_at", { ascending: false });

    if (!error) {
      setLessons(data || []);
    }
  }

  async function addLesson(e) {
    e.preventDefault();

    if (!courseId || !title) {
      setMessage("اختار الكورس واكتب اسم الدرس");
      return;
    }

    setSaving(true);
    setMessage("");

    const { error } = await supabase.from("lessons").insert({
      course_id: Number(courseId),
      title,
      video_url: videoUrl,
      content,
    });

    if (error) {
      setMessage("حصل خطأ أثناء إضافة الدرس");
      setSaving(false);
      return;
    }

    setMessage("تم إضافة الدرس بنجاح ✅");

    setCourseId("");
    setTitle("");
    setVideoUrl("");
    setContent("");

    await loadLessons();

    setSaving(false);
  }

  async function deleteLesson(id) {
    const confirmed = window.confirm("هل تريد حذف هذا الدرس؟");

    if (!confirmed) return;

    const { error } = await supabase
      .from("lessons")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage("حصل خطأ أثناء حذف الدرس");
      return;
    }

    setMessage("تم حذف الدرس ✅");
    await loadLessons();
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
        جاري التحميل...
      </main>
    );
  }

  if (!user && message) {
    return (
      <main
        dir="rtl"
        style={{
          padding: "30px",
          textAlign: "center",
          fontFamily: "Arial",
        }}
      >
        <h2>{message}</h2>
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
        <h1
          style={{
            color: "#16a34a",
            marginBottom: "5px",
          }}
        >
          إدارة الدروس 📚
        </h1>

        <p style={{ color: "#666" }}>
          إضافة وإدارة دروس الكورسات
        </p>

        <form
          onSubmit={addLesson}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "18px",
            marginTop: "25px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h2>إضافة درس جديد</h2>

          <label>اختار الكورس</label>

          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "8px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          >
            <option value="">-- اختار الكورس --</option>

            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          <label>اسم الدرس</label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثال: الدرس الأول"
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "8px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <label>رابط الفيديو</label>

          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="ضع رابط الفيديو هنا"
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "8px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <label>محتوى الدرس</label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="اكتب شرح الدرس هنا..."
            rows="5"
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "8px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "16px",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />

          <button
            type="submit"
            disabled={saving}
            style={{
              width: "100%",
              padding: "14px",
              background: saving ? "#999" : "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "17px",
              fontWeight: "bold",
            }}
          >
            {saving ? "جاري الحفظ..." : "إضافة الدرس"}
          </button>

          {message && (
            <p
              style={{
                textAlign: "center",
                marginTop: "15px",
                fontWeight: "bold",
                color: message.includes("بنجاح")
                  ? "#16a34a"
                  : "#dc2626",
              }}
            >
              {message}
            </p>
          )}
        </form>

        <section style={{ marginTop: "30px" }}>
          <h2>الدروس الموجودة</h2>

          {lessons.length === 0 ? (
            <p style={{ color: "#666" }}>
              لا توجد دروس حتى الآن.
            </p>
          ) : (
            lessons.map((lesson) => (
              <div
                key={lesson.id}
                style={{
                  background: "#fff",
                  padding: "18px",
                  borderRadius: "16px",
                  marginBottom: "15px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                }}
              >
                <h3>{lesson.title}</h3>

                <p style={{ color: "#666" }}>
                  الكورس:{" "}
                  {lesson.courses?.title || "غير معروف"}
                </p>

                {lesson.video_url && (
                  <p
                    style={{
                      wordBreak: "break-all",
                      color: "#2563eb",
                    }}
                  >
                    {lesson.video_url}
                  </p>
                )}

                {lesson.content && (
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {lesson.content}
                  </p>
                )}

                <button
                  onClick={() => deleteLesson(lesson.id)}
                  style={{
                    padding: "10px 18px",
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                  }}
                >
                  حذف الدرس
                </button>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
    }
