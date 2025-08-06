const Task = require("../models/taskModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Get all tasks
exports.getTasks = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: tasks });
});

// Get a single task by ID
exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) return next(new AppError("Task not found", 404));

  res.status(200).json({ success: true, data: task });
});

// Create a new task
exports.createTask = catchAsync(async (req, res, next) => {
  const userId = req.user.id; 
  console.log("Creating task for user ID:", userId);
  
  const task = await Task.create({ ...req.body, userId });
  res.status(201).json({ success: true, data: task });
});

// Update an existing task
exports.updateTask = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId },
    req.body,
    { new: true }
  );

  if (!task) return next(new AppError("Task not found or not authorized", 404));

  res.status(200).json({ success: true, data: task });
});


// Delete a task
exports.deleteTask = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const task = await Task.findOneAndDelete({ _id: req.params.id, userId });

  if (!task) return next(new AppError("Task not found or not authorized", 404));

  res.status(200).json({ success: true, message: "Task deleted" });
});
