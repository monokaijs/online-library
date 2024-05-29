import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="w-full h-full flex flex-col gap-8 items-center justify-center">
      <p style={{ fontSize: 70, fontWeight: 600 }}>403</p>
      <p style={{ fontSize: 16, fontWeight: 500 }}>Forbidden</p>
      <Link href="/">Trang chủ</Link>
    </div>
  );
}
