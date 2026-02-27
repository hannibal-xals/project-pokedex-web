export type PokemonListItem = {
  id: number;
  name: string;
  image: string;
};

export type PokemonDetail = {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: Array<{ name: string; value: number }>;
};

type PokeApiListResponse = {
  count: number;
  results: Array<{ name: string; url: string }>;
};

type PokeApiPokemonResponse = {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  types: Array<{ type: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
};

const POKEAPI_BASE = "https://pokeapi.co/api/v2";
const DEFAULT_IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

const normalizeName = (name: string) => name.trim().toLowerCase();

const extractIdFromUrl = (url: string): number => {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
};

const buildImageUrl = (id: number, fallback?: string | null): string => {
  if (fallback) return fallback;
  return id > 0
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    : DEFAULT_IMAGE;
};

export const mapPokemonDetail = (data: PokeApiPokemonResponse): PokemonDetail => ({
  id: data.id,
  name: data.name,
  image: buildImageUrl(data.id, data.sprites.front_default),
  types: data.types.map((t) => t.type.name),
  stats: data.stats.map((s) => ({
    name: s.stat.name,
    value: s.base_stat,
  })),
});

export const getPokemonPage = async (page: number, limit: number) => {
  const safePage = Math.max(1, page);
  const offset = (safePage - 1) * limit;

  const res = await fetch(`${POKEAPI_BASE}/pokemon?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("No se pudo cargar el listado de Pokémon");
  }

  const data = (await res.json()) as PokeApiListResponse;

  const items: PokemonListItem[] = data.results.map((pokemon) => {
    const id = extractIdFromUrl(pokemon.url);
    return {
      id,
      name: pokemon.name,
      image: buildImageUrl(id),
    };
  });

  return {
    total: data.count,
    page: safePage,
    limit,
    items,
  };
};

export const getPokemonByName = async (name: string): Promise<PokemonDetail | null> => {
  const normalized = normalizeName(name);
  if (!normalized) return null;

  const res = await fetch(`${POKEAPI_BASE}/pokemon/${normalized}`, {
    next: { revalidate: 300 },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error("No se pudo cargar el Pokémon buscado");
  }

  const data = (await res.json()) as PokeApiPokemonResponse;
  return mapPokemonDetail(data);
};

export const getPokemonDetail = async (name: string): Promise<PokemonDetail | null> =>
  getPokemonByName(name);
