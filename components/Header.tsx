// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-full h-20 bg-[#01018B] flex items-center justify-between px-8 z-50 shadow-md">
      {/* Logo a la izquierda */}
      <div className="flex items-center">
        <Link href="/">
          <img src="/logo-cotton-blanco.png" alt="Cotton Country" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Enlaces y botón a la derecha */}
      <nav className="flex items-center space-x-6">
        <Link href="/blog" className="text-white font-medium hover:underline">
          Blog
        </Link>
        <Link href="/uniformes" className="text-white font-medium hover:underline">
          Uniformes
        </Link>
        <Link href="/contacto" className="text-white font-medium hover:underline">
          Contacto
        </Link>

        {/* Botón de email solo con icono */}
        <a
          href="mailto:info@cottoncountry.com.pe"
          className="bg-white text-[#01018B] p-2 rounded flex items-center justify-center hover:bg-gray-200"
          aria-label="Enviar correo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.94 6.44A2 2 0 014 6h12a2 2 0 011.06.44l-7.06 4.7-7.06-4.7z" />
            <path d="M18 8.6l-7.06 4.7a1 1 0 01-1.88 0L2 8.6V14a2 2 0 002 2h12a2 2 0 002-2V8.6z" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
