
import ExpenseForm from "../components/ExpenseForm";
import { render, screen } from "@testing-library/react";
describe("Expense components",()=> {
  test("check add Expense button",() => {
    render(<ExpenseForm/>)
    const ExpenseButton = screen.getByText("Add Expense",{exact:false})
    expect(ExpenseButton).toBeInTheDocument()
  })
})