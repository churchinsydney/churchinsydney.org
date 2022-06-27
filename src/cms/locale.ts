import { omit } from 'lodash';

type WithTranslations = {
  translations: object[];
};

export const parseTranslation = <T extends WithTranslations>(data: T[]) => {
  console.log('----', JSON.stringify(data, null, 2));

  return data.map((item) => ({
    ...omit(item, ['translations']),
    ...item.translations[0],
  })) as (Omit<T, 'translations'> & T['translations'][0])[];
};
