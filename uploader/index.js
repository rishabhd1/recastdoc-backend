const { S3Client } = require('@aws-sdk/client-s3');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const murmurhash = require('murmurhash');
const { Sequelize } = require('sequelize');

const app = express();
const sequelize = new Sequelize(
  'postgres://postgres:postgres@db:5432/recastdoc'
);
const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const upload = multer({
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

app.post('/v1/upload', upload.array('files', 3), (req, res) => {
  const urls = req.files.map((file) => {
    return {
      url: file.location,
      name: file.key,
      type: file.mimetype,
      size: file.size,
    };
  });

  res.json(urls);
});

app.listen(3000, () => {
  console.log('App Started');
});
