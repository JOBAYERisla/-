import React from 'react';
import { store } from '../store';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  HelpCircle,
  MessageCircle
} from 'lucide-react';

const Contact: React.FC = () => {
  const settings = store.getSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-4">GET IN <span className="text-emerald-500">TOUCH</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto uppercase tracking-widest text-sm font-bold">We are here to help you 24/7 with any queries</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/30 transition-all">
            <h3 className="text-xl font-orbitron font-bold text-white mb-6 uppercase flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-emerald-500" />
              Direct Support
            </h3>
            <div className="space-y-6">
              <a 
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                className="flex items-center p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 group hover:bg-emerald-500 transition-colors"
              >
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-emerald-500 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-white transition-colors">WhatsApp Support</p>
                  <p className="text-xs text-slate-400 group-hover:text-emerald-100 transition-colors">Instant chat with our agents</p>
                </div>
              </a>

              <a 
                href={`https://t.me/${settings.telegram}`}
                target="_blank"
                className="flex items-center p-4 bg-sky-500/10 rounded-2xl border border-sky-500/20 group hover:bg-sky-500 transition-colors"
              >
                <div className="w-12 h-12 bg-sky-500 text-white rounded-xl flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-sky-500 transition-colors">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-white transition-colors">Telegram Support</p>
                  <p className="text-xs text-slate-400 group-hover:text-sky-100 transition-colors">Join our telegram channel</p>
                </div>
              </a>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-slate-800">
            <h3 className="text-xl font-orbitron font-bold text-white mb-6 uppercase flex items-center">
              <Clock className="w-6 h-6 mr-3 text-emerald-500" />
              Operating Hours
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Order Processing</span>
                <span className="text-emerald-400 font-bold">24 Hours / 7 Days</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Live Support</span>
                <span className="text-white font-bold">9:00 AM - 12:00 AM</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Response Time</span>
                <span className="text-white font-bold">&lt; 10 Minutes</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 md:p-10 rounded-3xl border border-slate-800"
        >
          <h3 className="text-xl font-orbitron font-bold text-white mb-8 uppercase flex items-center">
            <Send className="w-6 h-6 mr-3 text-emerald-500" />
            Send a Message
          </h3>
          <form className="space-y-6">
            <div className="relative">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Your Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Email/Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="How should we reach you?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Subject</label>
              <div className="relative">
                <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="What is this about?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Message</label>
              <textarea 
                rows={5} 
                placeholder="Write your message here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition resize-none"
              ></textarea>
            </div>
            <button className="w-full py-4 bg-emerald-500 text-white font-black rounded-xl shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition flex items-center justify-center space-x-2 uppercase tracking-widest text-sm">
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
