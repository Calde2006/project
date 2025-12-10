import { Mail } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    await new Promise(resolve => setTimeout(resolve, 1000));

    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="bg-gray-100 py-16" aria-labelledby="newsletter-heading">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 id="newsletter-heading" className="text-3xl font-bold text-gray-900 mb-2">
            Suscríbete a nuestra newsletter
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Recibe las últimas novedades, ofertas exclusivas y consejos de moda sostenible
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Dirección de correo electrónico
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500"
              aria-describedby="newsletter-description"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-olive-700 hover:bg-olive-800 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Suscribirse al boletín"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              <span>{status === 'loading' ? 'Enviando...' : 'Suscribirse'}</span>
            </button>
          </div>

          {status === 'success' && (
            <p className="mt-3 text-green-600 text-sm text-center" role="status">
              ¡Gracias por suscribirte! Revisa tu correo electrónico.
            </p>
          )}

          {status === 'error' && (
            <p className="mt-3 text-red-600 text-sm text-center" role="alert">
              Hubo un error. Por favor, intenta de nuevo.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
