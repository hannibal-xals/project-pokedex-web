import { describe, expect, it } from "vitest";
import { mapPokemonDetail } from "./pokeapi";

describe("mapPokemonDetail", () => {
  it("mapea correctamente la respuesta de PokeAPI", () => {
    const result = mapPokemonDetail({
      id: 25,
      name: "pikachu",
      sprites: { front_default: "https://img/pikachu.png" },
      types: [{ type: { name: "electric" } }],
      stats: [
        { base_stat: 35, stat: { name: "hp" } },
        { base_stat: 55, stat: { name: "attack" } },
      ],
    });

    expect(result.id).toBe(25);
    expect(result.name).toBe("pikachu");
    expect(result.types).toEqual(["electric"]);
    expect(result.stats).toEqual([
      { name: "hp", value: 35 },
      { name: "attack", value: 55 },
    ]);
  });
});
