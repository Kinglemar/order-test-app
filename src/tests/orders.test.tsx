import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/users/page";

describe("User management", () => {
  jest.setTimeout(30000);

  it("Create user.", async () => {
    const testEmail = `test-user-${Date.now()}@gmail.com`;
    const testName = `Test user ${Date.now()}`;

    render(<Home />);

    const emailInput = screen.getByLabelText("email");
    const nameInput = screen.getByLabelText("name");

    await userEvent.type(emailInput, testEmail);
    await userEvent.type(nameInput, testName);

    const submitBtn = screen.getByRole("button", { name: "Submit" });

    await userEvent.click(submitBtn);

    await waitFor(
      async () => {
        const emailEntered = testEmail;
        const elements = await screen.findAllByText((content, element) => {
          return (
            element?.textContent
              ?.toLocaleLowerCase()
              .includes(emailEntered.toLocaleLowerCase()) ?? false
          );
        });

        expect(elements.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  });
});
