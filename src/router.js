import { createRouter, createWebHistory } from 'vue-router'
import routes from 'voie-pages';

export default (app) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  app.use(router);
};