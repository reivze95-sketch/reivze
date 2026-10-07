import React, { useState } from 'react';
import { 
  X, Sparkles, RefreshCw, Copy, Check, ArrowRight, Wand2, 
  Scissors, Maximize2, Heart, Briefcase, Flame, CheckCircle2, Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SocialPlatform } from '../types';

interface AIRewriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText?: string;
  onApplyRewrittenText?: (text: string) => void;
}

export const AIRewriteModal: React.FC<AIRewriteModalProps> = ({
  isOpen,
  onClose,
  initialText = '',
  onApplyRewrittenText,
}) => {
  const [inputText, setInputText] = useState(initialText);
  const [action, setAction] = useState<string>('sales');
  const [targetPlatform, setTargetPlatform] = useState<SocialPlatform>('telegram');
  const [customInstructions, setCustomInstructions] = useState('');
  const [rewrittenText, setRewrittenText] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const ACTIONS = [
    { id: 'sales', label: '💰 Сделать продающим', desc: 'Усиливает оффер, выгоды и призыв к покупке', icon: Wand2 },
    { id: 'shorter', label: '✂️ Сделать короче', desc: 'Убирает воду, оставляет чистую суть', icon: Scissors },
    { id: 'longer', label: '📜 Сделать длиннее', desc: 'Раскрывает детали, примеры и сторителлинг', icon: Maximize2 },
    { id: 'emotional', label: '💖 Сделать эмоциональнее', desc: 'Добавляет эмпатию, искренность и теплоту', icon: Heart },
    { id: 'professional', label: '💼 Профессиональнее', desc: 'Деловой тон, факты, статус эксперта', icon: Briefcase },
    { id: 'viral', label: '🔥 Сделать вируснее', desc: 'Дерзкий хук, короткий ритм, провокация', icon: Flame },
    { id: 'clean', label: '🧹 Убрать лишнее', desc: 'Исправляет грамматику и стилистику', icon: CheckCircle2 },
    { id: 'adapt_platform', label: '🔄 Адаптировать под соцсеть', desc: 'Форматирует под правила другой платформы', icon: Globe },
  ];

  const handleRewrite = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setRewrittenText(null);
    setExplanation(null);

    try {
      const res = await fetch('/api/rewrite-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalText: inputText,
          action,
          targetPlatform,
          instructions: customInstructions,
        }),
      });

      const resData = await res.json();
      if (resData.success && resData.data) {
        setRewrittenText(resData.data.rewrittenText);
        setExplanation(resData.data.explanation);
        confetti({ particleCount: 30, spread: 60 });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!rewrittenText) return;
    await navigator.clipboard.writeText(rewrittenText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleApply = () => {
    if (rewrittenText && onApplyRewrittenText) {
      onApplyRewrittenText(rewrittenText);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              AI Rewrite: Улучшение и адаптация текста
            </h2>
            <p className="text-xs text-zinc-400">
              Вставьте любой пост и трансформируйте его в 1 клик с помощью Gemini AI
            </p>
          </div>
        </div>

        {/* Action Grid */}
        <div className="mb-4">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
            Выберите действие:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ACTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setAction(item.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    action === item.id
                      ? 'bg-purple-600/20 border-purple-500 text-purple-200 shadow-sm'
                      : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 mb-1 text-purple-400" />
                  <span className="text-xs font-bold block truncate">{item.label}</span>
                  <span className="text-[10px] text-zinc-500 block leading-tight truncate">{item.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Platform target selector if adapt action is chosen */}
        {action === 'adapt_platform' && (
          <div className="mb-4 p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-center gap-3">
            <span className="text-xs text-zinc-300 whitespace-nowrap">Адаптировать под:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {['telegram', 'linkedin', 'x', 'instagram', 'tiktok'].map((p) => (
                <button
                  key={p}
                  onClick={() => setTargetPlatform(p as SocialPlatform)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    targetPlatform === p
                      ? 'bg-purple-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {p.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Textarea */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Исходный текст поста:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Вставьте сюда готовый пост или черновик..."
              rows={4}
              className="w-full p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500 resize-none font-normal"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">
              Дополнительные пожелания к переписке (опционально):
            </label>
            <input
              type="text"
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              placeholder="Например: 'Упомянуть дедлайн до конца пятницы', 'Сделать призыв написать в ЛС'..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={handleRewrite}
            disabled={isLoading || !inputText.trim()}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI улучшает текст...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Применить улучшение</span>
              </>
            )}
          </button>

          {/* Rewritten Result Preview */}
          {rewrittenText && (
            <div className="mt-4 p-5 rounded-2xl bg-zinc-900 border border-purple-500/40 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Улучшенная версия:</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1 text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1 transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Скопировано' : 'Копировать'}</span>
                  </button>

                  {onApplyRewrittenText && (
                    <button
                      onClick={handleApply}
                      className="px-3 py-1 text-xs rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Применить в карточку</span>
                    </button>
                  )}
                </div>
              </div>

              {explanation && (
                <p className="text-[11px] text-zinc-400 italic bg-black/40 p-2.5 rounded-xl border border-zinc-800">
                  💡 {explanation}
                </p>
              )}

              <div className="p-4 rounded-xl bg-black/50 border border-zinc-800 text-xs sm:text-sm text-zinc-100 whitespace-pre-line leading-relaxed">
                {rewrittenText}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
