import {handler as originalHandler} from "@sveltejs/adapter-node/files/handler.js";
/** @param {import('polka').Middleware[]} handlers */
function sequence(handlers) {
    /** @type {import('polka').Middleware} */
    return (req, res, next) => {
        /**
         * @param {number} i
         * @returns {ReturnType<import('polka').Middleware>}
         */
        function handle(i) {
            if (i < handlers.length) {
                return handlers[i](req, res, () => handle(i + 1));
            } else {
                return next();
            }
        }

        return handle(0);
    };
}

const handler = sequence([
    async (req, res, next) => {
        console.log(originalHandler);

        next();
    }
]);

export {handler};