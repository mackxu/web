export default (router) => router.map({
  '/': {
    name: 'index',
    component: resolve => {
      require(['./views/home'], resolve)
    }
  },
  '/film': {
    name: 'film',
    component: resolve => {
      require(['./views/film'], resolve)
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
      require(['./views/home'], resolve);
    }
  }
})