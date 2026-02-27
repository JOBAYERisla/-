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
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 blur-[40px] group-hover:bg-emerald-500/10 transition-colors"></div>
      
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-red-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-lg shadow-red-500/20">
          Hot
        </span>
      </div>

      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-2">{pkg.name}</h3>
        <p className="text-sm text-white/70 mb-3">{pkg.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="line-through text-xs text-white/40">৳{discount}</p>
            <p className="text-xl font-bold text-emerald-400">৳{pkg.price}</p>
          </div>
          <button className="bg-emerald-500 px-3 py-1 rounded text-xs font-bold">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
