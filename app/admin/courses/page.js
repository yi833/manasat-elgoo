"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function CoursesAdmin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      window.location.href = "/";
      return;
    }

    await loadCourses();
    setLoading(false);
  }

  async function loadCourses() {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setCourses(data || []);
    }
  }

  async function addCourse(e) {
    e.preventDefault();
    setMessage("");

    if (!title.trim()) {
      setMessage("اكتب اسم الكورس أولًا");
      return;
    }

    const { error } = await supabase.from("courses").insert({
      title: title.trim(),
      description: description.trim(),
      image_url: imageUrl.trim(),
    });

    if (error) {
      setMessage("حدث خطأ أثناء إضافة الكورس: " + error.message);
      return;
    }

    setMessage("تم إضافة الكورس بنجاح ✅");
    setTitle("");
    setDescription("");
    setImageUrl("");
    await loadCourses();
  }

  async function deleteCourse(id) {
    const confirmed = window.confirm("هل تريد حذف هذا الكورس؟");

    if (!confirmed) return;

    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage("حدث خطأ أثناء الحذف");
      return;
    }

    setMessage("تم حذف الكورس ✅");
    await loadCourses();
  }

  if (loading) {
    return (
      <main dir="rtl" style={{ padding: "40px", fontFamily: "Arial" }}>
        <h2>جاري التحميل...</h2>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "25px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <button
        onClick={() => (window.location.href = "/admin")}
        style={{
          padding: "10px 18px",
          border: "none",
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          marginBottom: "20px",
        }}
      >
        ← لوحة التحكم
      </button>

      <h1 style={{ color: "#16a34a" }}>📚 إدارة الكورسات</h1>

      <form
        onSubmit={addCourse}
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "18px",
          maxWidth: "600px",
          marginBottom: "30px",
        }}
      >
        <h2>إضافة كورس جديد</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="اسم الكورس"
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="وصف الكورس"
          rows="4"
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="رابط صورة الكورس - اختياري"
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "17px",
            fontWeight: "bold",
          }}
        >
          إضافة الكورس
        </button>

        {message && (
          <p style={{ marginTop: "15px", fontWeight: "bold" }}>
            {message}
          </p>
        )}
      </form>

      <h2>الكورسات الموجودة</h2>

      {courses.length === 0 ? (
        <p>لا توجد كورسات حتى الآن.</p>
      ) : (
        courses.map((course) => (
          <div
            key={course.id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "15px",
              maxWidth: "700px",
            }}
          >
            <h2>{course.title}</h2>

            <p>{course.description}</p>

            {course.image_url && (
              <img
                src={course.image_url}
                alt={course.title}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "10px",
                }}
              />
            )}

            <br />

            <button
              onClick={() => deleteCourse(course.id)}
              style={{
                marginTop: "15px",
                padding: "10px 18px",
                background: "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
              }}
            >
              حذف الكورس
            </button>
          </div>
        ))
      )}
    </main>
  );
}
