import React, { useState } from 'react';
import { 
  Flame, Target, Sparkles, Copy, Check, RefreshCw, 
  HelpCircle, AlertTriangle, BookOpen, ThumbsUp, Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HookItem } from '../types';

interface HookAndCTAGeneratorProps {
  onInsertIntoPost?: (text: string) => void;
}

export const HookAndCTAGenerator: React.FC<HookAndCTAGeneratorProps> = ({
  onInsertIntoPost,
}) => {
  const [topic, setTopic] = useState('продажи и маркетинг');
  const [activeTab, setActiveTab] = useState<'hooks' | 'cta' | 'headlines'>('hooks');
  const [isLoading, setIsLoading] = useState(false);
  const [hooks, setHooks] = useState<HookItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [ctaCategory, setCtaCategory] = useState<'all' | 'buy' | 'dm' | 'comment' | 'save'>('all');

  const STATIC_CTAS = [
    { cat: 'buy', label: 'Купить / Оформить', text: 'Переходите по ссылке в описании профиля и забирайте спецпредложение до конца недели!' },
    { cat: 'buy', label: 'Купить / Оформить', text: 'Осталось всего 7 мест по промокоду START. Ссылка для регистрации в шапке профиля ⬆️' },
    { cat: 'dm', label: 'Написать в Direct', text: 'Напишите слово «ХОЧУ» в Директ, и я пришлю вам подробную программу и спецтариф.' },
    { cat: 'dm', label: 'Написать в Direct', text: 'Пишите в ЛС «РАЗБОР», чтобы получить персональную диагностику вашего проекта.' },
    { cat: 'comment', label: 'Оставить комментарий', text: 'А что вы думаете по этому поводу? Делитесь своим опытом в комментариях 👇' },
    { cat: 'comment', label: 'Оставить комментарий', text: 'Напишите цифру от 1 до 5: какой пункт отозвался сильнее всего?' },
    { cat: 'save', label: 'Сохранить пост', text: 'Обязательно сохраните этот пост в закладки, чтобы не потерять готовую инструкцию!' },
    { cat: 'save', label: 'Поделиться', text: 'Отправьте этот пост другу или коллеге, которому сейчас актуальна эта тема 🚀' },
  ];

  const handleGenerateHooks = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, language: 'ru' }),
      });
      const resData = await res.json();
      if (resData.success && resData.data) {
        setHooks(resData.data);
        confetti({ particleCount: 30, spread: 50 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Header card */}
      <div className="glass-panel p-6 rounded-3xl border border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>Генератор вирусных Hooks & Призывов к действию (CTA)</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Хуки, которые останавливают скролл, и CTA, которые удваивают конверсию
            </p>
          </div>

          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('hooks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'hooks' ? 'bg-amber-500/20 text-amber-300' : 'text-zinc-400 hover:text-white'
              }`}
            >
              🔥 16 Hooks
            </button>
            <button
              onClick={() => setActiveTab('cta')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'cta' ? 'bg-amber-500/20 text-amber-300' : 'text-zinc-400 hover:text-white'
              }`}
            >
              📣 CTA База
            </button>
          </div>
        </div>

        {/* Topic Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Введите тему (например: фитнес, инвестиции, ресторан, онлайн-курс)..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={handleGenerateHooks}
            disabled={isLoading || !topic.trim()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 text-zinc-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" /> : <Sparkles className="w-4 h-4 text-zinc-950" />}
            <span>Сгенерировать</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Hooks Output */}
      {activeTab === 'hooks' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span>Категории: Любопытство, Шок, Вопрос, Боль, Провокация, Обучение</span>
            <span>Нажмите на строку, чтобы скопировать</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(hooks.length > 0 ? hooks : [
              { id: '1', category: 'curiosity', categoryLabel: 'Любопытство', text: `Никто не говорит об этом вслух, но вот почему ${topic} меняет правила игры...` },
              { id: '2', category: 'shock', categoryLabel: 'Шок', text: `90% людей теряют время, когда начинают заниматься темой «${topic}».` },
              { id: '3', category: 'question', categoryLabel: 'Вопрос', text: `Что если вы можете утроить результаты в «${topic}» уже в этом месяце?` },
              { id: '4', category: 'story', categoryLabel: 'История', text: `В тот день я чуть не бросил всё, пока не понял одну простую вещь...` },
              { id: '5', category: 'problem', categoryLabel: 'Боль', text: `Устали сливать ресурсы и не видеть отдачи? Разбираем решение.` },
              { id: '6', category: 'result', categoryLabel: 'Результат', text: `Как выйти на новый уровень за 14 дней без перегруза.` },
              { id: '7', category: 'controversial', categoryLabel: 'Провокация', text: `Забудьте всё, чему вас учили про «${topic}». Это больше не работает.` },
              { id: '8', category: 'educational', categoryLabel: 'Обучение', text: `3 проверенных принципа, которые спасут вас от типичных ошибок.` },
            ]).map((h) => (
              <div
                key={h.id}
                onClick={() => handleCopy(h.text, h.id)}
                className="p-3.5 rounded-2xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold mb-1 uppercase tracking-wider">
                  <span>{h.categoryLabel || h.category}</span>
                  <span className="text-zinc-500 group-hover:text-zinc-300">
                    {copiedId === h.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-100 font-medium leading-snug">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CTA Library */}
      {activeTab === 'cta' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-zinc-500">Фильтр:</span>
            {[
              { id: 'all', label: 'Все' },
              { id: 'buy', label: 'Купить' },
              { id: 'dm', label: 'Direct' },
              { id: 'comment', label: 'Комментарии' },
              { id: 'save', label: 'Сохранения' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setCtaCategory(f.id as any)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  ctaCategory === f.id ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-zinc-400 hover:text-white bg-zinc-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {STATIC_CTAS
              .filter((c) => ctaCategory === 'all' || c.cat === ctaCategory)
              .map((cta, i) => (
                <div
                  key={i}
                  onClick={() => handleCopy(cta.text, `cta_${i}`)}
                  className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 cursor-pointer transition-colors flex items-start justify-between gap-3 group"
                >
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
                      {cta.label}
                    </span>
                    <p className="text-xs text-zinc-200 leading-snug">
                      {cta.text}
                    </p>
                  </div>
                  <span className="text-zinc-500 group-hover:text-zinc-300 shrink-0 mt-1">
                    {copiedId === `cta_${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

    </div>
  );
};
