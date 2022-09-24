const OriginalFile = require('../models/OriginalFile');

async function upload(req, res) {
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

  console.log(JSON.stringify(responseURLs));

  res.status(200).json(responseURLs);
}

module.exports = {
  upload,
};
