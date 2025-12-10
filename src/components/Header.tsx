import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage?: 'home' | 'shop' | 'product';
}

export default function Header({ currentPage = 'home' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50" role="banner">
      <div className="bg-amber-100 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Soporte 24/7</span>
            <a href="tel:+18005550100" className="text-gray-700 hover:text-gray-900">
              +1 800 555 0100
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <User className="w-4 h-4 inline mr-1" aria-hidden="true" />
              <span className="sr-only">Cuenta de usuario</span>
            </a>
            <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              Sale 30% OFF
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center" aria-label="TerraShop - Inicio">
            <span className="text-2xl font-bold text-gray-800">TerraShop</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center" aria-label="Navegación principal">
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

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
              aria-label="Buscar productos"
              aria-expanded={searchOpen}
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>

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

        {searchOpen && (
          <div className="mt-4" role="search">
            <input
              type="search"
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500"
              aria-label="Campo de búsqueda"
            />
          </div>
        )}

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
