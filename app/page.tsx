import Image from "next/image";
import { BiEuro, BiCheckCircle } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa"; 

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Hero Image */}
      <div className="relative w-full h-[70vh]">
        <Image 
          src="/herobg.jpg" 
          alt="Huis snel verkopen"
          layout="fill"
          objectFit="cover"
          priority
          title="Huis snel verkopen"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Text Content */}
        <div className="absolute inset-0 flex items-center text-white  px-6 md:px-16">
          <div>
            <h1 className="font-semibold text-4xl md:text-7xl leading-tight">
              Uw huis snel verkopen <br className="hidden md:block" /> binnen 1 week is uw huis verkocht
            </h1>
            <p className="mt-5 text-lg md:text-xl w-full md:w-2/3">
              Moet u dringend uw huis verkopen? Vul de gegevens van uw huis in en ontvang binnen 24 uur een vrijblijvend & marktconform bod!
            </p>
            <button className="mt-6 px-6 py-3 bg-[#2baf57] text-white font-bold text-2xl rounded-md shadow-md hover:bg-green-700 transition">
              Gratis bod aanvragen
            </button>
          </div>
        </div>
      </div>

      {/* Feature Boxes (Half Over Hero Image) */}
      <div className="relative w-full md:w-2/3 mx-auto -mt-24 md:-mt-32 flex flex-col md:flex-row items-center justify-center gap-6 px-6">
        {[
          {
            icon: <BiEuro />,
            title: "BINNEN 24 UUR EEN BOD OP UW WONING",
            description:
              "Vul uw adres in en voeg foto's en een omschrijving toe en ontvang binnen 24 uur een bod op uw woning.",
          },
          {
            icon: <BiCheckCircle />,
            title: "GEEN GEDOE",
            description:
              "U heeft geen gedoe met een makelaar, foto's (laten) maken, bezichtigingen of onderhandelingen. Alles wordt voor u geregeld.",
          },
          {
            icon: <FaHandshake />,
            title: "GEEN FINANCIERINGSVOORBEHOUD",
            description:
              "Wij kopen altijd zonder voorbehoud van financiering of bouwkundige keuring. Wij kopen alle huizen in alle staten!",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#2baf57] text-white shadow-xl rounded-full text-3xl">
              {feature.icon}
            </div>
            <h3 className="font-bold text-lg text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Extra Sectie */}
      <div className="mt-16 w-full md:w-2/3 mx-auto flex flex-col md:flex-row items-center justify-between p-6 md:p-12">
        {/* Tekst */}
        <div className="md:w-1/2">
          <p className="text-sm font-semibold text-gray-500 uppercase">
            Waarom kiezen voor ons?
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Huis snel verkopen zonder zorgen
          </h2>
          <p className="mt-4 text-gray-700">
            Een huis snel verkopen kan ingewikkeld lijken, maar wij maken het proces eenvoudig. 
            Geen lange wachttijden, geen makelaarskosten en geen onzekerheid. 
            Binnen 24 uur weet u waar u aan toe bent en kunt u uw huis snel en zorgeloos verkopen.
          </p>
          <p className="mt-4 text-gray-700">
            Wilt u weten hoeveel uw huis waard is? Vraag nu een bod aan en ontdek de mogelijkheden!
          </p>
          <button className="mt-6 px-6 py-3 bg-[#2baf57] text-white font-bold rounded-md shadow-md hover:bg-green-700 transition">
            Ontvang Bod
          </button>
        </div>

        {/* Afbeelding */}
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <Image 
            src="/Huis-Verkocht-bord.jpg" 
            alt="Uw huis snel verkopen"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
            title="Uw huis snel verkopen"
          />
        </div>
      </div>
      <div 
  className="relative bg-[url('/houses.jpg')] bg-cover rounded-[3rem] bg-center bg-no-repeat mt-16 py-16">
  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-[4rem]"></div>

  <div className="relative w-full md:w-2/3 mx-auto px-6 md:px-12 text-center">
    <h2 className="text-5xl font-bold text-white leading-tight">
      Wanneer snel uw huis verkopen, en voor wie?
    </h2>

    <p className="text-lg md:text-xl text-gray-100 mt-4 mb-10">
      Er zijn veel situaties waarin het <strong>snel verkopen</strong> van uw huis de beste keuze is. 
      Of u nu een woning heeft geërfd, wilt verhuizen, of financiële ruimte nodig heeft, 
      wij bieden een snelle en zorgeloze verkoop zonder onzekerheid.
    </p>

    {/* Content Box */}
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-left">
      <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Voor wie is een snelle verkoop ideaal?
      </h3>
      <ul className="list-disc list-inside space-y-4 text-gray-700">
        <li><strong>Stellen</strong> die samenwonen en één woning willen verkopen.</li>
        <li>Mensen die op zoek zijn naar meer <strong>financiële ruimte</strong> door <strong>huis verkopen en terughuren</strong>.</li>
        <li>Verkopers die een <strong>executieverkoop</strong> door de bank willen voorkomen.</li>
        <li>Huiseigenaren die <strong>discreet willen verkopen</strong> zonder openbare advertenties.</li>
        <li>Eigenaren die <strong>snel geld nodig hebben</strong> zonder lang te wachten op een koper.</li>
        <li>Huizenbezitters die een nieuwe woning hebben gekocht en hun oude huis snel willen verkopen.</li>
        <li>Ouderen die hun woning willen verkopen om <strong>overwaarde te benutten</strong> voor extra pensioen.</li>
        <li>Partners die gaan <strong>scheiden</strong> en hun huis snel willen afwikkelen.</li>
        <li>Woningeigenaren die een woning uit een <strong>erfenis</strong> willen verkopen.</li>
        <li>Mensen die gaan <strong>emigreren</strong> en hun woning in Nederland willen verkopen.</li>
      </ul>
    </div>
  </div>
</div>

    </div>
  );
}
