export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/index',
              },
              {
                path: '/index',
                name: 'index',
                icon: 'crown',
                component: './Index',
              },
              {
                path: '/subscribe',
                name: 'subscribe',
                icon: 'crown',
                component: './Subscribe',
              },
              {
                path: '/specialty',
                name: 'specialty',
                icon: 'crown',
                component: './Specialty',
              },
              {
                path: '/class',
                name: 'class',
                icon: 'crown',
                component: './Class',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
