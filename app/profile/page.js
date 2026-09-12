"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      window.location.href = "/login";
      return;
    }

    setUser(data.user);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
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
        جاري تحميل الحساب...
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
          maxWidth: "500px",
          margin: "50px auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#16a34a",
          }}
        >
          حسابي 👤
        </h1>

        <div
          style={{
            background: "#f5f7fb",
            padding: "18px",
            borderRadius: "12px",
            marginTop: "25px",
          }}
        >
          <p>
            <strong>البريد الإلكتروني:</strong>
          </p>

          <p style={{ wordBreak: "break-all" }}>
            {user?.email}
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "20px",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          الصفحة الرئيسية
        </button>

        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "12px",
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          تسجيل الخروج
        </button>
      </div>
    </main>
  );
          }
