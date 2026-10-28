import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AgeGroup } from '../types';
import { X, Sparkles, Baby, User, Mail, Phone, Lock, Heart } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, signIn, user, updateChildInfo } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [childName, setChildName] = useState(user?.childName || 'Bé Cưng');
  const [childAge, setChildAge] = useState<AgeGroup>(user?.childAge || '3-4');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    signIn(email, name, phone);
    if (mode === 'signup' && childName) {
      updateChildInfo(childName, childAge);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 no-print">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-amber-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-400 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-white" />
            <h3 className="font-black text-lg">
              {mode === 'signin' ? 'Đăng Nhập Cùng Con' : 'Tạo Tài Khoản Đồng Hành'}
            </h3>
          </div>
          <button
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-neutral-500 leading-relaxed">
            {mode === 'signin'
              ? 'Nhập email hoặc số điện thoại để tiếp tục lưu lại hành trình phát triển của con.'
              : 'Tạo tài khoản để cá nhân hóa các hoạt động theo đúng lứa tuổi của bé.'}
          </p>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Họ tên của ba mẹ:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Mẹ Thu Hà"
                  className="w-full pl-10 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Địa chỉ Email:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="phuhuynh@gmail.com"
                className="w-full pl-10 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Số điện thoại (để hỗ trợ & đối soát gói):
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0988 123 456"
                className="w-full pl-10 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="pt-2 border-t border-neutral-100 space-y-3">
              <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wider block">
                Thông tin của bé:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Tên bé:
                  </label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Bé Bông"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Độ tuổi:
                  </label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value as AgeGroup)}
                    className="w-full px-2.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="2-3">2-3 tuổi</option>
                    <option value="3-4">3-4 tuổi</option>
                    <option value="4-5">4-5 tuổi</option>
                    <option value="5-6">5-6 tuổi</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-sm shadow-xs transition-colors"
            >
              {mode === 'signin' ? 'Đăng nhập ngay' : 'Hoàn tất đăng ký'}
            </button>
          </div>

          <div className="text-center pt-2">
            {mode === 'signin' ? (
              <p className="text-xs text-neutral-500">
                Chưa có tài khoản?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-amber-700 hover:underline"
                >
                  Đăng ký tài khoản mới
                </button>
              </p>
            ) : (
              <p className="text-xs text-neutral-500">
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="font-bold text-amber-700 hover:underline"
                >
                  Đăng nhập
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
