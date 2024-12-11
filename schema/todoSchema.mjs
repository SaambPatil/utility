import Joi from "joi";

export const todoSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title must be at most 100 characters long",
    "any.required": "Title is required",
  }),
  description: Joi.string().min(5).max(500).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 5 characters long",
    "string.max": "Description must be at most 500 characters long",
    "any.required": "Description is required",
  }),
});
