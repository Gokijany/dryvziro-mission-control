interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#B4E920] text-2xl font-bold text-[#08120B] shadow-lg">
          D
        </div>
      </div>

      <h1 className="text-3xl font-bold text-white">
        {title}
      </h1>

      <p className="mt-3 text-sm leading-6 text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}