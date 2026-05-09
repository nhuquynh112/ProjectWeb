import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result.error) {
      setError("Sai tên đăng nhập hoặc mật khẩu");
    } else {
      router.push("/");
    }
  };

  const fillCredentials = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError("");
  };

  return (
    <div className="login-root">
      {/* Animated background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="login-card">
        <div className="login-logo">🔐</div>
        <h1 className="login-title">Đăng Nhập</h1>
        <p className="login-sub">NextAuth Token Refresh Demo</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-wrap">
            <span className="input-icon">👤</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              required
              autoFocus
            />
          </div>

          <div className="input-wrap">
            <span className="input-icon">🔑</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>

          {error && <div className="login-error">⚠️ {error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : "Đăng Nhập →"}
          </button>
        </form>

        <div className="cred-section">
          <p className="cred-title">Thử nhanh:</p>
          <div className="cred-chips">
            <button
              className="cred-chip chip-student"
              onClick={() => fillCredentials("student", "123456")}
            >
              👨‍🎓 Student
            </button>
            <button
              className="cred-chip chip-advisor"
              onClick={() => fillCredentials("advisor", "123456")}
            >
              👨‍💼 Advisor
            </button>
          </div>
          <p className="cred-hint">Cả hai dùng password: <code>123456</code></p>
        </div>
      </div>
    </div>
  );
}
