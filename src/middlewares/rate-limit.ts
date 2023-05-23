import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
});

export default authLimiter;
