import React, { useState } from 'react';
import { Settings, Sparkles, Save, Check, ShieldAlert, Target, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BrandSettings } from '../types';

interface BrandSettingsViewProps {
  settings: BrandSettings;
  onSave: (updated: BrandSettings) => void;
}

export const BrandSettingsView: React.FC<BrandSettingsViewProps> = ({
  settings,
  onSave,
}) => {
  const [formData, setFormData] = useState<BrandSettings>(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    confetti({ particleCount: 30, spread: 60 });
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-zinc-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <Settings className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Настройки Brand Voice и профиля компании
            </h2>
            <p className="text-xs text-zinc-400">
              AI запомнит эти правила и будет автоматически учитывать их при каждой генерации контента
            </p>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6">
        
        {/* Brand Voice Rule */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-indigo-950/40 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Правило Brand Voice (Тональность и характер бренда):</span>
            </label>
            <span className="text-[10px] text-zinc-400 font-mono">Глобальная инструкция</span>
          </div>

          <textarea
            value={formData.brandVoice}
            onChange={(e) => setFormData({ ...formData, brandVoice: e.target.value })}
            placeholder="Например: 'Мы пишем уверенно, просто и дружелюбно. Избегаем бюрократических терминов, общаемся на равных, делаем фокус на реальной пользе для клиентов'..."
            rows={3}
            className="w-full p-3.5 rounded-xl bg-black/60 border border-zinc-700/80 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 leading-relaxed resize-none"
          />
          <p className="text-[11px] text-zinc-400 mt-2">
            💡 AI будет строго придерживаться этого стиля для всех постов.
          </p>
        </div>

        {/* 2-column details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Название бренда / Проекта:
            </label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              placeholder="Например: 'FitPro Studio', 'EcoVibe', 'DevMaster'..."
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Сайт / Ссылка на соцсети:
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://mybrand.com"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Description & Audience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Краткое описание деятельности:
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Чем занимается компания, какие задачи решает..."
              rows={2}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Целевая аудитория (Портрет клиента):
            </label>
            <textarea
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              placeholder="Кто покупатели: возраст, боли, потребности, уровень дохода..."
              rows={2}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>
        </div>

        {/* Products & Advantages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Основные продукты или услуги:
            </label>
            <input
              type="text"
              value={formData.keyProducts}
              onChange={(e) => setFormData({ ...formData, keyProducts: e.target.value })}
              placeholder="Абонементы, авторский курс, онлайн-консультации..."
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Главные преимущества (УТП):
            </label>
            <input
              type="text"
              value={formData.advantages}
              onChange={(e) => setFormData({ ...formData, advantages: e.target.value })}
              placeholder="Гарантия результата, поддержка 24/7, 10 лет опыта..."
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Banned Words & Preferred CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-rose-300 flex items-center gap-1 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Запрещённые слова (Стоп-слова):</span>
            </label>
            <input
              type="text"
              value={formData.bannedWords}
              onChange={(e) => setFormData({ ...formData, bannedWords: e.target.value })}
              placeholder="дешево, уникальный, лучший, кликбейтные фразы..."
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Предпочитаемый CTA (Призыв к действию):
            </label>
            <input
              type="text"
              value={formData.preferredCTA}
              onChange={(e) => setFormData({ ...formData, preferredCTA: e.target.value })}
              placeholder="Напишите в Direct 'КОНСУЛЬТАЦИЯ' или перейдите по ссылке..."
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Настройки сохранены!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Сохранить профиль бренда</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
