const { getMyGrievances, createGrievance } = require("./grievance.service");

const getMine = async (req, res) => {
  try {
    const data = await getMyGrievances(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch grievances" });
  }
};

const create = async (req, res) => {
  try {
    const data = await createGrievance(req.user.id, req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to create grievance" });
  }
};

module.exports = {
  getMine,
  create,
};
