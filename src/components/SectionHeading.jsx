export default function SectionHeading({ left, right }) {
  const isSingle = !right;
  return (
    <div
      className={`flex flex-wrap items-center gap-2 bg-[#eeeeee] px-4 py-3 text-lg font-semibold text-black sm:text-xl lg:text-2xl ${
        isSingle ? "justify-center" : "justify-between sm:justify-around"
      }`}
    >
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  );
}

