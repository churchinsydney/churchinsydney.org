import { ReadTimeResults } from 'reading-time';

export type EvenDate = {
  startDate: string;
  endDate: string;
};

export type PostType = {
  banner: string;
  slug: string;
  title: string;
  description: string;
  content: OutputBlockData[];
  savedOn: string;
  createdOn: string;
  tags: string[];
  likes?: number | null;
  rank: number | null;
  hidden: boolean;
  eventDate?: EvenDate;
};

export type Translation = {
  key: string;
  locale: 'en' | 'zh-CN';
  text: string;
};

export type Translations = {
  [key: string]: string;
};

export type Link = {
  text: string;
  tooltip: string | null;
  href: string;
};

export type ourBelief = {
  text: string;
  ref: string;
  isHeader: boolean;
};

export type ourLife = {
  icon: string | null;
  title: string;
  description: string;
  isHeader: boolean;
};

export type Links = Link[];

export type AppContextType = {
  translations: Translations;
  links?: Links;
  memberPassword?: string;
  settings: Settings;
  preview?: boolean;
};

export type Settings = {
  [key: string]: string;
};
export type Setting = {
  key: string;
  value: string;
};

export type NextLocale = 'en' | 'zh-CN';
export type WebinyLocale = 'en-AU' | 'zh-Hans-CN';

import { OutputBlockData as BaseOutputBlockData } from '@editorjs/editorjs';
export interface OutputBlockData extends BaseOutputBlockData {
  data: {
    className?: string;
    textAlign?: string;
    text: string;
    caption?: string;
    file?: string;
    level: number;
    items: string[];
    style: string;
  };
}
