import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar.jsx";

it("passes typed search text to the parent", async () => {
  const user = userEvent.setup();
  const setQuery = vi.fn();
  render(<SearchBar query="" setQuery={setQuery} />);
  await user.type(screen.getByRole("searchbox", { name: "Search by title or author" }), "Tolkien");
  expect(setQuery).toHaveBeenLastCalledWith("n");
  expect(setQuery).toHaveBeenCalledTimes(7);
});
