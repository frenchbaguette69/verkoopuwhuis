'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function BodAanvraagForm() {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    adres: '',
    voornaam: '',
    achternaam: '',
    email: '',
    telefoon: '',
    bedrag: '',
    omschrijving: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { toast } = useToast();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSuccess(true);
      setFormData({
        adres: '',
        voornaam: '',
        achternaam: '',
        email: '',
        telefoon: '',
        bedrag: '',
        omschrijving: '',
      });
      setAgreed(false);

      toast({
        title: "Aanvraag verstuurd!",
        description: "We nemen binnen 24 uur contact met je op.",
      });
    } else {
      toast({
        title: "Er is iets misgegaan",
        description: "Probeer het later opnieuw of neem contact op.",
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "Netwerkfout",
      description: "Controleer je internetverbinding en probeer opnieuw.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md space-y-6">
      {success && (
        <p className="text-green-600 text-sm">Bedankt! Uw aanvraag is succesvol verstuurd.</p>
      )}

      <div>
        <Label htmlFor="adres">
          Adres <span className="text-red-500">*</span>
        </Label>
        <Input id="adres" name="adres" value={formData.adres} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="voornaam">
            Voornaam <span className="text-red-500">*</span>
          </Label>
          <Input id="voornaam" name="voornaam" value={formData.voornaam} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="achternaam">
            Achternaam <span className="text-red-500">*</span>
          </Label>
          <Input id="achternaam" name="achternaam" value={formData.achternaam} onChange={handleChange} required />
        </div>
      </div>

      <div>
        <Label htmlFor="email">
          E-mailadres <span className="text-red-500">*</span>
        </Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="telefoon">
          Telefoonnummer <span className="text-red-500">*</span>
        </Label>
        <Input id="telefoon" name="telefoon" type="tel" value={formData.telefoon} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="bedrag">
          Gewenst bedrag <span className="text-red-500">*</span>
        </Label>
        <Input id="bedrag" name="bedrag" placeholder="Bijv. €325.000" value={formData.bedrag} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="omschrijving">
          Vertel kort iets over de woning <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="omschrijving"
          name="omschrijving"
          placeholder="Bijv. type woning, staat van onderhoud, reden van verkoop..."
          value={formData.omschrijving}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="akkoord" checked={agreed} onCheckedChange={() => setAgreed(!agreed)} />
        <Label htmlFor="akkoord" className="text-sm">
          Ik ga akkoord met het <a href="/privacybeleid" className="underline">privacybeleid</a>.
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#2baf57] hover:bg-green-700 text-white text-lg font-semibold"
        disabled={!agreed || loading}
      >
        {loading ? "Versturen..." : "Versturen"}
      </Button>
    </form>
  );
}
