// app/not-found.tsx
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center p-6">
      <div className="relative w-72 sm:w-96 h-72 sm:h-96">
        <Image
          src="/notFound.jpg"
          alt="Not Found"
          fill
          className="object-contain"
        />
      </div>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-primaryGradient font-medium text-base text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
