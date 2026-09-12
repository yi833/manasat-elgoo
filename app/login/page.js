"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setMessage("من فضلك اكتب البريد الإلكتروني وكلمة المرور");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      setLoading(false);
      return;
    }

    setMessage("تم تسجيل الدخول بنجاح ✅");

    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#16a34a",
          }}
        >
          منصات الجو
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "25px",
          }}
        >
          تسجيل الدخول
        </p>

        <label>البريد الإلكتروني</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "8px",
            marginBottom: "18px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <label>كلمة المرور</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="اكتب كلمة المرور"
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "8px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading ? "#999" : "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "جاري تسجيل الدخول..." : "دخول"}
        </button>

        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "18px",
              color: message.includes("بنجاح") ? "#16a34a" : "#dc2626",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </main>
  );
    }
