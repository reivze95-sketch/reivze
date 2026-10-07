import React, { useState } from 'react';
import { 
  Copy, Check, RefreshCw, Edit3, Download, Share2, Bookmark, 
  Sparkles, Flame, Target, MessageSquare, Hash, Eye, ArrowRight,
  Layers, CheckCheck, Save, FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GeneratedPost, PostVariant } from '../types';

interface ResultCardProps {
  post: GeneratedPost;
  onRegenerate: () => void;
  onSaveToHistory: (post: GeneratedPost) => void;
  onOpenAIRewrite: (text: string) => void;
  onOpenRepurpose: (text: string) => void;
  isSaved?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  post,
  onRegenerate,
  onSaveToHistory,
  onOpenAIRewrite,
  onOpenRepurpose,
  isSaved = false,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.mainPost);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [localSaved, setLocalSaved] = useState(isSaved);

  const variants: PostVariant[] = post.alternativeVersions && post.alternativeVersions.length > 0
    ? post.alternativeVersions
    : [
        {
          id: 'v1',
          title: 'Вариант 1',
          badge: 'Основной',
          mainPost: post.mainPost,
          shortCaption: post.shortCaption,
          hook: post.hook,
          cta: post.cta,
          hashtags: post.hashtags,
        }
      ];

  const currentVariant = variants[selectedVariantIndex] || variants[0];
  const activePostText = isEditing ? editedText : currentVariant.mainPost;

  const handleCopy = async (text: string, sectionKey: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionKey);
      if (sectionKey === 'all') {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      }
      setTimeout(() => setCopiedSection(null), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyAll = () => {
    const fullContent = `✨ СГЕНЕРИРОВАННЫЙ ПОСТ:\n\n${activePostText}\n\n🎯 HOOK:\n${currentVariant.hook}\n\n📣 CTA:\n${currentVariant.cta}\n\n#️⃣ ХЕШТЕГИ:\n${currentVariant.hashtags.join(' ')}`;
    handleCopy(fullContent, 'all');
  };

  const handleDownload = () => {
    const fullContent = `ContentAI Studio Post Export\nPlatform: ${post.platform}\nGoal: ${post.goal}\nDate: ${post.createdAt}\n\n${activePostText}\n\nShort Caption: ${currentVariant.shortCaption}\nHook: ${currentVariant.hook}\nCTA: ${currentVariant.cta}\nHashtags: ${currentVariant.hashtags.join(' ')}`;
    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contentai-post-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    onSaveToHistory({
      ...post,
      mainPost: activePostText,
    });
    setLocalSaved(true);
    confetti({ particleCount: 30, spread: 60 });
  };

  // Word count & Read time
  const wordCount = activePostText.trim().split(/\s+/).length;
  const readTimeSeconds = Math.max(1, Math.round(wordCount / 3.5));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 animate-fade-in">
      
      {/* Visual Context breakdown if uploaded media was analyzed */}
      {post.mediaAnalysis && (
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-purple-500/20 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Визуальный анализ медиафайла AI
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-black/40 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">Объекты</span>
              <span className="text-zinc-200 font-medium truncate block">
                {post.mediaAnalysis.objects?.join(', ') || 'Распознано'}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">Настроение / Вайб</span>
              <span className="text-zinc-200 font-medium truncate block">
                {post.mediaAnalysis.mood || 'Энергичное'}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">Действие</span>
              <span className="text-zinc-200 font-medium truncate block">
                {post.mediaAnalysis.action || 'Происходящее в кадре'}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">Цвета</span>
              <span className="text-zinc-200 font-medium truncate block">
                {post.mediaAnalysis.colors?.join(', ') || 'Естественная гамма'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main SaaS Result Card */}
      <div className="glass-panel rounded-3xl p-5 sm:p-8 border border-zinc-800 shadow-2xl relative">
        
        {/* Top Header Bar: Platform + Variant Switcher + Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          
          {/* Left: Platform & Variant tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
              {post.platform}
            </div>

            <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
              {variants.map((v, idx) => (
                <button
                  key={v.id || idx}
                  onClick={() => {
                    setSelectedVariantIndex(idx);
                    setEditedText(v.mainPost);
                    setIsEditing(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedVariantIndex === idx
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>{v.title}</span>
                  {v.badge && (
                    <span className="hidden sm:inline-block text-[10px] ml-1.5 opacity-80 font-normal">
                      · {v.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Quick action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
                isEditing
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300'
              }`}
              title="Редактировать текст вручную"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEditing ? 'Сохранить правку' : 'Изменить'}</span>
            </button>

            <button
              onClick={handleSave}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
                localSaved
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300'
              }`}
              title="Сохранить в историю"
            >
              {localSaved ? <CheckCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{localSaved ? 'Сохранено' : 'В историю'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs flex items-center gap-1.5 transition-colors"
              title="Скачать текст (.txt)"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Скачать</span>
            </button>

            <button
              onClick={onRegenerate}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs flex items-center gap-1.5 transition-colors"
              title="Сгенерировать заново с другими формулировками"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Регенерировать</span>
            </button>

            <button
              onClick={handleCopyAll}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              {copiedSection === 'all' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Скопировано всё!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-white" />
                  <span>Копировать всё</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* SECTION 1: Main Post Content */}
        <div className="py-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                ✨ Текст готового поста:
              </h3>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span>{wordCount} слов · ~{readTimeSeconds} сек чтения</span>
              <button
                onClick={() => handleCopy(activePostText, 'main')}
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium"
              >
                {copiedSection === 'main' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'main' ? 'Скопировано' : 'Копировать'}</span>
              </button>
            </div>
          </div>

          {isEditing ? (
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={10}
              className="w-full p-4 rounded-2xl bg-zinc-950 border border-purple-500/50 text-sm text-zinc-100 focus:outline-none leading-relaxed resize-y font-normal"
            />
          ) : (
            <div className="p-5 rounded-2xl bg-black/40 border border-zinc-800/80 text-sm sm:text-base text-zinc-100 font-normal leading-relaxed whitespace-pre-line space-y-3">
              {activePostText}
            </div>
          )}
        </div>

        {/* SECTION 2: Hook & Short Caption Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-t border-zinc-800/80">
          
          {/* Hook */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-rose-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>🎯 Hook (Крючок внимания)</span>
              </span>
              <button
                onClick={() => handleCopy(currentVariant.hook, 'hook')}
                className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
              >
                {copiedSection === 'hook' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <p className="text-xs text-zinc-200 font-medium leading-snug">
              {currentVariant.hook}
            </p>
          </div>

          {/* Short Caption */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>💬 Короткий Caption (Reels/TikTok)</span>
              </span>
              <button
                onClick={() => handleCopy(currentVariant.shortCaption, 'caption')}
                className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
              >
                {copiedSection === 'caption' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <p className="text-xs text-zinc-200 leading-snug">
              {currentVariant.shortCaption}
            </p>
          </div>

        </div>

        {/* SECTION 3: CTA & Hashtags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-t border-zinc-800/80">
          
          {/* CTA */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-amber-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>📣 CTA (Призыв к действию)</span>
              </span>
              <button
                onClick={() => handleCopy(currentVariant.cta, 'cta')}
                className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
              >
                {copiedSection === 'cta' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <p className="text-xs text-zinc-200 font-medium leading-snug">
              {currentVariant.cta}
            </p>
          </div>

          {/* Hashtags */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" />
                <span>#️⃣ Хештеги ({currentVariant.hashtags?.length || 0})</span>
              </span>
              <button
                onClick={() => handleCopy(currentVariant.hashtags.join(' '), 'tags')}
                className="text-[11px] text-purple-300 hover:text-purple-200 flex items-center gap-1"
              >
                {copiedSection === 'tags' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Копировать все</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto pr-1">
              {currentVariant.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  onClick={() => handleCopy(tag, `tag_${idx}`)}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 cursor-pointer transition-colors"
                  title="Нажмите, чтобы скопировать этот хештег"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM QUICK ACTIONS: AI Rewrite & Content Repurposing */}
        <div className="pt-5 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-950/40 p-4 rounded-2xl mt-2">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Хотите изменить стиль или превратить пост в другие форматы?</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenAIRewrite(activePostText)}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
            >
              Улучшить текст (AI Rewrite)
            </button>

            <button
              onClick={() => onOpenRepurpose(activePostText)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 text-xs font-medium transition-colors"
            >
              Адаптировать под все соцсети ➔
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
