import { fileURLToPath } from 'node:url';
import { configDefaults, defineProject } from 'vitest/config';

export default defineProject({
    test: {
        environment: 'node',
        exclude: [...configDefaults.exclude, 'e2e/*'],
        root: fileURLToPath(new URL('./', import.meta.url))
    }
});
