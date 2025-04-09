import { FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    name: "Laura",
    city: "Utrecht",
    text: "Binnen 24 uur hadden we een bod, precies zoals beloofd. Geen gedoe met makelaars of eindeloze bezichtigingen. Wat een verademing!",
  },
  {
    name: "Thomas & Eva",
    city: "Rotterdam",
    text: "Na onze scheiding wilden we snel van het huis af. Alles werd netjes en snel geregeld. We konden het hoofdstuk echt afsluiten dankzij verkoopuwhuis.nu.",
  },
  {
    name: "Mevrouw De Vries",
    city: "Apeldoorn",
    text: "Mijn woning had achterstallig onderhoud en ik vreesde dat het niet snel verkocht zou worden. Toch werd het binnen een week afgerond, zonder verplichtingen!",
  },
  {
    name: "Jeroen",
    city: "Leeuwarden",
    text: "Ik moest verhuizen voor mijn werk en had weinig tijd. Dankzij dit platform was alles binnen twee weken rond, inclusief notaris. Superservice!",
  },
  {
    name: "Fatima",
    city: "Amsterdam",
    text: "Ik wilde mijn woning verkopen en terughuren. Deze partij heeft me daar perfect bij geholpen, alles transparant en snel geregeld.",
  },
  {
    name: "Wim",
    city: "Den Bosch",
    text: "Ik had veel zorgen over de verkoop van mijn ouderlijk huis na overlijden van mijn moeder. Alles werd met respect en rust geregeld, dat gaf vertrouwen.",
  },
];

const ReviewsSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Wat onze klanten zeggen</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-left relative"
            >
              <FaQuoteLeft className="text-[#2baf57] text-2xl absolute top-4 left-4 opacity-20" />
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {review.text}
              </p>
              <div className="text-gray-900 font-semibold">{review.name}</div>
              <div className="text-[#2baf57] uppercase tracking-wide text-sm font-semibold">
                {review.city}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
