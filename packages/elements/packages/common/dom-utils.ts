export const getElementById = (id: string) => document.getElementById(id);

export const styleValueToNumber = (value: string) => {
    return Number(value.replace(/[a-z|\W]*/g, ''));
};

export const getTargetHeight = (target: Element) => {
    return styleValueToNumber(getComputedStyle(target).height);
};

export const getTargetHeightById = (targetId: string) => {
    const target = getElementById(targetId);
    if (target) return styleValueToNumber(getComputedStyle(target).height);
    else return 0;
};
