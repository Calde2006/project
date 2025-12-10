import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images?.[0]?.url || 'https://images.pexels.com/photos/5698852/pexels-photo-5698852.jpeg?auto=compress&cs=tinysrgb&w=400';
  const hasDiscount = product.discount_percentage > 0;

  return (
    <article className="group relative bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <a href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={mainImage}
            alt={product.images?.[0]?.alt_text || product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.is_new && (
              <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                Nuevo
              </span>
            )}
            {hasDiscount && (
              <span className="bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded">
                -{product.discount_percentage}%
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.category?.name || 'Producto'}
          </p>
          <h3 className="text-gray-900 font-medium mb-2 line-clamp-2">{product.name}</h3>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && product.original_price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.original_price.toFixed(2)}
              </span>
            )}
          </div>

          {product.rating > 0 && (
            <div className="flex items-center gap-1 mt-2" role="img" aria-label={`${product.rating} de 5 estrellas`}>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-600 ml-1">({product.review_count})</span>
            </div>
          )}
        </div>
      </a>
    </article>
  );
}
