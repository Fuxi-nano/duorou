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
                path: '/specialty_subscribe',
                name: 'subscribe.specialty',
                icon: 'crown',
                component: './SpecialtySubscribe',
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
