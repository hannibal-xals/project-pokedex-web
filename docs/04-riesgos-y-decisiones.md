# 04 - Riesgos y decisiones

## Decisiones técnicas
- Se usa App Router de Next.js para simplicidad y rendimiento SSR.
- Se evita sobreingeniería (sin estado global ni librerías extra de fetch).
- CSS nativo para velocidad de implementación.

## Riesgos
- Dependencia de disponibilidad de PokeAPI.
- Latencia externa variable.

## Mitigaciones
- Manejo de errores en llamadas HTTP.
- Cache/revalidate (`next: { revalidate: 300 }`) para reducir carga y latencia percibida.
