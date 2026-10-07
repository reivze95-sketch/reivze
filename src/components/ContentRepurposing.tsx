import React, { useState } from 'react';
import { 
  Sparkles, Copy, Check, RefreshCw, Send, Video, 
  Linkedin, MessageCircle, Youtube, Hash, Flame, Lightbulb, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RepurposeResult } from '../types';

interface ContentRepurposingProps {
  initialContent?: string;
  onBackToGenerator?: () => void;
}

export const ContentRepurposing: React.FC<ContentRepurposingProps> = ({
  initialContent = '',
  onBackToGenerator,
}) => {
  const [sourceText, setSourceText] = useState(initialContent);
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RepurposeResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleRepurpose = async () => {
    if (!sourceText.trim() && !topic.trim()) return;
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/repurpose-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: sourceText,
          topic: topic,
          language: 'ru',
        }),
      });

      const resData = await res.json();
      if (resData.success && resData.data) {
        setResult(resData.data);
        confetti({ particleCount: 50, spread: 70 });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-zinc-800 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                AI Content Repurposing (Кросс-платформенная дистрибуция)
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              Превратите одну идею или пост сразу в 6 форматов для соцсетей, 5 хуков и 10 заголовков
            </p>
          </div>

          {onBackToGenerator && (
            <button
              onClick={onBackToGenerator}
              className="text-xs text-zinc-400 hover:text-white underline self-start sm:self-auto"
            >
              Вернуться в генератор
            </button>
          )}
        </div>

        {/* Input area */}
        <div className="mt-5 space-y-3">
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Вставьте исходный текст, тему видео или черновик статьи сюда..."
            rows={4}
            className="w-full p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 resize-none font-normal"
          />

          <button
            onClick={handleRepurpose}
            disabled={isLoading || (!sourceText.trim() && !topic.trim())}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Генерируем кросс-платформенный контент-пак...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Создать контент для всех площадок</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Display */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Social Platforms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Instagram */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-purple-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <span>📸 Instagram Caption</span>
                  </span>
                  <button
                    onClick={() => handleCopy(result.instagram, 'ig')}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    {copiedKey === 'ig' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto pr-1">
                  {result.instagram}
                </p>
              </div>
            </div>

            {/* Telegram */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram Post</span>
                  </span>
                  <button
                    onClick={() => handleCopy(result.telegram, 'tg')}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    {copiedKey === 'tg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto pr-1">
                  {result.telegram}
                </p>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn Article / Post</span>
                  </span>
                  <button
                    onClick={() => handleCopy(result.linkedin, 'in')}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    {copiedKey === 'in' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto pr-1">
                  {result.linkedin}
                </p>
              </div>
            </div>

            {/* TikTok / Reels */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-rose-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    <span>TikTok / Reels Caption</span>
                  </span>
                  <button
                    onClick={() => handleCopy(result.tiktok, 'tt')}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    {copiedKey === 'tt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto pr-1">
                  {result.tiktok}
                </p>
              </div>
            </div>

            {/* X / Twitter */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                    <span>🧵 X (Twitter) Post / Thread</span>
                  </span>
                  <button
                    onClick={() => handleCopy(result.x, 'x')}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    {copiedKey === 'x' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto pr-1">
                  {result.x}
                </p>
              </div>
            </div>

            {/* YouTube Description */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-red-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                    <Youtube className="w-3.5 h-3.5" />
                    <span>YouTube Description</span>
                  </span>
                  <button
                    onClick={() => handleCopy(result.youtube, 'yt')}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    {copiedKey === 'yt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto pr-1">
                  {result.youtube}
                </p>
              </div>
            </div>

          </div>

          {/* Hooks & Headlines Collection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 5 Hooks */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-amber-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>5 Вирусных Хуков</span>
                </span>
                <button
                  onClick={() => handleCopy(result.hooks.join('\n'), 'all_hooks')}
                  className="text-xs text-amber-400 hover:text-amber-300"
                >
                  {copiedKey === 'all_hooks' ? 'Скопировано' : 'Копировать все'}
                </button>
              </div>
              <ul className="space-y-2">
                {result.hooks.map((h, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleCopy(h, `h_${idx}`)}
                    className="p-2.5 rounded-xl bg-black/40 border border-zinc-800 text-xs text-zinc-200 hover:border-amber-500/40 cursor-pointer transition-colors flex items-center justify-between gap-2"
                  >
                    <span>{h}</span>
                    <span className="text-[10px] text-zinc-500 shrink-0">
                      {copiedKey === `h_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 10 Headlines */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-indigo-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-indigo-400" />
                  <span>10 Идей Заголовков</span>
                </span>
                <button
                  onClick={() => handleCopy(result.headlines.join('\n'), 'all_hd')}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  {copiedKey === 'all_hd' ? 'Скопировано' : 'Копировать все'}
                </button>
              </div>
              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {result.headlines.map((hl, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCopy(hl, `hl_${idx}`)}
                    className="p-2 rounded-xl bg-black/40 border border-zinc-800 text-xs text-zinc-200 hover:border-indigo-500/40 cursor-pointer transition-colors flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{idx + 1}. {hl}</span>
                    <span className="text-[10px] text-zinc-500 shrink-0">
                      {copiedKey === `hl_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
