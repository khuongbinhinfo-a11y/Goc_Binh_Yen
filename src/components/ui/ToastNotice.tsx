type ToastNoticeProps = {
  visible: boolean;
  type: "success" | "error";
  message: string;
};

export default function ToastNotice({ visible, type, message }: ToastNoticeProps) {
  const isSuccess = type === "success";

  return (
    <div
      className={`fixed right-4 top-24 z-[90] max-w-sm transform transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-[0_12px_30px_rgba(52,36,26,0.14)] ${
          isSuccess
            ? "border-[#b5dac4] bg-[#ebf8f2] text-[#2d6b49]"
            : "border-[#e9b8b0] bg-[#fcefed] text-[#8d3a2c]"
        }`}
      >
        <span
          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
            isSuccess ? "bg-[#d1f0df]" : "bg-[#f4d4ce]"
          }`}
        >
          {isSuccess ? (
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3 w-3" fill="none">
              <path
                d="m5 10 3.1 3.1L15 6.2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3 w-3" fill="none">
              <path d="M10 5.5v4.8M10 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </span>
        <p className="text-sm font-medium leading-6">{message}</p>
      </div>
    </div>
  );
}
