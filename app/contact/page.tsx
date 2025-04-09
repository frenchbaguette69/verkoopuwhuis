import { Metadata } from "next";
import BodAanvraagForm from "@/components/BodAanvraagForm";

export const metadata: Metadata = {
  title: "Contact | verkoopuwhuis.nu",
  description: "Direct contact met verkoopuwhuis.nu. Wij kopen woningen in heel Nederland, zonder gedoe of makelaar.",
};

export default function ContactPage() {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12 mt-5">
        <h1 className="text-4xl font-bold text-[#0a1128]">Direct contact met verkoopuwhuis.nu</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Wilt u uw woning verkopen aan ons, of heeft u vragen over hoe onze werkwijze precies werkt?
          Vul dan het formulier in. We reageren altijd binnen 24 uur — zonder verplichtingen.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          <strong>Let op:</strong> wij zijn geen makelaar en bemiddelen niet. Wij kopen woningen direct op, zonder tussenkomst.
        </p>
      </div>

      <BodAanvraagForm />
    </section>
  );
}
