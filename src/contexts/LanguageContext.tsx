import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'cs' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  cs: {
    // Navigation
    'nav.about': 'O nás',
    'nav.events': 'Akce',
    'nav.join': 'Přidej se',
    'nav.contact': 'Kontakt',

    // Hero
    'hero.tagline': 'Komunitní prostor pro svobodně smýšlející',
    'hero.description': 'Jsme komunitní prostor, který spojuje svobodně smýšlející lidi. Našim cílem je vytvořit otevřené prostředí pro sdílení myšlenek, diskuzi o osobní svobodě, volném trhu a podpoře individuální zodpovědnosti.',
    'hero.cta': 'Chci pomoci!',
    'hero.discord': 'Přidej se na Discord',

    // About
    'about.title': 'Co jsme?',
    'about.p1': 'LibertyLoft je nově vznikající komunitní centrum v Praze, zaměřené na svobodomyslnou, libertariánskou a ankap komunitu.',
    'about.p2': 'Představa je vytvořit prostor, kde se lidé mohou pravidelně scházet, pořádat akce, meetupy, přednášky a společně se vzdělávat i bavit.',
    'about.p3': 'Za posledních pár let jsme zachytili mnoho přání o vytvoření podobného místa protože jednotné místo v Česku dlouhodobě chybí a proto jsme reagovat na poptávku po fyzickém prostoru pro setkávání, sdílení znalostí a budování přátelství v rámci komunity.',
    'about.p4': 'Aktuálně hledáme lidi kteří by do toho s námi "šli" – místo už máme ale potřebujeme nějaké proaktivní lidi kteří by se do toho s námi pustili po hlavě 😸',

    // Looking for
    'looking.title': 'Koho hledáme?',
    'looking.description': 'Hledáme proaktivní lidi, kteří mají chuť se zapojit do rozjezdu tohoto projektu – ať už jako organizátoři, dobrovolníci, nebo prostě nadšenci, kteří chtějí být u toho od začátku. Nezáleží na tom, jestli máš zkušenosti s pořádáním akcí, nebo jsi jen plný nápadů a energie – hlavní je chuť něco společně tvořit!',

    // Offer
    'offer.title': 'Co nabízíme?',
    'offer.space': 'Prostor',
    'offer.space.desc': 'Máme k dispozici prostor kde máme svobodu ho jakkoliv upravovat',
    'offer.community': 'Komunitu',
    'offer.community.desc': 'Možnost potkat podobně smýšlející lidi, navazovat přátelství a sdílet myšlenky, jednoduše místo pro Libertariánský networking.',
    'offer.ideas': 'Realizaci nápadů',
    'offer.ideas.desc': 'Chceme, aby se každý mohl zapojit podle svých možností a zájmů – ať už s pořádáním akcí, propagací, nebo třeba úpravou prostor, vítáme všechny kteří to budou myslet vážně 🙂',
    'offer.opportunity': 'Příležitost',
    'offer.opportunity.desc': 'Můžeš ovlivnit, jak bude LibertyLoft vypadat a fungovat!',

    // Join
    'join.title': 'Jak se můžeš zapojit?',
    'join.discord': 'Ozvi se nám – napiš na Discord',
    'join.meetup': 'Přijď na setkání – rádi tě poznáme, představíme ti prostory i naše plány.',
    'join.help': 'Navrhni, s čím bys chtěl/a pomoct – ať už jde o organizaci, propagaci, fundraising, úpravu prostor nebo jakýkoliv vlastní nápad. Máš volné ruce 😸',

    // Events
    'events.title': 'Akce a Eventy',
    'events.upcoming': 'Nadcházející akce',
    'events.noEvents': 'Žádné nadcházející akce',
    'events.loading': 'Načítám akce...',
    'events.addToCalendar': 'Přidat do kalendáře',
    'events.mapLink': 'Mapa',
    'events.addSingleEvent': 'Přidat jen tento event',
    'events.addSingleEventHint': 'Otevře se formulář s vyplněným jedním eventem',
    'events.addWholeCalendar': 'Přidat celý kalendář',
    'events.addWholeCalendarHint': 'Přihlásíš se k odběru všech veřejných akcí',

    // Contact
    'contact.title': 'Kontakt',
    'contact.address': 'Adresa',
    'contact.directions': 'Navigace',
    'contact.email': 'Email',
    'contact.facebook': 'Facebook',
    'contact.facebookLink': 'Navštívit stránku',

    // Newsletter
    'newsletter.title': 'Odebírej novinky',
    'newsletter.placeholder': 'tvuj@email.cz',
    'newsletter.button': 'Odebírat',
    'newsletter.coming': 'Již brzy',

    // Footer
    'footer.copyright': '© 2026 LibertyLoft. Všechna práva vyhrazena.',
    'footer.powered': 'Powered by svoboda',
    'footer.sourceCode': 'Zdrojový kód',
  },
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.events': 'Events',
    'nav.join': 'Join Us',
    'nav.contact': 'Contact',

    // Hero
    'hero.tagline': 'Community space for free thinkers',
    'hero.description': 'We are a community space that connects free-thinking people. Our goal is to create an open environment for sharing ideas, discussing personal freedom, free markets, and supporting individual responsibility.',
    'hero.cta': 'I want to help!',
    'hero.discord': 'Join Discord',

    // About
    'about.title': 'What are we?',
    'about.p1': 'LibertyLoft is an emerging community center in Prague, focused on the free-thinking, libertarian, and ancap community.',
    'about.p2': 'The vision is to create a space where people can meet regularly, organize events, meetups, lectures, and learn and have fun together.',
    'about.p3': 'Over the past few years, we have received many requests to create such a place because a unified location has been missing in the Czech Republic for a long time. Therefore, we are responding to the demand for a physical space for meetings, knowledge sharing, and building friendships within the community.',
    'about.p4': 'We are currently looking for people who would like to join us – we already have the space but we need some proactive people who would dive in with us 😸',

    // Looking for
    'looking.title': 'Who are we looking for?',
    'looking.description': "We are looking for proactive people who want to get involved in launching this project – whether as organizers, volunteers, or simply enthusiasts who want to be there from the beginning. It doesn't matter if you have experience organizing events, or if you're just full of ideas and energy – the main thing is the desire to create something together!",

    // Offer
    'offer.title': 'What do we offer?',
    'offer.space': 'Space',
    'offer.space.desc': 'We have a space where we have the freedom to modify it however we want',
    'offer.community': 'Community',
    'offer.community.desc': 'The opportunity to meet like-minded people, make friendships, and share ideas – simply a place for Libertarian networking.',
    'offer.ideas': 'Idea Realization',
    'offer.ideas.desc': 'We want everyone to be able to get involved according to their abilities and interests – whether organizing events, promotion, or even modifying the space, we welcome everyone who is serious about it 🙂',
    'offer.opportunity': 'Opportunity',
    'offer.opportunity.desc': 'You can influence how LibertyLoft will look and function!',

    // Join
    'join.title': 'How can you get involved?',
    'join.discord': 'Reach out to us – write on Discord',
    'join.meetup': "Come to a meeting – we'd love to meet you, show you the space and our plans.",
    'join.help': 'Suggest what you would like to help with – whether it\'s organization, promotion, fundraising, modifying the space, or any of your own ideas. You have free hands 😸',

    // Events
    'events.title': 'Events',
    'events.upcoming': 'Upcoming Events',
    'events.noEvents': 'No upcoming events',
    'events.loading': 'Loading events...',
    'events.addToCalendar': 'Add to Calendar',
    'events.mapLink': 'Map',
    'events.addSingleEvent': 'Add only this event',
    'events.addSingleEventHint': 'Opens a prefilled form for this single event',
    'events.addWholeCalendar': 'Add whole calendar',
    'events.addWholeCalendarHint': 'Subscribe to all public events',

    // Contact
    'contact.title': 'Contact',
    'contact.address': 'Address',
    'contact.directions': 'Directions',
    'contact.email': 'Email',
    'contact.facebook': 'Facebook',
    'contact.facebookLink': 'Visit page',

    // Newsletter
    'newsletter.title': 'Subscribe to updates',
    'newsletter.placeholder': 'your@email.com',
    'newsletter.button': 'Subscribe',
    'newsletter.coming': 'Coming soon',

    // Footer
    'footer.copyright': '© 2026 LibertyLoft. All rights reserved.',
    'footer.powered': 'Powered by freedom',
    'footer.sourceCode': 'Source code',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('cs');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
