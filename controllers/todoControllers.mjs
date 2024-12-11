import Todo from "../models/todo.mjs";
import { todoSchema } from "../schema/todoSchema.mjs";

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { error } = todoSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description } = req.body;
    const todo = await Todo.create({
      title: title,
      description: description,
      user: req.user._id,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to add todo", error });
  }
};


export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, description } = req.body;

    const { error } = todoSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const dbTodo = await Todo.find(todoId);

    if (!dbTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    dbTodo.title = title || dbTodo.title;
    dbTodo.description = description || dbTodo.description;

    await dbTodo.save();
    res.status(200).json(dbTodo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo", error });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const dbTodo = await Todo.findById(todoId);

    if (!dbTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (String(dbTodo.user) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this todo" });
    }

    await dbTodo.deleteOne();
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error });
  }
};
