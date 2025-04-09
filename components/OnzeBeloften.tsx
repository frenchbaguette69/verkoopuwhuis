import { FaCheck, FaEuroSign, FaCalendarCheck, FaUserSecret, FaHome, FaMedal } from "react-icons/fa";

const beloften = [
  {
    icon: <FaCheck className="text-white text-xl" />,
    title: "Binnen 24 uur een bod op uw woning",
    text: "Vul uw adres in en voeg eventueel foto's en een omschrijving toe en ontvang binnen 24 uur een bod op uw woning.",
  },
  {
    icon: <FaEuroSign className="text-white text-xl" />,
    title: "Geen gedoe",
    text: "U heeft geen gedoe met een makelaar, foto's (laten) maken, bezichtigingen of onderhandelingen. Alles wordt voor u geregeld.",
  },
  {
    icon: <FaCalendarCheck className="text-white text-xl" />,
    title: "Geen financieringsvoorbehoud",
    text: "Wij kopen altijd zonder voorbehoud van financiering of bouwkundige keuring. Wij kopen alle huizen in alle staten!",
  },
  {
    icon: <FaUserSecret className="text-white text-xl" />,
    title: "Discreet",
    text: "U komt niet met uw woning op Funda. Uw buren kijken niet mee en u hoeft zich geen zorgen te maken over foto's en bezichtigingen.",
  },
  {
    icon: <FaHome className="text-white text-xl" />,
    title: "Verkoop in iedere staat",
    text: "U hoeft geen onderhoud of reparaties uit te voeren voor de verkoop van uw woning. Wij kopen de woning in iedere staat.",
  },
  {
    icon: <FaMedal className="text-white text-xl" />,
    title: "Professionele afhandeling",
    text: "Wij verzorgen de gehele afhandeling. U heeft de mogelijkheid om zelf de notaris uit te kiezen (dichtbij huis).",
  },
];

const OnzeBeloften = () => {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Onze beloften voor het snel verkopen van uw huis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {beloften.map((belofte, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-left flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#2baf57] flex items-center justify-center shadow-md">
                {belofte.icon}
              </div>
              <h3 className="text-sm font-bold uppercase text-gray-700">
                {belofte.title}
              </h3>
              <p className="text-gray-600 text-sm">{belofte.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnzeBeloften;
