const express = require("express");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

const tasks = [
    {
        id: 1,
        title: "Faire le rapport",
        userId: 1
    },
    {
        id: 2,
        title: "Configurer JWT",
        userId: 1
    },
    {
        id: 3,
        title: "Gérer les utilisateurs",
        userId: 2
    }
];

router.use(authenticateToken);

router.get("/", (req, res) => {


    let visibleTasks;

    if (req.user.role === "admin") {
        visibleTasks = tasks;
    } else {
        visibleTasks = tasks.filter(
            task => task.userId === req.user.id
        );
    }

    return res.status(200).json({
        success: true,
        tasks: visibleTasks
    });
});

module.exports = router;