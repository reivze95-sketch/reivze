import React, { useState, useRef } from 'react';
import { 
  Sparkles, PenTool, Image as ImageIcon, Video, UploadCloud, X, 
  Check, AlertCircle, Wand2, RefreshCw, Flame, Target, Globe, Sliders
} from 'lucide-react';
import { 
  GeneratorMode, SocialPlatform, PostGoal, PostStyle, 
  PostLength, SupportedLanguage, BrandSettings 
} from '../types';

interface MainGeneratorProps {
  initialMode?: GeneratorMode;
  onGenerate: (params: {
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
  }) => void;
  isLoading: boolean;
  brandSettings?: BrandSettings;
}

export const MainGenerator: React.FC<MainGeneratorProps> = ({
  initialMode = 'topic',
  onGenerate,
  isLoading,
  brandSettings,
}) => {
  const [mode, setMode] = useState<GeneratorMode>(initialMode);
  const [topic, setTopic] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaMimeType, setMediaMimeType] = useState<string>('image/jpeg');
  const [mediaName, setMediaName] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  const [platform, setPlatform] = useState<SocialPlatform>('instagram');
  const [goal, setGoal] = useState<PostGoal>('sales');
  const [style, setStyle] = useState<PostStyle>('expert');
  const [length, setLength] = useState<PostLength>('medium');
  const [language, setLanguage] = useState<string>('ru');
  const [audience, setAudience] = useState(brandSettings?.targetAudience || '');
  const [toneOfVoice, setToneOfVoice] = useState(brandSettings?.brandVoice || '');

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Sample media presets for fast testing if user doesn't have an image on hand
  const SAMPLE_IMAGES = [
    {
      label: 'Фитнес и тренировка',
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      title: 'Человек тренируется в спортзале с гантелями'
    },
    {
      label: 'Ресторан и авторское блюдо',
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      title: 'Премиальное мясное блюдо с соусом и зеленью'
    },
    {
      label: 'Коворкинг и ноутбук',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      title: 'Команда разработчиков обсуждает запуск продукта'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isVideo = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError(null);

    // Limit check: 20MB
    if (file.size > 20 * 1024 * 1024) {
      setFileError('Размер файла превышает 20 МБ. Пожалуйста, выберите файл меньшего размера.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setMediaPreview(reader.result as string);
      setMediaMimeType(file.type || (isVideo ? 'video/mp4' : 'image/jpeg'));
      setMediaName(file.name);
      setMediaType(isVideo ? 'video' : 'image');
    };
    reader.onerror = () => {
      setFileError('Не удалось прочитать файл. Попробуйте еще раз.');
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSampleImage = async (sampleUrl: string, sampleTitle: string) => {
    try {
      setFileError(null);
      setMediaName(sampleTitle);
      setTopic(sampleTitle);
      setMediaType('image');

      // Fetch sample image and convert to base64
      const res = await fetch(sampleUrl);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
        setMediaMimeType(blob.type || 'image/jpeg');
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
      setFileError('Не удалось загрузить пример изображения.');
    }
  };

  const handleClearMedia = () => {
    setMediaPreview(null);
    setMediaName('');
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'topic' && !topic.trim()) {
      setFileError('Пожалуйста, напишите тему для создания поста.');
      return;
    }
    if ((mode === 'image' || mode === 'video') && !mediaPreview) {
      setFileError('Пожалуйста, загрузите медиафайл или выберите пример для анализа.');
      return;
    }

    onGenerate({
      mode,
      topic,
      mediaBase64: mediaPreview || undefined,
      mediaMimeType,
      mediaName,
      platform,
      goal,
      style,
      length,
      language,
      audience,
      toneOfVoice,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-panel rounded-3xl p-5 sm:p-8 border border-zinc-800 shadow-2xl relative">
        
        {/* Top Glow Element */}
        <div className="absolute top-0 right-1/3 w-64 h-32 bg-purple-600/10 blur-3xl pointer-events-none rounded-full" />

        {/* 3 Mode Selection Tabs */}
        <div className="flex p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 mb-6">
          <button
            type="button"
            onClick={() => setMode('topic')}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'topic'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>Тема & Текст</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('image')}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'image'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Анализ фото</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('video')}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'video'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Анализ видео</span>
          </button>
        </div>

        {fileError && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{fileError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* CONTENT INPUT AREA BASED ON MODE */}

          {/* MODE 1: Topic Prompt */}
          {mode === 'topic' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  О чем будет пост? (Тема, идея, новость или продукт):
                </label>
                <span className="text-[11px] text-zinc-500">
                  Чем конкретнее описание, тем точнее результат
                </span>
              </div>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Например: 'Напиши пост про открытие нового фитнес-клуба премиум-класса с бассейном, спа-зоной и скидкой 30% на первые 50 абонементов'..."
                rows={3}
                className="w-full px-4 py-3.5 text-sm rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none shadow-inner"
              />

              {/* Quick suggestions tags */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span className="text-[11px] text-zinc-500 mr-1">Быстрые идеи:</span>
                {[
                  'Открытие фитнес-клуба',
                  'Презентация нового блюда',
                  'Личный факап и выводы',
                  'Скидка 40% на курс',
                  '5 секретов в маркетинге'
                ].map((idea, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setTopic(idea)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
                  >
                    + {idea}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MODE 2: Image Upload & Analysis */}
          {mode === 'image' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Загрузите изображение для анализа:
                </label>
                <span className="text-[11px] text-zinc-400">
                  AI распознает объекты, окружение, цвета и контекст
                </span>
              </div>

              {!mediaPreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-zinc-700 hover:border-purple-500/70 rounded-2xl p-6 sm:p-8 text-center bg-zinc-900/40 hover:bg-zinc-900/70 transition-all cursor-pointer group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, false)}
                  />
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6 text-purple-400" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-200 mb-1">
                    Нажмите для выбора фото или перетащите файл сюда
                  </p>
                  <p className="text-xs text-zinc-500">
                    PNG, JPG, WEBP до 20 МБ · Поддерживается вставка из буфера (Ctrl+V)
                  </p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-zinc-700 bg-black/60 p-3 flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={mediaPreview}
                    alt="Upload Preview"
                    className="w-36 h-36 object-cover rounded-xl border border-zinc-800"
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Фото загружено
                      </span>
                    </div>
                    <p className="text-xs font-medium text-zinc-200 truncate max-w-xs sm:max-w-md">
                      {mediaName || 'user-image.jpg'}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      AI готов проанализировать объекты, людей, настроение и создать естественный пост.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearMedia}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                    title="Удалить фото"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Sample quick picks */}
              <div className="pt-2">
                <span className="text-xs text-zinc-500 block mb-2">Или выберите готовый пример для быстрого теста:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SAMPLE_IMAGES.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSampleImage(sample.url, sample.title)}
                      className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left flex items-center gap-2.5 transition-colors"
                    >
                      <img src={sample.url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div className="truncate">
                        <span className="text-xs font-medium text-zinc-200 block truncate">{sample.label}</span>
                        <span className="text-[10px] text-zinc-500 block truncate">{sample.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional context */}
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">
                  Дополнительный контекст к фото (по желанию):
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Например: 'Человек на фото достиг лучшей формы за 3 месяца' или название бренда/продукта..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          {/* MODE 3: Video Upload & Analysis */}
          {mode === 'video' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Загрузите видео для создания поста и сценария:
                </label>
                <span className="text-[11px] text-zinc-400">
                  AI определит действия, ключевые моменты и напишет Reels/TikTok-хук
                </span>
              </div>

              {!mediaPreview ? (
                <div
                  onClick={() => videoInputRef.current?.click()}
                  className="border-2 border-dashed border-zinc-700 hover:border-cyan-500/70 rounded-2xl p-6 sm:p-8 text-center bg-zinc-900/40 hover:bg-zinc-900/70 transition-all cursor-pointer group"
                >
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/mp4, video/webm, video/quicktime"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, true)}
                  />
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Video className="w-6 h-6 text-cyan-400" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-200 mb-1">
                    Нажмите для загрузки видео или перетащите ролик
                  </p>
                  <p className="text-xs text-zinc-500">
                    MP4, WebM, MOV до 25 МБ (Reels, TikTok, Shorts, сторис)
                  </p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-zinc-700 bg-black/60 p-3 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-36 h-28 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800 overflow-hidden">
                    <video
                      src={mediaPreview}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1 mb-1">
                      <Check className="w-3.5 h-3.5" /> Видео готово к анализу
                    </span>
                    <p className="text-xs font-medium text-zinc-200 truncate max-w-xs sm:max-w-md">
                      {mediaName || 'user-video.mp4'}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      AI создаст основной пост, короткий caption для Reels, взрывной hook и таймкоды.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearMedia}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">
                  О чем это видео? (Краткая подсказка для AI):
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Например: 'Бэкстейдж со съемок новой коллекции', 'Тренировка ног в спортзале'..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          {/* CORE STRATEGY SETTINGS (Platform + Goal + Style) */}
          <div className="pt-2 border-t border-zinc-800/80 space-y-4">
            
            {/* 1. Social Platform Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                1. Социальная сеть:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {[
                  { id: 'instagram', label: 'Instagram', icon: '📸' },
                  { id: 'telegram', label: 'Telegram', icon: '✈️' },
                  { id: 'tiktok', label: 'TikTok', icon: '🎵' },
                  { id: 'linkedin', label: 'LinkedIn', icon: '💼' },
                  { id: 'x', label: 'X (Twitter)', icon: '🧵' },
                  { id: 'facebook', label: 'Facebook', icon: '👥' },
                  { id: 'youtube', label: 'YouTube', icon: '▶️' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPlatform(item.id as SocialPlatform)}
                    className={`py-2 px-2.5 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                      platform === item.id
                        ? 'bg-purple-600/20 border-purple-500 text-purple-200 font-bold shadow-sm'
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="block text-sm mb-0.5">{item.icon}</span>
                    <span className="truncate block">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Post Goal (CRITICAL Requirement 6) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>2. Главная цель поста:</span>
                </label>
                <span className="text-[11px] text-zinc-500">
                  AI полностью адаптирует структуру (Hook, Problem, Solution, CTA)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {[
                  { id: 'sales', label: '💰 Продажи', desc: 'Оффер, выгоды, закрытие возражений' },
                  { id: 'engagement', label: '💬 Вовлечение', desc: 'Вопрос, дискуссия, комментарии' },
                  { id: 'education', label: '🎓 Обучение', desc: 'Польза, пошаговые пункты, сохранение' },
                  { id: 'followers', label: '📈 Новые подписчики', desc: 'Сильный крючок, польза в подписке' },
                  { id: 'personal_brand', label: '🌟 Личный бренд', desc: 'Ценности, авторитет, доверие' },
                  { id: 'product_ad', label: '📣 Реклама продукта', desc: 'Презентация новинки или услуги' },
                  { id: 'announcement', label: '🚀 Анонс', desc: 'Интрига, даты, регистрация' },
                  { id: 'storytelling', label: '📖 Storytelling', desc: 'История преодоления и инсайт' },
                  { id: 'viral', label: '🔥 Вирусный контент', desc: 'Провокация, эмоции, шерринг' },
                  { id: 'entertainment', label: '🎉 Развлечение', desc: 'Юмор, легкость, лайки' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGoal(item.id as PostGoal)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      goal === item.id
                        ? 'bg-amber-500/15 border-amber-500/50 text-amber-200 shadow-sm'
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="text-xs font-bold block mb-0.5 truncate">{item.label}</span>
                    <span className="text-[10px] text-zinc-500 block leading-tight truncate">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Style & Length & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Стиль подачи:
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value as PostStyle)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="expert">Экспертный (Факты & Опыт)</option>
                  <option value="sales">Продающий (Четкий оффер & Дедлайн)</option>
                  <option value="friendly">Дружелюбный (На равных)</option>
                  <option value="premium">Премиальный (Old Money & Эстетика)</option>
                  <option value="viral">Вирусный (Ритмичный & Дерзкий)</option>
                  <option value="informative">Информационный (Лаконичный)</option>
                  <option value="storytelling">Storytelling (Глубокий)</option>
                  <option value="minimalist">Минималистичный (Коротко и ясно)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Длина текста:
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value as PostLength)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="short">Короткий (~80-120 слов)</option>
                  <option value="medium">Средний (~150-250 слов)</option>
                  <option value="long">Длинный лонгрид (~300-450 слов)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Язык публикации:
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                  <option value="uz">O'zbekcha</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>

            {/* Toggle Advanced Audience & Brand Voice */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium transition-colors"
              >
                <Sliders className="w-3 h-3" />
                <span>{showAdvanced ? 'Скрыть дополнительные настройки' : 'Настроить целевую аудиторию и Tone of Voice'}</span>
              </button>

              {showAdvanced && (
                <div className="mt-3 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1">
                      Целевая аудитория:
                    </label>
                    <input
                      type="text"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      placeholder="Например: 'Предприниматели 28-45 лет', 'Мамы в декрете', 'Фитнес-энтузиасты'..."
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1">
                      Tone of Voice:
                    </label>
                    <input
                      type="text"
                      value={toneOfVoice}
                      onChange={(e) => setToneOfVoice(e.target.value)}
                      placeholder="Например: 'Уверенно, без лишней воды, с легкой иронией'..."
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:opacity-95 text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(124,58,237,0.35)] transition-all cursor-pointer disabled:opacity-50 active:scale-98"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>AI создаёт ваш пост...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-purple-200" />
                  <span>Сгенерировать пост</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
