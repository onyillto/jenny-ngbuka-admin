"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push("/adminaccess/dashboard");
      } else {
        const data = await response.json();
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex w-screen lg:h-screen">
      {/* Left Side */}
      <div className="hidden md:flex md:w-[40%] bg-[#3F3F8F] text-white p-10 flex-col items-center justify-center lg:h-screen">
        {/* Centered Image and Text */}
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <Image
            src="/illustrations/auth.svg"
            alt="Dashboard Preview"
            width={600}
            height={600}
            className="rounded-lg w-full h-auto max-w-[90%]"
            priority
          />

          <div>
            <h1 className="text-2xl font-bold mb-4">Ngbuka Admin</h1>
            <ul className="space-y-2 list-disc list-inside text-lg">
              <li>Manage and control your app like a pro</li>
              <li>Have insights and analytics from your app</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-[60%] flex items-center justify-center px-6 py-12 bg-white lg:h-screen rounded-l-3xl">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-10">
            <div className="flex flex-col items-center">
              <img
                src="/images/logo.svg"
                alt="Ngbuka Admin"
                className="h-10 mb-4"
              />
              <span className="text-2xl font-bold text-[#4c5bb5]">
                <span className="text-[#FF8C00]">Admin</span>
              </span>
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Hi, welcome
            </h2>
            <p className="text-gray-600">Log into your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#4c5bb5] focus:border-[#4c5bb5] outline-none"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#4c5bb5] focus:border-[#4c5bb5] outline-none"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#4c5bb5] focus:ring-[#4c5bb5] bg-gray-700 border-gray-600 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-700"
              >
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4c5bb5] text-white py-3 rounded-lg font-medium hover:bg-[#3c4a9e] transition duration-200"
            >
              Login
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Forgot Password?{" "}
                <Link
                  href="/recover-password"
                  className="text-[#FF8C00] hover:underline"
                >
                  Recover it here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
