const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/expenseDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const ExpenseSchema = new mongoose.Schema({
  text: String,
  amount: Number,
});

const Expense = mongoose.model("Expense", ExpenseSchema);

app.get("/expenses", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

app.post("/expenses", async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.json(newExpense);
});

app.delete("/expenses/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
