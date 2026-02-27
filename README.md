# project-pokedex-web

MVP de Pokédex web construido con **Next.js + TypeScript** consumiendo la **PokeAPI**.

## Funcionalidades MVP

- Listado paginado básico de Pokémon.
- Búsqueda por nombre.
- Vista detalle con:
  - nombre
  - id
  - tipos
  - stats
  - imagen

## Stack

- Next.js (App Router)
- TypeScript
- CSS simple (sin framework extra)
- Vitest para tests mínimos

## Ejecutar en local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Ejecutar con Docker

```bash
docker compose up --build
```

Abrir `http://localhost:3000`.

## Validación

```bash
npm run lint
npm run test
npm run build
```

## Estructura documental

- `docs/01-contexto-y-objetivos.md`
- `docs/02-especificacion-funcional.md`
- `docs/03-plan-implementacion.md`
- `docs/04-riesgos-y-decisiones.md`
- `docs/05-checklist-done.md`
