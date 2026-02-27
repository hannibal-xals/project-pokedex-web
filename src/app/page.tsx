import Image from "next/image";
import Link from "next/link";
import { getPokemonByName, getPokemonPage } from "@/lib/pokeapi";

type HomeProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 20;

const capitalize = (value: string) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page ?? "1") || 1);

  const [pokemonPage, searchedPokemon] = await Promise.all([
    getPokemonPage(page, PAGE_SIZE),
    query ? getPokemonByName(query) : Promise.resolve(null),
  ]);

  const totalPages = Math.ceil(pokemonPage.total / PAGE_SIZE);

  return (
    <main className="container">
      <header className="header">
        <h1>Pokédex Web</h1>
        <p>Busca por nombre o explora el listado paginado.</p>
      </header>

      <form className="search" action="/" method="get">
        <input
          name="q"
          placeholder="Ej: pikachu"
          defaultValue={query}
          aria-label="Buscar Pokémon por nombre"
        />
        <button type="submit">Buscar</button>
      </form>

      {query && (
        <section className="search-result">
          <h2>Resultado de búsqueda</h2>
          {searchedPokemon ? (
            <Link href={`/pokemon/${searchedPokemon.name}`} className="card">
              <Image src={searchedPokemon.image} alt={searchedPokemon.name} width={96} height={96} />
              <div>
                <p className="muted">#{searchedPokemon.id}</p>
                <h3>{capitalize(searchedPokemon.name)}</h3>
                <p>{searchedPokemon.types.map(capitalize).join(" · ")}</p>
              </div>
            </Link>
          ) : (
            <p>No se encontró ningún Pokémon con ese nombre.</p>
          )}
        </section>
      )}

      <section>
        <h2>Listado (página {page})</h2>
        <ul className="grid">
          {pokemonPage.items.map((pokemon) => (
            <li key={pokemon.name}>
              <Link href={`/pokemon/${pokemon.name}`} className="card">
                <Image src={pokemon.image} alt={pokemon.name} width={96} height={96} />
                <div>
                  <p className="muted">#{pokemon.id}</p>
                  <h3>{capitalize(pokemon.name)}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <nav className="pager" aria-label="Paginación">
        <Link
          href={`/?page=${Math.max(1, page - 1)}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
          aria-disabled={page <= 1}
          className={page <= 1 ? "disabled" : ""}
        >
          Anterior
        </Link>
        <span>
          Página {page} de {totalPages}
        </span>
        <Link
          href={`/?page=${Math.min(totalPages, page + 1)}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
          aria-disabled={page >= totalPages}
          className={page >= totalPages ? "disabled" : ""}
        >
          Siguiente
        </Link>
      </nav>
    </main>
  );
}
