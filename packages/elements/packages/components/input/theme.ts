import type Color from 'color';

/**
 * 输入框主题
 */
export interface InputTheme {
    /**
     * 边框颜色
     */
    color_border: Color;
    /**
     * 文本颜色
     */
    color_text: Color;
    color_placement: Color;
    color_shadow: Color;
    color_primary: Color;
    size_gap: string;
    size_font_size: string;
    size_height: string;
    size_line_height: string;
    size_border_width: string;
}
