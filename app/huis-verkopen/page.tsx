import { Metadata } from "next";
import CallToActionBalk from "@/components/CallToActionBalk";
import OnzeBeloften from "@/components/OnzeBeloften";
import ReviewsSection from "@/components/ReviewsSection";
import Steps from "@/components/Steps";
import BodAanvraagForm from "@/components/BodAanvraagForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Huis verkopen zonder makelaar | verkoopuwhuis.nu",
  description:
    "Uw huis snel verkopen zonder makelaar of gedoe? verkoopuwhuis.nu koopt woningen direct op. Vraag nu gratis en vrijblijvend een bod aan!",
};

export default function HuisVerkopenPage() {
  return (
    <main className="bg-white">
      <section className="bg-[#0a1128] text-white py-24 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-8">
            Uw huis verkopen zonder makelaar? Wij kopen het direct van u over.
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Geen bezichtigingen. Geen wachttijd. Geen financieringsvoorbehoud. Wel een eerlijk bod binnen 24 uur.
          </p>
          <Link href="/contact">
            <button className="mt-5 bg-[#2baf57] hover:bg-green-700 transition px-6 py-3 text-white font-semibold rounded-md shadow-md uppercase tracking-wide">
              Bod aanvragen
            </button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1128] mb-6">
            Waarom kiezen voor verkoopuwhuis.nu?
          </h2>
          <p className="text-gray-700 mb-4">
            Uw huis verkopen kan een langdurig en stressvol proces zijn. Van het inschakelen van een makelaar, het laten maken van foto’s, het organiseren van bezichtigingen tot aan eindeloze onderhandelingen: het kost tijd, geld en energie. Bij verkoopuwhuis.nu doen we het anders. Wij kopen uw woning direct op, zonder tussenkomst van een makelaar of andere partijen. 
          </p>
          <p className="text-gray-700 mb-4">
            Ons proces is snel, transparant en vrijblijvend. U ontvangt binnen 24 uur een bod. Gaat u akkoord? Dan regelen wij alles: van koopovereenkomst tot overdracht bij de notaris. U hoeft niets te doen, behalve akkoord geven en uw handtekening zetten. Zo bespaart u op makelaarskosten én verkoopt u uw woning binnen enkele dagen. 
          </p>
          <p className="text-gray-700 mb-4">
            Wij kopen alle soorten woningen: appartementen, rijtjeshuizen, vrijstaande woningen en zelfs huizen met achterstallig onderhoud. Ook als uw woning deel uitmaakt van een erfenis, bij een scheiding of als u snel moet verhuizen vanwege werk of emigratie. Wij bieden u zekerheid, snelheid en volledige ontzorging.
          </p>
        </div>
      </section>

      <OnzeBeloften />

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1128] mb-6">
            Huis verkopen zonder makelaar: de voordelen
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-4">
            <li><strong>Geen makelaarskosten:</strong> U bespaart duizenden euro’s aan courtage.</li>
            <li><strong>Geen bezichtigingen:</strong> U hoeft uw woning niet verkoopklaar te maken of mensen over de vloer te krijgen.</li>
            <li><strong>Geen stress:</strong> Geen eindeloos wachten, geen onzekerheid of kopers met financieringsproblemen.</li>
            <li><strong>Snelle verkoop:</strong> In veel gevallen is uw woning binnen 5 werkdagen verkocht en overgedragen.</li>
            <li><strong>100% vrijblijvend:</strong> U zit nergens aan vast. Ons bod is gratis en zonder verplichtingen.</li>
          </ul>
        </div>
      </section>

      <Steps />

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1128] mb-6">Voor wie is dit interessant?</h2>
          <p className="text-gray-700 mb-4">
            Wij kopen woningen op in heel Nederland, ongeacht de staat of situatie. Dit is ideaal voor mensen die:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-3">
            <li>Snel van hun woning af willen door verhuizing of emigratie</li>
            <li>Te maken hebben met een scheiding of overlijden</li>
            <li>Een woning hebben geërfd en liever contant afwikkelen</li>
            <li>Financiële ruimte nodig hebben en hun huis willen verkopen met terughuur</li>
            <li>Geen zin hebben in lange verkooptrajecten of makelaars</li>
          </ul>
        </div>
      </section>

      <ReviewsSection />

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1128] mb-6">Uw huis verkopen? Dit kunt u verwachten:</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-3">
            <li>U vult het formulier in en ontvangt binnen 24 uur een bod</li>
            <li>We nemen contact op om het bod en uw situatie te bespreken</li>
            <li>Indien nodig plannen we een bezichtiging in (discreet en snel)</li>
            <li>U ontvangt de verkoopovereenkomst – zonder kleine lettertjes</li>
            <li>Op de afgesproken datum wordt de woning overgedragen bij de notaris</li>
          </ol>
          <p className="text-gray-700 mt-4">
            Geen makelaar, geen advertentie, geen stress. Alleen duidelijkheid, snelheid en zekerheid.
          </p>
        </div>
      </section>

      <CallToActionBalk />

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1128] mb-6">Klaar voor de volgende stap?</h2>
          <p className="text-gray-700 mb-6">
            Wilt u weten wat wij voor uw woning kunnen betekenen? Vraag vandaag nog gratis en vrijblijvend een bod aan. U zit nergens aan vast en heeft binnen 1 dag duidelijkheid. Wacht niet weken of maanden met verkopen – wij kopen uw huis direct.
          </p>

          <BodAanvraagForm />
        </div>
      </section>
    </main>
  );
}
