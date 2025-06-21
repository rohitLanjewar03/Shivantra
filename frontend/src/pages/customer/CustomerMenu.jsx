import React, { useState, useEffect } from 'react';
import { getMenu, getRestaurant } from '../../api/customerApi';
import CategorySection from '../../components/customer/CategorySection';
import Loader from '../../components/admin/Loader';
import Error from '../../components/admin/Error';
import ThemeToggleButton from '../../components/ThemeToggleButton';

function CustomerMenu() {
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [menuData, restaurantData] = await Promise.all([
          getMenu(),
          getRestaurant(),
        ]);
        setMenu(menuData);
        setRestaurant(restaurantData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center p-4"><Error message={`Failed to load menu. ${error}`} /></div>;

  return (
    <div className="bg-[var(--background)] text-[var(--text)] min-h-screen font-sans flex flex-col">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center border-b border-[var(--secondary-text)]/10 sticky top-0 z-10 bg-[var(--background)]">
        <div className="flex items-center space-x-3">
          <img
            src="/shivantra.png.jpg"
            alt={`${restaurant?.name || 'Shivantra'} logo`}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-2xl font-bold font-serif">{restaurant?.name || 'Shivantra'}</span>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-8 text-lg">
            <a href="#menu" className="hover:text-[var(--primary)] transition-colors">Menu</a>
            <a href="#contact" className="hover:text-[var(--primary)] transition-colors">Contact</a>
          </nav>
          <ThemeToggleButton />
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        <section id="menu" className="text-center mb-16 pt-16 -mt-16">
          <h1 className="text-6xl font-bold font-serif">
            Our Menu
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-[var(--secondary-text)] leading-relaxed">
            {restaurant?.description || "Authentic Indian cuisine with a modern twist. Experience the rich flavors and aromas of traditional Indian cooking."}
          </p>
        </section>

        {menu.length === 0 && !loading ? (
          <div className="text-center py-20">
            <p className="text-2xl text-[var(--secondary-text)]">The kitchen is taking a break!</p>
            <p className="text-md mt-2">No menu items available right now.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {menu.map((category) => (
              <CategorySection key={category._id} category={category} />
            ))}
          </div>
        )}

        <section id="contact" className="text-center my-24 pt-16 -mt-16">
          <h2 className="text-4xl font-bold font-serif mb-6">Contact Us</h2>
          <div className="max-w-3xl mx-auto mt-4 text-lg text-[var(--secondary-text)] space-y-4">
            {restaurant?.address && (
              <p className="flex justify-center items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{restaurant.address}</span>
              </p>
            )}
            {restaurant?.phone && (
              <p className="flex justify-center items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>{restaurant.phone}</span>
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--secondary-text)]/10 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-[var(--secondary-text)]">
          <p>&copy; {new Date().getFullYear()} {restaurant?.name || 'Shivantra Caterers'}. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default CustomerMenu;
