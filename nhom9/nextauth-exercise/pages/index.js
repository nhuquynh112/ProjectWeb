import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [classList, setClassList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [secondsUntilExpire, setSecondsUntilExpire] = useState(0);

  // Đếm ngược và xử lý token hết hạn
  useEffect(() => {
    if (!session?.accessTokenExpires) return;

    if (session.error === "RefreshTokenExpired") {
      console.log("❌ Refresh token hết hạn, đang đăng xuất...");
      signOut({ redirect: true, callbackUrl: "/login" });
      return;
    }

    const updateCountdown = () => {
      const secondsLeft = Math.max(
        0,
        Math.ceil((session.accessTokenExpires - Date.now()) / 1000)
      );
      setSecondsUntilExpire(secondsLeft);
      // KHÔNG auto-logout ở đây!
      // Để NextAuth tự refresh token khi user bấm nút "Lấy danh sách lớp"
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [session?.accessTokenExpires, session]);

  if (status === "loading") {
    return (
      <div className="page-center">
        <div className="spinner" />
        <p style={{ color: "#94a3b8", marginTop: 16 }}>Đang tải...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  // Bị từ chối truy cập
  if (session.user.role !== "ROLE_ADVISOR") {
    return (
      <div className="denied-root">
        <div className="blob blob-red-1" />
        <div className="blob blob-red-2" />
        <div className="denied-card">
          <div className="denied-icon">🚫</div>
          <h1 className="denied-title">Bị Từ Chối Truy Cập</h1>
          <p className="denied-desc">
            Bạn không có quyền truy cập trang này.
            <br />
            Chỉ <strong>Cố Vấn (ROLE_ADVISOR)</strong> mới được phép.
          </p>
          <div className="denied-role-badge">
            Role của bạn: <span className="role-tag student">{session.user.role}</span>
          </div>
          <button className="btn-logout" onClick={() => signOut({ callbackUrl: "/login" })}>
            Đăng Xuất
          </button>
        </div>
      </div>
    );
  }

  const handleFetchClassList = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setClassList({
        classes: [
          { id: 1, name: "Lớp A1", students: 30 },
          { id: 2, name: "Lớp A2", students: 28 },
          { id: 3, name: "Lớp A3", students: 32 },
        ],
        accessToken: session.accessToken.substring(0, 20) + "...",
        expiresAt: new Date(session.accessTokenExpires).toLocaleTimeString("vi-VN"),
        timestamp: new Date().toLocaleTimeString("vi-VN"),
      });
    } catch (error) {
      setClassList({ error: "Lỗi khi lấy danh sách lớp" });
    } finally {
      setLoading(false);
    }
  };

  const isAlmostExpired = secondsUntilExpire <= 10 && secondsUntilExpire > 0;
  const isExpired = secondsUntilExpire === 0;

  // Màu và style countdown
  const countdownColor = isExpired ? "#ef4444" : isAlmostExpired ? "#f97316" : "#22c55e";
  const progressPct = Math.min((secondsUntilExpire / 60) * 100, 100);
  const countdownLabel = isExpired ? "⚠️ Đã hết hạn!" : `${secondsUntilExpire}s`;

  return (
    <div className="dash-root">
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="dash-container">
        {/* Header */}
        <div className="dash-header">
          <div>
            <h1 className="dash-title">📊 Dashboard Cố Vấn</h1>
            <p className="dash-sub">Hệ thống quản lý lớp học</p>
          </div>
          <button className="btn-logout-top" onClick={() => signOut({ callbackUrl: "/login" })}>
            Đăng Xuất
          </button>
        </div>

        {/* Info cards */}
        <div className="info-grid">
          <div className="info-card">
            <span className="info-card-icon">👤</span>
            <div>
              <div className="info-label">Người dùng</div>
              <div className="info-value">{session.user.username}</div>
            </div>
          </div>

          <div className="info-card">
            <span className="info-card-icon">🏷️</span>
            <div>
              <div className="info-label">Role</div>
              <span className="role-tag advisor">{session.user.role}</span>
            </div>
          </div>

          <div className={`info-card token-card ${isAlmostExpired ? "warn" : ""} ${isExpired ? "danger" : ""}`}>
            <span className="info-card-icon">⏱️</span>
            <div style={{ flex: 1 }}>
              <div className="info-label">Access Token hết hạn sau</div>
              <div className="countdown-display" style={{ color: countdownColor }}>
                {countdownLabel}
              </div>
              {/* Progress bar */}
              <div className="progress-track">
                <div
                  className="progress-bar"
                  style={{
                    width: `${progressPct}%`,
                    background: countdownColor,
                  }}
                />
              </div>
              {isAlmostExpired && (
                <p className="warn-text">⚠️ Token sắp hết hạn!</p>
              )}
              {isExpired && (
                <p className="warn-text" style={{ color: "#ef4444" }}>
                  🔄 Bấm nút bên dưới để xem NextAuth tự refresh!
                </p>
              )}
            </div>
          </div>

          <div className="info-card">
            <span className="info-card-icon">🎫</span>
            <div>
              <div className="info-label">Token hiện tại</div>
              <div className="token-preview">{session.accessToken.substring(0, 28)}...</div>
            </div>
          </div>
        </div>

        {/* Demo guide */}
        <div className="guide-card">
          <h3 className="guide-title">🧪 Hướng dẫn demo Token Refresh</h3>
          <div className="guide-steps">
            {[
              { icon: "✅", text: 'Bấm "Lấy danh sách lớp" (Token còn hạn)' },
              { icon: "⏳", text: "Đợi 60+ giây hoặc chờ countdown về 0s" },
              { icon: "🔄", text: 'Bấm lại "Lấy danh sách lớp" → NextAuth tự động refresh token' },
              { icon: "🔍", text: "Mở F12 → Console để xem log refresh token" },
            ].map((step, i) => (
              <div key={i} className="guide-step">
                <span className="step-num">{i + 1}</span>
                <span className="step-icon">{step.icon}</span>
                <span className="step-text">{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={handleFetchClassList}
          disabled={loading}
          className={`btn-fetch ${isExpired ? "btn-fetch-expired" : ""}`}
        >
          {loading ? (
            <>
              <span className="btn-spinner" />
              Đang tải...
            </>
          ) : (
            "📋 Lấy danh sách lớp"
          )}
        </button>

        {/* Result */}
        {classList && (
          <div className="result-card">
            <div className="result-header">
              <span>📚 Kết Quả</span>
              <button className="close-btn" onClick={() => setClassList(null)}>✕</button>
            </div>
            <pre className="result-json">{JSON.stringify(classList, null, 2)}</pre>
          </div>
        )}

        {session.error && (
          <div className="error-banner">
            ❌ Lỗi: {session.error} — Vui lòng đăng nhập lại
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return { props: {} };
}
