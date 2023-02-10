import { Modal, Button, Stack } from "react-bootstrap";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils/utils.js";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized" }
      : budgets.find((budget) => budget.id === budgetId);

  const expenses = getBudgetExpenses(budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {UNCATEGORIZED_BUDGET_ID !== budgetId && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budgetId);
                  handleClose();
                }}
              >
                Delete Budget
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack
              direction="horizontal"
              key={expense.id}
              gap="2"
              // className="align-items-center"
            >
              <div className="me-auto fs-4">{expense.desc}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => {
                  deleteExpense(expense.id);
                  console.log("delete");
                }}
                size="sm"
                variant="outline-dange"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
