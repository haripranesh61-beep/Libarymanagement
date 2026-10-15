
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookCard from "../components/BookCard";

afterEach(() => {
  cleanup();
});

const book = {
  id: 1,
  title: "Atomic Habits",
  author: "James Clear",
  category: "Self-help",
  year: 2018,
  available: true,
  cover: "/cover.jpg",
};

describe("BookCard", () => {
  it("renders title, author, category and availability", () => {
    render(
      <BookCard
        book={book}
        onDetails={vi.fn()}
        onBorrow={vi.fn()}
      />
    );

    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText(/James Clear/)).toBeInTheDocument();
    expect(screen.getByText("Self-help")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("calls borrow handler when Borrow is clicked", async () => {
    const user = userEvent.setup();
    const onBorrow = vi.fn();

    render(
      <BookCard
        book={book}
        onDetails={vi.fn()}
        onBorrow={onBorrow}
      />
    );

    await user.click(
      screen.getByRole("button", { name: "Borrow" })
    );

    expect(onBorrow).toHaveBeenCalledTimes(1);
    expect(onBorrow).toHaveBeenCalledWith(book);
  });

  it("disables borrowing for unavailable books", () => {
    const unavailableBook = {
      ...book,
      available: false,
    };

    render(
      <BookCard
        book={unavailableBook}
        onDetails={vi.fn()}
        onBorrow={vi.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: "Borrow" })
    ).toBeDisabled();
  });
});
