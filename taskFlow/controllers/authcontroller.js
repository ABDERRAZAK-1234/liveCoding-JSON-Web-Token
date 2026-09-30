const jwt = require("jsonwebtoken");
const users = require("../data/users");
const login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(
        (user) =>
            user.email === email &&
            user.password === password
    );
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Identifiants invalides"
        });
    }
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );
    return res.status(200).json({
        success: true,
        token
    });
};
module.exports = {
    login
};
