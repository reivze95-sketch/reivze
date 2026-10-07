import React, { useEffect, useState } from 'react';
import { Sparkles, BrainCircuit, Lightbulb, FileText, CheckCircle2 } from 'lucide-react';

interface LoadingStateProps {
  mode?: 'topic' | 'image' | 'video';
}

export const LoadingState: React.FC<LoadingStateProps> = ({ mode = 'topic' }) => {
  const [step, setStep] = useState(0);

  const STEPS = [
    {
      title: mode === 'image' 
        ? 'AI анализирует визуальный контекст изображения...' 
        : mode === 'video' 
        ? 'AI анализирует сцены и ключевые моменты видео...' 
        : 'AI анализирует тему и контекст...',
      sub: 'Сканирование объектов, настроения и ключевых смыслов',
      icon: BrainCircuit,
      color: 'text-purple-400',
    },
    {
      title: 'Создаём идеи и scroll-stopping хуки...',
      sub: 'Подбор угла подачи под выбранную маркетинговую цель',
      icon: Lightbulb,
      color: 'text-amber-400',
    },
    {
      title: 'Формируем пост и 3 уникальных варианта...',
      sub: 'Оптимизация ритма, призыва к действию и хештегов',
      icon: FileText,
      color: 'text-cyan-400',
    },
    {
      title: 'Готово!',
      sub: 'Контент готов к публикации',
      icon: CheckCircle2,
      color: 'text-emerald-400',
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1200);
    const timer2 = setTimeout(() => setStep(2), 2600);
    const timer3 = setTimeout(() => setStep(3), 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const CurrentIcon = STEPS[step].icon;

  return (
    <div className="w-full max-w-xl mx-auto py-12 px-6 text-center">
      <div className="glass-panel rounded-3xl p-8 border border-purple-500/30 shadow-[0_0_50px_rgba(124,58,237,0.2)] relative overflow-hidden">
        
        {/* Animated radar glow */}
        <div className="w-24 h-24 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center mx-auto mb-6 relative">
          <div className="absolute inset-0 rounded-full border border-purple-400/60 animate-ping opacity-30" />
          <CurrentIcon className={`w-10 h-10 ${STEPS[step].color} transition-all duration-300 transform scale-110`} />
        </div>

        {/* Step Title */}
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight transition-all duration-300">
          {STEPS[step].title}
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          {STEPS[step].sub}
        </p>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {STEPS.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx <= step
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-400'
                    : 'bg-zinc-800'
                }`}
              />
              <span className={`text-[10px] block transition-colors ${
                idx === step ? 'text-purple-300 font-semibold' : 'text-zinc-500'
              }`}>
                Шаг {idx + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Skeleton content preview */}
        <div className="space-y-2 bg-black/40 p-4 rounded-2xl border border-zinc-800/80 animate-pulse text-left">
          <div className="h-3 bg-zinc-800 rounded-md w-3/4" />
          <div className="h-3 bg-zinc-800/70 rounded-md w-full" />
          <div className="h-3 bg-zinc-800/70 rounded-md w-5/6" />
          <div className="h-3 bg-zinc-800/40 rounded-md w-1/2 pt-2" />
        </div>

      </div>
    </div>
  );
};
