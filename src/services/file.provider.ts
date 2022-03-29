import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: 'gson007',
      api_key: '675593585131373',
      api_secret: 'kARcRbIuXfLLLA-SyLORCyJpHhI',
    });
  },
};
