import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BookList from "../components/BookList.jsx";

const books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", category: "Self-help", year: 2018, available: true, cover: "/one.jpg" },
  { id: 2, title: "The Hobbit", author: "J. R. R. Tolkien", category: "Fantasy", year: 1937, available: true, cover: "/two.jpg" }
];

describe("BookList", () => {
  it("renders a card for each book", () => {
    render(<BookList books={books} onDetails={vi.fn()} onBorrow={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "Atomic Habits" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The Hobbit" })).toBeInTheDocument();
  });

  it("shows an empty state when there are no matches", () => {
    render(<BookList books={[]} onDetails={vi.fn()} onBorrow={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "No books found" })).toBeInTheDocument();
  });
});
