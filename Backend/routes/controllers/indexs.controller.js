const Docs = require("../../models/Docs");

exports.showMainPage = async (_, res, next) => {
  try {
    const docses = await Docs.find({}).populate("createdByUserId").lean();

    return res.json({ status: true, docses });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.showMyDocs = async (req, res, next) => {
  try {
    const myDocs = await Docs.find({ createdByUserId: req.params.id })
      .populate("createdByUserId")
      .lean();

    return res.json({ status: true, myDocs });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
