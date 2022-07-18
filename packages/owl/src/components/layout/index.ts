import Footer from './o-footer.vue';
import Header from './o-header.vue';
import Layout from './o-layout.vue';
import Main from './o-main.vue';
import SiderLeft from './o-sider-left.vue';
import SiderRight from './o-sider-right.vue';
export * from './definition';
export { Layout, Header, Footer, Main, SiderLeft, SiderRight };

export type LayoutInstance = InstanceType<typeof Layout>;
export type HeaderInstance = InstanceType<typeof Header>;
export type FooterInstance = InstanceType<typeof Footer>;
export type MainInstance = InstanceType<typeof Main>;
export type SiderLeftInstance = InstanceType<typeof SiderLeft>;
export type SiderRightInstance = InstanceType<typeof SiderRight>;
