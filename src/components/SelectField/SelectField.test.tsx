import { render, screen, fireEvent } from "@testing-library/react";
import SelectField from "./SelectField";

describe("SelectField Component", () => {
  it("renders correctly with all provided options", () => {
    render(
      <SelectField
        name="country"
        label="Country"
        value=""
        options={["Jordan", "Egypt", "Syria"]}
        onChange={() => {}}
      />
    );

    const selectElement = screen.getByLabelText("Country");
    expect(selectElement).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0].textContent).toBe("Select a country"); 
    expect(options[1].textContent).toBe("Jordan");
    expect(options[2].textContent).toBe("Egypt");
    expect(options[3].textContent).toBe("Syria");
  });

  it("displays the correct selected value", () => {
    render(
      <SelectField
        name="country"
        label="Country"
        value="Egypt"
        options={["Jordan", "Egypt", "Syria"]}
        onChange={() => {}}
      />
    );

    const selectElement = screen.getByLabelText("Country") as HTMLSelectElement;
    expect(selectElement.value).toBe("Egypt");
  });

  it("calls onChange when a new option is selected", () => {
    const handleChange = jest.fn();
    render(
      <SelectField
        name="country"
        label="Country"
        value=""
        options={["Jordan", "Egypt", "Syria"]}
        onChange={handleChange}
      />
    );

    const selectElement = screen.getByLabelText("Country");
    fireEvent.change(selectElement, { target: { value: "Jordan" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("country", "Jordan");
  });
});
