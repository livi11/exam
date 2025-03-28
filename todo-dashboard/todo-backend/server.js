require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Debugging: Check if `.env` is loading properly
console.log("MONGO_URI from .env:", process.env.MONGO_URI);

// Use environment variable or fallback to a hardcoded MongoDB URI
const mongoUri = process.env.MONGO_URI || "mongodb+srv://livi_11:Itmd1NaxweXLP0Cb@cluster0.sadt661.mongodb.net/todo_db?retryWrites=true&w=majority";

// ✅ Fix: Remove deprecated options from MongoDB connection
mongoose.connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Create a schema for Todo
const TodoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

// API Routes

// Add a new todo
app.post("/todos", async (req, res) => {
  try {
    const todo = new Todo({ text: req.body.text, completed: req.body.completed });
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to add todo" });
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
