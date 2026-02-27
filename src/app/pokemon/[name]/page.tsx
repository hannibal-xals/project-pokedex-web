import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPokemonDetail } from "@/lib/pokeapi";

type DetailProps = {
  params: Promise<{ name: string }>;
};

const capitalize = (value: string) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;

export default async function PokemonDetailPage({ params }: DetailProps) {
  const { name } = await params;
  const pokemon = await getPokemonDetail(name);

  if (!pokemon) {
    notFound();
  }

  return (
    <main className="container">
      <Link href="/" className="back-link">
        ← Volver al listado
      </Link>

      <article className="detail-card">
        <Image src={pokemon.image} alt={pokemon.name} width={160} height={160} priority />
        <div>
          <p className="muted">#{pokemon.id}</p>
          <h1>{capitalize(pokemon.name)}</h1>
          <p>Tipos: {pokemon.types.map(capitalize).join(", ")}</p>

          <h2>Stats</h2>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.name}>
                <strong>{capitalize(stat.name)}:</strong> {stat.value}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </main>
  );
}
