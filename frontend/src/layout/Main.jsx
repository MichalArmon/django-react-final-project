import { Container } from "@mui/material";
import { useEffect, useState } from "react";

Container;
async function fetchbooks() {
  const response = await fetch("http://localhost:8000/api/books/");
  if (!response.ok) {
    throw new Error(`שגיאה: ${response.status}`);
  }
  const books = await response.json();
  console.log(books);
  return books;
}

function Main() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function loadBooks() {
      const data = await fetchbooks();
      setBooks(data);
    }
    loadBooks();
  }, []);

  return (
    <Container sx={{ height: "1500px" }}>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.author.name}</p>
          <p>{book.price}</p>
        </div>
      ))}
    </Container>
  );
}

export default Main;
