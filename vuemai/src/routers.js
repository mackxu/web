export default (router) => router.map({
  '/': {
    name: 'index',
    component: require('./views/home')
  },
  '/film': {
    name: 'film',
    component: require('./views/film')
  },
  '/film/:id': {
    name: 'detail',
    component: require('./views/film/detail')
  }
})