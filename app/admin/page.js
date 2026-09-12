"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

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

    setUser(user);

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!error && profile?.role === "admin") {
      setAllowed(true);
    } else {
      setAllowed(false);
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
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
        <h2>جاري التحقق من الصلاحيات...</h2>
      </main>
    );
  }

  if (!allowed) {
    return (
      <main
        dir="rtl"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f7fb",
          fontFamily: "Arial",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h1>🚫 غير مسموح</h1>
          <p>هذه الصفحة مخصصة للأدمن فقط.</p>

          <button
            onClick={() => (window.location.href = "/")}
            style={{
              padding: "12px 25px",
              border: "none",
              borderRadius: "10px",
              background: "#16a34a",
              color: "#fff",
              fontSize: "16px",
            }}
          >
            العودة للرئيسية
          </button>
        </div>
      </main>
    );
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
          background: "#fff",
          padding: "18px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h1 style={{ margin: 0, color: "#16a34a" }}>
          👑 لوحة تحكم منصات الجو
        </h1>

        <button
          onClick={logout}
          style={{
            padding: "10px 18px",
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          تسجيل الخروج
        </button>
      </header>

      <section style={{ padding: "30px 20px" }}>
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "18px",
            marginBottom: "20px",
          }}
        >
          <h2>مرحبًا بك أيها الأدمن 👋</h2>

          <p style={{ color: "#666" }}>
            الحساب المسجل حاليًا:
          </p>

          <strong>{user?.email}</strong>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200
