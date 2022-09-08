const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const murmurhash = require('murmurhash');

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

exports.s3Upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'recastdoc',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // File output:
      // {
      // 	fieldname: 'files',
      // 	originalname: 'sample.pdf',
      // 	encoding: '7bit',
      // 	mimetype: 'application/pdf'
      // }

      const fileID = murmurhash.v3(file.originalname, Date.now());
      const extension = file.mimetype.split('/')[1];

      cb(null, `${fileID}.${extension}`);
    },
    location: function () {},
  }),
});
