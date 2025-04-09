import Link from "next/link";

const CallToActionBalk = () => {
  return (
    <section className="bg-[#0a1128] py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-white text-2xl sm:text-3xl font-semibold text-center md:text-left">
          Wilt u uw huis snel verkopen? Vraag direct een bod aan!
        </h2>
        <Link href="/contact">
          <button className="bg-[#2baf57] hover:bg-green-700 transition px-6 py-3 text-white font-semibold rounded-md shadow-md uppercase tracking-wide">
            Bod aanvragen
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CallToActionBalk;
