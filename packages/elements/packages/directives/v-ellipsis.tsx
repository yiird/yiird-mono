import { isArray, isFunction, isObject, isString, throttle } from 'lodash-es';
import { ResizeObserver } from 'resize-observer';
import { Text, computed, defineComponent, isProxy, isVNode, ref, render, watch, type Directive, type VNode, type VNodeNormalizedChildren } from 'vue';
import { styleValueToNumber } from '../common/dom-utils';
import { isMultiLineEllipsis, isSingleLineEllipsis, type MultiLineEllipsis, type SingleLineEllipsis } from '../types/global';

type Indexes = Array<{ vnode: VNode; start: number; end: number; text: string; showText: string }>;

const GLOBAL_ELLIPSIS_LISENERS = new Map<number, Function>();
const GLOBAL_RESIZEOBSERVERS = new Map<number, ResizeObserver>();

const ExpandText = defineComponent({
    props: {
        text: {
            type: Object,
            required: true
        }
    },
    emits: ['click'],
    setup(props, { emit }) {
        return () => {
            return (
                <a
                    href=''
                    onClick={() => emit('click')}>
                    {props.text.value}
                </a>
            );
        };
    }
});

export const ellipsis: Directive<HTMLElement, SingleLineEllipsis | MultiLineEllipsis> = {
    updated(el, binding, vnode) {
        const { children } = vnode;
        const { value, instance } = binding;
        if (!value || !children || !instance?.$.uid) return;
        const uid = instance.$.uid;
        GLOBAL_ELLIPSIS_LISENERS.get(uid);
    },
    mounted(el, binding, vnode) {
        const { children } = vnode;
        const { value, instance } = binding;
        if (!value || !children || !instance?.$.uid) return;

        const uid = instance.$.uid;
        el.title = el.innerText;

        if (isMultiLineEllipsis(value) && value.expandText) {
            const expandFlag = ref(false);
            const obtainText = computed(() => {
                const expandText = value.expandText || '展开';
                const collapseText = value.collapseText || '收起';
                return expandFlag.value ? collapseText : expandText;
            });
            render(
                <ExpandText
                    onClick={() => {
                        expandFlag.value = !expandFlag.value;

                        if (expandFlag.value) {
                            observer.unobserve(el);
                            rollback(indexes);
                        } else {
                            setEllipsis(el, indexes, value.rows, suffixStr);
                            observer.observe(el);
                        }
                    }}
                    text={obtainText}></ExpandText>,
                el,
                false
            );
        }
        const indexes: Indexes = flatIndexes(children);

        const suffixStr = value.suffix;

        const ellipsis = throttle(
            () => {
                rollback(indexes);
                if (isMultiLineEllipsis(value)) {
                    setEllipsis(el, indexes, value.rows, suffixStr);
                } else if (isSingleLineEllipsis(value)) {
                    setSingleEllipsis(el, indexes, value.length, suffixStr);
                }
            },
            5,
            { leading: true, trailing: false }
        );

        GLOBAL_ELLIPSIS_LISENERS.set(uid, ellipsis);

        if (isProxy(value)) {
            watch(value, () => {
                ellipsis();
            });
        }
        const observer = new ResizeObserver(ellipsis);
        observer.observe(el);
        GLOBAL_RESIZEOBSERVERS.set(uid, observer);
    },
    unmounted(el, { instance }) {
        const uid = instance!.$.uid;
        GLOBAL_RESIZEOBSERVERS.get(uid)?.disconnect();
        GLOBAL_RESIZEOBSERVERS.delete(uid);
    }
};

const setSingleEllipsis = (el: HTMLElement, indexes: Indexes, length: number = 0, suffix: string = ' ...') => {
    if (length) {
        const lineHeight = styleValueToNumber(getComputedStyle(el).lineHeight);
        const maxHeight = lineHeight * 1;
        const cutPosition = length;
        cutText(false, el, indexes, cutPosition, maxHeight, lineHeight, suffix);
    } else {
        setEllipsis(el, indexes, 1, suffix);
    }
};

const setEllipsis = (el: HTMLElement, indexes: Indexes, rows: number, suffix: string = ' ...') => {
    const lineHeight = styleValueToNumber(getComputedStyle(el).lineHeight);
    const maxHeight = lineHeight * rows;
    const length = el.innerText.length;
    if (el.clientHeight <= maxHeight) {
        return length;
    }
    let step = Math.floor(length / 4);
    let tryLength = length - step - 1;
    // console.log('step::', step);

    let flag = cutText(true, el, indexes, tryLength, maxHeight, lineHeight, suffix);

    while (!(1 === step && 0 === flag)) {
        step = Math.ceil(step / 2);
        if (flag <= 0) {
            tryLength = tryLength + step;
            flag = cutText(true, el, indexes, tryLength, maxHeight, lineHeight, suffix);
        } else if (flag > 0) {
            tryLength = tryLength - step;
            flag = cutText(true, el, indexes, tryLength, maxHeight, lineHeight, suffix);
        }
    }

    cutText(false, el, indexes, tryLength - 1, maxHeight, lineHeight, suffix);
    return tryLength;
};

const rollback = (indexes: Indexes) => {
    indexes
        .filter((index) => index.showText !== index.text)
        .forEach((index) => {
            if (index?.vnode.el) {
                index.vnode.el.textContent = index.text;
                index.showText = index.text;
            }
        });
};

const cutText = (tryIt: boolean, rootEl: HTMLElement, indexes: Indexes, tryLength: number, maxHeight: number, lineHeight: number, suffix: string) => {
    const index = indexes.find((index) => tryLength >= index.start && tryLength <= index.end);
    let flag = 0;
    if (index?.vnode.el) {
        // console.log('before:', rootEl.clientHeight);
        const substr = index.text.substring(0, tryLength - index.start);
        index.vnode.el.textContent = substr + suffix;
        // console.log(lineHeight, maxHeight - rootEl.clientHeight);
        if (rootEl.clientHeight > maxHeight) {
            flag = 1;
        } else if (maxHeight - rootEl.clientHeight >= lineHeight) {
            flag = -1;
        }
        if (tryIt) {
            index.vnode.el.textContent = index.text;
        } else {
            index.showText = substr;
        }
        // console.log('after:', rootEl.clientHeight);
    }
    return flag;
};

const flatIndexes = (nodes: VNodeNormalizedChildren, count = { c: 0 }) => {
    const indexes: Indexes = [];

    if (isArray(nodes)) {
        nodes.forEach((node) => {
            if (isVNode(node)) {
                const { children } = node;

                if (Text === node.type) {
                    if (isString(children)) {
                        const start = count.c;
                        const end = start + children.length - 1 || 0;
                        count.c = end + 1;
                        indexes.push({
                            vnode: node,
                            start,
                            end,
                            text: children,
                            showText: children
                        });
                    }
                }

                indexes.push(...flatIndexes(children, count));
            }
        });
    } else if (isObject(nodes)) {
        Object.values(nodes).forEach((child) => {
            if (isFunction(child)) {
                indexes.push(...flatIndexes(child(), count));
            }
        });
    }

    return indexes;
};
