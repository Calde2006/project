import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Category, Product } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import { ArrowRight } from 'lucide-react';

export default function Index() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
            .eq('featured', true)
            .order('created_at', { ascending: false })
            .limit(4),
        ]);

        if (categoriesRes.data) setCategories(categoriesRes.data);
        if (productsRes.data) setFeaturedProducts(productsRes.data as Product[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage="home" />

      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <section
            className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20 md:py-32 overflow-hidden rounded-2xl"
            aria-labelledby="hero-heading"
          >
            <div className="absolute inset-0 opacity-20 rounded-2xl">
              <img
                src="https://images.pexels.com/photos/7679665/pexels-photo-7679665.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
            </div>
            <div className="relative px-4 flex items-center justify-center">
              <div className="max-w-2xl">
                <span className="inline-block bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  Nueva Colección Primavera
                </span>
                <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Moda Sostenible para un Futuro Mejor
                </h1>
                <p className="text-lg md:text-xl mb-8 text-purple-100">
                  Descubre nuestra colección de ropa ecológica y accesorios conscientes.
                </p>
                <a
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  Comprar Ahora
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </div>

        <section className="py-16 bg-gray-50" aria-labelledby="categories-heading">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="categories-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explora Nuestras Categorías
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Encuentra el estilo perfecto para cada ocasión en nuestras colecciones sostenibles
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/${category.slug}`}
                    className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-200">{category.product_count} productos</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-gray-50" aria-labelledby="featured-heading">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 id="featured-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Productos Destacados
                </h2>
                <p className="text-gray-600">Los favoritos de nuestra comunidad sostenible</p>
              </div>
              <a
                href="/shop"
                className="hidden md:inline-flex items-center gap-2 text-olive-700 font-semibold hover:text-olive-800"
              >
                Ver Todo
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="text-center mt-8 md:hidden">
              <a
                href="/shop"
                className="inline-flex items-center gap-2 text-olive-700 font-semibold hover:text-olive-800"
              >
                Ver Todo
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          className="py-20 bg-olive-700 text-white"
          aria-labelledby="sustainable-movement-heading"
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 id="sustainable-movement-heading" className="text-3xl md:text-4xl font-bold mb-6">
              Únete al Movimiento Sostenible
            </h2>
            <p className="text-lg text-olive-100 mb-8 max-w-2xl mx-auto">
              Suscríbete para recibir ofertas exclusivas, consejos de moda sostenible y ser parte de nuestra comunidad consciente
            </p>
            <a
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-olive-700 px-8 py-4 rounded-lg font-semibold hover:bg-olive-50 transition-colors"
            >
              Comprar Ahora
            </a>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
