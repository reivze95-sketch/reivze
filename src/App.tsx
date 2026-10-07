import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  GeneratedPost, GeneratorMode, BrandSettings, TemplateItem, 
  SocialPlatform, PostGoal, PostStyle, PostLength 
} from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DashboardView } from './components/DashboardView';
import { MainGenerator } from './components/MainGenerator';
import { LoadingState } from './components/LoadingState';
import { ResultCard } from './components/ResultCard';
import { AIRewriteModal } from './components/AIRewriteModal';
import { ContentRepurposing } from './components/ContentRepurposing';
import { HookAndCTAGenerator } from './components/HookAndCTAGenerator';
import { TemplatesView } from './components/TemplatesView';
import { HistoryView } from './components/HistoryView';
import { PricingView } from './components/PricingView';
import { BrandSettingsView } from './components/BrandSettingsView';

const DEFAULT_BRAND_SETTINGS: BrandSettings = {
  brandName: 'ContentAI Studio',
  brandVoice: 'Мы пишем уверенно, просто и дружелюбно. Избегаем канцеляризмов и шаблонных фраз. Фокусируемся на реальной пользе.',
  description: 'AI-платформа для создания вирусного контента в социальных сетях.',
  website: 'https://contentai.studio',
  targetAudience: 'Предприниматели, маркетологи, SMM-специалисты и авторы блогов 22-45 лет',
  keyProducts: 'Генератор постов, анализ изображений, анализ видео, адаптация под соцсети',
  advantages: 'Экономит до 15 часов в неделю, мультимодальный AI, готовые посты за 5 секунд',
  bannedWords: 'уникальный, дешево, лучший в мире, шок сенсация',
  preferredCTA: 'Переходите по ссылке в описании профиля или пишите в Direct!',
};

const SEED_HISTORY: GeneratedPost[] = [
  {
    id: 'seed-1',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    mode: 'topic',
    topic: 'Открытие премиального фитнес-клуба с бассейном и спа-зоной',
    platform: 'instagram',
    goal: 'sales',
    style: 'premium',
    length: 'medium',
    language: 'ru',
    hook: 'Сильное тело начинается не с понедельника, а с правильного окружения.',
    shortCaption: 'Открытие нового флагманского фитнес-клуба. Спецусловия для первых 50 резидентов ⬇️',
    mainPost: `Сильное тело начинается не с понедельника, а с правильного пространства и поддержки.\n\nМы открыли двери нового флагманского фитнес-клуба, где продумана каждая деталь:\n✔ 25-метровый панорамный бассейн с морской водой\n✔ Зона функционального тренинга и силовые тренажеры последнего поколения\n✔ Расслабляющий банный комплекс и спа-процедуры после тренировок\n✔ Авторские программы от топ-тренеров\n\nПервые 50 клубных карт доступны со скидкой 30% и персональным планом тренировок в подарок.`,
    cta: 'Напишите слово «КАРТА» в комментариях или Direct, чтобы забронировать условия до конца недели!',
    hashtags: ['#фитнесклуб', '#тренировки', '#здоровье', '#премиумфитнес', '#мотивация', '#спортзал'],
    alternativeVersions: [
      {
        id: 'v1',
        title: 'Вариант 1',
        badge: 'Основной',
        hook: 'Сильное тело начинается не с понедельника, а с правильного окружения.',
        shortCaption: 'Открытие нового флагманского фитнес-клуба. Спецусловия для первых 50 резидентов ⬇️',
        mainPost: `Сильное тело начинается не с понедельника, а с правильного пространства и поддержки.\n\nМы открыли двери нового флагманского фитнес-клуба, где продумана каждая деталь:\n✔ 25-метровый панорамный бассейн с морской водой\n✔ Зона функционального тренинга и силовые тренажеры последнего поколения\n✔ Расслабляющий банный комплекс и спа-процедуры после тренировок\n✔ Авторские программы от топ-тренеров\n\nПервые 50 клубных карт доступны со скидкой 30% и персональным планом тренировок в подарок.`,
        cta: 'Напишите слово «КАРТА» в комментариях или Direct, чтобы забронировать условия до конца недели!',
        hashtags: ['#фитнесклуб', '#тренировки', '#здоровье', '#премиумфитнес', '#мотивация'],
      }
    ]
  },
  {
    id: 'seed-2',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    mode: 'image',
    topic: 'Премиальное мясное блюдо от шефа',
    platform: 'telegram',
    goal: 'engagement',
    style: 'expert',
    length: 'medium',
    language: 'ru',
    mediaPreview: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    mediaAnalysis: {
      objects: ['Сочный стейк', 'Трюфельный соус', 'Пряные травы', 'Керамическая тарелка'],
      mood: 'Изысканный, теплый, гастрономический',
      action: 'Подача авторского блюда на темном гранитном столе',
      colors: ['Глубокий шоколадный', 'Золотистая корочка', 'Свежий зеленый'],
      visualContext: 'Высокая кухня в вечернем приглушенном свете ресторана'
    },
    hook: 'Почему истинный вкус мяса раскрывается только при температуре 56 градусов?',
    shortCaption: 'Тайны идеального стейка от нашего бренд-шефа. Разбор техники приготовления внутри 🥩',
    mainPost: `Почему истинный вкус мяса раскрывается только при температуре 56 градусов?\n\nВ ресторанном мире есть правило: испортить премиальную говядину можно за 15 секунд передержки. Наш шеф потратил 3 недели на доработку авторского соуса на основе порто и белых грибов.\n\nРезультат — нежная текстура, которая буквально тает во рту, сохраняя все соки внутри.\n\nМы верим, что ужин — это не просто еда, а диалог между шефом и гостем.`,
    cta: 'А какой прожарки стейк предпочитаете вы — Medium Rare или Medium? Делитесь в комментариях!',
    hashtags: ['#гастрономия', '#стейк', '#ресторан', '#шефповар', '#ужин'],
    alternativeVersions: []
  }
];

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'generator' | 'tools' | 'templates' | 'history' | 'pricing' | 'settings'>('dashboard');
  const [generatorMode, setGeneratorMode] = useState<GeneratorMode>('topic');
  
  const [currentPost, setCurrentPost] = useState<GeneratedPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Modals & subtools state
  const [isAIRewriteOpen, setIsAIRewriteOpen] = useState(false);
  const [rewriteInitialText, setRewriteInitialText] = useState('');
  const [activeSubTool, setActiveSubTool] = useState<'repurpose' | 'hooks'>('repurpose');

  // Persistence (LocalStorage)
  const [history, setHistory] = useState<GeneratedPost[]>(() => {
    try {
      const saved = localStorage.getItem('contentai_history');
      return saved ? JSON.parse(saved) : SEED_HISTORY;
    } catch {
      return SEED_HISTORY;
    }
  });

  const [brandSettings, setBrandSettings] = useState<BrandSettings>(() => {
    try {
      const saved = localStorage.getItem('contentai_brand_settings');
      return saved ? JSON.parse(saved) : DEFAULT_BRAND_SETTINGS;
    } catch {
      return DEFAULT_BRAND_SETTINGS;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('contentai_history', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem('contentai_brand_settings', JSON.stringify(brandSettings));
    } catch (e) {
      console.error(e);
    }
  }, [brandSettings]);

  // Handle Post Generation
  const handleGenerate = async (params: {
    mode: GeneratorMode;
    topic: string;
    mediaBase64?: string;
    mediaMimeType?: string;
    mediaName?: string;
    platform: SocialPlatform;
    goal: PostGoal;
    style: PostStyle;
    length: PostLength;
    language: string;
    audience: string;
    toneOfVoice: string;
  }) => {
    setIsLoading(true);
    setCurrentPost(null);

    try {
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          brandSettings,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const generatedData = resData.data;
        const newPost: GeneratedPost = {
          id: `post-${Date.now()}`,
          createdAt: new Date().toISOString(),
          mode: params.mode,
          topic: params.topic || (params.mode === 'image' ? 'Пост по фотографии' : 'Пост по видео'),
          platform: params.platform,
          goal: params.goal,
          style: params.style,
          length: params.length,
          language: params.language,
          audience: params.audience,
          toneOfVoice: params.toneOfVoice,
          mediaPreview: params.mediaBase64,
          mediaType: params.mode === 'video' ? 'video' : 'image',
          mediaAnalysis: generatedData.mediaAnalysis,
          mainPost: generatedData.mainPost,
          shortCaption: generatedData.shortCaption,
          hook: generatedData.hook,
          cta: generatedData.cta,
          hashtags: generatedData.hashtags || [],
          alternativeVersions: generatedData.alternativeVersions || [],
        };

        setCurrentPost(newPost);
        // Add to history
        setHistory((prev) => [newPost, ...prev]);

        confetti({
          particleCount: 60,
          spread: 75,
          origin: { y: 0.6 },
        });
      } else {
        throw new Error(resData.error || 'Ошибка при генерации контента');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartGenerator = (mode: GeneratorMode = 'topic') => {
    setGeneratorMode(mode);
    setActiveView('generator');
  };

  const handleSelectTemplate = (template: TemplateItem) => {
    setGeneratorMode('topic');
    setActiveView('generator');
  };

  const handleOpenPostFromHistory = (post: GeneratedPost) => {
    setCurrentPost(post);
    setActiveView('generator');
  };

  const handleDeletePost = (id: string) => {
    setHistory((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearHistory = () => {
    if (window.confirm('Вы уверены, что хотите удалить всю историю генераций?')) {
      setHistory([]);
    }
  };

  const handleOpenAIRewrite = (text?: string) => {
    setRewriteInitialText(text || currentPost?.mainPost || '');
    setIsAIRewriteOpen(true);
  };

  const handleApplyRewrittenText = (newText: string) => {
    if (currentPost) {
      setCurrentPost({
        ...currentPost,
        mainPost: newText,
      });
    }
  };

  const handleOpenRepurpose = (text?: string) => {
    setRewriteInitialText(text || currentPost?.mainPost || '');
    setActiveView('tools');
    setActiveSubTool('repurpose');
  };

  return (
    <div className={`min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col ${!isDarkMode ? 'light-mode' : ''}`}>
      
      {/* SaaS Navigation Header */}
      <Header
        activeView={activeView}
        onNavigate={setActiveView}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        savedPostsCount={history.length}
      />

      {/* Main App Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* VIEW 1: Dashboard (Главная) */}
        {activeView === 'dashboard' && (
          <div className="space-y-10">
            <HeroSection
              onStartGenerating={handleStartGenerator}
              onExploreTemplates={() => setActiveView('templates')}
            />

            <DashboardView
              onStartGenerator={handleStartGenerator}
              onOpenAIRewrite={() => handleOpenAIRewrite()}
              onOpenRepurpose={() => handleOpenRepurpose()}
              onViewTemplates={() => setActiveView('templates')}
              recentPosts={history}
              onOpenPost={handleOpenPostFromHistory}
            />
          </div>
        )}

        {/* VIEW 2: Generator (Создать пост) */}
        {activeView === 'generator' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top generator breadcrumb / trigger */}
            <div className="text-center max-w-xl mx-auto mb-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1.5">
                AI Генератор Социального Контента
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Задайте параметры или загрузите медиафайл — AI сформирует идеальный пост с хуком и CTA.
              </p>
            </div>

            {/* Generator Form */}
            <MainGenerator
              initialMode={generatorMode}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              brandSettings={brandSettings}
            />

            {/* Loading Indicator */}
            {isLoading && (
              <LoadingState mode={generatorMode} />
            )}

            {/* Generated Result Card */}
            {currentPost && !isLoading && (
              <div id="result-anchor" className="pt-4">
                <ResultCard
                  post={currentPost}
                  onRegenerate={() => handleGenerate({
                    mode: currentPost.mode,
                    topic: currentPost.topic,
                    mediaBase64: currentPost.mediaPreview,
                    platform: currentPost.platform,
                    goal: currentPost.goal,
                    style: currentPost.style,
                    length: currentPost.length,
                    language: currentPost.language,
                    audience: currentPost.audience || '',
                    toneOfVoice: currentPost.toneOfVoice || '',
                  })}
                  onSaveToHistory={(updated) => {
                    setHistory((prev) => [updated, ...prev.filter((p) => p.id !== updated.id)]);
                  }}
                  onOpenAIRewrite={(txt) => handleOpenAIRewrite(txt)}
                  onOpenRepurpose={(txt) => handleOpenRepurpose(txt)}
                  isSaved={history.some((p) => p.id === currentPost.id)}
                />
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: AI Tools (Repurpose, Hooks, CTA) */}
        {activeView === 'tools' && (
          <div className="space-y-6 animate-fade-in">
            {/* Sub-tools switcher */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex p-1 rounded-2xl bg-zinc-900 border border-zinc-800">
                <button
                  onClick={() => setActiveSubTool('repurpose')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSubTool === 'repurpose'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  🔄 Кросс-платформенный реперпозинг
                </button>
                <button
                  onClick={() => setActiveSubTool('hooks')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSubTool === 'hooks'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  🔥 Hooks & CTA Генератор
                </button>
              </div>
            </div>

            {activeSubTool === 'repurpose' && (
              <ContentRepurposing
                initialContent={rewriteInitialText || currentPost?.mainPost || ''}
                onBackToGenerator={() => setActiveView('generator')}
              />
            )}

            {activeSubTool === 'hooks' && (
              <HookAndCTAGenerator
                onInsertIntoPost={(hookText) => {
                  setActiveView('generator');
                }}
              />
            )}
          </div>
        )}

        {/* VIEW 4: Templates (Шаблоны) */}
        {activeView === 'templates' && (
          <TemplatesView
            onSelectTemplate={handleSelectTemplate}
          />
        )}

        {/* VIEW 5: History (История) */}
        {activeView === 'history' && (
          <HistoryView
            history={history}
            onOpenPost={handleOpenPostFromHistory}
            onDeletePost={handleDeletePost}
            onClearAll={handleClearHistory}
          />
        )}

        {/* VIEW 6: Pricing (Тарифы) */}
        {activeView === 'pricing' && (
          <PricingView
            onUpgradePlan={(planName) => {
              alert(`Вы выбрали тариф ${planName}! В демо-режиме все Pro-функции уже активны.`);
            }}
          />
        )}

        {/* VIEW 7: Settings & Brand Voice (Настройки) */}
        {activeView === 'settings' && (
          <BrandSettingsView
            settings={brandSettings}
            onSave={(updated) => setBrandSettings(updated)}
          />
        )}

      </main>

      {/* AI Rewrite Modal */}
      <AIRewriteModal
        isOpen={isAIRewriteOpen}
        onClose={() => setIsAIRewriteOpen(false)}
        initialText={rewriteInitialText}
        onApplyRewrittenText={handleApplyRewrittenText}
      />

      {/* Modern SaaS Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 px-4 text-xs text-zinc-500 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">ContentAI Studio</span>
            <span>·</span>
            <span>Мультимодальный AI-генератор контента для соцсетей</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <button onClick={() => setActiveView('dashboard')} className="hover:text-white transition-colors">Главная</button>
            <button onClick={() => setActiveView('generator')} className="hover:text-white transition-colors">Создать пост</button>
            <button onClick={() => setActiveView('templates')} className="hover:text-white transition-colors">Шаблоны</button>
            <button onClick={() => setActiveView('pricing')} className="hover:text-white transition-colors">Тарифы</button>
            <button onClick={() => setActiveView('settings')} className="hover:text-white transition-colors">Brand Voice</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
