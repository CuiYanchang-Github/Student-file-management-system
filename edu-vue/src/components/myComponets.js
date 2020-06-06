import upload from './upload.vue';
import SearchCollege from './SearchCollege.vue';
import SearchProfession from './SearchProfession.vue';
import SearchClass from './SearchClass.vue';
import SearchGrade from './SearchGrade.vue';

const components = [//统一把组件注册在全局
    upload,
    SearchCollege,
    SearchProfession,
    SearchClass,
    SearchGrade,
];
const install = function(Vue) {
    components.forEach((component) => {
        Vue.component(component.name, component);
    });
};
export default { install };