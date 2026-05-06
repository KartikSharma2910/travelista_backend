const {
  createHost,
  getAllHosts,
  getHostById,
  updateHost,
  deleteHost,
  getSavedHosts,
  saveHost,
  removeHost,
} = require("./host.service");

const { createHostSchema, updateHostSchema } = require("./host.validation");

const create = async (req, res) => {
  try {
    const validatedData = createHostSchema.parse(req.body);
    const host = await createHost(req.user.id, validatedData);
    res.status(201).json({
      message: "Host profile created",
      host,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const hosts = await getAllHosts();
    res.json(hosts);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch hosts",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const host = await getHostById(req.params.id);
    res.json(host);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch host",
    });
  }
};

const update = async (req, res) => {
  try {
    const validatedData = updateHostSchema.parse(req.body);
    const host = await updateHost(req.params.id, validatedData);

    res.json(host);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const host = await updateHostStatus(id, status);
  res.json(host);
};

const remove = async (req, res) => {
  try {
    await deleteHost(req.params.id);
    res.json({
      message: "Host deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "Delete failed",
    });
  }
};

const getSaved = async (req, res) => {
  const data = await getSavedHosts(req.user.id);

  res.json(
    data.map((h) => ({
      id: h.host.id,
      name: h.host.user?.name,
      city: h.host.city,
      bio: h.host.bio,
    })),
  );
};

const save = async (req, res) => {
  const data = await saveHost(req.user.id, req.params.id);
  res.json(data);
};

const removeCompletely = async (req, res) => {
  await removeHost(req.user.id, req.params.id);
  res.json({ success: true });
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  updateStatus,
  getSaved,
  save,
  removeCompletely,
};
