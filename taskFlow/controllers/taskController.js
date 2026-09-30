const tasks = require("../data/tasks");
const getTasks = (req, res) => {
    let visibleTasks;
    if (req.user.role === "admin") {
        visibleTasks = tasks;
    } else {
        visibleTasks = tasks.filter(
            (task) => task.userId === req.user.id
        );
    }
    return res.status(200).json({
        success: true,
        tasks: visibleTasks
    });
};
const createTask = (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Le titre est requis"
        });
    }
    const newTask = {
        id: tasks.length + 1,
        title,
        userId: req.user.id
    };
    tasks.push(newTask);
    return res.status(201).json({
        success: true,
        task: newTask
    });
};
const deleteTask = (req, res) => {
    const taskId = Number(req.params.id);
    const index = tasks.findIndex(
        (task) => task.id === taskId
    );
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Tâche introuvable"
        });
    }
    const deletedTask = tasks.splice(index, 1)[0];
    return res.status(200).json({
        success: true,
        message: "Tâche supprimée",
        task: deletedTask
    });
};
module.exports = {
    getTasks,
    createTask,
    deleteTask
};