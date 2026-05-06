const { createHostApplication } = require("./host.application.service");

const applyHost = async (req, res) => {
  try {
    const host = await createHostApplication(req.body);
    res.status(201).json({
      message: "Application submitted",
      host,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to submit application",
    });
  }
};

module.exports = {
  applyHost,
};
