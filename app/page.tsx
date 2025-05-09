import CallToActionBalk from "@/components/CallToActionBalk"
import OnzeBeloften from "@/components/OnzeBeloften"
import ReviewsSection from "@/components/ReviewsSection"
import Steps from "@/components/Steps"
import Image from "next/image"
import { BiEuro, BiCheckCircle, BiTime, BiHome, BiMap } from "react-icons/bi"
import { FaHandshake, FaPhoneAlt, FaRegCalendarCheck, FaShieldAlt, FaRegLightbulb } from "react-icons/fa"
import type { Metadata } from "next"
import BodAanvraagForm from "@/components/BodAanvraagForm"
import Link from "next/link"
import FAQAccordion from "@/components/faq-accordion"

export const metadata: Metadata = {
  title: "Huis Snel Verkopen | Binnen 1 Week Verkocht | VerkoopUwHuis.nu",
  description:
    "Verkoop uw huis snel en zonder zorgen. Ontvang binnen 24 uur een vrijblijvend bod, geen makelaarskosten, geen gedoe. Marktconforme prijzen en snelle afhandeling.",
  keywords:
    "huis verkopen, snel huis verkopen, woning verkopen, huis verkopen zonder makelaar, direct bod op huis, huis verkopen en terughuren",
}

export default function Home() {
  return (
    <main className="relative w-full min-h-screen flex flex-col">
      {/* Hero Section */}
      <section aria-labelledby="hero-heading" className="relative w-full h-[80vh]">
        <Image
          src="/herobg.jpg"
          alt="Huis snel verkopen zonder zorgen"
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
            <h1 id="hero-heading" className="font-semibold text-3xl md:text-7xl leading-tight">
              Uw huis snel verkopen <br className="hidden md:block" /> binnen 1 week is uw huis verkocht
            </h1>
            <p className="mt-5 text-md md:text-xl w-full md:w-2/3 max-w-3xl">
              Moet u dringend uw huis verkopen? Wij bieden een snelle, betrouwbare oplossing zonder makelaarskosten of
              lange wachttijden. Vul de gegevens van uw woning in en ontvang binnen 24 uur een vrijblijvend &
              marktconform bod!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="#bod-aanvragen"
                className="px-8 py-4 bg-[#2baf57] text-white font-bold text-xl md:text-2xl rounded-md shadow-lg hover:bg-green-700 transition-all duration-300 text-center"
              >
                Gratis bod aanvragen
              </Link>
              <Link
                href="#voordelen"
                className="px-8 py-4 bg-white text-[#0a1128] font-bold text-xl md:text-2xl rounded-md shadow-lg hover:bg-gray-100 transition-all duration-300 text-center"
              >
                Ontdek de voordelen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Boxes (Half Over Hero Image) */}
      <section
        aria-labelledby="features-heading"
        className="relative w-full container mx-auto -mt-24 md:-mt-32 px-4 sm:px-6 lg:px-8 z-10"
      >
        <h2 id="features-heading" className="sr-only">
          Onze diensten
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <BiEuro />,
              title: "BINNEN 24 UUR EEN BOD OP UW WONING",
              description:
                "Vul uw adres in en voeg foto's en een omschrijving toe en ontvang binnen 24 uur een bod op uw woning. Geen wachttijd, geen onzekerheid.",
            },
            {
              icon: <BiCheckCircle />,
              title: "GEEN GEDOE",
              description:
                "U heeft geen gedoe met een makelaar, foto's (laten) maken, bezichtigingen of onderhandelingen. Alles wordt voor u geregeld door ons professionele team.",
            },
            {
              icon: <FaHandshake />,
              title: "GEEN FINANCIERINGSVOORBEHOUD",
              description:
                "Wij kopen altijd zonder voorbehoud van financiering of bouwkundige keuring. Wij kopen alle huizen in alle staten, ook met achterstallig onderhoud!",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-xl p-8 text-center flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-[#2baf57] text-white shadow-xl rounded-full text-3xl">
                {feature.icon}
              </div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bod Aanvragen Section */}
      <section id="bod-aanvragen" aria-labelledby="bod-heading" className="bg-white py-20 px-4 mt-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 id="bod-heading" className="text-4xl md:text-5xl font-bold text-[#0a1128] mb-4">
              Ontvang vrijblijvend een bod op uw woning
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Binnen 24 uur weet u wat uw huis waard is. Geen verplichtingen, geen makelaarskosten.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Tekstkolom */}
            <div className="md:w-1/2">
              <div className="bg-gray-50 p-8 rounded-xl shadow-md">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0a1128] mb-6">Hoe werkt het?</h3>

                <p className="text-gray-700 mb-4 text-lg">
                  Vul uw gegevens in en ontvang binnen 24 uur een prijsindicatie voor uw woning. Wanneer deze prijs u
                  aanspreekt, kunnen we samen overgaan tot een definitieve waarde-inschatting. Eén van onze experts komt
                  desgewenst langs om een bod op maat te maken.
                </p>

                <p className="text-gray-700 mb-4 text-lg">
                  Gaat u niet akkoord? Geen probleem. U houdt altijd zelf de regie en beslist wat u doet. Volledig
                  vrijblijvend en zonder verplichtingen.
                </p>

                <div className="bg-white p-6 rounded-lg shadow-inner mt-6">
                  <p className="text-gray-700 mb-2 text-lg font-medium">Liever direct contact?</p>
                  <div className="flex items-center gap-3 mb-3">
                    <FaPhoneAlt className="text-[#2baf57]" />
                    <a href="tel:+31612345678" className="text-[#2baf57] font-semibold">
                      +31 6 12345678
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#2baf57]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <a href="mailto:info@verkoopuwhuis.nu" className="text-[#2baf57] font-semibold">
                      info@verkoopuwhuis.nu
                    </a>
                  </div>
                </div>

                <h3 id="voordelen" className="text-xl font-semibold text-[#0a1128] mt-8 mb-4">
                  Voordelen:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "U bepaalt zelf de verkoopprijs",
                    "Direct zekerheid over de verkoop",
                    "Marktconform bod",
                    "Geen financieringsvoorbehoud",
                    "Geen makelaarskosten",
                    "Professionele afhandeling",
                    "Discreet",
                    "Verkoop in iedere staat",
                    "Snelle overdracht mogelijk",
                    "Flexibele overdrachtsdatum",
                    "Terug huren is vaak bespreekbaar",
                    "Geen bezichtigingen nodig",
                  ].map((voordeel, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <BiCheckCircle className="text-[#2baf57] text-xl flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{voordeel}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulier */}
            <div className="md:w-1/2 w-full">
              <div className="">
                <h3 className="text-2xl font-bold text-[#0a1128] mb-6 text-center">Vraag direct een bod aan</h3>
                <BodAanvraagForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waarom Kiezen Voor Ons Section */}
      <section aria-labelledby="waarom-heading" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Tekst */}
            <div className="md:w-1/2">
              <p className="text-sm font-semibold text-[#2baf57] uppercase tracking-wider">Waarom kiezen voor ons?</p>
              <h2 id="waarom-heading" className="text-4xl font-bold text-gray-900 mt-2 mb-6">
                Huis snel verkopen zonder zorgen
              </h2>

              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  Een huis snel verkopen kan ingewikkeld lijken, maar wij maken het proces eenvoudig. Geen lange
                  wachttijden, geen makelaarskosten en geen onzekerheid. Binnen 24 uur weet u waar u aan toe bent en
                  kunt u uw huis snel en zorgeloos verkopen.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: <BiTime className="text-2xl text-[#2baf57]" />,
                      title: "Snelle afhandeling",
                      description:
                        "Binnen een week kan uw huis verkocht zijn. Geen maanden wachten op de juiste koper.",
                    },
                    {
                      icon: <FaShieldAlt className="text-2xl text-[#2baf57]" />,
                      title: "Zekerheid",
                      description:
                        "Geen risico op kopers die afhaken of financiering die niet rondkomt. Wij kopen direct.",
                    },
                    {
                      icon: <FaRegLightbulb className="text-2xl text-[#2baf57]" />,
                      title: "Flexibele oplossingen",
                      description: "Verkoop en terughuur mogelijk. Flexibele overdrachtsdatum op basis van uw wensen.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="#bod-aanvragen"
                    className="inline-block px-8 py-4 bg-[#2baf57] text-white font-bold rounded-md shadow-md hover:bg-green-700 transition"
                  >
                    Ontvang Bod
                  </Link>
                </div>
              </div>
            </div>

            {/* Afbeelding */}
            <div className="md:w-1/2 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105">
                <Image
                  src="/Huis-Verkocht-bord.jpg"
                  alt="Uw huis snel verkopen"
                  width={600}
                  height={400}
                  className="rounded-2xl"
                  title="Uw huis snel verkopen"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <p className="text-white font-semibold text-xl">Snel en zorgeloos verkopen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voor Wie Section */}
      <section
        aria-labelledby="voor-wie-heading"
        className="relative bg-[url('/houses.jpg')] bg-cover bg-center bg-no-repeat py-20 overflow-hidden"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content */}
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 id="voor-wie-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug">
              Wanneer snel uw huis verkopen, en voor wie?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-100 mt-4 mb-8 sm:mb-10 max-w-4xl mx-auto">
              Er zijn veel situaties waarin het <strong>snel verkopen</strong> van uw huis de beste keuze is. Of u nu
              een woning heeft geërfd, wilt verhuizen, of financiële ruimte nodig heeft, wij bieden een snelle en
              zorgeloze verkoop zonder onzekerheid.
            </p>
          </div>

          {/* Content Box */}
          <div className="bg-white p-8 md:p-12 rounded-xl sm:rounded-3xl shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center">
              Voor wie is een snelle verkoop ideaal?
            </h3>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                {
                  icon: <BiHome />,
                  title: "Samenwonende stellen",
                  description: "Stellen die samenwonen en één woning willen verkopen om samen verder te gaan.",
                },
                {
                  icon: <BiEuro />,
                  title: "Financiële ruimte creëren",
                  description: "Mensen die op zoek zijn naar meer financiële ruimte door huis verkopen en terughuren.",
                },
                {
                  icon: <FaShieldAlt />,
                  title: "Executieverkoop voorkomen",
                  description:
                    "Verkopers die een executieverkoop door de bank willen voorkomen en zelf de regie houden.",
                },
                {
                  icon: <BiCheckCircle />,
                  title: "Discrete verkoop",
                  description:
                    "Huiseigenaren die discreet willen verkopen zonder openbare advertenties of bezichtigingen.",
                },
                {
                  icon: <BiTime />,
                  title: "Snel geld nodig",
                  description:
                    "Eigenaren die snel geld nodig hebben zonder lang te wachten op een koper via de reguliere markt.",
                },
                {
                  icon: <BiMap />,
                  title: "Nieuwe woning gekocht",
                  description:
                    "Huizenbezitters die een nieuwe woning hebben gekocht en hun oude huis snel willen verkopen.",
                },
                {
                  icon: <FaRegCalendarCheck />,
                  title: "Overwaarde benutten",
                  description:
                    "Ouderen die hun woning willen verkopen om overwaarde te benutten voor extra pensioen of zorg.",
                },
                {
                  icon: <FaHandshake />,
                  title: "Scheiding",
                  description: "Partners die gaan scheiden en hun huis snel willen afwikkelen om verder te kunnen.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="mt-1 text-[#2baf57] text-2xl">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 text-lg mb-3">Ook ideaal voor:</h4>
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                <li className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#2baf57]" />
                  <span>Woningeigenaren met een erfenis</span>
                </li>
                <li className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#2baf57]" />
                  <span>Mensen die gaan emigreren</span>
                </li>
                <li className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#2baf57]" />
                  <span>Eigenaren met achterstallig onderhoud</span>
                </li>
                <li className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#2baf57]" />
                  <span>Verhuurders die willen stoppen</span>
                </li>
                <li className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#2baf57]" />
                  <span>Mensen met dubbele woonlasten</span>
                </li>
                <li className="flex items-center gap-2">
                  <BiCheckCircle className="text-[#2baf57]" />
                  <span>Eigenaren met betalingsproblemen</span>
                </li>
              </ul>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="#bod-aanvragen"
                className="inline-block px-8 py-4 bg-[#2baf57] text-white font-bold text-lg rounded-md shadow-md hover:bg-green-700 transition"
              >
                Vraag nu een vrijblijvend bod aan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Veelgestelde Vragen Section */}
      <section aria-labelledby="faq-heading" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-[#0a1128]">
              Veelgestelde vragen
            </h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Antwoorden op de meest gestelde vragen over het snel verkopen van uw woning
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <FAQAccordion
              faqs={[
                {
                  question: "Hoe snel kan ik mijn huis verkopen?",
                  answer:
                    "In veel gevallen kunnen we uw woning binnen een week aankopen. Na acceptatie van ons bod kan de overdracht bij de notaris vaak al binnen enkele dagen plaatsvinden, afhankelijk van uw wensen en de beschikbaarheid van de notaris.",
                },
                {
                  question: "Is het bod dat ik krijg marktconform?",
                  answer:
                    "Ja, wij streven ernaar om een marktconform bod uit te brengen. We baseren ons bod op verschillende factoren zoals de locatie, staat van de woning, en actuele marktomstandigheden. Houd er wel rekening mee dat een snelle verkoop soms een kleine concessie op de prijs kan betekenen in ruil voor zekerheid en snelheid.",
                },
                {
                  question: "Moet ik mijn huis opknappen voor de verkoop?",
                  answer:
                    "Nee, dat is niet nodig. Wij kopen woningen in elke staat, ook met achterstallig onderhoud. U hoeft geen kosten te maken voor reparaties of opknapbeurten.",
                },
                {
                  question: "Zijn er kosten verbonden aan het aanvragen van een bod?",
                  answer:
                    "Nee, het aanvragen van een bod is volledig gratis en vrijblijvend. Er zijn geen verplichtingen en u beslist zelf of u ons bod accepteert.",
                },
                {
                  question: "Kan ik in mijn huis blijven wonen na de verkoop?",
                  answer:
                    "In veel gevallen is het mogelijk om uw woning terug te huren na de verkoop. Dit kan een goede oplossing zijn als u de overwaarde wilt benutten maar niet wilt verhuizen. Bespreek deze mogelijkheid met ons tijdens het verkoopproces.",
                },
                {
                  question: "Hoe lang duurt het voordat ik een bod ontvang?",
                  answer:
                    "Na het invullen van het aanvraagformulier ontvangt u binnen 24 uur een eerste prijsindicatie. Als deze u aanspreekt, maken we een afspraak voor een bezichtiging om tot een definitief bod te komen.",
                },
              ]}
            />

            <div className="mt-12 text-center">
              <p className="text-gray-700 mb-4">Heeft u een andere vraag die hier niet beantwoord wordt?</p>
              <Link href="/contact" className="inline-flex items-center text-[#2baf57] font-medium hover:underline">
                <span>Neem contact met ons op</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Onze Beloften Section */}
      <section aria-labelledby="beloften-heading">
        <h2 id="beloften-heading" className="sr-only">
          Onze Beloften
        </h2>
        <OnzeBeloften />
      </section>

      {/* Call To Action Section */}
      <section aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="sr-only">
          Vraag een bod aan
        </h2>
        <CallToActionBalk />
      </section>

      {/* Steps Section */}
      <section aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="sr-only">
          Hoe werkt het?
        </h2>
        <Steps />
      </section>

      {/* Reviews Section */}
      <section aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="sr-only">
          Klantervaringen
        </h2>
        <ReviewsSection />
      </section>

      {/* Final Call To Action */}
      <section aria-labelledby="final-cta-heading">
        <h2 id="final-cta-heading" className="sr-only">
          Vraag nu een bod aan
        </h2>
        <CallToActionBalk />
      </section>
    </main>
  )
}
