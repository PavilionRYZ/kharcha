import rateLimit from "../config/uptash.js";

export const rateLimiter = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { success } = await rateLimit.limit(userId);
    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (error) {
    console.log("Error During Rate Limiter:", error);
    res.status(400).json({ message: "Internal server Error" });
  }
};
