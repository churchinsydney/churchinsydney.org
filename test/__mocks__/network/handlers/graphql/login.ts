import { graphql } from 'msw';

export const login = graphql.mutation('Login', (req, res, ctx) => {
  // console.log('graphql.mutation login', req);

  return res(
    ctx.data({
      auth_login: 'TOKEN',
    })
  );
});

// export const operation = graphql.operation((req, res, ctx) => {
//   console.log('graphql.operation', req);
//   return res(
//     ctx.data({
//       auth_login: 'TOKEN',
//     })
//   );
// });
