import { Header } from './Style';

export const PropHeaders: Header[] = [
    {
        name: 'name',
        label: '名称',
        display: true,
        align: 'l'
    },
    {
        name: 'type',
        label: '类型',
        display: true,
        align: 'c'
    },
    {
        name: 'isRequired',
        label: '必填',
        display: true,
        align: 'c'
    },
    {
        name: 'values',
        label: '可选值',
        display: true,
        align: 'l'
    },
    {
        name: 'defaultValue',
        label: '默认值',
        display: true,
        align: 'l'
    },
    {
        name: 'description',
        label: '描述',
        display: true,
        align: 'l'
    }
];

export const SlotHeaders: Header[] = [
    {
        name: 'name',
        label: '名称',
        display: true,
        align: 'l'
    },
    {
        name: 'args',
        label: '参数',
        display: true,
        align: 'l'
    },
    {
        name: 'description',
        label: '描述',
        display: true,
        align: 'l'
    }
];

export const EventHeaders: Header[] = [
    {
        name: 'name',
        label: '名称',
        display: true,
        align: 'l'
    },
    {
        name: 'args',
        label: '参数',
        display: true,
        align: 'l'
    },
    {
        name: 'description',
        label: '描述',
        display: true,
        align: 'l'
    }
];
