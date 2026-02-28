import React, { useState, useEffect } from 'react';
import { store } from '../store';
import { Package, PackageType } from '../types';
import PackageCard from '../components/PackageCard';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, CheckCircle2, ShoppingCart, Zap, ShieldCheck, Trophy, Users, Star, ArrowRight, Play } from 'lucide-react';

interface HomeProps {
  onSelectPackage: (pkg: Package) => void;
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectPackage, onNavigate }) => {
  const packages = store.getPackages();
  const [filter, setFilter] = useState<PackageType>(PackageType.DIAMOND);
  const [showToast, setShowToast] = useState(false);
  const [recentOrders, setRecentOrders] = useState<{id: string, name: string, amount: string}[]>([]);

  useEffect(() => {
    // Simulate live orders
    const names = ['Ariful', 'Siam', 'Tanvir', 'Mahmud', 'Rakib', 'Sakib', 'Hasan', 'Joy'];
    const amounts = ['115ðŸ’Ž', '240ðŸ’Ž', 'Weekly', 'Monthly', '520ðŸ’Ž', '1060ðŸ’Ž'];
    
    const interval = setInterval(() => {
      const newOrder = {
        id: Math.random().toString(36).substr(2, 5).toUpperCase(),
        name: names[Math.floor(Math.random() * names.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)]
      };
      setRecentOrders(prev => [newOrder, ...prev].slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredPackages = packages.filter(p => p.type === filter);

  const categories = [
    { type: PackageType.DIAMOND, label: 'UID TOPUP', icon: 'ðŸŽ®', color: 'emerald' },
    { type: PackageType.IN_GAME, label: 'IN-GAME', icon: 'ðŸ‘¤', color: 'purple' },
    { type: PackageType.MEMBERSHIP, label: 'SPECIALS', icon: 'ðŸŒŸ', color: 'gold' },
  ];

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'JioFFTopup - Best Gaming Store',
        text: 'Top up Free Fire Diamonds at the lowest price in Bangladesh!',
        url: url,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="pb-20 bg-[#05020d] cyber-grid">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] bg-emerald-500 text-black font-black px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>LINK COPIED TO CLIPBOARD!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <section className="relative min-h-[700px] md:min-h-[900px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(16,185,129,0.1)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(168,85,247,0.05)_0%,_transparent_50%)]"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#05020d] to-transparent"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-16 py-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center space-x-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-data text-emerald-400 text-[10px]">Bangladesh's #1 Trusted Store</span>
            </motion.div>
            
            <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.8] mb-10 tracking-tighter text-gradient">
              LEVEL <br />
              <span className="text-emerald-500 neon-emerald italic">UP NOW</span>
            </h1>
            
            <p className="text-slate-400 max-w-lg text-lg md:text-xl mb-12 font-medium leading-relaxed">
              Unlock premium Free Fire content with the fastest delivery system in the country. Trusted by 50,000+ gamers.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-5 bg-emerald-500 text-black font-black rounded-[2rem] shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 uppercase text-sm tracking-[0.2em] flex items-center space-x-3 group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Start Shopping</span>
              </button>
              <button 
                onClick={() => onNavigate('how-to')}
                className="px-10 py-5 bg-white/[0.03] border border-white/[0.08] text-white font-bold rounded-[2rem] hover:bg-white/[0.1] transition-all uppercase text-sm tracking-[0.2em] flex items-center space-x-3"
              >
                <Play className="w-5 h-5 text-emerald-500" />
                <span>Tutorial</span>
              </button>
            </div>

            {/* Live Activity Ticker */}
            <div className="mt-16 w-full max-w-md">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center">
                <Users className="w-3 h-3 mr-2" /> Live Activity
              </p>
              <div className="h-12 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  {recentOrders.length > 0 && (
                    <motion.div
                      key={recentOrders[0].id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center space-x-3 bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-500">
                        {recentOrders[0].name.charAt(0)}
                      </div>
                      <p className="text-xs text-slate-300">
                        <span className="font-bold text-white">{recentOrders[0].name}</span> just bought <span className="text-emerald-400 font-bold">{recentOrders[0].amount}</span>
                      </p>
                      <span className="text-[9px] text-slate-600 font-mono ml-auto">#{recentOrders[0].id}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-end relative"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[150px] rounded-full group-hover:bg-emerald-500/30 transition-colors duration-700"></div>
              <img 
                src="https://static.wikia.nocookie.net/freefire/images/b/b3/Alok_Render.png" 
                alt="Character" 
                className="relative z-10 h-[700px] object-contain animate-float drop-shadow-[0_0_100px_rgba(16,185,129,0.3)] filter contrast-125 brightness-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Stat Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-20 -left-10 z-20 glass-card p-4 rounded-2xl border-emerald-500/30"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase">Success Rate</p>
                    <p className="text-lg font-black text-white">99.9%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-40 -right-5 z-20 glass-card p-4 rounded-2xl border-emerald-500/30"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase">Rating</p>
                    <p className="text-lg font-black text-white">4.9/5.0</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section id="shop" className="max-w-7xl mx-auto px-4 mt-[-60px] relative z-30">
        <div className="glass-card p-3 rounded-[3rem] flex flex-wrap items-center justify-between gap-6 shadow-2xl shadow-black/50">
          <div className="flex flex-wrap items-center gap-3 p-1">
            {categories.map((cat) => (
              <button
                key={cat.type}
                onClick={() => setFilter(cat.type)}
                className={`flex items-center space-x-4 px-10 py-5 rounded-[2.5rem] font-heading font-black text-xs transition-all duration-500 group ${filter === cat.type ? 'category-active' : 'text-slate-500 hover:text-white hover:bg-white/[0.05]'}`}
              >
                <span className={`text-2xl group-hover:scale-125 transition-transform ${filter === cat.type ? 'scale-110' : ''}`}>{cat.icon}</span>
                <span className="tracking-[0.25em] uppercase">{cat.label}</span>
              </button>
            ))}
          </div>
          
          <div className="hidden lg:flex items-center px-10 text-slate-500 space-x-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="font-data text-[10px]">Instant Delivery</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="font-data text-[10px]">Secure Gateway</span>
            </div>
          </div>
        </div>
      </section>

      {/* Package Grid Section */}
      <section className="max-w-7xl mx-auto px-4 mt-40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-1 bg-emerald-500"></div>
              <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-xs">Premium Selection</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              CHOOSE YOUR <br />
              <span className="text-emerald-500">POWER-UP</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-xs text-sm font-medium leading-relaxed">
            Select from our wide range of packages tailored for every type of player.
          </p>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <PackageCard pkg={pkg} onSelect={onSelectPackage} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 mt-60">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">WHY CHOOSE <br /><span className="text-emerald-500">JIOFFTOPUP?</span></h2>
            <p className="text-slate-400 font-medium leading-relaxed">We provide the most reliable and fastest gaming top-up service in Bangladesh with a focus on security and customer satisfaction.</p>
            <button onClick={() => onNavigate('contact')} className="flex items-center space-x-3 text-emerald-500 font-black uppercase tracking-widest text-xs group">
              <span>Contact Support</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Instant Delivery', desc: 'Our automated system ensures your diamonds arrive within minutes of payment verification.', icon: Zap },
              { title: 'Secure Payments', desc: 'We use industry-standard encryption and trusted local gateways like bKash and Nagad.', icon: ShieldCheck },
              { title: '24/7 Support', desc: 'Our dedicated team is always available on WhatsApp to help you with any issues.', icon: Users },
              { title: 'Best Rates', desc: 'We offer the most competitive prices in the market without compromising on quality.', icon: Star },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border-white/[0.03] hover:border-emerald-500/30 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <feature.icon className="w-6 h-6 text-emerald-500 group-hover:text-black" />
                </div>
                <h4 className="text-xl font-black text-white mb-3 uppercase">{feature.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
