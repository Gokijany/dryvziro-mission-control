import Image from "next/image";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">
      {/* Logo */}
      <div className="mb-6 flex justify-center">
  <div className="relative h-36 w-36">
    <Image
      src="/logo.png"
      alt="Company Logo"
      fill
      className="object-contain"
      priority
    />
  </div>
</div>

      <h1 className="text-3xl font-bold text-white">{title}</h1>

      <p className="mt-3 text-sm leading-6 text-gray-400">{subtitle}</p>
    </div>
  );
}
