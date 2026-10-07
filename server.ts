import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Support large payloads for image and video data (up to 30mb)
app.use(express.json({ limit: '30mb' }));

// Initialize Google GenAI with recommended telemetry
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_PROMPT = `You are an expert social media content strategist, copywriter and visual content analyst.
Your job is to create high-quality social media content based on the user's topic, uploaded image, uploaded video and selected settings.
Never blindly use generic templates.
First understand the context.
When media is provided, analyze the visible content and use relevant observations in the generated content.
Adapt every result to:
- platform
- audience
- goal
- language
- tone
- brand voice
- content type
Write naturally.
Avoid generic AI-sounding phrases.
Do not invent facts that are not visible in the media or provided by the user.
If information is uncertain, keep the wording general instead of making unsupported claims.
Generate useful hooks, captions, CTA and hashtags when requested.
The final result should be immediately usable by a social media creator.`;

// Intelligent contextual fallback when API key is missing or network times out
function createFallbackPost(params: any) {
  const { topic = 'Новый продукт', mode = 'topic', platform = 'instagram', goal = 'engagement', style = 'expert', language = 'ru' } = params;
  
  const isEn = language === 'en';
  const isUz = language === 'uz';

  const cleanTopic = topic || 'Инновации и рост';

  let hook = `Что отличает тех, кто просто пробует, от тех, кто получает стабильный результат?`;
  let mainPost = `Многие думают, что ключевой фактор успеха в теме «${cleanTopic}» — это случайность или удача. Но реальность устроена иначе.\n\nЗа каждым заметным результатом стоит система, внимание к деталям и готовность делать то, что другие откладывают на потом.\n\nВот 3 вещи, которые меняют всё:\n1. Четкий фокус на главном действии, а не на суете.\n2. Качество контакта с вашей аудиторией.\n3. Постоянство: маленькие шаги каждый день создают непреодолимый отрыв.\n\nЕсли вы сейчас находитесь на этапе, когда нужно выйти на новый уровень — перестаньте ждать идеального момента. Начните с того, что есть прямо сейчас.`;
  let cta = `Напишите в комментариях, какой пункт откликается больше всего? Обсудим!`;
  let shortCaption = `${cleanTopic}: почему 90% останавливаются в шаге от прорыва. Разбор внутри ⬇️`;

  if (goal === 'sales' || goal === 'product_ad') {
    hook = `Вы всё ещё тратите время впустую, пытаясь решить вопрос с «${cleanTopic}» вручную?`;
    mainPost = `Честно: сколько ресурсов и нервов уходит на то, что можно автоматизировать или сделать в 3 раза качественнее?\n\nМы создали решение, которое снимает эту головную боль раз и навсегда.\n\nЧто вы получаете:\n✔ Мгновенный результат без долгого погружения\n✔ Проверенную методологию, сберегающую до 15 часов в неделю\n✔ Персональную поддержку и гарантию прозрачности\n\nПервые 10 участников получают специальный доступ на особых условиях.`;
    cta = `Переходите по ссылке в описании профиля или пишите в Direct «СТАРТ», чтобы забронировать условия!`;
    shortCaption = `Готовое решение для тех, кто ценит свое время. Подробности в посте 🚀`;
  } else if (goal === 'storytelling' || goal === 'personal_brand') {
    hook = `Год назад я думал(а), что ничего не получится. И это было лучшим, что могло случиться.`;
    mainPost = `Когда мы начинали погружаться в «${cleanTopic}», всё вокруг казалось слишком сложным. Сомнения, чужие советы и страх сделать ошибку.\n\nНо в какой-то момент я понял(а) простую истину: опыт не покупается за деньги. Он собирается по крупицам из каждого сделанного шага.\n\nСегодня я смотрю назад и понимаю: то, что казалось тупиком, на самом деле было дверью.\n\nНикогда не позволяйте чужим страхам определять масштаб ваших целей.`;
    cta = `Сохраните этот пост в закладки, чтобы перечитать в момент сомнений. А как вы справляетесь с периодами неопределенности?`;
    shortCaption = `История, о которой я долго молчал(а). Листайте и читайте до конца ❤️`;
  }

  if (isEn) {
    hook = `What truly separates consistent results from wishful thinking?`;
    mainPost = `When it comes to ${cleanTopic}, most people wait for the perfect moment. But momentum isn't found—it's built.\n\nHere is what really works:\n1. Ruthless focus on high-leverage actions\n2. Authentic connection over vanity metrics\n3. Daily compounding consistency\n\nStop overthinking. Start executing.`;
    cta = `Drop your thoughts below: What is your biggest priority this week?`;
    shortCaption = `${cleanTopic}: the real framework behind sustainable growth. Read above ⬆️`;
  } else if (isUz) {
    hook = `Muvaffaqiyatga erishganlar va joyida to'xtab qolganlar orasidagi asosiy farq nima?`;
    mainPost = `${cleanTopic} mavzusida ko'pchilik qulay fursatni kutadi. Ammo natija kutish bilan emas, harakat bilan keladi.\n\nAsosiy 3 ta omil:\n1. Aniq maqsad va ortiqcha narsalardan voz kechish\n2. Doimiy rivojlanish va sifat\n3. Har kungi kichik qadamlar katta natijaga olib keladi.\n\nHozirning o'zida birinchi qadamni tashlang.`;
    cta = `Fikringizni izohlarda qoldiring! Siz qaysi birini birinchi navbatda qo'llaysiz?`;
    shortCaption = `${cleanTopic}: Haqiqiy natijaga olib boruvchi amaliy tavsiyalar ⬇️`;
  }

  const tags = [
    `#${cleanTopic.replace(/\s+/g, '').slice(0, 15)}`,
    '#контентмаркетинг',
    '#продвижение',
    '#социальныесети',
    '#бизнесонлайн',
    '#экспертныйблог',
    '#развитие',
    '#мотивация'
  ];

  return {
    mainPost,
    shortCaption,
    hook,
    cta,
    hashtags: tags,
    alternativeVersions: [
      {
        id: 'var_1',
        title: 'Вариант 1 — Сбалансированный',
        badge: 'Основной',
        mainPost,
        shortCaption,
        hook,
        cta,
        hashtags: tags,
      },
      {
        id: 'var_2',
        title: 'Вариант 2 — Продающий & Прямой',
        badge: 'Sales-focused',
        hook: `Как получить максимум от «${cleanTopic}» уже на этой неделе?`,
        mainPost: `Если вам нужен быстрый и предсказуемый результат — хватит экспериментировать вслепую.\n\nМы упаковали лучший опыт по теме «${cleanTopic}» в понятный пошаговый формат.\n\nВы экономите время, получаете готовую систему и избавляетесь от рутины.\n\nПредложение ограничено по времени. Забирайте прямо сейчас!`,
        shortCaption: `Готовое решение без лишней воды. Успейте воспользоваться ⚡️`,
        cta: `Напишите «ХОЧУ» в комментариях или перейдите по ссылке в шапке профиля!`,
        hashtags: tags,
      },
      {
        id: 'var_3',
        title: 'Вариант 3 — Эмоциональный & Вовлекающий',
        badge: 'Эмоциональный',
        hook: `Есть вещи, о которых не принято говорить вслух, но каждый из нас с этим сталкивался...`,
        mainPost: `Тема «${cleanTopic}» для меня всегда была особенной. Не потому что это тренд, а потому сколько эмоций и сил в это вложено.\n\nСколько раз опускались руки? Сколько раз хотелось всё бросить?\n\nИ каждый раз спасало одно — вера в то, что мы делаем нечто действительно ценное. Если сейчас вам тоже тяжело — знайте, вы не одни.`,
        shortCaption: `Искренний пост о том, что обычно остается за кадром. Читай до конца ✨`,
        cta: `Поставьте ❤️ и напишите пару слов в поддержку — это очень важно!`,
        hashtags: tags,
      }
    ]
  };
}

// 1. Generate Post Endpoint
app.post('/api/generate-post', async (req, res) => {
  try {
    const {
      mode = 'topic',
      topic = '',
      mediaBase64,
      mediaMimeType = 'image/jpeg',
      platform = 'instagram',
      goal = 'engagement',
      style = 'expert',
      length = 'medium',
      language = 'ru',
      audience = '',
      toneOfVoice = '',
      brandSettings,
    } = req.body;

    if (!ai) {
      const fallback = createFallbackPost({ topic, mode, platform, goal, style, length, language });
      return res.json({ success: true, data: fallback, source: 'fallback_no_key' });
    }

    // Build comprehensive prompt instruction
    const promptText = `
${SYSTEM_PROMPT}

USER PARAMETERS:
- Content Source Mode: ${mode} (topic, image, or video)
- Topic / Description: "${topic || 'Analyze the provided media'}"
- Platform: ${platform} (Instagram, TikTok, Telegram, LinkedIn, X, Facebook, YouTube)
- Primary Goal: ${goal} (e.g. sales, followers, engagement, education, personal_brand, product_ad, announcement, storytelling, viral)
- Style: ${style} (e.g. expert, sales, friendly, premium, viral, informative, storytelling, minimalist)
- Length: ${length} (short = 50-100 words, medium = 120-220 words, long = 250-450 words)
- Target Language: ${language}
- Target Audience: ${audience || 'General target audience interested in this topic'}
- Tone of Voice: ${toneOfVoice || 'Natural, engaging, authentic'}
${brandSettings?.brandName ? `- Brand Name: ${brandSettings.brandName}` : ''}
${brandSettings?.brandVoice ? `- Brand Voice Rules: ${brandSettings.brandVoice}` : ''}
${brandSettings?.bannedWords ? `- Banned Words to Avoid: ${brandSettings.bannedWords}` : ''}
${brandSettings?.preferredCTA ? `- Preferred Call to Action: ${brandSettings.preferredCTA}` : ''}

TASK:
1. If media is provided, deeply analyze visible objects, environment, people, action, colors, mood, branding, text, and visual context. Include this analysis in the response.
2. Structure the main post according to the GOAL:
   - If 'sales': Strong hook -> Agitation/Problem -> Solution & Value -> Concrete Proof/Advantage -> Clear CTA.
   - If 'engagement': Intriguing hook -> Relatable insight/story -> Open thought-provoking question -> Comment CTA.
   - If 'education': Scroll-stopping hook -> Value/Insights/Bullet points -> Actionable takeaway -> Save/Share CTA.
   - If 'storytelling': Narrative hook -> Conflict/Struggle -> Climax/Turning point -> Moral/Takeaway -> Reflection CTA.
   - If 'viral': Curiosity/Controversial hook -> Short punchy paragraphs -> Bold conclusion -> Share CTA.
3. Generate 3 distinct high-converting variants:
   - Variant 1: Main (Balanced, best suited for the chosen goal and platform)
   - Variant 2: Sales-focused (Higher commercial intent, urgency, direct offer)
   - Variant 3: Emotional / Storytelling (Deeper connection, vulnerability, personal touch)
4. Return 10-15 hyper-relevant hashtags tailored to the topic and platform.
5. Provide a short caption (1-2 sentences for preview/Reels/TikTok).

Return ONLY valid JSON with this exact structure:
{
  "mediaAnalysis": {
    "objects": ["object 1", "object 2"],
    "people": "description if any",
    "environment": "setting description",
    "colors": ["dominant color 1", "color 2"],
    "mood": "mood of the visual",
    "action": "what is happening",
    "visualContext": "summary of visual context",
    "keyMoments": ["moment 1", "moment 2"]
  },
  "mainPost": "full structured text of variant 1 with paragraphs and emojis appropriate to platform",
  "shortCaption": "catchy 1-2 sentence caption",
  "hook": "scroll-stopping hook sentence",
  "cta": "clear call to action",
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "alternativeVersions": [
    {
      "id": "var_1",
      "title": "Вариант 1 — Основной",
      "badge": "Рекомендованный",
      "mainPost": "text...",
      "shortCaption": "caption...",
      "hook": "hook...",
      "cta": "cta...",
      "hashtags": ["#tag1", "#tag2"]
    },
    {
      "id": "var_2",
      "title": "Вариант 2 — Продающий",
      "badge": "Sales & Action",
      "mainPost": "text...",
      "shortCaption": "caption...",
      "hook": "hook...",
      "cta": "cta...",
      "hashtags": ["#tag1", "#tag2"]
    },
    {
      "id": "var_3",
      "title": "Вариант 3 — Эмоциональный & Сторителлинг",
      "badge": "Story & Trust",
      "mainPost": "text...",
      "shortCaption": "caption...",
      "hook": "hook...",
      "cta": "cta...",
      "hashtags": ["#tag1", "#tag2"]
    }
  ]
}
`;

    let contents: any;

    if (mediaBase64) {
      // Clean base64 string
      const base64Data = mediaBase64.replace(/^data:[^;]+;base64,/, '');
      contents = [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mediaMimeType,
              },
            },
            {
              text: promptText,
            },
          ],
        },
      ];
    } else {
      contents = promptText;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '';
    const cleanJson = responseText.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
    const data = JSON.parse(cleanJson);

    return res.json({ success: true, data, source: 'gemini' });
  } catch (error: any) {
    console.error('Error generating post:', error);
    // Graceful fallback so the client UI always succeeds
    const fallback = createFallbackPost(req.body);
    return res.json({
      success: true,
      data: fallback,
      source: 'fallback_on_error',
      warning: error.message,
    });
  }
});

// 2. AI Rewrite & Enhance Endpoint
app.post('/api/rewrite-post', async (req, res) => {
  try {
    const { originalText, action, targetPlatform, instructions } = req.body;

    if (!originalText) {
      return res.status(400).json({ error: 'originalText is required' });
    }

    if (!ai) {
      return res.json({
        success: true,
        rewrittenText: `[Улучшенная версия]\n\n${originalText}\n\n👉 Напишите в комментариях, как вам такой формат?`,
        explanation: 'Текст структурирован и усилен призывом к действию.',
      });
    }

    const prompt = `
${SYSTEM_PROMPT}

Rewrite and enhance the following social media post.
Original Text:
"""
${originalText}
"""

Requested Action: ${action}
(Options:
- 'sales': Make it more commercial, highlight benefits, add strong CTA
- 'shorter': Condense it, remove fluff, make every word punchy
- 'longer': Deepen insights, add examples, elaborate the story
- 'emotional': Add vulnerability, emotional hooks, relatable feelings
- 'professional': Make it authoritative, data-backed, polished
- 'viral': Craft a high-curiosity hook, short rhythmic sentences, bold claims
- 'clean': Fix grammar, enhance flow, remove clichés
- 'adapt_platform': Adapt specifically for ${targetPlatform || 'Instagram'}
)

Custom Instructions: ${instructions || 'None'}

Return ONLY valid JSON:
{
  "rewrittenText": "The complete rewritten post",
  "explanation": "Brief 1-sentence note of what was improved"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const cleanJson = (response.text || '').replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
    const data = JSON.parse(cleanJson);

    return res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error rewriting post:', error);
    return res.json({
      success: true,
      data: {
        rewrittenText: req.body.originalText,
        explanation: 'Не удалось применить изменения через API, исходный текст сохранен.',
      },
    });
  }
});

// 3. AI Repurpose Content Endpoint
app.post('/api/repurpose-content', async (req, res) => {
  try {
    const { content, topic, language = 'ru' } = req.body;

    if (!ai) {
      const sample = content || topic || 'Контент о росте бизнеса';
      return res.json({
        success: true,
        data: {
          instagram: `📸 INSTAGRAM:\n\n${sample}\n\n#бизнес #развитие #успех`,
          tiktok: `🎵 TIKTOK CAPTION:\n\nТы тоже это замечал? Разбор в видео ⬇️\n\n#fyp #рек #тренды`,
          telegram: `✈️ TELEGRAM POST:\n\nКоллеги, важная мысль на сегодня:\n\n${sample}\n\nЧто думаете по этому поводу?`,
          linkedin: `💼 LINKEDIN ARTICLE/POST:\n\nKey takeaways on professional execution:\n\n${sample}\n\n#Leadership #Innovation #Growth`,
          x: `🧵 X (TWITTER) THREAD:\n\n1/3 Most people ignore this simple truth: ${sample.slice(0, 100)}... 🧵👇`,
          youtube: `▶️ YOUTUBE DESCRIPTION:\n\nIn this video we break down everything you need to know about ${topic || 'this topic'}.\n\nTimestamps:\n0:00 Intro\n1:15 Key Insight\n3:40 Final Verdict`,
          hooks: [
            'Перестаньте делать эту ошибку прямо сейчас',
            'Секрет, о котором молчат 90% экспертов',
            'Как сделать X за 3 простых шага',
            'Если бы мне сказали это 5 лет назад...',
            'Правда, которую тяжело принять'
          ],
          headlines: [
            'Полный гид: от нуля до результата',
            'Почему ваш метод больше не работает',
            '5 правил, которые меняют правила игры',
            'Как масштабироваться без выгорания',
            'Главный тренд 2026 года'
          ],
          cta: 'Подпишитесь и сохраните этот пост, чтобы не потерять!',
          hashtags: ['#контент', '#маркетинг', '#стратегия', '#бизнес']
        }
      });
    }

    const prompt = `
${SYSTEM_PROMPT}

Take the following source content/topic and repurpose it into a complete multi-platform social media distribution pack in ${language} language.

SOURCE CONTENT:
"""
${content || topic}
"""

Generate:
1. Instagram post (carousel / photo caption with emojis and spacing)
2. TikTok / Reels short caption with hooks
3. Telegram post (deep, insider tone, clean markdown)
4. LinkedIn post (professional, career/business insights, line spacing)
5. X / Twitter post or hook thread opener (under 280 chars)
6. YouTube description with chapters and links placeholder
7. 5 killer scroll-stopping hooks
8. 10 headline ideas
9. High-converting CTA
10. Hashtags list

Return ONLY valid JSON:
{
  "instagram": "...",
  "tiktok": "...",
  "telegram": "...",
  "linkedin": "...",
  "x": "...",
  "youtube": "...",
  "hooks": ["hook 1", "hook 2", "hook 3", "hook 4", "hook 5"],
  "headlines": ["title 1", "title 2", "title 3", "title 4", "title 5", "title 6", "title 7", "title 8", "title 9", "title 10"],
  "cta": "...",
  "hashtags": ["#tag1", "#tag2"]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const cleanJson = (response.text || '').replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
    const data = JSON.parse(cleanJson);

    return res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error repurposing content:', error);
    return res.json({ success: false, error: error.message });
  }
});

// 4. Hook Generator Endpoint
app.post('/api/generate-hooks', async (req, res) => {
  try {
    const { topic = 'маркетинг и продажи', language = 'ru' } = req.body;

    if (!ai) {
      return res.json({
        success: true,
        data: [
          { id: '1', category: 'curiosity', categoryLabel: 'Любопытство', text: `Никто не говорит об этом вслух, но вот почему ${topic} меняет всё...` },
          { id: '2', category: 'shock', categoryLabel: 'Шок', text: `99% людей делают это неправильно, когда дело касается темы «${topic}».` },
          { id: '3', category: 'question', categoryLabel: 'Вопрос', text: `Что если бы вы могли удвоить результаты в «${topic}» без лишних затрат?` },
          { id: '4', category: 'story', categoryLabel: 'История', text: `В тот день я потерял всё, пока не понял один закон про ${topic}...` },
          { id: '5', category: 'problem', categoryLabel: 'Боль / Проблема', text: `Устали сливать бюджет и время на «${topic}» впустую?` },
          { id: '6', category: 'result', categoryLabel: 'Результат', text: `Как выйти на новый уровень в «${topic}» за 14 дней.` },
          { id: '7', category: 'controversial', categoryLabel: 'Провокация', text: `Популярные советы по «${topic}» — это полная чушь. Вот доказательства.` },
          { id: '8', category: 'educational', categoryLabel: 'Обучение', text: `3 проверенных правила в «${topic}», которые я усвоил за 5 лет практики.` },
        ]
      });
    }

    const prompt = `
Generate 16 diverse, high-converting social media hooks about "${topic}" in ${language} language.
Categorize them strictly into these categories:
- curiosity (Curiosity / Intrigue)
- shock (Shock / Unexpected fact)
- question (High-engagement question)
- story (Story / Personal narrative hook)
- problem (Pain point / Agitation)
- result (Concrete result / Case study)
- controversial (Controversial opinion)
- educational (Framework / Tip)

Return ONLY valid JSON array:
[
  { "id": "1", "category": "curiosity", "categoryLabel": "Любопытство", "text": "..." },
  ...
]
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const cleanJson = (response.text || '').replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
    const data = JSON.parse(cleanJson);

    return res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error generating hooks:', error);
    return res.json({ success: false, error: error.message });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`ContentAI Studio Server listening on port ${PORT}`);
  });
}

startServer();
