import { NextResponse } from 'next/server'
import { keywords } from './keywords'
import { createGroqClient } from '@/lib/groq'
import { prisma } from '@/lib/prisma'

// ✅ Interne pagina's en bijbehorende keywords
const internalPages = [
  {
    url: 'https://www.verkoopuwhuis.nu/',
    keywords: ['verkoopuwhuis.nu', 'woning verkopen', 'huis verkopen zonder makelaar', 'huis opkopen'],
  },
  {
    url: 'https://www.verkoopuwhuis.nu/huis-verkopen',
    keywords: ['huis verkopen', 'woning snel verkopen', 'huis verkopen bij scheiding', 'huis snel verkopen'],
  },
  {
    url: 'https://www.verkoopuwhuis.nu/contact',
    keywords: ['contact', 'vrijblijvend bod aanvragen', 'neem contact op', 'bel ons'],
  },
]

// ✅ Functie om interne links toe te voegen
function addInternalLinks(html: string): string {
  internalPages.forEach(({ url, keywords }) => {
    keywords.forEach((kw) => {
      const regex = new RegExp(`(?<!<a[^>]*?>)\\b(${kw})\\b(?![^<]*?</a>)`, 'i')
      html = html.replace(regex, `<a href="${url}">$1</a>`)
    })
  })
  return html
}

export async function POST() {
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)] ?? "huis verkopen"

  const client = createGroqClient()

  const prompt = `
Je bent een professionele SEO-copywriter gespecialiseerd in vastgoed en woningverkoop.

Schrijf een SEO-geoptimaliseerde blogpost voor de website https://verkoopuwhuis.nu.

Gebruik het volgende keyword als hoofdonderwerp: "${randomKeyword}".

Specificaties voor de blogpost:

Taal: Nederlands

Vormgeving: Gebruik zuivere HTML-tags (<h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, etc.)

Titel: Plaats het gekozen keyword in een <h1>.

Introductie: Schrijf een overtuigende intro die inspeelt op de urgentie of emotie van de doelgroep (bijvoorbeeld mensen die snel hun huis willen verkopen bij scheiding, schulden of erfenis).

Kerntekst:

- Gebruik duidelijke tussenkoppen (<h2>, <h3>) die het onderwerp logisch opdelen.
- Leg het verkoopproces stap voor stap uit.
- Benoem de voordelen van je huis verkopen aan verkoopuwhuis.nu (snelheid, geen makelaar, geen kosten).
- Voeg minstens 1 lijst toe met tips of voordelen in <ul><li>-vorm.
- Noem verkoopuwhuis.nu meerdere keren als dé oplossing voor snelle woningverkoop.

SEO-eisen:

- Gebruik het gekozen keyword minimaal 5 keer verspreid door de tekst.
- Zorg dat het keyword voorkomt in de <h1>, tenminste 1 <h2>, en in meerdere paragrafen.
- Gebruik synoniemen en verwante termen zoals "woning verkopen", "huis opkopen", "direct bod", "woning bij scheiding", enz.
- Vermijd keyword-stuffing: schrijf natuurlijk en menselijk.

Lengte: Minimaal 1000 woorden.

Afsluiting:

- Vat kort samen waarom verkoopuwhuis.nu de juiste keuze is.
- Voeg een duidelijke call-to-action toe met link naar: "Vraag vrijblijvend een bod aan via verkoopuwhuis.nu".

Tone of voice: Deskundig, empathisch, betrouwbaar.

BELANGRIJK:
Sluit je HTML af met exact deze tags, zonder uitleg of opmaak eromheen:

<metaTitle>...</metaTitle>
<metaDescription>...</metaDescription>

⚠️ Let op: vul deze velden altijd in. Ze zijn verplicht.

Er mag niets boven de <h1> staan. Alleen geldige HTML, geen uitleg.
`

  const response = await client.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const fullText = response.choices[0]?.message?.content?.trim() || ''

  const metaTitleMatch = fullText.match(/<metaTitle>(.*?)<\/metaTitle>/s)
  const metaDescriptionMatch = fullText.match(/<metaDescription>(.*?)<\/metaDescription>/s)

  const metaTitle = metaTitleMatch?.[1]?.trim() || ''
  const metaDescription = metaDescriptionMatch?.[1]?.trim() || ''

  const rawHtml = fullText.split('<metaTitle>')[0]?.trim() || ''
  const blogHtml = addInternalLinks(rawHtml)

  if (!metaTitle || !metaDescription) {
  return NextResponse.json(
    { error: 'Meta title en description zijn verplicht.' },
    { status: 400 }
  )
}


  await prisma.post.create({
    data: {
      title: randomKeyword,
      content: blogHtml,
      metaTitle,
      metaDescription,
    },
  })

  return NextResponse.json({ message: 'Blog created', keyword: randomKeyword })
}
