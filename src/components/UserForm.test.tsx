import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserForm from "./UserForm";

describe("UserForm Component", () => {
  it("renders all fields", () => {
    render(<UserForm />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Agree to Terms/i)).toBeInTheDocument();
  });

  it("validates required fields", () => {
    render(<UserForm />);

    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByText(/Full Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email Address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone Number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Age is required/i)).toBeInTheDocument();
    expect(screen.getByText(/You must agree to the terms/i)).toBeInTheDocument();
  });

  it("submits the form when all fields are valid", () => {
    render(<UserForm />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: "Tasneem Farraj" } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: "tasneemfarraj@gmail.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "Password@123" } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: 22 } });
    fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: "Jordan" } });
    fireEvent.click(screen.getByLabelText(/Agree to Terms/i));

    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.queryByText(/is required/i)).toBeNull();
    expect(screen.queryByText(/invalid/i)).toBeNull();
  });
});
