import React, { useState } from 'react';
import { store } from '../store';
import { Order, OrderStatus, Package, SiteSettings, PackageType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package as PackageIcon, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCcw,
  User,
  Smartphone,
  CreditCard,
  Hash,
  Filter,
  AlertCircle,
  X,
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'packages' | 'settings'>('orders');
  const [orders, setOrders] = useState<Order[]>(store.getOrders());
  const [packages, setPackages] = useState<Package[]>(store.getPackages());
  const [settings, setSettings] = useState<SiteSettings>(store.getSettings());
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPkg, setNewPkg] = useState<Partial<Package>>({
    name: '',
    price: 0,
    amount: 0,
    type: PackageType.DIAMOND,
    deliveryTime: '5-10 Min'
  });

  const handleUpdateStatus = (id: string, status: OrderStatus) => {
    const orders = store.getOrders();
    const order = orders.find(o => o.id === id);
    
    if (order && status === OrderStatus.COMPLETED && order.packageId === 'wallet-topup') {
      const users = store.getUsers();
      const user = users.find(u => u.id === order.userId);
      if (user) {
        user.walletBalance = (user.walletBalance || 0) + order.totalPayable;
        store.updateUser(user);
      }
    }
    
    store.updateOrderStatus(id, status);
    setOrders(store.getOrders());
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      store.deletePackage(id);
      setPackages(store.getPackages());
    }
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    const pkg: Package = {
      id: 'pkg-' + Date.now(),
      name: newPkg.name || '',
      price: Number(newPkg.price) || 0,
      amount: Number(newPkg.amount) || 0,
      type: newPkg.type || PackageType.DIAMOND,
      deliveryTime: newPkg.deliveryTime || '5-10 Min'
    };
    store.addPackage(pkg);
    setPackages(store.getPackages());
    setShowAddModal(false);
    setNewPkg({ name: '', price: 0, amount: 0, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' });
  };

  const handleUpdatePrice = (id: string, newPrice: number) => {
    const updated = packages.map(p => p.id === id ? { ...p, price: newPrice } : p);
    store.updatePackages(updated);
    setPackages(updated);
  };

  const saveSettings = () => {
    store.updateSettings(settings);
    alert('Settings Saved Successfully!');
  };

  // Stats calculation
  const totalRevenue = orders.filter(o => o.status === OrderStatus.COMPLETED).reduce((acc, o) => acc + o.totalPayable, 0);
  const pendingOrders = orders.filter(o => o.status === OrderStatus.PENDING).length;
  const totalUsers = store.getUsers().length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-1 bg-emerald-500"></div>
            <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px]">Command Center</span>
          </div>
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">
            Admin <span className="text-emerald-500">Panel</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium">Welcome back, Commander. Here's your empire's overview.</p>
        </div>

        <div className="flex bg-white/[0.02] p-2 rounded-[2rem] border border-white/[0.05] backdrop-blur-xl">
          {[
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'packages', label: 'Packages', icon: PackageIcon },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-[1.5rem] font-black text-[10px] transition-all uppercase tracking-widest ${activeTab === tab.id ? 'bg-emerald-500 text-black shadow-2xl shadow-emerald-500/20' : 'text-slate-500 hover:text-white'}`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {[
          { label: "Total Revenue", value: `唰�${totalRevenue}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Pending Orders", value: pendingOrders, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Total Users", value: totalUsers, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Growth Rate", value: "+12.5%", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" }
        ].map((stat, i) => (
          <div key={i} className="glass-card p-8 rounded-[2.5rem] border border-white/[0.05] relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} mb-6`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="text-3xl font-black text-white tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'orders' && (
          <motion.div 
            key="orders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card rounded-[3rem] overflow-hidden border border-white/[0.05] shadow-2xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/[0.05]">
                    <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Order Details</th>
                    <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Player Info</th>
                    <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Package</th>
                    <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Payment</th>
                    <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                      <td className="px-10 py-8">
                        <div className="font-black text-white uppercase tracking-tight mb-1">{order.id}</div>
                        <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{new Date(order.createdAt).toLocaleString()}</div>
                        {order.loginMethod && (
                          <div className="mt-4 p-4 bg-black/40 rounded-2xl border border-white/[0.05] text-[10px] space-y-2">
                            <div className="flex justify-between"><span className="text-slate-500 uppercase">Method:</span> <span className="text-emerald-500 font-black">{order.loginMethod}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500 uppercase">Email:</span> <span className="text-white font-bold">{order.loginEmail}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500 uppercase">Pass:</span> <span className="text-white font-bold">{order.loginPassword}</span></div>
                            {order.backupCode && <div className="flex justify-between"><span className="text-slate-500 uppercase">Backup:</span> <span className="text-amber-500 font-bold">{order.backupCode}</span></div>}
                          </div>
                        )}
                      </td>
                      <td className="px-10 py-8">
                        <div className="font-black text-emerald-500 tracking-widest mb-1">{order.playerUid}</div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{order.playerName}</div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="text-sm font-black text-white uppercase tracking-tight mb-1">{order.packageName}</div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">唰硔order.totalPayable}</div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{order.paymentMethod}</div>
                        <div className="text-[10px] text-slate-600 font-bold">{order.transactionId}</div>
                      </td>
                      <td className="px-10 py-8">
                        <span className={`text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] border
                          ${order.status === OrderStatus.COMPLETED ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                            order.status === OrderStatus.PENDING ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                            order.status === OrderStatus.CANCELLED ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                            'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex space-x-3">
                          {order.status === OrderStatus.PENDING && (
                            <>
                              <button 
                                onClick={() => handleUpdateStatus(order.id, OrderStatus.COMPLETED)}
                                className="w-10 h-10 bg-emerald-500 text-black rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20"
                              >
                                <CheckCircle2 className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleUpdateStatus(order.id, OrderStatus.CANCELLED)}
                                className="w-10 h-10 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'packages' && (
          <motion.div 
            key="packages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10"
          >
            <div className="flex justify-end">
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-emerald-500 px-10 py-5 rounded-[1.5rem] font-black text-black shadow-2xl shadow-emerald-500/20 flex items-center space-x-3 uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Package</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {packages.map(pkg => (
                <div key={pkg.id} className="glass-card rounded-[2.5rem] p-10 border border-white/[0.05] group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <button 
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="absolute top-6 right-6 text-slate-700 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>

                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em] block mb-2">{pkg.type}</span>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tight pr-10">{pkg.name}</h4>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Price (BDT)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            type="number"
                            value={pkg.price}
                            onChange={(e) => handleUpdatePrice(pkg.id, Number(e.target.value))}
                            className="w-full bg-black/40 border border-white/[0.05] rounded-2xl pl-12 pr-6 py-4 text-white font-black focus:outline-none focus:border-emerald-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div 
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card rounded-[3rem] p-12 border border-white/[0.05] space-y-12">
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-white uppercase tracking-tight">Global Configuration</h3>
                <p className="text-slate-500 font-medium">Manage your payment methods and site-wide announcements.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">bKash Personal</label>
                    <input 
                      type="text"
                      value={settings.bkashNumber}
                      onChange={(e) => setSettings({...settings, bkashNumber: e.target.value})}
                      className="w-full bg-black/40 border border-white/[0.05] rounded-2xl px-6 py-5 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nagad Personal</label>
                    <input 
                      type="text"
                      value={settings.nagadNumber}
                      onChange={(e) => setSettings({...settings, nagadNumber: e.target.value})}
                      className="w-full bg-black/40 border border-white/[0.05] rounded-2xl px-6 py-5 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Binance Pay ID</label>
                    <input 
                      type="text"
                      value={settings.binanceId}
                      onChange={(e) => setSettings({...settings, binanceId: e.target.value})}
                      className="w-full bg-black/40 border border-white/[0.05] rounded-2xl px-6 py-5 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">WhatsApp Support</label>
                    <input 
                      type="text"
                      value={settings.whatsapp}
                      onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                      className="w-full bg-black/40 border border-white/[0.05] rounded-2xl px-6 py-5 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Telegram Support</label>
                    <input 
                      type="text"
                      value={settings.telegram}
                      onChange={(e) => setSettings({...settings, telegram: e.target.value})}
                      className="w-full bg-black/40 border border-white/[0.05] rounded-2xl px-6 py-5 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Notice Bar Message</label>
                    <textarea 
                      rows={3}
                      value={settings.noticeText}
                      onChange={(e) => setSettings({...settings, noticeText: e.target.value})}
                      className="w-full bg-black/40 border border-white/[0.05] rounded-2xl px-6 py-5 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={saveSettings}
                className="w-full py-6 bg-emerald-500 rounded-[2rem] text-black font-black text-xl uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-4"
              >
                <Save className="w-6 h-6" />
                <span>Save All Changes</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Package Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card max-w-xl w-full rounded-[3rem] p-12 border border-white/[0.05] relative"
            >
              <button 
                onClick={() => setShowAddModal(false)} 
                className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
              >
                 <X className="w-8 h-8" />
              </button>

              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter">New Package</h3>
                  <p className="text-slate-500 font-medium">Configure your new diamond or membership deal.</p>
                </div>

                <form onSubmit={handleAddPackage} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Package Name</label>
                    <input required type="text" value={newPkg.name} onChange={e => setNewPkg({...newPkg, name: e.target.value})} className="w-full bg-black/40 border border-white/[0.05] rounded-2xl px-6 py-5 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all" placeholder="e.g. 100 Diamonds" />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Price (BDT)</label>
                      <input required type="number" value={newPkg.price} onChange={e => setNewPkg({...newPkg, price: Number(e.target.value)})} className="w-full bg-black/40 border border-white/[0.05] rounded-2xl px-6 py-5 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Diamond Amount</label>
                      <input required type="number" value={newPkg.amount} onChange={e => setNewPkg({...newPkg, amount: Number(e.target.value)})} className="w-full bg-black/40 border border-white/[0.05] rounded-2xl px-6 py-5 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Package Type</label>
                    <select value={newPkg.type} onChange={e => setNewPkg({...newPkg, type: e.target.value as PackageType})} className="w-full bg-black/40 border border-white/[0.05] rounded-2xl px-6 py-5 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all appearance-none">
                      <option value={PackageType.DIAMOND}>Diamond</option>
                      <option value={PackageType.MEMBERSHIP}>Membership</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full py-6 bg-emerald-500 rounded-[2rem] text-black font-black text-xl uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-4">
                    <Save className="w-6 h-6" />
                    <span>Save Package</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
