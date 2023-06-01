import { forEach, groupBy } from 'lodash-es';
import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

type DataBinder = {
    model: string;
    reference?: string;
    modifiers: { lazy: boolean; trim: boolean };
    opperator?: <V>(v: V, b?: DataBinder) => any;
};

const getEventType = (dom: Element, lazy: boolean) => {
    let eventType = 'change';
    if (dom instanceof HTMLInputElement || dom instanceof HTMLTextAreaElement) {
        if ('textarea' === dom.type || 'text' === dom.type) {
            eventType = lazy ? 'change' : 'input';
        }
    }
    return eventType;
};

export const useVModel = (emit: Function, ...binders: DataBinder[]) => {
    const refs: Record<string, Ref<Element | undefined>> = {};
    const dataBindEventHandlers: Record<string, (ev: Event) => any> = {};

    const groups = groupBy(binders, (bind) => (bind.reference ? bind.reference : bind.model));
    forEach(groups, (_binders, groupModelName) => {
        refs[`${groupModelName}Ref`] = ref();
        dataBindEventHandlers[groupModelName] = (ev: Event) => {
            const value = (ev.target as HTMLInputElement).value;
            _binders.forEach((_binder) => {
                emit(`update:${_binder.model}`, _binder.opperator ? _binder.opperator(value, _binder) : value);
            });
        };
    });

    const targetBinders = binders.filter((binder) => !binder.reference);

    onMounted(() => {
        targetBinders.forEach((binder) => {
            const groupModelName = binder.model;
            const dom = refs[`${groupModelName}Ref`].value;
            if (dom) {
                const { lazy } = binder.modifiers;
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
                const { lazy } = binder.modifiers;
                const eventType = getEventType(dom, lazy);
                dom.removeEventListener(eventType, dataBindEventHandlers[groupModelName]);
            }
        });
    });
    return refs;
};
