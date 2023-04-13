import { Ref } from 'vue';
export declare const useCheckClickOnElements: (
    enabled: Ref<boolean>,
    ...els: Array<Ref<HTMLElement | undefined>>
) => {
    isOnElement: Ref<boolean>;
};
