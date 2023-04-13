import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import { Button } from '.';

describe('test 1 + 1', () => {
    it('= 2', () => {
        const wrap = mount(Button, {
            slots: {
                default: 'hello word'
            }
        });

        expect(wrap.text()).toContain('hello word');
    });
});
