const Docs = require("../../models/Docs");

exports.create = async (req, res, next) => {
  const { title, createdByUserId } = req.body;

  try {
    const newDocs = await Docs.create({
      title,
      createdByUserId,
    });

    res.json({ status: true, newDocs });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.typingDocs = async (req, res, next) => {
  const { typingText, _id } = req.body;

  try {
    const docs = await Docs.findOneAndUpdate(
      { _id },
      { $set: { content: typingText } }
    );

    res.json({ status: true, docs });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
