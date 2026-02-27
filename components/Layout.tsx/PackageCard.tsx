import React from 'react';
import { Package } from '../types';

interface PackageCardProps {
  pkg: Package;
  onSelect: (pkg: Package) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect }) => {
  const isMembership = pkg.type === 'MEMBERSHIP';
  const discount = Math.round(pkg.price * 1.35);
  
  return (
    <div 
      className="glass-card rounded-[1.5rem] p-5 transition-all duration-500 hover:scale-[1.03] group cursor-pointer border border-white/5 hover:border-emerald-500/30 relative overflow-hidden"
      onClick={() => onSelect(pkg)}
    >
      {/* Background Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 blur-[40px] group-hover:bg-emerald-500/10 transition-colors"></div>
      
      {/* Hot/New Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-red-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-lg shadow-red-500/20">Hot</span>
      </div>

      <div className="relative z-10">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              {pkg.deliveryTime}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center p-2 shadow-inner">
            <img 
              src={isMembership ? "https://static.wikia.nocookie.net/freefire/images/b/b3/Monthly_Membership_Icon.png" : "https://pngimg.com/uploads/diamond/diamond_PNG6682.png"} 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              alt="icon"
            />
          </div>
        </div>

        {/* Product Box */}
        <div className="bg-[#0f0a1f] rounded-2xl p-4 border border-slate-800/50 mb-6 flex flex-col items-center group-hover:border-emerald-500/20 transition-colors">
          <h3 className="text-base font-orbitron font-black text-white text-center leading-tight mb-1 group-hover:text-emerald-400 transition-colors">
            {pkg.name}
          </h3>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Free Fire BD</p>
        </div>

        {/* Pricing Info */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-black text-white leading-none">৳{pkg.price}</span>
            <span className="text-xs text-slate-600 line-through mb-1">৳{discount}</span>
          </div>
          <div className="mt-2 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Instant Delivery</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full py-3.5 rounded-xl bg-emerald-500 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center space-x-2">
          <span>Checkout</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
      
      {/* Glossy Overlay */}
      <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:left-[100%] transition-all duration-1000 pointer-events-none"></div>
    </div>
  );
};

export default PackageCard;
