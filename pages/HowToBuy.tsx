import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  LogIn, 
  Gamepad2, 
  CreditCard, 
  CheckCircle2, 
  Zap, 
  PlayCircle, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';

const HowToBuy: React.FC = () => {
  const steps = [
    {
      title: "Select Package",
      desc: "Browse our diamond or membership packages and click 'Buy Package' on your preferred deal.",
      icon: ShoppingBag,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Login/Register",
      desc: "If you're not logged in, you'll be prompted to enter your phone number to track your orders.",
      icon: LogIn,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Enter Game UID",
      desc: "Provide your Free Fire Player UID carefully. This is where your diamonds will be sent.",
      icon: Gamepad2,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Make Payment",
      desc: "Send the total amount to our bKash, Nagad, or Binance ID. You can also use your Wallet balance for instant checkout.",
      icon: CreditCard,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      title: "Submit TrxID",
      desc: "Enter your sender number and Transaction ID (TrxID) and click 'Place Order'.",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10"
    },
    {
      title: "Wait & Enjoy",
      desc: "Our team will verify the payment and deliver your diamonds within 5-10 minutes!",
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-1 bg-emerald-500"></div>
            <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px]">Step-by-Step Guide</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            How to <span className="text-emerald-500">Buy</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Getting your diamonds is easier than ever. Follow our streamlined process to power up your game in minutes.
          </p>
        </div>
        <div className="hidden md:block">
          <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center text-white/20 animate-spin-slow">
            <Zap className="w-12 h-12" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="absolute -top-6 -left-6 text-[120px] font-black text-white/[0.02] leading-none pointer-events-none group-hover:text-emerald-500/5 transition-colors">
              0{idx + 1}
            </div>
            
            <div className="glass-card p-10 rounded-[2.5rem] border border-white/[0.05] h-full flex flex-col relative overflow-hidden group-hover:border-emerald-500/20 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className={`w-16 h-16 ${step.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>

              <h3 className="text-2xl font-orbitron font-black text-white uppercase tracking-tight mb-4">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium mb-8 flex-grow">{step.desc}</p>
              
              <div className="flex items-center space-x-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 relative overflow-hidden rounded-[4rem] bg-emerald-500 p-12 md:p-24 text-center"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl font-black text-black uppercase tracking-tighter mb-8 leading-none">
            Still Have <br /> Questions?
          </h2>
          <p className="text-black/70 text-lg md:text-xl font-bold mb-12 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with any issues or queries.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-black text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-3">
              <PlayCircle className="w-6 h-6" />
              <span>Watch Video</span>
            </button>
            <button className="bg-white/20 backdrop-blur-md text-black px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-black/10 hover:bg-white/30 transition-all flex items-center space-x-3">
              <MessageCircle className="w-6 h-6" />
              <span>Live Chat</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HowToBu
