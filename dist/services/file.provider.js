"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: 'gson007',
            api_key: '675593585131373',
            api_secret: 'kARcRbIuXfLLLA-SyLORCyJpHhI',
        });
    },
};
//# sourceMappingURL=file.provider.js.map