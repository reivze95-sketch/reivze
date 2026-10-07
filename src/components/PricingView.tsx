import React, { useState } from 'react';
import { Check, Sparkles, Zap, ShieldCheck, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PricingViewProps {
  onUpgradePlan?: (planName: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onUpgradePlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelect = (name: string) => {
    setSelectedPlan(name);
    confetti({ particleCount: 40, spread: 60 });
    if (onUpgradePlan) onUpgradePlan(name);
  };

  const PLANS = [
    {
      name: 'Free',
      badge: 'Для старта',
      priceMonthly: '$0',
      priceAnnual: '$0',
      period: 'навсегда',
      description: 'Базовые функции для тестирования возможностей AI генератора.',
      features: [
        '10 текстовых генераций в день',
        'Instagram, Telegram, X',
        'Базовые цели (Вовлечение, Продажи)',
        '3 варианта к каждому посту',
        'Копирование и скачивание в .txt',
      ],
      disabledFeatures: [
        'Мультимодальный анализ фото',
        'Анализ видео и создание Reels',
        'Кастомный Brand Voice',
        'Безлимитная история генераций',
      ],
      buttonText: 'Текущий план',
      buttonVariant: 'secondary',
    },
    {
      name: 'Pro',
      badge: 'Самый популярный',
      isPopular: true,
      priceMonthly: '$29',
      priceAnnual: '$22',
      period: 'в месяц',
      description: 'Для SMM-специалистов, блогеров, экспертов и предпринимателей.',
      features: [
        'Безлимитные генерации постов',
        'Анализ изображений с распознаванием контекста',
        'Анализ видео с генерацией Reels-сценариев',
        'Память Brand Voice и стоп-слов',
        'Все 7 социальных сетей',
        'Все 10 маркетинговых целей',
        'Инструменты: Repurposing, AI Rewrite, Hooks, CTA',
        'Неограниченная история в облаке',
      ],
      disabledFeatures: [],
      buttonText: 'Выбрать Pro',
      buttonVariant: 'primary',
    },
    {
      name: 'Business',
      badge: 'Для агентств & команд',
      priceMonthly: '$79',
      priceAnnual: '$59',
      period: 'в месяц',
      description: 'Для маркетинговых агентств и команд с совместным доступом.',
      features: [
        'Всё, что входит в Pro',
        'До 5 пользователей в одном аккаунте',
        'Несколько профилей брендов (до 10)',
        'Приоритетный доступ к Gemini 3.8 Flash',
        'Экспорт контент-планов в CSV / Excel',
        'Персональный менеджер в Telegram',
        'API доступ для автоматизации',
      ],
      disabledFeatures: [],
      buttonText: 'Подключить Business',
      buttonVariant: 'outline',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-purple-400 block mb-2">
          Прозрачные тарифы
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Инвестируйте в качество вашего контента
        </h2>
        <p className="text-sm text-zinc-400">
          Создавайте вирусные посты быстрее в 10 раз. Переключайтесь между тарифами в любое время.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className={`text-xs font-semibold ${!isAnnual ? 'text-white' : 'text-zinc-500'}`}>
            Оплата помесячно
          </span>

          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-zinc-800 p-0.5 relative transition-colors focus:outline-none"
          >
            <div
              className={`w-5 h-5 rounded-full bg-purple-500 transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>

          <span className={`text-xs font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-zinc-500'}`}>
            <span>Оплата за год</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
              Скидка 25%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
              plan.isPopular
                ? 'glass-panel border-2 border-purple-500/60 shadow-[0_0_40px_rgba(124,58,237,0.2)] md:-translate-y-2'
                : 'glass-panel border border-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold tracking-wider uppercase shadow-md">
                {plan.badge}
              </div>
            )}

            <div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                </span>
                <span className="text-xs text-zinc-500">/ {plan.period}</span>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 mb-8 text-xs">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block mb-2">
                  В тариф включено:
                </span>
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-zinc-200">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}

                {plan.disabledFeatures.map((df, i) => (
                  <div key={i} className="flex items-start gap-2 text-zinc-600 line-through">
                    <span className="w-4 h-4 shrink-0 text-center text-zinc-700">✕</span>
                    <span>{df}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => handleSelect(plan.name)}
              className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                plan.buttonVariant === 'primary'
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:opacity-95 text-white shadow-lg active:scale-98'
                  : plan.buttonVariant === 'outline'
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-purple-300 border border-purple-500/40'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {selectedPlan === plan.name ? '✓ Выбрано' : plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Teaser */}
      <div className="p-6 rounded-3xl glass-panel border border-zinc-800 text-center max-w-2xl mx-auto">
        <HelpCircle className="w-6 h-6 text-purple-400 mx-auto mb-2" />
        <h4 className="text-sm font-bold text-white mb-1">Нужен индивидуальный корпоративный тариф?</h4>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Мы предлагаем выделенные серверы, SLA 99.9% и интеграцию с CRM для крупных брендов.
        </p>
      </div>

    </div>
  );
};
