import { GlobalVariables, Theme } from './theme';

const variables: GlobalVariables = {
	fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
	fontRemBaseSize: '16px',
	colorTextPrimary: '#303133',
	colorTextSecondary: '#606266',
	colorTextLight: '#909399',
	colorTextLightest: '#C0C4CC',
	colorPrimary: '64,158,255',
	colorSuccess: '103,194,58',
	colorWarning: '230,162,60',
	colorDanger: '245,108,108',
	colorInfo: '144,147,153',
	colorBorderPrimary: '#DCDFE6',
	colorBorderSecondary: '#E4E7ED',
	colorBorderLight: '#EBEEF5',
	colorBorderLightest: '#F2F6FC',
	colorBgOpaque: '#FFFFFF',
	colorBgTransparent: 'transparent',
	lineHeight: '2rem'
};
export const ThemeNormal = new Theme<GlobalVariables>('global', variables);
