import { store } from '../store';
import { User } from '../types';
import { ADMIN_UID } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User as UserIcon, 
  Phone, 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  ArrowRight,
  Gamepad2,
  Facebook,
  Mail,
  Smartphone,
  CheckCircle2,
  Zap,
  Shield
} from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    uid: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const users = store.getUsers();
      let user = users.find(u => u.phone === formData.phone);
      
      if (formData.uid === ADMIN_UID) {
        user = {
          id: 'admin-' + Date.now(),
          uid: ADMIN_UID,
          name: 'Super Admin',
          phone: formData.phone || '01619789895',
          role: 'ADMIN',
          walletBalance: 0
        };
      }

      if (user) {
        store.setCurrentUser(user);
        onLoginSuccess(user);
      } else {
        setError('User not found. Please register.');
      }
    } else {
      if (!formData.name || !formData.phone) {
        setError('Please fill all fields');
        return;
      }
      
      const newUser: User = {
        id: 'u-' + Date.now(),
        uid: formData.uid || '',
        name: formData.name,
        phone: formData.phone,
        role: 'USER',
        walletBalance: 0
      };

      store.setCurrentUser(newUser);
      onLoginSuccess(newUser);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#050505]">
      {/* Left: Branding & Social (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-emerald-500 p-24 flex-col justify-between">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-400/20 to-transparent"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-emerald-500">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <span className="text-black font-black text-2xl tracking-tighter uppercase">JioFFTopup</span>
          </div>
          
          <h1 className="text-8xl font-black text-black uppercase tracking-tighter leading-[0.85] mb-12">
            Join the <br /> <span className="text-white">Elite</span> <br /> Squad
          </h1>
          
          <div className="space-y-6">
            {[
              { icon: Zap, text: "Instant Diamond Delivery" },
              { icon: Shield, text: "100% Secure Payments" },
              { icon: CheckCircle2, text: "Trusted by 50k+ Gamers" }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-black">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-black font-black uppercase tracking-widest text-xs">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-black/60 text-xs font-black uppercase tracking-[0.3em] mb-6">Connect with us</p>
          <div className="flex space-x-4">
            <button className="w-12 h-12 rounded-2xl bg-black text-emerald-500 flex items-center justify-center hover:scale-110 transition-transform">
              <Facebook className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 rounded-2xl bg-black text-emerald-500 flex items-center justify-center hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 rounded-2xl bg-black text-emerald-500 flex items-center justify-center hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-12 relative z-10"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-1 bg-emerald-500"></div>
              <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px]">Authentication</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              {isLogin ? 'Welcome <br /> Back' : 'Create <br /> Account'}
            </h2>
            <p className="text-slate-500 text-lg font-medium">
              {isLogin ? 'Sign in to access your dashboard.' : 'Join the fastest diamond store in BD.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Full Name</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                    <input 
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl pl-14 pr-6 py-5 text-white focus:outline-none focus:border-emerald-500 transition-all font-bold"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl pl-14 pr-6 py-5 text-white focus:outline-none focus:border-emerald-500 transition-all font-bold"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">
                Admin UID <span className="text-[9px] normal-case text-slate-700">(Optional)</span>
              </label>
              <div className="relative group">
                <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="Enter UID for Admin login"
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl pl-14 pr-6 py-5 text-white focus:outline-none focus:border-emerald-500 transition-all font-bold"
                  value={formData.uid}
                  onChange={(e) => setFormData({...formData, uid: e.target.value})}
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-red-400 text-[10px] text-center font-black uppercase tracking-widest bg-red-400/5 py-4 rounded-xl border border-red-400/10"
              >
                {error}
              </motion.div>
            )}

            <button 
              type="submit"
              className="w-full py-6 bg-emerald-500 rounded-[2rem] text-black font-black text-xl uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-4"
            >
              {isLogin ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
              <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="pt-12 border-t border-white/5 text-center">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="ml-4 text-emerald-500 font-black hover:text-emerald-400 transition-colors underline underline-offset-8"
              >
                {isLogin ? 'REGISTER NOW' : 'LOGIN NOW'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
