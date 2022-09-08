exports.upload = (req, res) => {
  const urls = req.files.map((file) => {
    return {
      url: file.location,
      name: file.key,
      type: file.mimetype,
      size: file.size,
    };
  });

  res.json(urls);
};
