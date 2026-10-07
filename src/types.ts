export type GeneratorMode = 'topic' | 'image' | 'video';

export type SocialPlatform = 
  | 'instagram' 
  | 'tiktok' 
  | 'telegram' 
  | 'linkedin' 
  | 'x' 
  | 'facebook' 
  | 'youtube';

export type PostStyle = 
  | 'expert' 
  | 'sales' 
  | 'friendly' 
  | 'premium' 
  | 'viral' 
  | 'informative' 
  | 'storytelling' 
  | 'minimalist';

export type PostLength = 'short' | 'medium' | 'long';

export type PostGoal = 
  | 'sales' 
  | 'followers' 
  | 'engagement' 
  | 'education' 
  | 'personal_brand' 
  | 'product_ad' 
  | 'announcement' 
  | 'storytelling' 
  | 'viral' 
  | 'entertainment';

export type SupportedLanguage = 'ru' | 'en' | 'uz' | 'es' | 'de';

export interface MediaAnalysis {
  objects: string[];
  people?: string;
  environment?: string;
  colors?: string[];
  mood?: string;
  action?: string;
  detectedText?: string;
  detectedBrand?: string;
  visualContext?: string;
  keyMoments?: string[]; // for video
}

export interface PostVariant {
  id: string;
  title: string;
  badge: string;
  mainPost: string;
  shortCaption: string;
  hook: string;
  cta: string;
  hashtags: string[];
}

export interface GeneratedPost {
  id: string;
  createdAt: string;
  mode: GeneratorMode;
  topic: string;
  platform: SocialPlatform;
  goal: PostGoal;
  style: PostStyle;
  length: PostLength;
  language: string;
  audience?: string;
  toneOfVoice?: string;
  mediaPreview?: string; // base64 or url
  mediaType?: 'image' | 'video';
  mediaAnalysis?: MediaAnalysis;
  mainPost: string;
  shortCaption: string;
  hook: string;
  cta: string;
  hashtags: string[];
  alternativeVersions: PostVariant[];
}

export interface BrandSettings {
  brandName: string;
  brandVoice: string;
  description: string;
  website: string;
  targetAudience: string;
  keyProducts: string;
  advantages: string;
  bannedWords: string;
  preferredCTA: string;
}

export interface RepurposeResult {
  instagram: string;
  tiktok: string;
  telegram: string;
  linkedin: string;
  x: string;
  youtube: string;
  hooks: string[];
  headlines: string[];
  cta: string;
  hashtags: string[];
}

export interface HookItem {
  id: string;
  category: 'curiosity' | 'shock' | 'question' | 'story' | 'problem' | 'result' | 'controversial' | 'educational';
  categoryLabel: string;
  text: string;
}

export interface TemplateItem {
  id: string;
  category: 
    | 'business' 
    | 'marketing' 
    | 'personal_brand' 
    | 'fitness' 
    | 'food' 
    | 'fashion' 
    | 'real_estate' 
    | 'education' 
    | 'travel' 
    | 'ecommerce' 
    | 'beauty' 
    | 'technology';
  categoryLabel: string;
  title: string;
  description: string;
  topicPrompt: string;
  recommendedPlatform: SocialPlatform;
  recommendedGoal: PostGoal;
  recommendedStyle: PostStyle;
  recommendedLength: PostLength;
  badge: string;
}
