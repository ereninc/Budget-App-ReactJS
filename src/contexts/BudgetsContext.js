import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorate from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorate("budgets", []);
  const [expenses, setExpenses] = useLocalStorate("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addExpense({ desc, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), desc, amount, budgetId }];
    });
  }

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  function deleteBudget(budgetId) {
    //TODO: deal with expenses
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== budgetId);
    });
  }

  function deleteExpense(expenseId) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== expenseId);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
