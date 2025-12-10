import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import { Grid, List, X } from 'lucide-react';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceMin: 0,
    priceMax: 200,
    sizes: [] as string[],
    colors: [] as string[],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          supabase.from('categories').select('*').order('name'),
          supabase
            .from('products')
            .select(`
              *,
              category:categories(*),
              images:product_images(*)
            `)
            .order('created_at', { ascending: false }),
        ]);

        if (categoriesRes.data) setCategories(categoriesRes.data);
        if (productsRes.data) setProducts(productsRes.data as Product[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (filters.categories.length > 0 && !filters.categories.includes(product.category?.slug || '')) {
      return false;
    }
    if (product.price < filters.priceMin || product.price > filters.priceMax) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'featured':
      default:
        return b.featured ? 1 : -1;
    }
  });

  const toggleCategory = (slug: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(slug)
        ? prev.categories.filter((c) => c !== slug)
        : [...prev.categories, slug],
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceMin: 0,
      priceMax: 200,
      sizes: [],
      colors: [],
    });
  };

  const activeFiltersCount =
    filters.categories.length + filters.sizes.length + filters.colors.length;

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <Header currentPage="shop" />

      <main id="main-content" className="flex-1 bg-neutral-100">
        <div>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Nuestra Tienda</h1>
            <p className="text-gray-600">
              Explora nuestra colección completa de moda sostenible y productos eco-friendly
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            <aside
              className={`${
                mobileFiltersOpen ? 'fixed inset-0 z-50 bg-white overflow-y-auto p-6' : 'hidden'
              } lg:block lg:w-64 flex-shrink-0`}
              aria-label="Filtros de productos"
            >
              <div className="lg:sticky lg:top-24 bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6 lg:mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                    aria-label="Cerrar filtros"
                  >
                    <X className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Categorías</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.categories.includes(category.slug)}
                            onChange={() => toggleCategory(category.slug)}
                            className="w-4 h-4 text-olive-600 border-gray-300 rounded focus:ring-olive-500"
                          />
                          <span className="text-gray-700">
                            {category.name}{' '}
                            <span className="text-gray-500 text-sm">({category.product_count})</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Rango de precio</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <label htmlFor="price-min" className="sr-only">
                          Precio mínimo
                        </label>
                        <input
                          id="price-min"
                          type="number"
                          value={filters.priceMin}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, priceMin: Number(e.target.value) }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500"
                          placeholder="Min: $0"
                        />
                        <span className="text-gray-500">-</span>
                        <label htmlFor="price-max" className="sr-only">
                          Precio máximo
                        </label>
                        <input
                          id="price-max"
                          type="number"
                          value={filters.priceMax}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, priceMax: Number(e.target.value) }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500"
                          placeholder="Max: $200"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Talla</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button
                          key={size}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              sizes: prev.sizes.includes(size)
                                ? prev.sizes.filter((s) => s !== size)
                                : [...prev.sizes, size],
                            }))
                          }
                          className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                            filters.sizes.includes(size)
                              ? 'bg-olive-700 text-white border-olive-700'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-olive-500'
                          }`}
                          aria-pressed={filters.sizes.includes(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'Negro', value: 'black' },
                        { name: 'Blanco', value: 'white' },
                        { name: 'Beige', value: 'beige' },
                        { name: 'Marrón', value: 'brown' },
                        { name: 'Verde', value: 'green' },
                        { name: 'Azul', value: 'blue' },
                      ].map((color) => (
                        <label key={color.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.colors.includes(color.value)}
                            onChange={() =>
                              setFilters((prev) => ({
                                ...prev,
                                colors: prev.colors.includes(color.value)
                                  ? prev.colors.filter((c) => c !== color.value)
                                  : [...prev.colors, color.value],
                              }))
                            }
                            className="w-4 h-4 text-olive-600 border-gray-300 rounded focus:ring-olive-500"
                          />
                          <span className="text-gray-700">{color.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 text-sm font-medium text-olive-700 border border-olive-700 rounded-lg hover:bg-olive-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                      Limpiar filtros
                    </button>
                  )}
                </div>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <p className="text-gray-600">
                  Mostrando <span className="font-semibold">{sortedProducts.length}</span> de{' '}
                  <span className="font-semibold">{products.length}</span> productos
                </p>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                  </button>

                  <label htmlFor="sort-select" className="sr-only">
                    Ordenar por
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 flex-1 sm:flex-none"
                  >
                    <option value="featured">Destacados</option>
                    <option value="newest">Más recientes</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                  </select>

                  <div className="hidden sm:flex gap-2" role="group" aria-label="Vista de productos">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 border rounded-lg ${
                        viewMode === 'grid'
                          ? 'bg-olive-700 text-white border-olive-700'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                      aria-label="Vista en cuadrícula"
                      aria-pressed={viewMode === 'grid'}
                    >
                      <Grid className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 border rounded-lg ${
                        viewMode === 'list'
                          ? 'bg-olive-700 text-white border-olive-700'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                      aria-label="Vista en lista"
                      aria-pressed={viewMode === 'list'}
                    >
                      <List className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-600 text-lg mb-4">No se encontraron productos</p>
                  <button
                    onClick={clearFilters}
                    className="text-olive-700 font-semibold hover:text-olive-800"
                  >
                    Limpiar todos los filtros
                  </button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'flex flex-col gap-6'
                  }
                >
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {sortedProducts.length > 0 && (
                <div className="mt-12">
                  <nav
                    className="flex justify-center items-center gap-2"
                    aria-label="Paginación"
                    role="navigation"
                  >
                    <button
                      disabled
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-400 cursor-not-allowed"
                      aria-label="Página anterior"
                    >
                      Anterior
                    </button>
                    <button
                      className="px-4 py-2 bg-olive-700 text-white rounded-lg font-medium"
                      aria-label="Página 1"
                      aria-current="page"
                    >
                      1
                    </button>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      aria-label="Página 2"
                    >
                      2
                    </button>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      aria-label="Página 3"
                    >
                      3
                    </button>
                    <span className="px-2 text-gray-500" aria-hidden="true">
                      ...
                    </span>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      aria-label="Página 10"
                    >
                      10
                    </button>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      aria-label="Página siguiente"
                    >
                      Siguiente
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
