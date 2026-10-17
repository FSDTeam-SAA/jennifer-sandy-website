export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  content: {
    intro: string;
    sections: { heading: string; body: string }[];
    quote?: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "moebliertes-wohnen-duesseldorf-guide",
    title: "Möbliertes Wohnen auf Zeit in Düsseldorf: Der umfassende Leitfaden",
    excerpt:
      "Flexibel ankommen und sich sofort wie zu Hause fühlen: Alles über Vorteile, Ausstattung und Ablauf beim temporären Wohnen in der Rheinmetropole.",
    tag: "Wohnen auf Zeit",
    image: "/images/properties-3.jpg",
    date: "12. Oktober 2026",
    readTime: "5 Min. Lesezeit",
    author: "0211wohnen Redaktion",
    content: {
      intro:
        "Düsseldorf ist als internationale Wirtschafts- und Modemetropole ein Magnet für Geschäftsreisende, Expats und Fachkräfte aus aller Welt. Wer für ein Projekt oder den Start eines neuen Lebensabschnitts in die Stadt kommt, steht vor der Herausforderung, schnell eine hochwertige und unkomplizierte Wohnlösung zu finden. Möbliertes Wohnen auf Zeit bietet hier die ideale Antwort.",
      sections: [
        {
          heading: "Warum möbliertes Wohnen in Düsseldorf die beste Wahl ist",
          body: "Der klassische Wohnungsmarkt erfordert langwierige Besichtigungen, Bonitätsprüfungen und meist den Kauf einer kompletten Einrichtung sowie langfristige Mietverträge mit Kündigungsfristen. Unsere möblierten Apartments ermöglichen Ihnen einen sofortigen Einzug mit bezugsfertiger Vollausstattung – ohne Maklergebühren und mit flexiblen Mietzeiträumen.",
        },
        {
          heading: "Was gehört zur Vollausstattung bei 0211wohnen?",
          body: "Jedes Apartment ist durchdacht und stilvoll gestaltet: hochwertige Boxspringbetten, ein ergonomischer Arbeitsbereich mit schnellem High-Speed-WLAN, eine voll ausgestattete Einbauküche mit Geschirrspüler, Nespresso-Maschine und Kochutensilien sowie ein modernes Bad mit frischen Handtüchern. Sie bringen lediglich Ihren Koffer mit – um alles andere haben wir uns bereits gekümmert.",
        },
        {
          heading: "Transparenz durch Pauschalmiete",
          body: "Böse Überraschungen bei der jährlichen Nebenkostenabrechnung gehören der Vergangenheit an. In der angegebenen Pauschalmiete sind Strom, Heizung, Wasser, Hausnebenkosten und Internet bereits vollständig enthalten. So behalten Sie stets die volle Kostenkontrolle.",
        },
      ],
      quote: "Einfach ankommen, die Tür aufschließen und sich vom ersten Tag an zu Hause fühlen.",
    },
  },
  {
    slug: "medienhafen-duesseldorf-wohnviertel",
    title: "Leben im Medienhafen & Karlstadt: Wohnen in den begehrtesten Lagen",
    excerpt:
      "Moderne Gehry-Bauten, erstklassige Restaurants und die Rheinuferpromenade direkt vor der Haustür – warum diese Stadtteile so beliebt sind.",
    tag: "Düsseldorf erleben",
    image: "/images/connect-2.jpg",
    date: "28. September 2026",
    readTime: "4 Min. Lesezeit",
    author: "0211wohnen Redaktion",
    content: {
      intro:
        "Die Wahl des richtigen Stadtteils prägt das Lebensgefühl in Düsseldorf maßgeblich. Vor allem der Medienhafen, Unterbilk und die historische Karlstadt verbinden urbane Lebendigkeit mit exzellenter Lebensqualität und kurzen Wegen.",
      sections: [
        {
          heading: "Der Medienhafen: Architektur trifft Lifestyle",
          body: "Ehemalige Hafenanlagen haben sich in eines der spannendsten Architekturviertel Europas verwandelt. Neben den weltbekannten Bauten von Frank O. Gehry bietet der Medienhafen eine erstklassige Gastronomieszene – von trendigen Bars über exklusive Steakhäuser bis hin zum entspannten Café mit Rheinblick.",
        },
        {
          heading: "Unterbilk & Lorettoviertel: Urbaner Charme",
          body: "Nur wenige Schritte vom Medienhafen entfernt lockt die Lorettostraße mit individuellen Boutiquen, feinen Bäckereien und einem lebendigen Kiez-Flair. Wer hier wohnt, schätzt die Nachbarschaftsatmosphäre und die Nähe zur Innenstadt.",
        },
        {
          heading: "Perfekte Anbindung für Beruf und Freizeit",
          body: "Ob mit der Straßenbahn zum Hauptbahnhof, in 15 Minuten zum Flughafen Düsseldorf oder zu Fuß entlang des Rheinufers bis zur Altstadt: Die zentrale Lage spart wertvolle Zeit im Alltag.",
        },
      ],
      quote: "Ein einzigartiges Lebensgefühl direkt am Rheinstrom – urban, modern und voller Energie.",
    },
  },
  {
    slug: "pauschalmiete-vorteile-erklaert",
    title: "Pauschalmiete erklärt: Was bedeutet alles inklusive wirklich?",
    excerpt:
      "Volle Planungssicherheit für Mieter und Unternehmen: Welche Leistungen die Pauschalmiete abdeckt und worauf Sie achten sollten.",
    tag: "Ratgeber",
    image: "/images/service-2.jpg",
    date: "15. September 2026",
    readTime: "3 Min. Lesezeit",
    author: "0211wohnen Redaktion",
    content: {
      intro:
        "Bei herkömmlichen Mietverträgen setzt sich die Miete aus Kaltmiete und Vorauszahlungen für Betriebskosten zusammen. Bei der Pauschalmiete für möbliertes Wohnen gilt ein klares und einfaches Prinzip: Ein Betrag deckt alle vertraglich vereinbarten Leistungen ab.",
      sections: [
        {
          heading: "Welche Kosten sind in der Pauschalmiete enthalten?",
          body: "In der Regel umfasst die Pauschalmiete: Kaltmiete für die möblierte Wohnung, Heizkosten, Kalt- und Warmwasser, Müllgebühren, Hausmeister und Treppenhausreinigung sowie die unbegrenzte Nutzung des schnellen Internetzugangs. Auch die Stromkosten sind in der vereinbarten Pauschale bereits einkalkuliert.",
        },
        {
          heading: "Vorteile für Firmenkunden und Expats",
          body: "Für Unternehmen, die Wohnungen für Mitarbeiter anmieten, entfällt der bürokratische Aufwand für Nachzahlungen und monatliche Anpassungen. Die Rechnungslegung ist monatlich einheitlich und steuerlich unkompliziert abzuwickeln.",
        },
      ],
    },
  },
  {
    slug: "checkliste-einzug-duesseldorf",
    title: "Checkliste: Entspannter Einzug in Ihr möbliertes Apartment",
    excerpt:
      "Vom ersten Tag an organisiert: Von der Schlüsselübergabe über Wohnungsgeberbestätigung bis zur Nachbarschaftserkundung.",
    tag: "Checkliste",
    image: "/images/properties-1.jpg",
    date: "02. September 2026",
    readTime: "4 Min. Lesezeit",
    author: "0211wohnen Redaktion",
    content: {
      intro:
        "Der Umzug in eine neue Stadt bringt viele organisatorische Aufgaben mit sich. Bei einem möblierten Apartment von 0211wohnen ist der Start denkbar einfach. Mit unserer Checkliste behalten Sie alle wichtigen Schritte im Blick.",
      sections: [
        {
          heading: "1. Vor der Anreise",
          body: "Stimmen Sie Ihren Ankunftstermin rechtzeitig mit unserem Team ab. Bei Bedarf erhalten Sie alle Zugangsdaten und Anreisehinweise vorab digital.",
        },
        {
          heading: "2. Check-in und Schlüsselübergabe",
          body: "Bei der Wohnungsübergabe prüfen Sie gemeinsam mit uns das Übergabeprotokoll. Sie erhalten alle Schlüssel sowie eine Einführung in die Haustechnik und das WLAN.",
        },
        {
          heading: "3. Wohnungsgeberbestätigung für die Anmeldung",
          body: "Für die behördliche Anmeldung beim Einwohnermeldeamt Düsseldorf stellen wir Ihnen unverzüglich die erforderliche Wohnungsgeberbestätigung aus.",
        },
      ],
    },
  },
];
