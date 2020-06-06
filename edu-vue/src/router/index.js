import Vue from 'vue';
import VueRouter from 'vue-router';
import Manage from '../views/Manage';
import Login from '../views/Login';
import Class from '../views/Class';
import College from '../views/College';
import Grade from '../views/Grade';
import Profession from '../views/Profession';
import User from '../views/User';
import Student from '../views/Student';
import StudentDetail from '../views/StudentDetail';
import Announcement from '../views/Announcement';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect() {
            if (localStorage.userInfo) {
                return '/announcement';
            } else {
                return '/login';
            }
        },
    },
    {
        path: '/manage',
        name: 'Manage',
        component: Manage,
        children: [{
                path: '/class',
                name: 'Class',
                component: Class,
            },
            {
                path: '/college',
                name: 'College',
                component: College,
            },
            {
                path: '/grade',
                name: 'Grade',
                component: Grade,
            },
            {
                path: '/profession',
                name: 'Profession',
                component: Profession,
            },
            {
                path: '/user',
                name: 'User',
                component: User,
            },
            {
                path: '/student',
                name: 'Student',
                component: Student,
            },
            {
                path: '/student-detail',
                name: 'StudentDetail',
                component: StudentDetail,
            },
            {
                path: '/announcement',
                name: 'Announcement',
                component: Announcement,
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
];

const router = new VueRouter({
    routes,
});

export default router;