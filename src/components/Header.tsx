import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage?: 'home' | 'shop' | 'product';
}

export default function Header({ currentPage = 'home' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50" role="banner">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Primera fila: Logo, Buscador, Iconos */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <a href="/" className="flex items-center flex-shrink-0" aria-label="TerraShop - Inicio">
            <span className="text-2xl font-bold text-gray-800">TerraShop</span>
          </a>

          {/* Formulario de búsqueda en el centro */}
          <form className="hidden md:flex flex-1 max-w-xl mx-8" role="search">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Buscar productos..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500"
                aria-label="Campo de búsqueda"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            </div>
          </form>

          <div className="flex items-center gap-4">
            <a href="/cart" className="relative text-gray-700 hover:text-gray-900 p-2" aria-label="Carrito de compras">
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              <span
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                aria-label="2 artículos en el carrito"
              >
                2
              </span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-gray-900 p-2"
              aria-label="Menú de navegación"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Segunda fila: Menú de navegación */}
        <nav className="hidden md:flex items-center justify-center gap-6 border-t pt-4" aria-label="Navegación principal">
          <a
            href="/"
            className={`text-gray-700 hover:text-gray-900 font-medium ${currentPage === 'home' ? 'text-gray-900' : ''}`}
            aria-current={currentPage === 'home' ? 'page' : undefined}
          >
            Inicio
          </a>
          <a
            href="/shop"
            className={`text-gray-700 hover:text-gray-900 font-medium ${currentPage === 'shop' ? 'text-gray-900' : ''}`}
            aria-current={currentPage === 'shop' ? 'page' : undefined}
          >
            Tienda
          </a>
          <a href="/mujer" className="text-gray-700 hover:text-gray-900 font-medium">
            Mujer
          </a>
          <a href="/hombre" className="text-gray-700 hover:text-gray-900 font-medium">
            Hombre
          </a>
          <a href="/accesorios" className="text-gray-700 hover:text-gray-900 font-medium">
            Accesorios
          </a>
        </nav>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4" aria-label="Navegación móvil">
            <div className="flex flex-col gap-4">
              <a href="/" className="text-gray-700 hover:text-gray-900 font-medium">
                Inicio
              </a>
              <a href="/shop" className="text-gray-700 hover:text-gray-900 font-medium">
                Tienda
              </a>
              <a href="/mujer" className="text-gray-700 hover:text-gray-900 font-medium">
                Mujer
              </a>
              <a href="/hombre" className="text-gray-700 hover:text-gray-900 font-medium">
                Hombre
              </a>
              <a href="/accesorios" className="text-gray-700 hover:text-gray-900 font-medium">
                Accesorios
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
