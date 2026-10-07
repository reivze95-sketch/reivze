import React, { useState } from 'react';
import { 
  History, Search, Trash2, Copy, Check, ExternalLink, 
  Sparkles, Calendar, Tag, Filter, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GeneratedPost, SocialPlatform, GeneratorMode } from '../types';

interface HistoryViewProps {
  history: GeneratedPost[];
  onOpenPost: (post: GeneratedPost) => void;
  onDeletePost: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onOpenPost,
  onDeletePost,
  onClearAll,
}) => {
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [modeFilter, setModeFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredHistory = history.filter((p) => {
    const matchesSearch = 
      p.topic.toLowerCase().includes(search.toLowerCase()) ||
      p.mainPost.toLowerCase().includes(search.toLowerCase()) ||
      p.hook.toLowerCase().includes(search.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || p.platform === platformFilter;
    const matchesMode = modeFilter === 'all' || p.mode === modeFilter;
    return matchesSearch && matchesPlatform && matchesMode;
  });

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    confetti({ particleCount: 20, spread: 40 });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              История генераций ({history.length})
            </h2>
          </div>
          <p className="text-xs text-zinc-400">
            Все созданные посты автоматически сохраняются здесь. Открывайте, копируйте и используйте повторно.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 self-start sm:self-auto py-1.5 px-3 rounded-xl bg-rose-950/30 border border-rose-500/20"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Очистить историю</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по теме или тексту..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Platform Filter */}
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="w-full md:w-44 px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 focus:outline-none"
        >
          <option value="all">Все соцсети</option>
          <option value="instagram">Instagram</option>
          <option value="telegram">Telegram</option>
          <option value="tiktok">TikTok</option>
          <option value="linkedin">LinkedIn</option>
          <option value="x">X (Twitter)</option>
        </select>

        {/* Mode Filter */}
        <select
          value={modeFilter}
          onChange={(e) => setModeFilter(e.target.value)}
          className="w-full md:w-44 px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 focus:outline-none"
        >
          <option value="all">Все форматы</option>
          <option value="topic">По теме</option>
          <option value="image">По фото</option>
          <option value="video">По видео</option>
        </select>
      </div>

      {/* History Grid */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 text-center rounded-3xl glass-panel border border-zinc-800/80">
          <History className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-200 mb-1">
            {history.length === 0 ? 'В истории пока нет постов' : 'Ничего не найдено'}
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {history.length === 0
              ? 'Создайте свой первый пост с помощью темы, фото или видео — он появится здесь автоматически.'
              : 'Попробуйте изменить поисковый запрос или сбросить фильтры.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-5 rounded-2xl border border-zinc-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                {/* Card Top: Platform + Mode + Date */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {item.platform}
                    </span>
                    <span className="text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-800">
                      {item.mode === 'image' ? '📷 Фото' : item.mode === 'video' ? '🎥 Видео' : '✍️ Текст'}
                    </span>
                  </div>

                  <span className="text-[10px] text-zinc-500">
                    {new Date(item.createdAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>

                {/* Media thumbnail if exists */}
                {item.mediaPreview && (
                  <div className="mb-3 rounded-xl overflow-hidden h-28 border border-zinc-800 relative bg-black">
                    <img src={item.mediaPreview} alt="" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Topic / Title */}
                <h4 className="text-xs font-bold text-white mb-1.5 line-clamp-1 group-hover:text-purple-300 transition-colors">
                  {item.topic || 'Сгенерированный пост'}
                </h4>

                {/* Hook preview */}
                <p className="text-[11px] text-amber-300/90 font-medium mb-2 line-clamp-1 italic">
                  🎯 «{item.hook}»
                </p>

                {/* Main post text preview */}
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                  {item.mainPost}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(item.mainPost, item.id)}
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    title="Копировать текст"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => onDeletePost(item.id)}
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-rose-950/40 text-zinc-500 hover:text-rose-400 transition-colors"
                    title="Удалить из истории"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => onOpenPost(item)}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1 transition-all"
                >
                  <span>Открыть</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
