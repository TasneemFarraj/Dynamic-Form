import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxField from "./CheckboxField";

describe("CheckboxField Component", () => {
  it("renders correctly", () => {
    render(
      <CheckboxField
        name="terms"
        label="Agree to Terms"
        checked={false}
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText("Agree to Terms")).toBeInTheDocument();
  });

  it("calls onChange when checkbox state changes", () => {
    const handleChange = jest.fn();
    render(
      <CheckboxField
        name="terms"
        label="Agree to Terms"
        checked={false}
        onChange={handleChange}
      />
    );
    fireEvent.click(screen.getByLabelText("Agree to Terms"));
    expect(handleChange).toHaveBeenCalledWith("terms", true);
  });

  it("displays error message when provided", () => {
    render(
      <CheckboxField
        name="terms"
        label="Agree to Terms"
        checked={false}
        error="You must agree to the terms"
        onChange={() => {}}
      />
    );
    expect(screen.getByText("You must agree to the terms")).toBeInTheDocument();
  });
});
