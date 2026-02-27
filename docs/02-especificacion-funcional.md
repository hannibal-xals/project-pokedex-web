# 02 - Especificación funcional

## Pantalla principal
- Input de búsqueda por nombre.
- Resultado de búsqueda (si aplica).
- Listado paginado de Pokémon.
- Navegación anterior/siguiente.

## Pantalla detalle
Ruta: `/pokemon/[name]`

Muestra:
- Nombre
- ID
- Imagen
- Tipos
- Stats base

## Reglas funcionales
- Si no existe el Pokémon buscado, mostrar mensaje de no encontrado.
- El detalle inválido debe renderizar `not-found`.
- La paginación usa tamaño fijo de 20 elementos.
