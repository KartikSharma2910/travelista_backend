const { registerUser, loginUser } = require("./auth.service");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../utils/jwt");
const { registerSchema, loginSchema } = require("./auth.validation");

const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const user = await registerUser(validatedData);
    const accessToken = generateAccessToken({
      id: user.id,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      id: user.id,
      role: user.role,
    });

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const user = await loginUser(validatedData.email, validatedData.password);
    const accessToken = generateAccessToken({
      id: user.id,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      id: user.id,
      role: user.role,
    });

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch user",
    });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token required" });
    }
    const decoded = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    const newAccessToken = generateAccessToken({
      id: user.id,
      role: user.role,
    });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid refresh token" });
  }
};

module.exports = {
  register,
  login,
  getMe,
  refresh,
};
