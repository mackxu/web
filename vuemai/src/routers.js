export default (router) => router.map({
  '/': {
    name: 'index',
    component: resolve => {
      require(['./views/home'], resolve)
    }
  },
  '/films/:type': {
    name: 'filmList',
    component: resolve => {
      require(['./views/film/list'], resolve)
    }
  },
  '/film/:id': {
    name: 'detail',
    component: resolve => {
      require(['./views/film/detail'], resolve)
    },
    auth: true
  },
  '/login': {
    name: 'login',
    component: resolve => {
      require(['./views/member/login'], resolve);
    }
  },
  '/register': {
    name: 'register',
    component: resolve => {
      require(['./views/member/register'], resolve);
    }
  }
})