import CallToActionBalk from "@/components/CallToActionBalk";
import OnzeBeloften from "@/components/OnzeBeloften";
import ReviewsSection from "@/components/ReviewsSection";
import Steps from "@/components/Steps";
import Image from "next/image";
import { BiEuro, BiCheckCircle } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa"; 
import { Metadata } from "next";
import BodAanvraagForm from "@/components/BodAanvraagForm";

export const metadata: Metadata = {
  title: "Huis verkopen zonder makelaar | Direct bod ontvangen",
  description:
    "Uw huis verkopen zonder makelaar? verkoopuwhuis.nu koopt woningen in heel Nederland direct op. Ontvang binnen 24 uur een vrijblijvend bod zonder gedoe, makelaarskosten of onzekerheid.",
  keywords: [
    "huis verkopen zonder makelaar",
    "woning verkopen zonder makelaar",
    "huis direct verkopen",
    "huis verkopen snel",
    "huis verkopen binnen 1 week",
    "vrijblijvend bod op huis",
    "woning opkoper Nederland",
    "huis verkopen zonder Funda",
    "woning verkopen zonder kosten",
  ],
  openGraph: {
    title: "Huis verkopen zonder makelaar | verkoopuwhuis.nu",
    description:
      "Wilt u uw woning snel verkopen zonder tussenkomst van een makelaar? verkoopuwhuis.nu koopt uw huis direct op. Binnen 24 uur een bod!",
    url: "https://verkoopuwhuis.nu",
    siteName: "verkoopuwhuis.nu",
    images: [
      {
        url: "https://verkoopuwhuis.nu/logo.png",
        width: 1200,
        height: 630,
        alt: "Huis verkopen zonder makelaar - verkoopuwhuis.nu",
      },
    ],
    type: "website",
  },
};


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
  <div className="absolute inset-0 flex items-center text-white px-6">
    <div className="container mx-auto px-6 md:px-16">
      <h1 className="font-semibold text-3xl md:text-7xl leading-tight">
        Uw huis snel verkopen <br className="hidden md:block" /> binnen 1 week is uw huis verkocht
      </h1>
      <p className="mt-5 text-md md:text-xl w-full md:w-2/3">
        Moet u dringend uw huis verkopen? Vul de gegevens van uw huis in en ontvang binnen 24 uur een vrijblijvend & marktconform bod!
      </p>
      <button className="mt-6 mb-8 px-6 py-3 bg-[#2baf57] text-white font-bold text-2xl rounded-md shadow-md hover:bg-green-700 transition">
        Gratis bod aanvragen
      </button>
    </div>
  </div>
</div>


      {/* Feature Boxes (Half Over Hero Image) */}
      <div className="relative w-full container mx-auto -mt-24 md:-mt-32 px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        className="bg-white shadow-lg rounded-xl p-6 text-center flex flex-col items-center"
      >
        <div className="w-16 h-16 mb-4 flex items-center justify-center bg-[#2baf57] text-white shadow-xl rounded-full text-3xl">
          {feature.icon}
        </div>
        <h3 className="font-bold text-base sm:text-lg text-gray-900">{feature.title}</h3>
        <p className="text-gray-600 text-sm sm:text-base mt-2">{feature.description}</p>
      </div>
    ))}
  </div>
</div>


<section className="bg-white py-20 px-4">
  <div className="container mx-auto">
    <div className="flex flex-col md:flex-row items-start gap-12">
      {/* Tekstkolom */}
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a1128] mb-6">
          Ontvang vrijblijvend een bod op uw woning
        </h2>

        <p className="text-gray-700 mb-4 text-lg">
          Vul uw gegevens in en ontvang binnen 24 uur een prijsindicatie voor uw woning. 
          Wanneer deze prijs u aanspreekt, kunnen we samen overgaan tot een definitieve waarde-inschatting. 
          Eén van onze experts komt desgewenst langs om een bod op maat te maken.
        </p>

        <p className="text-gray-700 mb-4 text-lg">
          Gaat u niet akkoord? Geen probleem. U houdt altijd zelf de regie en beslist wat u doet. 
          Volledig vrijblijvend en zonder verplichtingen.
        </p>

        <p className="text-gray-700 mb-4 text-sm">
          Liever direct contact? Mail ons op <a href="mailto:info@verkoopuwhuis.nu" className="text-[#2baf57] underline">info@verkoopuwhuis.nu</a>.
        </p>

        <h3 className="text-xl font-semibold text-[#0a1128] mt-8 mb-4">Voordelen:</h3>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
          <li>U bepaalt zelf de verkoopprijs</li>
          <li>Direct zekerheid over de verkoop</li>
          <li>Marktconform bod</li>
          <li>Geen financieringsvoorbehoud</li>
          <li>Geen makelaarskosten</li>
          <li>Professionele afhandeling</li>
          <li>Discreet</li>
          <li>Verkoop in iedere staat</li>
          <li>Snelle overdracht mogelijk</li>
          <li>Flexibele overdrachtsdatum</li>
          <li>Terug huren is vaak bespreekbaar</li>
        </ul>
      </div>

      {/* Formulier */}
      <div className="md:w-1/2 w-full">
        <BodAanvraagForm />
      </div>
    </div>
  </div>
</section>



      {/* Extra Sectie */}
      <div className="mt-16 w-full container mx-auto flex flex-col md:flex-row items-center justify-between p-6 md:p-12">
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
  className="relative bg-[url('/houses.jpg')] bg-cover bg-center bg-no-repeat mt-12 sm:mt-16 py-12 sm:py-16 rounded-2xl sm:rounded-[3rem] overflow-hidden"
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-2xl sm:rounded-[4rem]"></div>

  {/* Content */}
  <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug">
      Wanneer snel uw huis verkopen, en voor wie?
    </h2>

    <p className="text-base sm:text-lg md:text-xl text-gray-100 mt-4 mb-8 sm:mb-10">
      Er zijn veel situaties waarin het <strong>snel verkopen</strong> van uw huis de beste keuze is. 
      Of u nu een woning heeft geërfd, wilt verhuizen, of financiële ruimte nodig heeft, 
      wij bieden een snelle en zorgeloze verkoop zonder onzekerheid.
    </p>

    {/* Content Box */}
    <div className="bg-white p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-3xl shadow-xl text-left">
      <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
        Voor wie is een snelle verkoop ideaal?
      </h3>
      <ul className="list-disc list-inside space-y-4 text-gray-700 text-sm sm:text-base">
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

<div>
  <OnzeBeloften />
</div>

<div>
  <CallToActionBalk />
</div>

<div>
  <Steps />
</div>

<div>
  <ReviewsSection />
</div>

<div>
  <CallToActionBalk />
</div>

    </div>
  );
}
