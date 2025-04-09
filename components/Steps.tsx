import Image from "next/image";

const steps = [
    {
      image: "/stap1.jpeg",
      title: "Dag 1: Vraag direct een bod aan",
      text: "Wilt u uw huis snel verkopen zonder gedoe? Vul vandaag nog ons formulier in en ontvang binnen 24 uur een vrijblijvend en marktconform bod. Voeg foto’s en een korte beschrijving van uw woning toe om het proces te versnellen. Geen makelaar nodig en volledig zonder verplichtingen.",
    },
    {
      image: "/stap2.jpg",
      title: "Dag 2: Persoonlijk contact & advies",
      text: "Onze woningexperts nemen contact met u op om uw situatie te bespreken. U krijgt direct inzicht in het bod en het verdere verloop. Wij beantwoorden al uw vragen zodat u met vertrouwen kunt beslissen over de verkoop van uw woning.",
    },
    {
      image: "/stap3.jpg",
      title: "Dag 3: Bezichtiging (alleen indien nodig)",
      text: "In de meeste gevallen kopen wij uw huis zonder bezichtiging. Is het wel gewenst, dan plannen we die snel en discreet in. U hoeft geen open huis of uitgebreide styling te doen. Zo verkoopt u uw woning eenvoudig én privé.",
    },
    {
      image: "/stap4.png",
      title: "Dag 4: Overeenkomst opstellen",
      text: "Gaat u akkoord met ons bod? Dan stellen wij de koopovereenkomst voor u op. U kiest zelf de overdrachtsdatum en notaris. Wij regelen de administratie, zodat u snel en zorgeloos uw huis kunt verkopen.",
    },
    {
      image: "/stap5.jpg",
      title: "Dag 5: Overdracht en uitbetaling",
      text: "De officiële overdracht vindt plaats bij de notaris. U ontvangt dezelfde dag het afgesproken bedrag op uw rekening. Geen financieringsvoorbehoud, geen wachttijd — alleen zekerheid en snelheid.",
    },
  ];
  
  

const Steps = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-[#0a1128] mb-16">
  Zo kopen wij jouw woning over
</h2>


        <div className="space-y-24">
          {steps.map((step, index) => {
            const isEven = index % 2 !== 0;
            return (
              <div
                key={index}
                className={`flex flex-col-reverse md:flex-row ${
                  isEven ? "md:flex-row-reverse" : ""
                } items-center gap-10`}
              >
                {/* Text */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold text-[#0a1128] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-lg">{step.text}</p>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 h-64 sm:h-80 relative rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={step.image}
                    alt={step.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Steps;
