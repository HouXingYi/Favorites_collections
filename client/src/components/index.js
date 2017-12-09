import Modal from './modal';
import Spin from './spin';
var UICom = {
    Modal,
    Spin
};
var install = function(Vue, opts = {}) {
    Object.keys(UICom).forEach(key => {
        Vue.component(key, UICom[key]);
    });
};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
UICom = Object.assign(UICom, {install});
export default UICom;