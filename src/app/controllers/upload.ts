import { Request, Response } from 'express';
import { promisify as Promisify } from 'util';
import Multer from 'multer';
import setConfigMulter from '../../utils/config/multer';
import { MulterConfig } from '../../utils/config/routes/uploadOne.config';

const UploadController = {
    async uploadOne(req: Request, res: Response) {
        try {
            const multer = Promisify(
                Multer(setConfigMulter(MulterConfig)).single('file')
            );

            await multer(req, res);

            if (!req.file) {
                return res
                    .status(400)
                    .send({ message: 'Please upload a file!' });
            }

            return res.sendStatus(204);
        } catch (error) {
            if (error.message === 'LIMIT_FILE_SIZE') {
                return res.status(500).send({
                    message: `File size cannot be larger than ${MulterConfig}MB!`,
                });
            }

            if (error.message === 'INVALID_FILE_EXTNAME') {
                return res.status(400).send({
                    message: 'File type is invaliad',
                    FilesTypeAccept: MulterConfig.AllowFile,
                });
            }

            return res.status(400).send({
                message:
                    "Your request unfurtunally we can't tresolve, try again",
            });
        }
    },
};

export default UploadController;
