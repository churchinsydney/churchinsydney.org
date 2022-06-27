import React from 'react';
import { render, screen, within } from '../testUtils';
import Home from '../../src/pages/index';

const { getByText, getByLabelText } = screen;

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  route: '/',
}));

describe('Home page', () => {
  // happy path
  it('Should render links and translations', () => {
    const props = {
      links: [
        {
          href: 'https:///google.com',
          text: 'Search engine',
          tooltip: 'Search the web',
        },
        {
          href: 'https://github.com',
          text: 'github',
          tooltip: 'Git repository',
        },
      ],
      translations: {
        'home-verse': "I'm a web developer",
        'home-welcome': 'Welcome to my blog',
        'home-introduction-title': 'Introduction',
        'home-quote': '"I am a quote"',
        'home-quote-reference': '- John Doe',
      },
      settings: {},
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);

    // expect each translation text to be in the document
    Object.entries(props.translations).forEach(([_, value]) => {
      expect(getByText(value)).toBeInTheDocument();
    });

    const footerElement = getByLabelText('footer label');

    // expect each link to be in the document
    props.links.forEach(({ href, text }) => {
      expect(within(footerElement).getByText(text).getAttribute('href')).toBe(
        href
      );
    });
    expect(screen.queryByLabelText('hero image')).not.toBeInTheDocument();
  });

  it('Should empty current events should not show current event label', () => {
    const props = {
      links: [],
      translations: {
        'home-current-events': 'Current events',
      },
      settings: {},
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(
      screen.queryByText(props.translations['home-current-events'])
    ).not.toBeInTheDocument();
  });

  it('No current events should not show current event label', () => {
    const props = {
      links: [],
      translations: {
        'home-current-events': 'Current events',
      },
      settings: {},
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(
      screen.queryByText(props.translations['home-current-events'])
    ).not.toBeInTheDocument();
  });

  it('No featured posts should not show featured post', () => {
    const props = {
      links: [],
      translations: {},
      settings: {},
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(screen.queryByLabelText('featured post 1')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('featured post 2')).not.toBeInTheDocument();
  });

  it('Settings "show-hero-image" should show hero image', () => {
    const props = {
      links: [],
      translations: {},
      settings: {
        'show-hero-image': 'true',
      },
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(screen.queryByLabelText('hero image')).toBeInTheDocument();
  });

  it('Settings "show-hero-image" should hide hero image', () => {
    const props = {
      links: [],
      translations: {},
      settings: {
        'show-hero-image': 'false',
      },
      currentEvents: [],
      featuredPosts: [],
    };

    render(<Home {...props} />);
    expect(screen.queryByLabelText('hero image')).not.toBeInTheDocument();
  });
});
