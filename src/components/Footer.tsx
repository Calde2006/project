import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-200" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 py-12 border-t border-neutral-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-gray-800 mb-4">TerraShop</h3>
            <p className="text-gray-600 text-sm mb-4">
              Moda sostenible y consciente para un futuro mejor. Calidad y estilo en armonía con el planeta.
            </p>
            <div className="flex gap-4" role="list" aria-label="Redes sociales">
              <a
                href="https://facebook.com"
                className="text-gray-600 hover:text-gray-900"
                aria-label="Síguenos en Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-600 hover:text-gray-900"
                aria-label="Síguenos en Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-600 hover:text-gray-900"
                aria-label="Síguenos en Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Tienda</h4>
            <nav aria-label="Enlaces de tienda">
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/mujer" className="text-gray-600 hover:text-gray-900">
                    Mujer
                  </a>
                </li>
                <li>
                  <a href="/hombre" className="text-gray-600 hover:text-gray-900">
                    Hombre
                  </a>
                </li>
                <li>
                  <a href="/accesorios" className="text-gray-600 hover:text-gray-900">
                    Accesorios
                  </a>
                </li>
                <li>
                  <a href="/novedades" className="text-gray-600 hover:text-gray-900">
                    Novedades
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Ayuda</h4>
            <nav aria-label="Enlaces de ayuda">
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/envios" className="text-gray-600 hover:text-gray-900">
                    Envíos y devoluciones
                  </a>
                </li>
                <li>
                  <a href="/guia-tallas" className="text-gray-600 hover:text-gray-900">
                    Guía de tallas
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-gray-600 hover:text-gray-900">
                    Preguntas frecuentes
                  </a>
                </li>
                <li>
                  <a href="/contacto" className="text-gray-600 hover:text-gray-900">
                    Contacto
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Empresa</h4>
            <nav aria-label="Enlaces de empresa">
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/historia" className="text-gray-600 hover:text-gray-900">
                    Nuestra historia
                  </a>
                </li>
                <li>
                  <a href="/sostenibilidad" className="text-gray-600 hover:text-gray-900">
                    Sostenibilidad
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-600 hover:text-gray-900">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/trabaja" className="text-gray-600 hover:text-gray-900">
                    Trabaja con nosotros
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>&copy; 2025 TerraShop. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="/privacidad" className="hover:text-gray-900">
              Política de privacidad
            </a>
            <a href="/terminos" className="hover:text-gray-900">
              Términos de servicio
            </a>
            <a href="/cookies" className="hover:text-gray-900">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
