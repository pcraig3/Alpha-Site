/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import SignupInfo from "../../pages/signup-info";
import { signupInfoPageData } from "../../__mocks__/mockStore";

describe("Signup Info", () => {
  it("renders without crashing", () => {
    render(
      <SignupInfo pageData={signupInfoPageData.data.scLabsPagev1ByPath} />
    );
    expect(
      screen.getByRole("heading", {
        name: "S’inscrire pour participer à l’élaboration des services de demain",
      })
    ).toBeInTheDocument();
  });
});
