import { contactBigtext, featuredContact, contacts } from '../content/contacts';
import { SectionHeading } from '../components/SectionHeading';
import { ContactCard } from '../components/ContactCard';
import './Contact.css';

/**
 * Contato & redes — bigtext + LinkedIn em destaque + grid de canais,
 * portado de .contato do legado.
 */
export function Contact() {
  return (
    <section className="section contato" id="contato">
      <SectionHeading number="/ 07" title="Contato & redes" id="contato-titulo" />

      <div className="contato__wrap">
        <p className="contato__bigtext">{contactBigtext}</p>

        <ContactCard
          featured
          external
          kicker={featuredContact.kicker}
          value={featuredContact.value}
          handle={featuredContact.handle}
          description={featuredContact.description}
          arrow={featuredContact.arrow}
          href={featuredContact.href}
        />

        <div className="contato__grid">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.href}
              kicker={contact.label}
              value={contact.value}
              href={contact.href}
              arrow={contact.arrow}
              external={contact.kind === 'github' || contact.kind === 'site'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
