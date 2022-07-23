import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import Home, { getStaticProps } from '@/pages/index';

import { render, screen } from '../testUtils';

let _locale = 'en';

vi.mock('next/router', () => ({
  useRouter: () => {
    return {
      asPath: '/',
      route: '/',
      locales: ['en', 'zh-CN'],
      locale: _locale,
      push: (path: string, as: string, options: { locale: string }) => {
        _locale = options.locale;
      },
    };
  },
}));

describe('Locale page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Static props hydrate should renders home paaage', async () => {
    const { props } = await getStaticProps({ locale: 'en' });

    render(<Home {...props} />);

    const element = screen.getByLabelText('change-language');

    expect(element).toHaveTextContent('中');
    // change to zh-CN
    await userEvent.click(element);
    expect(element).toHaveTextContent('en');
    expect(_locale).toBe('zh-CN');

    // change back to en
    await userEvent.click(element);
    expect(_locale).toBe('en');
    expect(element).toHaveTextContent('en');
  });
});
