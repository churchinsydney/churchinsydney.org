import { describe, expect, test } from 'vitest';

import Page, { getStaticProps } from '@/pages/our-belief';

import { render, screen } from '../testUtils';

describe('Our belief', () => {
  test('Should render our-belief content', async () => {
    const { props } = await getStaticProps({ locale: 'en' });

    render(<Page {...props} />);

    props.ourBeliefs.forEach(async ({ text, ref }) => {
      expect(screen.queryAllByText(text)).toBeDefined();
      expect(screen.queryAllByText(ref)).toBeDefined();
    });
  });
});
