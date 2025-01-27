import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button"; 

describe("Button Component", () => {
  it("should render the button with correct text", () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByText(/Submit/i);
    expect(button).toBeInTheDocument();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button type="submit" disabled={true}>Submit</Button>);

    const button = screen.getByText(/Submit/i);
    expect(button).toBeDisabled();
  });

  it("should be enabled when disabled prop is false", () => {
    render(<Button type="submit" disabled={false}>Submit</Button>);

    const button = screen.getByText(/Submit/i);
    expect(button).toBeEnabled();
  });

  it("should trigger onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button type="submit" onClick={handleClick}>Submit</Button>);

    const button = screen.getByText(/Submit/i);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render correctly when no onClick handler is provided", () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByText(/Submit/i);
    fireEvent.click(button);
  });
});
