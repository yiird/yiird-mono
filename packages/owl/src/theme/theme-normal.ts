import { Theme, Variables } from './theme';

const variables: Variables = {
	fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
	fontRemBaseSize: '16px',
	colorTextPrimary: '#303133',
	colorTextSecondary: '#606266',
	colorTextLight: '#909399',
	colorTextLightest: '#C0C4CC',
	colorPrimary: '#409EFF',
	colorSuccess: '#67C23A',
	colorWarning: '#E6A23C',
	colorDanger: '#F56C6C',
	colorInfo: '#909399',
	colorBorderPrimary: '#DCDFE6',
	colorBorderSecondary: '#E4E7ED',
	colorBorderLight: '#EBEEF5',
	colorBorderLightest: '#F2F6FC',
	colorBgOpaque: '#FFFFFF',
	colorBgTransparent: 'transparent',
	sizeXXS: '0.8rem',
	sizeStep: '0.5rem'
};
export const ThemeNormal = new Theme('o', 'global', variables);
