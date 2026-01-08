import Image from "next/image"
import Link from "next/link"
import { Facebook, Linkedin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full">

      {/* FOOTER PRINCIPAL */}
      <div className="bg-[#04045E] text-white px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* LOGO + DESCRIPCIÓN */}
          <div>
            <Image
              src="/logo-cotton-blanco.png"
              alt="Cotton Country"
              width={160}
              height={60}
              className="mb-4"
            />
            <p className="text-sm text-gray-200 leading-relaxed">
              Diseñamos y confeccionamos uniformes corporativos que equilibran
              identidad, desempeño y durabilidad. Nuestro método asegura
              precisión en tallaje, materiales adecuados y entregas puntuales.
            </p>
          </div>

          {/* LEGALES */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <Link href="/privacidad" className="hover:underline">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/derechos-arco" className="hover:underline">
                  Derechos ARCO
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:underline">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* DIRECCIONES */}
          <div>
            <h4 className="font-semibold mb-4">Direcciones</h4>

            <p className="text-sm text-gray-200 mb-3">
              <strong>Dirección Fiscal</strong><br />
              Av. Los Mochicas 179<br />
              Urbanización Salamanca de Monterrico – Ate<br />
              Lima, Perú
            </p>

            <p className="text-sm text-gray-200">
              <strong>Dirección Comercial</strong><br />
              Av. Circunvalación El Golf Los Incas 206<br />
              Oficina 602 – Torre B<br />
              Santiago de Surco, Lima – Perú
            </p>
          </div>

          {/* CONTACTO + MAPA + REDES */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>

            <div className="space-y-2 text-sm text-gray-200 mb-4">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                01 7397979
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@cottoncountry.com.pe
              </p>
            </div>

            <iframe
              className="w-full h-32 rounded-md border-0 mb-3"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Av.%20Circunvalaci%C3%B3n%20El%20Golf%20Los%20Incas%20206%20Surco%20Lima&output=embed"
            />

            <a
              href="https://www.google.com/maps?q=Av.+Circunvalación+El+Golf+Los+Incas+206+Surco+Lima"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline text-gray-200 block mb-4"
            >
              Ver ubicación en Google Maps
            </a>

            <div className="flex gap-4 items-center">
              <a href="#" aria-label="Facebook">
                <Facebook className="w-5 h-5 hover:opacity-80" />
              </a>

              <a href="#" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 hover:opacity-80" />
              </a>

              {/* PINTEREST */}
              <a href="#" aria-label="Pinterest">
                <svg
                  className="w-5 h-5 fill-white hover:opacity-80"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.619 11.18-.105-.95-.2-2.41.042-3.45.218-.94 1.406-5.984 1.406-5.984s-.36-.72-.36-1.785c0-1.67.967-2.917 2.17-2.917 1.023 0 1.516.77 1.516 1.69 0 1.03-.655 2.57-.994 4-.283 1.195.6 2.17 1.78 2.17 2.14 0 3.79-2.26 3.79-5.52 0-2.88-2.07-4.89-5.02-4.89-3.42 0-5.43 2.57-5.43 5.23 0 1.03.396 2.13.89 2.73.097.118.11.222.082.342-.09.38-.29 1.2-.33 1.37-.05.22-.17.27-.39.16-1.46-.68-2.37-2.81-2.37-4.52 0-3.68 2.67-7.06 7.7-7.06 4.04 0 7.19 2.88 7.19 6.73 0 4.01-2.53 7.24-6.04 7.24-1.18 0-2.29-.61-2.67-1.33l-.72 2.74c-.26.99-.97 2.23-1.44 2.99C9.8 23.8 10.89 24 12 24c6.63 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* BARRA INFERIOR */}
      <div className="bg-[#393535] text-gray-200 text-xs py-3">
        <div className="max-w-7xl mx-auto text-center">
          Cotton Country® 2026 — Todos los derechos reservados
        </div>
      </div>

    </footer>
  )
}
