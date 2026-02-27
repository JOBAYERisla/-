import React, { useState, useEffect } from 'react';
import { store } from '../store';
import { User, SiteSettings } from '../types';
import { ADMIN_UID } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentPage }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(store.getCurrentUser());
  const [settings, setSettings] = useState<SiteSettings>(store.getSettings());

  const handleLogout = () => {
    store.setCurrentUser(null);
    setCurrentUser(null);
    onNavigate('home');
  };

  const handleQuickShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this amazing gaming store in Bangladesh!");
    let shareUrl = '';

    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCurrentUser(store.getCurrentUser());
      setSettings(store.getSettings());
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <header className="p-4 flex justify-between items-center border-b border-white/10">
        <h1 
          className="text-xl font-bold cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          {settings.siteName}
        </h1>

        <div className="flex gap-3 items-center">
          {currentUser ? (
            <>
              <span className="text-sm">{currentUser.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded text-xs"
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              onClick={() => onNavigate('login')}
              className="bg-emerald-500 px-3 py-1 rounded text-xs"
            >
              Login
            </button>
          )}
        </div>
      </header>

      <main className="p-4">
        {children}
      </main>

      <footer className="p-4 border-t border-white/10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {settings.siteName}
      </footer>
    </div>
  );
};

export default Layout;
