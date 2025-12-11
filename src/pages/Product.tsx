import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { ShoppingCart, Heart, Share2, Truck, RefreshCw, Shield, Check } from 'lucide-react';

export default function Product() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Oliva');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');

  // Datos estáticos de ejemplo para mostrar la estructura
  const product = {
    name: 'Camiseta Orgánica Esencial',
    description: 'Nuestra camiseta esencial está confeccionada con 100% algodón orgánico certificado. Diseñada para la comodidad diaria, esta pieza versátil combina estilo minimalista con responsabilidad ambiental. Perfecta para cualquier ocasión.',
    price: 49.99,
    original_price: 69.99,
    discount_percentage: 29,
    category: { name: 'Ropa', slug: 'ropa' },
    stock: 25,
    rating: 4.5,
    review_count: 127,
    sku: 'ORG-SHIRT-001',
    material: '100% Algodón Orgánico Certificado GOTS',
  };

  const images = [
    {
      url: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt_text: 'Camiseta orgánica verde vista frontal',
    },
    {
      url: 'https://images.pexels.com/photos/5698852/pexels-photo-5698852.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt_text: 'Camiseta orgánica verde vista lateral',
    },
    {
      url: 'https://images.pexels.com/photos/8532635/pexels-photo-8532635.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt_text: 'Camiseta orgánica verde detalle',
    },
    {
      url: 'https://images.pexels.com/photos/7679665/pexels-photo-7679665.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt_text: 'Camiseta orgánica verde ambiente',
    },
  ];

  const uniqueSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const uniqueColors = [
    { color: 'Oliva', color_hex: '#7a7d45' },
    { color: 'Negro', color_hex: '#000000' },
    { color: 'Blanco', color_hex: '#ffffff' },
    { color: 'Beige', color_hex: '#d4c5b0' },
  ];

  const features = [
    'Certificación GOTS (Global Organic Textile Standard)',
    'Producción ética y comercio justo',
    'Tintes naturales y biodegradables',
    'Libre de químicos nocivos',
    'Proceso de fabricación con bajo consumo de agua',
    'Empaque 100% reciclable',
  ];

  const hasDiscount = product.discount_percentage > 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage="product" />

      <main id="main-content" className="flex-1 bg-white">
        <nav aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
            <ol className="flex items-center gap-2 text-sm flex-wrap">
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900">
                  Inicio
                </a>
              </li>
              <li aria-hidden="true" className="text-gray-400">
                /
              </li>
              <li>
                <a href="/shop" className="text-gray-600 hover:text-gray-900">
                  Tienda
                </a>
              </li>
              <li aria-hidden="true" className="text-gray-400">
                /
              </li>
              <li>
                <a href={`/${product.category?.slug}`} className="text-gray-600 hover:text-gray-900">
                  {product.category?.name}
                </a>
              </li>
              <li aria-hidden="true" className="text-gray-400">
                /
              </li>
              <li className="text-gray-900 font-medium" aria-current="page">
                {product.name}
              </li>
            </ol>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <div>
              <div className="sticky top-24">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={images[selectedImage]?.url || 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={images[selectedImage]?.alt_text || product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index
                          ? 'border-olive-700'
                          : 'border-transparent hover:border-gray-300'
                          }`}
                        aria-label={`Ver imagen ${index + 1} de ${images.length}`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt_text}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                    <div className="text-sm text-gray-500 text-center col-span-4">
                      {selectedImage + 1} / {images.length}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                  {product.category?.name}
                </span>
                {product.stock > 0 && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    En Stock
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {product.rating > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center" role="img" aria-label={`${product.rating} de 5 estrellas`}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <a href="#reviews" className="text-sm text-gray-600 hover:text-gray-900">
                    {product.review_count} reseñas
                  </a>
                </div>
              )}

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {hasDiscount && product.original_price && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      ${product.original_price.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                      -{product.discount_percentage}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

              {uniqueSizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-gray-900">
                      Talla: {selectedSize}
                    </label>
                    <a
                      href="/guia-tallas"
                      className="text-sm text-olive-700 hover:text-olive-800 font-medium"
                    >
                      Guía de tallas
                    </a>
                  </div>
                  <div className="grid grid-cols-6 gap-2" role="group" aria-label="Selector de talla">
                    {uniqueSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size!)}
                        className={`py-3 border-2 rounded-lg font-semibold transition-colors ${selectedSize === size
                          ? 'bg-olive-700 text-white border-olive-700'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-olive-500'
                          }`}
                        aria-pressed={selectedSize === size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {uniqueColors.length > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-900 block mb-3">
                    Color: {selectedColor}
                  </label>
                  <div className="flex gap-2" role="group" aria-label="Selector de color">
                    {uniqueColors.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedColor(variant.color!)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === variant.color
                          ? 'border-olive-700 ring-2 ring-olive-500'
                          : 'border-gray-300 hover:border-gray-400'
                          }`}
                        style={{ backgroundColor: variant.color_hex }}
                        aria-label={`Color ${variant.color}`}
                        aria-pressed={selectedColor === variant.color}
                        title={variant.color}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="quantity" className="text-sm font-semibold text-gray-900 block mb-3">
                  Cantidad
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-20 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500"
                    min="1"
                    max={product.stock}
                    aria-label="Cantidad de producto"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600">
                    Solo quedan {product.stock} unidades
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <button className="flex-1 bg-olive-700 hover:bg-olive-800 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                  Agregar al Carrito
                </button>
                <button
                  className="w-14 h-14 border-2 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors"
                  aria-label="Agregar a favoritos"
                >
                  <Heart className="w-6 h-6 text-gray-600" aria-hidden="true" />
                </button>
                <button
                  className="w-14 h-14 border-2 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors"
                  aria-label="Compartir producto"
                >
                  <Share2 className="w-6 h-6 text-gray-600" aria-hidden="true" />
                </button>
              </div>

              <div className="border-t border-b py-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-olive-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-gray-900">Envío Gratis</p>
                    <p className="text-sm text-gray-600">En pedidos superiores a $50</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-olive-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-gray-900">Devoluciones Fáciles</p>
                    <p className="text-sm text-gray-600">30 días para cambios y devoluciones</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-olive-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-gray-900">Compra Segura</p>
                    <p className="text-sm text-gray-600">Pago protegido y encriptado</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">SKU:</span> {product.sku}
                </p>
                <p>
                  <span className="font-semibold">Material:</span> {product.material}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-12 mb-16">
            <div className="flex border-b mb-8" role="tablist" aria-label="Información del producto">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors ${activeTab === 'description'
                  ? 'border-olive-700 text-olive-700'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                role="tab"
                aria-selected={activeTab === 'description'}
                aria-controls="description-panel"
              >
                Descripción
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors ${activeTab === 'details'
                  ? 'border-olive-700 text-olive-700'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                role="tab"
                aria-selected={activeTab === 'details'}
                aria-controls="details-panel"
              >
                Detalles del Producto
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors ${activeTab === 'reviews'
                  ? 'border-olive-700 text-olive-700'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                role="tab"
                aria-selected={activeTab === 'reviews'}
                aria-controls="reviews-panel"
              >
                Reseñas ({product.review_count})
              </button>
            </div>

            <div>
              {activeTab === 'description' && (
                <div id="description-panel" role="tabpanel" aria-labelledby="description-tab">
                  <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                  {features.length > 0 && (
                    <>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Características Principales
                      </h3>
                      <ul className="space-y-3">
                        {features.map((feature) => (
                          <li key={feature.id} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-gray-700">{feature.feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'details' && (
                <div id="details-panel" role="tabpanel" aria-labelledby="details-tab">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <dt className="font-semibold text-gray-900 mb-2">Material</dt>
                      <dd className="text-gray-700">{product.material}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900 mb-2">SKU</dt>
                      <dd className="text-gray-700">{product.sku}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900 mb-2">Cuidado</dt>
                      <dd className="text-gray-700">Lavar a máquina en frío, secar al aire</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900 mb-2">Origen</dt>
                      <dd className="text-gray-700">Producido éticamente en Portugal</dd>
                    </div>
                  </dl>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div id="reviews-panel" role="tabpanel" aria-labelledby="reviews-tab">
                  <div className="text-center py-8 text-gray-600">
                    <p className="mb-4">Aún no hay reseñas para este producto.</p>
                    <button className="text-olive-700 font-semibold hover:text-olive-800">
                      Sé el primero en dejar una reseña
                    </button>
                  </div>
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
