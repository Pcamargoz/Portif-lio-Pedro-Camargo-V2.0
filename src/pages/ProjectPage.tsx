import { useParams } from 'react-router-dom';

export default function ProjectPage() {
  const { slug } = useParams();
  return <h1 style={{ padding: 'var(--pad-x)' }}>Projeto: {slug}</h1>;
}
