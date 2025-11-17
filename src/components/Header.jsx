import Image from "next/image";

export default function Header({ searchTerm = "", onSearchChange = () => {} }) {
  return (
    <header className="sticky top-0 z-10000 flex w-full flex-col items-center gap-4 bg-black px-4 py-3 text-white sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 sm:px-6 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-0 lg:px-83 lg:py-1">
      <div className="flex w-full justify-center lg:w-auto lg:justify-start">
        <Image
          src="/logo.png"
          alt="Jerky Jerk logo"
          width={96}
          height={96}
          priority
        />
      </div>
      <div className="flex w-full justify-center sm:justify-end sm:w-auto sm:flex-1 lg:w-auto">
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search menu"
          className="w-full max-w-xl rounded-[1.2rem] border border-transparent bg-white px-4 py-2 text-[13px] font-normal text-black placeholder:text-[13px] placeholder:text-black/70 outline-none focus-visible:ring-2 focus-visible:ring-[#60db55] sm:max-w-md lg:w-auto lg:min-w-[270px] lg:max-w-none lg:px-6"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
    </header>
  );
}
