import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, LayoutTemplate, Tag } from 'lucide-react';
import { TEMPLATES } from '../data/templates';
import { TemplateItem } from '../types';

interface TemplatesViewProps {
  onSelectTemplate: (template: TemplateItem) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const CATEGORIES = [
    { id: 'all', label: 'Все категории' },
    { id: 'fitness', label: 'Фитнес' },
    { id: 'food', label: 'Еда & Рестораны' },
    { id: 'business', label: 'Бизнес' },
    { id: 'personal_brand', label: 'Личный бренд' },
    { id: 'technology', label: 'IT & Технологии' },
    { id: 'real_estate', label: 'Недвижимость' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'beauty', label: 'Бьюти' },
    { id: 'education', label: 'Образование' },
    { id: 'fashion', label: 'Мода' },
    { id: 'travel', label: 'Путешествия' },
    { id: 'marketing', label: 'Маркетинг' },
  ];

  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesQuery = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.topicPrompt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutTemplate className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Библиотека готовых шаблонов постов
            </h2>
          </div>
          <p className="text-xs text-zinc-400">
            Выберите проверенный сценарий для вашей ниши — AI адаптирует его под ваш бренд
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по нишам и темам..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all font-medium ${
              selectedCategory === cat.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-5 rounded-2xl border border-zinc-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {item.categoryLabel}
                </span>
                <span className="text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-800">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors mb-1.5">
                {item.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                {item.description}
              </p>

              <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-800 text-[11px] text-zinc-300 leading-snug line-clamp-3 italic mb-4">
                «{item.topicPrompt}»
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-zinc-500 capitalize">
                {item.recommendedPlatform} · {item.recommendedGoal}
              </span>

              <button
                onClick={() => onSelectTemplate(item)}
                className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white font-semibold flex items-center gap-1.5 transition-all text-xs cursor-pointer active:scale-95"
              >
                <span>Использовать</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
