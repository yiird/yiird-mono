import { GlobalVariables, Theme } from './theme';

const variables: GlobalVariables = {
	//fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
	fontFamily: 'Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif',
	fontRemBaseSize: '14px',
	colorTextPrimary: '48,49,51',
	colorTextSecondary: '96,98,102',
	colorTextLight: '144,147,153',
	colorTextLightest: '192,196,204',
	colorPrimary: '64,158,255',
	colorSuccess: '103,194,58',
	colorWarning: '230,162,60',
	colorDanger: '245,108,108',
	colorInfo: '144,147,153',
	colorBorderPrimary: '220,223,230',
	colorBorderSecondary: '228,231,237',
	colorBorderLight: '235,238,245',
	colorBorderLightest: '242,246,252',
	colorBgOpaque: '255,255,255',
	colorBgTransparent: '0,0,0,0',
	lineHeightBase: '2rem'
};
export const ThemeNormal = new Theme<GlobalVariables>('global', variables);
