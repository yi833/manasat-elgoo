"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Navigation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav
      dir="rtl"
      style={{
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: "12px 15px",
        fontFamily: "Arial, sans-serif",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <strong
          style={{
            color: "#16a34a",
            fontSize: "20px",
          }}
        >
          منصات الجو 🎓
        </strong>

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <button onClick={() => (window.location.href = "/")}>
            الرئيسية
          </button>

          {user ? (
            <>
              <button
                onClick={() =>
                  (window.location.href = "/profile")
                }
              >
                حسابي 👤
              </button>

              <button
                onClick={logout}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                }}
              >
                خروج
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() =>
                  (window.location.href = "/login")
                }
              >
                تسجيل الدخول
              </button>

              <button
                onClick={() =>
                  (window.location.href = "/register")
                }
              >
                إنشاء حساب
              </button>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        button {
          border: none;
          background: #f3f4f6;
          color: #222;
          padding: 9px 13px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }
      `}</style>
    </nav>
  );
}

async function checkUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
                  }
