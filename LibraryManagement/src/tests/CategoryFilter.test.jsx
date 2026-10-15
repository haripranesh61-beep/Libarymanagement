import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryFilter from "../components/CategoryFilter.jsx";

it("changes the selected category", async () => {
  const user = userEvent.setup();
  const setCategory = vi.fn();
  render(<CategoryFilter categories={["All", "Fantasy", "Science"]} category="All" setCategory={setCategory} />);
  await user.selectOptions(screen.getByLabelText("Category"), "Fantasy");
  expect(setCategory).toHaveBeenCalledWith("Fantasy");
});
