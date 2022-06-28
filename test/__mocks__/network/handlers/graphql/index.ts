import { getPostsByTags } from './getPostsByTags';
import { login } from './login';
import { getEmailTemplateBySlug } from './getEmailTemplateBySlug';
import { getLinks } from './getLinks';
import { getPosts } from './getPosts';
import { getSettings } from './getSettings';
import { getOurBeliefs } from './getOurBeliefs';
import { getOurLives } from './getOurLives';
import { getPostBySlug } from './getPostBySlug';
import { getTranslationsByNamespace } from './getTranslationsByNamespace';

export default [
  getPostsByTags,
  login,
  getEmailTemplateBySlug,
  getLinks,
  getPosts,
  getSettings,
  getOurBeliefs,
  getOurLives,
  getPostBySlug,
  getTranslationsByNamespace,
];
