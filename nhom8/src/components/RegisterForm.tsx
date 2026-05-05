"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { formSchema, FormValues } from "@/lib/schema";
import { registerAction } from "@/app/actions/register";

// ── Reusable Field Component ──────────────────────────────────
interface FieldProps {
  label: string;
  id: keyof FormValues;
  type?: string;
  placeholder?: string;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  error?: string;
}

function Field({ label, id, type = "text", placeholder, register, error }: FieldProps) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className={`
          w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600
          bg-white/[0.04] border transition-all duration-200 outline-none
          focus:border-indigo-500 focus:bg-indigo-500/[0.06]
          ${error
            ? "border-red-500/70 bg-red-500/[0.05]"
            : "border-white/10 hover:border-white/20"
          }
        `}
      />
      <div className="min-h-[20px] mt-1.5">
        {error && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Password Strength Hints ───────────────────────────────────
function PasswordHints({ password }: { password: string }) {
  const hints = [
    { ok: password.length >= 8, label: "8+ ký tự" },
    { ok: /[A-Z]/.test(password), label: "1 chữ HOA" },
    { ok: /[0-9]/.test(password), label: "1 chữ số" },
  ];

  return (
    <div className="flex gap-4 mb-6 px-4 py-3 rounded-xl bg-indigo-500/[0.05] border border-indigo-500/15">
      {hints.map(({ ok, label }) => (
        <span
          key={label}
          className={`text-xs flex items-center gap-1 transition-colors duration-300 ${
            ok ? "text-green-400" : "text-slate-500"
          }`}
        >
          <span>{ok ? "✓" : "○"}</span>
          {label}
        </span>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function RegisterForm() {
  const [serverMsg, setServerMsg] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur", // ← Real-time validation khi blur
  });

  const passwordValue = watch("password") ?? "";

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setServerMsg(null);

    try {
      const result = await registerAction(data);
      setServerMsg(result);
      if (result.success) reset();
    } catch {
      setServerMsg({ success: false, message: "Lỗi không xác định. Thử lại sau." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080d1a] p-6">
      {/* Background glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Top accent */}
        <div className="absolute -top-px left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-10 border border-white/[0.07] shadow-2xl">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="text-[11px] text-indigo-300 font-semibold uppercase tracking-widest">
                React Hook Form · Zod
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">Đăng ký thành viên</h1>
            <p className="text-slate-500 text-sm mt-1">
              Uncontrolled components · Server Actions
            </p>
          </div>

          {/* Fields */}
          <Field
            label="Họ và tên"
            id="name"
            placeholder="Nguyễn Văn A"
            register={register}
            error={errors.name?.message}
          />
          <Field
            label="Email"
            id="email"
            type="email"
            placeholder="example@email.com"
            register={register}
            error={errors.email?.message}
          />
          <Field
            label="Mật khẩu"
            id="password"
            type="password"
            placeholder="Tối thiểu 8 ký tự"
            register={register}
            error={errors.password?.message}
          />

          <PasswordHints password={passwordValue} />

          <Field
            label="Xác nhận mật khẩu"
            id="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
            register={register}
            error={errors.confirmPassword?.message}
          />

          {/* Server message */}
          {serverMsg && (
            <div
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-5 border ${
                serverMsg.success
                  ? "bg-green-500/10 border-green-500/25 text-green-400"
                  : "bg-red-500/10 border-red-500/25 text-red-400"
              }`}
            >
              <span>{serverMsg.success ? "✅" : "❌"}</span>
              {serverMsg.message}
            </div>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className="
              w-full py-3.5 rounded-xl font-bold text-white text-sm
              bg-gradient-to-r from-indigo-600 to-violet-600
              hover:from-indigo-500 hover:to-violet-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 shadow-lg shadow-indigo-500/25
              hover:-translate-y-0.5 active:translate-y-0
            "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Đang xử lý...
              </span>
            ) : (
              "Đăng ký ngay →"
            )}
          </button>

          {/* Architecture note */}
          <div className="mt-6 p-4 rounded-xl bg-black/30 border border-white/[0.04] font-mono text-[11px] leading-6 text-slate-500">
            <span className="text-indigo-400">{"// Flow"}</span><br />
            ✦ <span className="text-slate-400">register()</span> → Uncontrolled (no useState)<br />
            ✦ <span className="text-slate-400">mode: {'"onBlur"'}</span> → Validate ngay khi rời input<br />
            ✦ <span className="text-slate-400">registerAction()</span> → Server Action<br />
            ✦ <span className="text-slate-400">safeParse()</span> → Double validation server
          </div>
        </div>
      </div>
    </div>
  );
}