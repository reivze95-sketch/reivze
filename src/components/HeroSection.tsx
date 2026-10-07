import React from 'react';
import { Sparkles, PenTool, Image as ImageIcon, Video, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { GeneratorMode } from '../types';

interface HeroSectionProps {
  onStartGenerating: (mode?: GeneratorMode) => void;
  onExploreTemplates: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartGenerating,
  onExploreTemplates,
}) => {
  return (
    <div className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-0 right-1/4 w-[350px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center px-4">
        
        {/* Floating AI capability badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-purple-500/30 text-purple-300 text-xs font-medium mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Multimodal AI 2026: Текст, Фотографии и Видео</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
          Создавай контент с помощью AI{' '}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            за несколько секунд
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Напиши тему, загрузи изображение или видео — AI создаст готовый пост, адаптированный под твой контент, цель и бренд.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <button
            onClick={() => onStartGenerating('topic')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:opacity-95 text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_30px_rgba(124,58,237,0.35)] transition-all active:scale-95 cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Создать пост</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreTemplates}
            className="px-5 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-sm font-medium transition-colors"
          >
            Смотреть шаблоны
          </button>
        </div>

        {/* 3 Quick Action Modes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto text-left">
          
          <button
            onClick={() => onStartGenerating('topic')}
            className="p-4 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-purple-500/40 transition-all group cursor-pointer text-left shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <PenTool className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
              1. Тема & Идея
            </h3>
            <p className="text-xs text-zinc-400 leading-snug">
              Введи любую тему — получи вирусный текст с хуком и CTA под выбранную соцсеть.
            </p>
          </button>

          <button
            onClick={() => onStartGenerating('image')}
            className="p-4 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-indigo-500/40 transition-all group cursor-pointer text-left shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
              2. Анализ изображения
            </h3>
            <p className="text-xs text-zinc-400 leading-snug">
              Загрузи фото — AI определит объекты, цвета, настроение и напишет органичный пост.
            </p>
          </button>

          <button
            onClick={() => onStartGenerating('video')}
            className="p-4 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-cyan-500/40 transition-all group cursor-pointer text-left shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Video className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
              3. Анализ видео
            </h3>
            <p className="text-xs text-zinc-400 leading-snug">
              Загрузи ролик — AI проанализирует сюжет и создаст сценарий, Reels-хук и описание.
            </p>
          </button>

        </div>

        {/* Feature trust markers */}
        <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>3 уникальных варианта к каждому посту</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>10 маркетинговых целей (Продажи, Вовлечение, Бренд)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instagram, TikTok, Telegram, LinkedIn, X</span>
          </div>
        </div>

      </div>
    </div>
  );
};
