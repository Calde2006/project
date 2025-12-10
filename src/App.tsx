import { useEffect, useState } from 'react';
import Index from './pages/Index';
import Shop from './pages/Shop';
import Product from './pages/Product';

type Page = 'home' | 'shop' | 'product';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;

      if (path === '/' || path === '/index.html' || path === '') {
        setCurrentPage('home');
        updatePageTitle('TerraShop - Moda Sostenible para un Futuro Mejor');
      } else if (path.startsWith('/shop')) {
        setCurrentPage('shop');
        updatePageTitle('Tienda - TerraShop');
      } else if (path.startsWith('/product')) {
        setCurrentPage('product');
        updatePageTitle('Camiseta Orgánica Esencial - TerraShop');
      }
    };

    const updatePageTitle = (title: string) => {
      document.title = title;
      const titleElement = document.querySelector('title');
      if (titleElement) {
        titleElement.setAttribute('data-default', 'false');
      }
    };

    handleRouteChange();

    window.addEventListener('popstate', handleRouteChange);

    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleRouteChange();
    };

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.history.pushState = originalPushState;
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return <Shop />;
      case 'product':
        return <Product />;
      case 'home':
      default:
        return <Index />;
    }
  };

  return renderPage();
}

export default App;
