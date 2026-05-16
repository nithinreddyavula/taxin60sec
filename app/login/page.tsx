"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (
      username === "admin" &&
      password === "taxin60sec"
    ) {

      localStorage.setItem("admin-auth", "true");

      router.push("/admin");

    } else {

      alert("Invalid Credentials");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md p-10 rounded-[30px] shadow-lg">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
          Admin Login
        </p>

        <h1 className="text-4xl font-bold mb-10">
          Welcome Back
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-5 rounded-xl border border-gray-300 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-5 rounded-xl border border-gray-300 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}