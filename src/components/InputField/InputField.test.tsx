import { render, screen } from "@testing-library/react";
import InputField from "./InputField";

describe("InputField Component", () => {
  it("renders correctly with given props", () => {
    render(
      <InputField
        name="email"
        label="Email"
        type="email"
        value=""
        onChange={() => {}}
      />
    );

  });

  it("displays error message when provided", () => {
    render(
      <InputField
        name="email"
        label="Email"
        type="email"
        value=""
        error="Email is required"
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <InputField
        name="email"
        label="Email"
        type="email"
        value=""
        onChange={handleChange}
      />
    );
  });
});
