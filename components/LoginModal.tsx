
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    window.location.href = "https://accounts.google.com/signin";
  };

  const handleGithubLogin = () => {
    window.location.href = "https://github.com/login";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-[420px] bg-white text-gray-800 rounded-[20px] shadow-2xl p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {/* Logo from user snippet adapted to React/Tailwind */}
        <div className="text-3xl font-bold text-center mb-5 bg-gradient-to-br from-[#4da3ff] to-[#8b8f98] bg-clip-text text-transparent select-none cursor-default">
          KIRA <span className="bg-gradient-to-br from-[#5a5a5a80] via-[#6e6e6e80] to-[#82828280] bg-clip-text text-transparent">news</span>
        </div>

        <h2 className="text-center text-xl font-bold text-[#333] mb-5">
          {isLogin ? 'Entrar na Conta' : 'Criar Conta'}
        </h2>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3 mb-4">
          <button 
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 bg-white text-[#444] border border-[#ccc] rounded-xl flex items-center justify-center gap-2.5 font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="" />
            Conectar com Google
          </button>
          <button 
            onClick={handleGithubLogin}
            className="w-full py-3 px-4 bg-[#24292e] text-white border-none rounded-xl flex items-center justify-center gap-2.5 font-medium hover:opacity-90 transition-opacity text-sm"
          >
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="18" alt="" className="invert" />
            Conectar com GitHub
          </button>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
             <div className="mb-4">
              <label className="block mb-1.5 text-[#555] text-sm font-medium">Nome</label>
              <input type="text" placeholder="Seu nome" className="w-full p-3 rounded-xl border border-[#ccc] text-base outline-none focus:border-[#4da3ff] focus:ring-1 focus:ring-[#4da3ff] transition-all bg-white text-gray-800 placeholder:text-gray-400" />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block mb-1.5 text-[#555] text-sm font-medium">Email</label>
            <input type="email" placeholder="Digite seu email" className="w-full p-3 rounded-xl border border-[#ccc] text-base outline-none focus:border-[#4da3ff] focus:ring-1 focus:ring-[#4da3ff] transition-all bg-white text-gray-800 placeholder:text-gray-400" />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1.5 text-[#555] text-sm font-medium">Senha</label>
            <input type="password" placeholder={isLogin ? "Digite sua senha" : "Crie uma senha"} className="w-full p-3 rounded-xl border border-[#ccc] text-base outline-none focus:border-[#4da3ff] focus:ring-1 focus:ring-[#4da3ff] transition-all bg-white text-gray-800 placeholder:text-gray-400" />
          </div>

          <button className="w-full py-3.5 mt-2 bg-gradient-to-br from-[#4da3ff] to-[#8b8f98] text-white border-none rounded-xl text-base font-bold cursor-pointer hover:opacity-90 hover:shadow-lg transition-all transform active:scale-[0.98]">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-[#555]">
          {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-[#4da3ff] font-medium hover:underline focus:outline-none"
          >
            {isLogin ? 'Criar agora' : 'Entrar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
