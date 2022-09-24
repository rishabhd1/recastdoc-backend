const OriginalFile = require('../models/OriginalFile');

async function upload(req, res) {
  try {
    const urls = req.files.map(async (file) => {
      const newFile = {
        url: file.location,
        name: file.key,
        type: file.mimetype,
        size: file.size,
      };

      await OriginalFile.create(newFile);

      return newFile;
    });

    const responseURLs = await Promise.all(urls);

    res.status(200).json(responseURLs);
  } catch (error) {
    console.log(error);
    res.status(502).json({
      message: 'Internal Server Error',
    });
  }
}

module.exports = {
  upload,
};
