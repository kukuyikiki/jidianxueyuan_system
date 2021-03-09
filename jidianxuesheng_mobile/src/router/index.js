import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
// import {getToken} from '@/utils/auth'

Vue.use(VueRouter);
//禁止Router打印全局异常
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

//简化下方routes配置 + 懒加载
function route(path, file, name, children, keepAlive) {
    return {
        exact: true, //是否为严格模式 默认true
        path,
        name,
        children,
        // component: (resolve) => require(['@/views' + file], resolve),
        component: () =>
            import ('@/views' + file),
        meta: {
            title: "科研管理系统",
            keepAlive: keepAlive,
            fromURL: "",
        }
    }
}

function intoPath(to, from, next) {
    console.log(to, from);
}
//路由路径配置
const routes = [
        //路由配置
        route("/", "/myResearch/index", "myResearch", "", true), // syk
        route("/student", "/submitPages/student/index", "student", "", true), // jh
        route("/artMusicSport", "/submitPages/artMusicSport/showArt", "artMusicSport", "", true), // syk
        route("/introduce", "/submitPages/student/introduce", "introduce", "", true), // jh
        route("/evaluate", "/submitPages/student/evaluate", "evaluate", "", true), // jh
        route("/login", "/login", "login", "", true), // jh
    ]
    //路由配置
const router = new VueRouter({
    // mode: 'history',    //把路径的#去掉,nginx还需要配置,否则404, 设置publicPath: '/'
    mode: 'hash', //会有#号,设置publicPath: './'
    base: '/front/',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫,判断用户是否登录,以及对路由里没有配置的情况进行404处理
// 路由跳转未匹配相应用路由避免出现空白页面
// router.beforeEach((to, from, next) => {
//     if (to.matched.length === 0) { //如果未匹配到路由
//         from.name ? next({
//             name: from.name
//         }) : next('/'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
//     } else {
//         if (to.path === '/login') {
//             next(); //如果匹配到正确跳转
//         } else {
//             let token = Cookies.get('EL-ADMIN-TOEKN');
//             if (token === null || token === '' || token === undefined) {
//                 next('/login');
//             } else {
//                 next();
//             }
//         }
//     }
// })

// 让每个路由跳转到的页面都默认滚动到顶部
router.afterEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    from.meta.fromURL = to.path;
    console.log(to.path)
    console.log(from.meta.fromURL)
})

export default router