import { forEach, groupBy } from 'lodash-es';

import { getCurrentInstance, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';

type InputModelDataBinder = {
    /**
     * modeName
     */
    model: string;
    /**
     * 关联的 model 名称
     * 比如：隐藏域根据输入内容进行双向绑定，择`reference`为输入项的 modelName
     */
    reference?: string;
    /**
     * v-model修饰符
     */
    modifiers?: { lazy: boolean; trim: boolean };
    /**
     * 数据自定义处理
     *
     * @param v 数据值
     * @param b 当前Binder
     * @returns 处理后的数据
     */
    opperator?: <V>(v: V, b?: InputModelDataBinder) => any;
};

const isSelectElement = (dom: any): dom is HTMLInputElement => {
    return 'checkbox' === dom.type || 'radio' === dom.type;
};

const isTextElement = (dom: any): dom is HTMLInputElement => {
    return 'text' === dom.type || 'password' === dom.type;
};

const isTextareaElement = (dom: any): dom is HTMLTextAreaElement => {
    return 'textarea' === dom.type;
};

const getEventType = (dom: Element, lazy?: boolean) => {
    let eventType = 'change';
    if (dom instanceof HTMLInputElement || dom instanceof HTMLTextAreaElement) {
        if (isTextElement(dom) || isTextareaElement(dom)) {
            eventType = lazy ? 'change' : 'input';
        } else if (isSelectElement(dom)) {
            eventType = 'change';
        }
    }
    return eventType;
};

export const useInputVModel = (emit: Function, ...binders: InputModelDataBinder[]) => {
    const refs: Record<string, Ref<HTMLElement | undefined>> = {};
    const dataBindEventHandlers: Record<string, (ev: Event) => any> = {};

    const instance = getCurrentInstance();

    const groups = groupBy(binders, (bind) => (bind.reference ? bind.reference : bind.model));
    forEach(groups, (_binders, groupModelName) => {
        refs[`${groupModelName}Ref`] = ref();

        watch(
            () => instance?.props[groupModelName],
            (_modelValue) => {
                _binders.forEach((_binder) => {
                    if (_binder.reference) {
                        emit(`update:${_binder.model}`, _binder.opperator ? _binder.opperator(_modelValue, _binder) : _modelValue);
                    }
                });
            }
        );

        dataBindEventHandlers[groupModelName] = (ev: Event) => {
            const { target } = ev;
            let value: any;

            if (isSelectElement(target)) {
                value = target.checked;
            } else if (isTextElement(target)) {
                value = target.value;
            } else if (isTextareaElement(target)) {
                value = target.value;
            }

            _binders.forEach((_binder) => {
                if (!_binder.reference) {
                    emit(`update:${_binder.model}`, _binder.opperator ? _binder.opperator(value, _binder) : value);
                }
            });
        };
    });

    const targetBinders = binders.filter((binder) => !binder.reference);

    onMounted(() => {
        targetBinders.forEach((binder) => {
            const groupModelName = binder.model;
            const dom = refs[`${groupModelName}Ref`].value;
            if (dom) {
                const { lazy } = binder.modifiers || {};
                const eventType = getEventType(dom, lazy);
                dom.addEventListener(eventType, dataBindEventHandlers[groupModelName]);
            }
        });
    });

    onBeforeUnmount(() => {
        targetBinders.forEach((binder) => {
            const groupModelName = binder.model;
            const dom = refs[`${groupModelName}Ref`].value;
            if (dom) {
                const { lazy } = binder.modifiers || {};
                const eventType = getEventType(dom, lazy);
                dom.removeEventListener(eventType, dataBindEventHandlers[groupModelName]);
            }
        });
    });
    return refs;
};
