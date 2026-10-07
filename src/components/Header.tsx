import React from 'react';
import { 
  Sparkles, PenTool, Image as ImageIcon, Video, History, 
  LayoutTemplate, Settings, Moon, Sun, User, Zap, ChevronDown, Check
} from 'lucide-react';

interface HeaderProps {
  activeView: 'dashboard' | 'generator' | 'tools' | 'templates' | 'history' | 'pricing' | 'settings';
  onNavigate: (view: 'dashboard' | 'generator' | 'tools' | 'templates' | 'history' | 'pricing' | 'settings') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  savedPostsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  isDarkMode,
  onToggleTheme,
  savedPostsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-[0_0_20px_rgba(124,58,237,0.35)] group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[10px] bg-zinc-950 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-cyan-300 transition-colors" />
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-purple-200 transition-colors">
                    ContentAI
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Studio
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 block -mt-0.5">
                  SaaS Social Content Platform
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeView === 'dashboard'
                    ? 'text-white bg-zinc-800/80 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Главная
              </button>

              <button
                onClick={() => onNavigate('generator')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeView === 'generator'
                    ? 'text-purple-300 bg-purple-500/15 border border-purple-500/30 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>Создать пост</span>
              </button>

              <button
                onClick={() => onNavigate('tools')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeView === 'tools'
                    ? 'text-white bg-zinc-800/80 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Инструменты AI
              </button>

              <button
                onClick={() => onNavigate('templates')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeView === 'templates'
                    ? 'text-white bg-zinc-800/80 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Шаблоны
              </button>

              <button
                onClick={() => onNavigate('history')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeView === 'history'
                    ? 'text-white bg-zinc-800/80 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <span>История</span>
                {savedPostsCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {savedPostsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onNavigate('pricing')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeView === 'pricing'
                    ? 'text-white bg-zinc-800/80 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Тарифы
              </button>

              <button
                onClick={() => onNavigate('settings')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeView === 'settings'
                    ? 'text-white bg-zinc-800/80 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Настройки</span>
              </button>
            </nav>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
              title={isDarkMode ? 'Включить светлую тему' : 'Включить тёмную тему'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
            </button>

            {/* User Profile dropdown */}
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-purple-500/20">
                AS
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-semibold text-zinc-100 block leading-tight">Алексей С.</span>
                <span className="text-[10px] text-purple-400 font-medium">Pro Plan · Безлимит</span>
              </div>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => onNavigate('generator')}
              className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:opacity-95 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Создать пост</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden overflow-x-auto border-t border-zinc-800/60 bg-zinc-950/90 px-4 py-2 flex items-center gap-2 no-scrollbar">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${
            activeView === 'dashboard' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'
          }`}
        >
          Главная
        </button>
        <button
          onClick={() => onNavigate('generator')}
          className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${
            activeView === 'generator' ? 'bg-purple-600 text-white font-medium' : 'text-zinc-400'
          }`}
        >
          Создать пост
        </button>
        <button
          onClick={() => onNavigate('tools')}
          className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${
            activeView === 'tools' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'
          }`}
        >
          Инструменты
        </button>
        <button
          onClick={() => onNavigate('templates')}
          className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${
            activeView === 'templates' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'
          }`}
        >
          Шаблоны
        </button>
        <button
          onClick={() => onNavigate('history')}
          className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${
            activeView === 'history' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'
          }`}
        >
          История ({savedPostsCount})
        </button>
        <button
          onClick={() => onNavigate('pricing')}
          className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${
            activeView === 'pricing' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'
          }`}
        >
          Тарифы
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${
            activeView === 'settings' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'
          }`}
        >
          Настройки
        </button>
      </div>
    </header>
  );
};
