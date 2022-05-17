/// <reference types="multer" />
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
export declare class FileService {
    uploadFile(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
