const routers = [{
    path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/index.vue'], resolve),
    path: '/tags',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/tags.vue'], resolve)
}];
export default routers;