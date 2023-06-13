import { PropType } from 'vue';
import { BaseProps } from './base-props';
import { OThemeColor, OThemeSize } from './types';

/**
 * 复杂对象说明
 */
interface User {
    /**
     * 姓名
     */
    name: string;
    /**
     * 年龄
     */
    age: number;
}

/**
 * 对象描述
 */
interface AdvanceType {
    /**
     * 属性a描述
     */
    a: Array<User>;
    /**
     * 属性b描述
     */
    b: number;
}

export const ButtonProps = {
    ...BaseProps,
    /**
     * 图标名称
     *
     * 例如：
     * &lt;i class=&quot;fa-solid fa-address-book&quot;&gt;&lt;/i&gt;
     * 描述的是 `fas` 风格的 `address-book`。
     *
     * 组件配置如下：
     * `prefix`="fas"
     * `icon`="address-book"
     * 或
     * 不设置 `prefix`
     * 设置`icon` 为 `IconDefinition`类型
     *
     * <pre>
     * `import { faCamera } from '@fortawesome/pro-solid-svg-icons';`
     * // faCamera 为`IconDefinition`类型
     * </pre>
     * [查询图标](https://fontawesome.com/search?m=free)
     */
    icon: {
        type: [String, Object] as PropType<IconName | IconDefinition>,
        required: true
    },
    arr: {
        type: Array as PropType<AdvanceType[]>
    },
    /**
     * 尺寸
     * @prop
     * @values `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
     */
    size: {
        type: String as PropType<OThemeSize>,
        required: true,
        default: 'md',
        validator: (value: string) => {
            // 这个值必须匹配下列字符串中的一个
            return ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].indexOf(value) !== -1;
        }
    },
    /**
     * 颜色
     * @prop
     * @values `default`, `primary`, `success`, `warning`, `danger`
     */
    color: {
        type: String as PropType<OThemeColor>,
        default: 'default',
        validator: (value: string) => {
            // 这个值必须匹配下列字符串中的一个
            return ['default', 'primary', 'success', 'warning', 'danger'].indexOf(value) !== -1;
        }
    },
    /**
     * 形状可选
     * @prop
     * @values `circle` 圆形, `square` 正方形, `ellipse` 椭圆形
     */
    shape: {
        type: String
    },
    /**
     * 是否禁用按钮
     * @prop
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * 模式
     * @values `light` 模式1,`empty` 模式2,`link` 模式3
     */
    mode: {
        type: String as PropType<'light' | 'empty' | 'link'>,
        validator: (value: string) => {
            // 这个值必须匹配下列字符串中的一个
            return ['light', 'empty', 'link'].indexOf(value) !== -1;
        }
    }
} as const;
