import React from 'react';
import { 
  PenTool, Image as ImageIcon, Video, RefreshCw, Zap, 
  ArrowRight, Sparkles, TrendingUp, Clock, FileText, CheckCircle2 
} from 'lucide-react';
import { GeneratedPost, GeneratorMode } from '../types';

interface DashboardViewProps {
  onStartGenerator: (mode: GeneratorMode) => void;
  onOpenAIRewrite: () => void;
  onOpenRepurpose: () => void;
  onViewTemplates: () => void;
  recentPosts: GeneratedPost[];
  onOpenPost: (post: GeneratedPost) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartGenerator,
  onOpenAIRewrite,
  onOpenRepurpose,
  onViewTemplates,
  recentPosts,
  onOpenPost,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Версия 2026.4 · Мультимодальный AI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Добро пожаловать в ContentAI 👋
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              Создавайте готовые посты для социальных сетей по теме, фото или видео за несколько секунд. Выберите действие, чтобы начать:
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onStartGenerator('topic')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Создать пост</span>
            </button>

            <button
              onClick={onViewTemplates}
              className="px-4 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-medium transition-colors"
            >
              Шаблоны
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-zinc-800/80 text-xs">
          <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/60">
            <span className="text-[11px] text-zinc-500 block mb-0.5">Сгенерировано</span>
            <span className="text-base font-bold text-white">12 постов</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/60">
            <span className="text-[11px] text-zinc-500 block mb-0.5">Сэкономлено времени</span>
            <span className="text-base font-bold text-emerald-400">~6.5 часов</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/60">
            <span className="text-[11px] text-zinc-500 block mb-0.5">Популярный канал</span>
            <span className="text-base font-bold text-purple-300">Instagram / TG</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/60">
            <span className="text-[11px] text-zinc-500 block mb-0.5">Brand Voice</span>
            <span className="text-base font-bold text-cyan-300">Активен ✓</span>
          </div>
        </div>
      </div>

      {/* 4 Action Cards Grid (Requirement 27) */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
          Быстрый старт:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Create Post */}
          <button
            onClick={() => onStartGenerator('topic')}
            className="glass-panel p-5 rounded-3xl border border-zinc-800 hover:border-purple-500/50 transition-all text-left group cursor-pointer shadow-sm hover:scale-[1.02]"
          >
            <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <PenTool className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
              Создать пост
            </h3>
            <p className="text-xs text-zinc-400 leading-snug mb-3">
              Напиши любую идею или тему — AI создаст пост с хуком и CTA.
            </p>
            <div className="text-[11px] text-purple-400 font-semibold flex items-center gap-1">
              <span>Открыть генератор</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Image Analysis */}
          <button
            onClick={() => onStartGenerator('image')}
            className="glass-panel p-5 rounded-3xl border border-zinc-800 hover:border-indigo-500/50 transition-all text-left group cursor-pointer shadow-sm hover:scale-[1.02]"
          >
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
              Анализ изображения
            </h3>
            <p className="text-xs text-zinc-400 leading-snug mb-3">
              Загрузи фото — AI определит объекты, цвета, людей и напишет текст.
            </p>
            <div className="text-[11px] text-indigo-400 font-semibold flex items-center gap-1">
              <span>Загрузить фото</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 3: Video Analysis */}
          <button
            onClick={() => onStartGenerator('video')}
            className="glass-panel p-5 rounded-3xl border border-zinc-800 hover:border-cyan-500/50 transition-all text-left group cursor-pointer shadow-sm hover:scale-[1.02]"
          >
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Video className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
              Анализ видео
            </h3>
            <p className="text-xs text-zinc-400 leading-snug mb-3">
              Загрузи ролик — AI сформирует сценарий, Reels-хук и описание.
            </p>
            <div className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
              <span>Загрузить видео</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 4: Rewrite Text */}
          <button
            onClick={onOpenAIRewrite}
            className="glass-panel p-5 rounded-3xl border border-zinc-800 hover:border-amber-500/50 transition-all text-left group cursor-pointer shadow-sm hover:scale-[1.02]"
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <RefreshCw className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
              Переписать текст
            </h3>
            <p className="text-xs text-zinc-400 leading-snug mb-3">
              Усиль оффер, сделай короче, эмоциональнее или вируснее.
            </p>
            <div className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
              <span>Улучшить текст</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

        </div>
      </div>

      {/* Recent Content Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
            Recent content (Последние созданные посты):
          </h2>
          {recentPosts.length > 3 && (
            <span className="text-xs text-zinc-500">Показаны последние публикации</span>
          )}
        </div>

        {recentPosts.length === 0 ? (
          <div className="p-8 text-center glass-panel rounded-2xl border border-zinc-800">
            <FileText className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">Вы пока не создали ни одного поста. Нажмите «Создать пост» выше!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPosts.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenPost(item)}
                className="glass-panel p-4 rounded-2xl border border-zinc-800 hover:border-purple-500/40 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2">
                    <span className="uppercase font-bold text-purple-400">{item.platform}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1 line-clamp-1 group-hover:text-purple-300 transition-colors">
                    {item.topic}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {item.mainPost}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-zinc-800/80 text-[11px] text-purple-400 font-semibold flex items-center justify-between">
                  <span>Открыть в карточке</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
