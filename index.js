import originalAdapter from '@sveltejs/adapter-node';
import { fileURLToPath } from 'node:url';
export default function(opts = {}) {
    const originalResult = originalAdapter(opts);
    originalResult.name = '@svelte-zone/adapter-node';
    const newResult = {
        ...originalResult
    };

    newResult.adapt = (builder) => {
        const ownHandler = fileURLToPath(new URL('./injectedHandler.js', import.meta.url).href);
        builder.originalCopy = builder.copy;
        builder.copy = function(files, out, opts) {
            opts.replace.HANDLER = ownHandler;
            return builder.originalCopy(files, out, opts);
        }

        return originalResult.adapt(builder);
    }

    newResult.name = '@svelte-zone/adapter-node-ws';



    return newResult;
}