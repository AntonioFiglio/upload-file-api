import { Options, diskStorage } from 'multer';
import crypto from 'crypto';
import path from 'path';
import IMulterConfig from 'src/utils/interfaces/ConfigMulter';

function setConfigMulter({
    QuantityLimit,
    FileSize,
    AllowFile,
}: IMulterConfig): Options {
    const config: Options = {
        dest: path.join(__dirname, '../../../files/upload/static/cache/'),

        storage: diskStorage({
            destination: path.join(
                __dirname,
                '../../../files/upload/static/cache/'
            ),
            filename: (req, file, cb) => {
                const date: string = new Date()
                    .getTime()
                    .toString()
                    .replace(/[\/\\:]/g, '_');
                const hash = crypto.randomBytes(24).toString('base64');
                const filename = `${hash}-${date}${path.extname(
                    file.originalname
                )}`;

                return cb(null, filename);
            },
        }),

        limits: {
            files: QuantityLimit,
            fileSize: FileSize ? FileSize * 1024 * 1024 : undefined,
        },

        fileFilter: (req, file, cb): void => {
            if (AllowFile) {
                const FileExtname = path
                    .extname(file.originalname)
                    .replace('.', '');

                if (AllowFile.includes(FileExtname)) {
                    return cb(null, true);
                } else {
                    cb(new Error('INVALID_FILE_EXTNAME'));
                }
            }
        },
    };

    return config;
}

export default setConfigMulter;
