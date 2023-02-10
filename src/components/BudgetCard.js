import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "../utils/utils.js";

function BudgetCard({ name, amount, max, gray, onAddExpenseClick }) {
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }
  return (
    <>
      <Card className={classNames.join(" ")}>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-item-baseline fw-normal mb-3">
            <div className="me-2">{name}</div>
            <div className="d-flex align-items-baseline">
              {currencyFormatter.format(amount)}
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            </div>
          </Card.Title>
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary">View Expenses</Button>
          </Stack>
        </Card.Body>
      </Card>
    </>
  );
}

function getProgressBarVariant(amount, max) {
  const percentage = (amount / max) * 100;
  if (percentage < 50) {
    return "primary";
  } else if (percentage < 75) {
    return "warning";
  } else {
    return "danger";
  }
}

export default BudgetCard;
