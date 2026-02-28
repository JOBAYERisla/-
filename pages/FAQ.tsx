import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, MessageCircle, Zap } from 'lucide-react';

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does delivery take?",
      answer: "Most orders are delivered within 5-10 minutes. However, during peak hours or game updates, it might take up to 30 minutes. You can track your order status in real-time from your dashboard."
    },
    {
      question: "Is it safe to top up from here?",
      answer: "Absolutely! We use official payment methods and our delivery process is 100% secure. We have served thousands of satisfied gamers across the country."
    },
    {
      question: "What if I enter the wrong Player UID?",
      answer: "Unfortunately, top-ups sent to the wrong UID cannot be reversed as the diamonds are instantly credited by the game server. Please double-check your UID before confirming the order."
    },
    {
      question: "How do I use the Wallet system?",
      answer: "You can add money to your wallet using bKash, Nagad, or Binance. Once you have a balance, you can checkout instantly without waiting for transaction verification for each order."
    },
    {
      question: "My payment was successful but order is pending?",
      answer: "Verification usually takes a few minutes. If your order is pending for more than 30 minutes, please contact our live support with your Order ID and payment proof."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row justify-between gap-20">
        {/* Left: Content */}
        <div className="md:w-1/3 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-1 bg-emerald-500"></div>
              <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px]">Support Center</span>
            </div>
            <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">
              Common <br /> <span className="text-emerald-500">Questions</span>
            </h1>
          </div>
          
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Everything you need to know about our services, payments, and delivery process.
          </p>

          <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-black">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-tight">Need more help?</h4>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Our team is online 24/7</p>
              </div>
            </div>
            <button className="w-full py-4 bg-emerald-500 text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:scale-105 transition-all">
              Contact Support
            </button>
          </div>
        </div>

        {/* Right: Accordion */}
        <div className="md:w-2/3 space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group rounded-[2rem] border transition-all overflow-hidden ${activeIndex === idx ? 'bg-white/[0.03] border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.05)]' : 'bg-white/[0.01] border-white/[0.05] hover:border-white/10'}`}
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full p-8 flex items-center justify-between text-left"
              >
                <div className="flex items-center space-x-6">
                  <span className={`text-xl font-black font-mono transition-colors ${activeIndex === idx ? 'text-emerald-500' : 'text-slate-700'}`}>
                    {idx < 9 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <h3 className={`text-xl font-black uppercase tracking-tight transition-colors ${activeIndex === idx ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {faq.question}
                  </h3>
                </div>
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${activeIndex === idx ? 'bg-emerald-500 border-emerald-500 text-black rotate-180' : 'border-white/10 text-slate-500'}`}>
                  {activeIndex === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 ml-16">
                      <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="mt-32 p-12 rounded-[3rem] bg-slate-900 border border-white/[0.05] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px]"></div>
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Ready to power up?</h3>
            <p className="text-slate-500 font-medium">Join 50,000+ gamers who trust us for their top-ups.</p>
          </div>
        </div>
        <button className="px-12 py-6 bg-emerald-500 text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default FAQ;
