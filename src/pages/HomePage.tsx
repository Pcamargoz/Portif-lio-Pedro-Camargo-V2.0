import { profile } from '../content/profile';
import { Hero } from '../sections/Hero';
import { Marquee } from '../components/Marquee';
import { ProjectsShowcase } from '../sections/ProjectsShowcase';
import { About } from '../sections/About';
import { Atuacao } from '../sections/Atuacao';
import { Certs } from '../sections/Certs';
import { Stack } from '../sections/Stack';
import { Trajetoria } from '../sections/Trajetoria';
import { Contact } from '../sections/Contact';

/**
 * Home — projetos em evidência logo após o hero (objetivo central da V3),
 * seguidos das seções institucionais na ordem renumerada.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={profile.marqueeItems} />
      <ProjectsShowcase />
      <About />
      <Atuacao />
      <Certs />
      <Stack />
      <Trajetoria />
      <Contact />
    </>
  );
}
