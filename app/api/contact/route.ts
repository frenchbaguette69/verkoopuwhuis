import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  try {
    // Mail naar jezelf & je team
    await resend.emails.send({
      from: 'Verkoop Uw Huis <noreply@verkoopuwhuis.nu>',
      to: ['marcowammes@outlook.com', 'info@verkoopuwhuis.nu'],
      replyTo: body.email,
      subject: 'Nieuwe bodaanvraag via verkoopuwhuis.nu',
      text: `
Er is een nieuw bodformulier ingevuld.

Naam: ${body.voornaam} ${body.achternaam}
E-mail: ${body.email}
Telefoon: ${body.telefoon}
Adres: ${body.adres}
Gewenst bedrag: ${body.bedrag}
Omschrijving woning: ${body.omschrijving}
      `,
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <tr style="background-color: #ffffff;">
        <td style="padding: 20px; text-align: center;">
          <img src="https://verkoopuwhuis.nu/logo.png" alt="verkoopuwhuis.nu" width="120" style="margin-bottom: 10px;" />
          <h1 style="color: #000; font-size: 20px; margin: 0;">Nieuwe aanvraag ontvangen</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 24px;">
          <p style="font-size: 16px; color: #333;">Er is zojuist een nieuwe bodaanvraag ingevuld:</p>
          <table style="width: 100%; font-size: 15px; color: #444;">
            <tr><td style="padding: 8px 0;"><strong>Naam:</strong></td><td>${body.voornaam} ${body.achternaam}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>E-mailadres:</strong></td><td>${body.email}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Telefoonnummer:</strong></td><td>${body.telefoon}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Adres:</strong></td><td>${body.adres}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Gewenst bedrag:</strong></td><td>${body.bedrag}</td></tr>
            <tr><td style="padding: 8px 0; vertical-align: top;"><strong>Omschrijving woning:</strong></td><td>${body.omschrijving}</td></tr>
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

    // Bevestiging naar klant
    await resend.emails.send({
      from: 'Verkoop Uw Huis <noreply@verkoopuwhuis.nu>',
      to: body.email,
      replyTo: 'info@verkoopuwhuis.nu',
      subject: 'Bevestiging van je aanvraag bij verkoopuwhuis.nu',
      text: `
Hi ${body.voornaam},

Bedankt voor je aanvraag via verkoopuwhuis.nu.
We nemen binnen 24 uur contact met je op om je aanvraag te bespreken.

Met vriendelijke groet,  
Het team van verkoopuwhuis.nu
      `,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px;">
            <tr style="background-color: #ffffff;">
              <td style="padding: 20px; text-align: center;">
                <img src="https://verkoopuwhuis.nu/logo.png" alt="verkoopuwhuis.nu" width="100" style="margin-bottom: 10px;" />
                <h2 style="color: #000; margin: 0;">Bedankt voor je aanvraag!</h2>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px; color: #333;">
                <p>Hi ${body.voornaam},</p>
                <p>Bedankt voor het invullen van het bodformulier op <strong>verkoopuwhuis.nu</strong>.</p>
                <p>We nemen <strong>binnen 24 uur</strong> contact met je op om je aanvraag te bespreken.</p>
                <p>Heb je in de tussentijd vragen? Mail gerust naar <a href="mailto:info@verkoopuwhuis.nu">info@verkoopuwhuis.nu</a>.</p>
                <p style="margin-top: 24px;">Met vriendelijke groet,<br />Het team van verkoopuwhuis.nu</p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Mailfout:', error);
    return Response.json({ error: 'Er is iets misgegaan' }, { status: 500 });
  }
}
