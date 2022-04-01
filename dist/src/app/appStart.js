"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { PORT, NODE_ENV } = process.env;
exports.default = (app) => {
    // Start server if not in test mode
    if (NODE_ENV !== 'test') {
        app.listen(PORT, () => {
            console.log(`App running on port: ${PORT}`);
        });
    }
};
