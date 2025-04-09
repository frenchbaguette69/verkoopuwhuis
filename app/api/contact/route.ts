import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await resend.emails.send({
      from: 'verkoopuwhuis.nu <noreply@verkoopuwhuis.nu>',
      to: 'marcowammes@outlook.com',
      subject: 'Nieuw bodformulier ingevuld',
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <tr style="background-color: #0a1128;">
        <td style="padding: 20px; text-align: center;">
          <img src="https://verkoopuwhuis.nu/logo.png" alt="verkoopuwhuis.nu" width="120" style="margin-bottom: 10px;" />
          <h1 style="color: white; font-size: 20px; margin: 0;">Nieuwe aanvraag ontvangen</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 24px;">
          <p style="font-size: 16px; color: #333;">Er is zojuist een nieuwe bodaanvraag ingevuld:</p>
          <table style="width: 100%; font-size: 15px; color: #444;">
            <tr>
              <td style="padding: 8px 0;"><strong>Naam:</strong></td>
              <td>${body.voornaam} ${body.achternaam}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>E-mailadres:</strong></td>
              <td>${body.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Telefoonnummer:</strong></td>
              <td>${body.telefoon}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Adres:</strong></td>
              <td>${body.adres}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Gewenst bedrag:</strong></td>
              <td>${body.bedrag}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;"><strong>Omschrijving woning:</strong></td>
              <td>${body.omschrijving}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 14px; color: #888;">
            Verstuurd via verkoopuwhuis.nu – ${new Date().toLocaleString('nl-NL')}
          </p>
        </td>
      </tr>
    </table>
  </div>
`,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Er is iets misgegaan' }, { status: 500 });
  }
}
