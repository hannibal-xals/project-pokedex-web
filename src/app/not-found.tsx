import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container">
      <h1>Pokémon no encontrado</h1>
      <p>Revisa el nombre e inténtalo de nuevo.</p>
      <Link href="/">Volver al inicio</Link>
    </main>
  );
}
