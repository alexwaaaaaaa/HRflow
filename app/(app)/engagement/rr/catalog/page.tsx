"use client";
import React, { useState } from 'react';
import {
    Gift, Search, Filter, ShoppingBag, Coffee, Plane, Monitor, Shirt, Heart, Star, Plus, CheckCircle2, X
} from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
    { id: 'all', name: 'All Rewards', icon: Gift },
    { id: 'gift_cards', name: 'Gift Cards', icon: ShoppingBag },
    { id: 'experiences', name: 'Experiences', icon: Plane },
    { id: 'swag', name: 'Company Swag', icon: Shirt },
    { id: 'tech', name: 'Tech & Gadgets', icon: Monitor },
    { id: 'wellness', name: 'Wellness', icon: Heart },
];

const CATALOG_ITEMS = [
    { id: 1, name: "Amazon $50 Gift Card", category: "gift_cards", points: 500, image: "bg-gradient-to-tr from-[#FF9900] to-[#FFB020]", popular: true },
    { id: 2, name: "Starbucks $25 Gift Card", category: "gift_cards", points: 250, image: "bg-gradient-to-tr from-[#00704A] to-[#009963]", popular: true },
    { id: 3, name: "Company Hoodie", category: "swag", points: 800, image: "bg-gradient-to-tr from-[#33E6FF] to-[#0066FF]", popular: false },
    { id: 4, name: "Extra Day Off", category: "experiences", points: 5000, image: "bg-gradient-to-tr from-[#9D00FF] to-[#6b00b3]", popular: true },
    { id: 5, name: "Sony Noise Cancelling Headphones", category: "tech", points: 25000, image: "bg-gradient-to-tr from-[#8899AA] to-[#445566]", popular: false },
    { id: 6, name: "Spa Weekend Getaway", category: "wellness", points: 15000, image: "bg-gradient-to-tr from-[#FF4444] to-[#cc0000]", popular: false },
    { id: 7, name: "Standing Desk Converter", category: "tech", points: 12000, image: "bg-gradient-to-tr from-[#2A3A4A] to-[#0F1C2E]", popular: false },
    { id: 8, name: "Premium Coffee Beans Selection", category: "gift_cards", points: 400, image: "bg-gradient-to-tr from-[#CD7F32] to-[#8b5a2b]", popular: false },
];

export default function RewardCatalogScreen() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const [redeemSuccess, setRedeemSuccess] = useState(false);

    const filteredItems = CATALOG_ITEMS.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleRedeem = (item: any) => {
        setSelectedItem(item);
        setRedeemSuccess(false);
    };

    const confirmRedemption = () => {
        setIsRedeeming(true);
        setTimeout(() => {
            setIsRedeeming(false);
            setRedeemSuccess(true);
            setTimeout(() => {
                setSelectedItem(null);
                setRedeemSuccess(false);
            }, 2000);
        }, 1500);
    };

    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] font-sans relative">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <ShoppingBag size={32} className="text-[#33E6FF]" /> Reward Catalog
                    </h1>
                    <p className="text-[#8899AA]">Exchange your points for gift cards, swag, and exclusive experiences.</p>
                </div>
                <div className="flex items-center gap-4 bg-[#0F1C2E] border border-[#2A3A4A] px-5 py-2.5 rounded-2xl shadow-lg">
                    <span className="text-[#8899AA] text-sm font-bold uppercase tracking-wider">My Balance</span>
                    <span className="text-2xl font-black text-[#00E5A0] tracking-tight">4,250 <span className="text-sm font-medium">pts</span></span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Sidebar Categories */}
                <div className="w-full lg:w-[280px] shrink-0 sticky top-6">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-4 shadow-xl flex flex-col gap-2">
                        <h3 className="text-white font-bold px-4 py-2 text-sm uppercase tracking-wider mb-2">Categories</h3>
                        {CATEGORIES.map(category => {
                            const Icon = category.icon;
                            const isActive = activeCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-[#33E6FF]/10 text-[#33E6FF] font-bold shadow-md' : 'text-[#8899AA] hover:bg-[#1A2A3A] hover:text-white font-medium'}`}
                                >
                                    <Icon size={18} className={isActive ? 'text-[#33E6FF]' : 'text-[#445566]'} />
                                    {category.name}
                                </button>
                            )
                        })}
                    </div>

                    {/* Price Filter Mock */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl mt-6">
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Points Range</h3>
                        <div className="space-y-4">
                            <input type="range" className="w-full accent-[#33E6FF] h-1.5 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer" />
                            <div className="flex items-center justify-between text-xs text-[#8899AA] font-bold">
                                <span>0 pts</span>
                                <span>50,000 pts</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Catalog Grid */}
                <div className="flex-1 space-y-6 w-full">

                    {/* Search Bar */}
                    <div className="flex items-center gap-4 bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-2 shadow-xl">
                        <div className="relative flex-1">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" />
                            <input
                                type="text"
                                placeholder="Search rewards..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-[#445566] focus:outline-none focus:border-[#33E6FF]"
                            />
                        </div>
                        <button className="px-5 py-3 border border-[#2A3A4A] bg-[#1A2A3A] rounded-xl text-[#8899AA] hover:text-white transition-colors flex items-center gap-2 font-bold">
                            <Filter size={18} /> Sort: Featured
                        </button>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredItems.map(item => (
                            <div key={item.id} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl overflow-hidden hover:border-[#33E6FF]/50 transition-colors shadow-lg group flex flex-col">

                                <div className={`h-40 ${item.image} flex items-center justify-center relative`}>
                                    {item.popular && (
                                        <div className="absolute top-4 left-4 bg-[#FFB020] text-[#0A1420] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                            <Star size={12} fill="currentColor" /> Popular
                                        </div>
                                    )}
                                    <Gift size={48} className="text-white opacity-50 group-hover:scale-110 transition-transform duration-300" />
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">{CATEGORIES.find(c => c.id === item.category)?.name}</p>
                                        <h3 className="text-lg font-bold text-white mb-2 leading-tight">{item.name}</h3>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="relative group">
                                            <span className={`text-xl font-black ${item.points <= 4250 ? 'text-[#00E5A0]' : 'text-[#FF4444]'}`}>{item.points.toLocaleString()}</span>
                                            <span className="text-sm text-[#445566] ml-1">pts</span>
                                            {item.points > 4250 && (
                                                <div className="absolute bottom-full left-0 mb-2 w-max px-3 py-1.5 bg-[#FF4444] text-white text-xs font-bold rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                    Not enough points
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleRedeem(item)}
                                            disabled={item.points > 4250}
                                            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${item.points <= 4250 ? 'bg-[#33E6FF]/10 text-[#33E6FF] hover:bg-[#33E6FF] hover:text-[#0A1420]' : 'bg-[#1A2A3A] text-[#445566] cursor-not-allowed'}`}
                                        >
                                            <Plus size={16} /> Redeem
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}

                        {filteredItems.length === 0 && (
                            <div className="col-span-full py-12 text-center text-[#8899AA]">
                                <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                                <p className="text-lg">No rewards found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Redemption Modal Overlay */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative">

                        {!redeemSuccess && (
                            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-[#8899AA] hover:text-white transition-colors z-10 w-8 h-8 flex items-center justify-center bg-[#1A2A3A] rounded-full">
                                <X size={18} />
                            </button>
                        )}

                        {redeemSuccess ? (
                            <div className="p-10 text-center flex flex-col items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-[#00E5A0]/20 flex items-center justify-center mb-6 border-4 border-[#0F1C2E] relative shrink-0">
                                    <CheckCircle2 size={40} className="text-[#00E5A0]" />
                                    <div className="absolute inset-0 rounded-full border-2 border-[#00E5A0] animate-ping opacity-20"></div>
                                </div>
                                <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Redemption Successful!</h2>
                                <p className="text-[#8899AA] mb-6 leading-relaxed">You have successfully redeemed <strong className="text-white">{selectedItem.name}</strong> for {selectedItem.points} points. You will receive an email confirmation shortly.</p>
                            </div>
                        ) : (
                            <>
                                <div className={`h-32 ${selectedItem.image} relative flex items-center justify-center`}>
                                    <Gift size={40} className="text-white opacity-50" />
                                </div>
                                <div className="p-8">
                                    <h2 className="text-2xl font-black text-white mb-1">{selectedItem.name}</h2>
                                    <p className="text-[#8899AA] text-sm mb-6">Are you sure you want to redeem this item? This action cannot be undone.</p>

                                    <div className="bg-[#152336] border border-[#1A2A3A] rounded-2xl p-4 mb-8 space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-[#8899AA]">Current Balance</span>
                                            <span className="font-bold text-white font-mono">4,250 pts</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-[#8899AA]">Item Cost</span>
                                            <span className="font-bold text-[#FF4444] font-mono">-{selectedItem.points} pts</span>
                                        </div>
                                        <div className="h-px bg-[#2A3A4A] w-full"></div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white font-bold">New Balance</span>
                                            <span className="font-bold text-[#00E5A0] font-mono">{4250 - selectedItem.points} pts</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={confirmRedemption}
                                        disabled={isRedeeming}
                                        className="w-full py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 bg-[#00E5A0] text-[#0A1420] hover:bg-[#00c98d] transition-colors shadow-[0_5px_15px_rgba(0,229,160,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isRedeeming ? (
                                            <span className="w-6 h-6 border-2 border-[#0A1420]/30 border-t-[#0A1420] rounded-full animate-spin"></span>
                                        ) : (
                                            'Confirm Redemption'
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
