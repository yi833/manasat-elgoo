"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");

    if (!email || !password || !confirmPassword) {
      setMessage("من فضلك املأ جميع البيانات");
      return;
    }

    if (password.length < 6) {
      setMessage("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("كلمتا المرور غير متطابقتين");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "تم إنشاء الحساب بنجاح ✅ إذا طلب منك تأكيد البريد، افتح رسالة التأكيد."
    );

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLoading(false);
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
        onSubmit={handleRegister}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#16a34a",
            marginBottom: "10px",
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
          إنشاء حساب جديد
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
          placeholder="كلمة المرور"
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

        <label>تأكيد كلمة المرور</label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="أعد كتابة كلمة المرور"
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
          }}
        >
          {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
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
