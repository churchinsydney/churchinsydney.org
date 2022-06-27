import React from 'react';
import { getPage } from 'next-page-tester';
// import { render, fireEvent } from '../test-utils';
// import Home from '../../src/pages/index';
import { screen } from '@testing-library/react';
// import { useRouter } from "next/router";
// const useRouter = jest.spyOn(require('next/router'), 'useRouter');

// jest.mock("next/router", () => ({
//   useRouter: jest.fn(),
// }));

// const useRouter = jest.spyOn(require('next/router'), 'useRouter');

// // server.use(tasksHandlerException);
// // useRouter.mockImplementationOnce(() => ({
// //   query: {page: 1, per_page: 10},
// //   asPath: '/posts'
// // }));
// useRouter.mockImplementation(() => ({
//   // push,
//   pathname: '/',
//   route: '/',
//   asPath: '/',
//   query: '',
// }));

describe('Home page', () => {
  it('renders blog page', async () => {
    const { render } = await getPage({
      route: '/',
    });
    render();
    // screen.debug();
    // expect(screen.getByText('Blog')).toBeInTheDocument();
    // fireEvent.click(screen.getByText('Link'));
    // await screen.findByText('Linked page');
  });
  // it('matches snapshot', () => {
  //   const { asFragment } = render(
  //     <Home
  //       links={[]}
  //       settings={{}}
  //       currentEvents={[]}
  //       featuredPosts={[]}
  //       translations={{}}
  //     />,
  //     {}
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });

  // it('clicking button triggers alert', () => {
  //   const { getByText } = render(<Home />, {})
  //   window.alert = jest.fn()
  //   fireEvent.click(getByText('Test Button'))
  //   expect(window.alert).toHaveBeenCalledWith('With Typescript, Tailwind CSS, React Testing Library, and Jest')
  // })
});
