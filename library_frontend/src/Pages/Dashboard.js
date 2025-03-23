import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [published_date, setPublishedDate] = useState('');
    const [genre, setGenre] = useState('');
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        axios.get('http://127.0.0.1:8000/api/books/', { headers: { Authorization: `Token ${token}` } })
            .then(response => setBooks(response.data))
            .catch(error => console.error("Error fetching books:", error));
    };

    const handleCreateOrUpdate = (e) => {
        e.preventDefault();
        const bookData = { title, author, isbn, published_date, genre };

        if (editingId) {
            axios.put(`http://127.0.0.1:8000/api/books/update/${editingId}/`, bookData, { headers: { Authorization: `Token ${token}` } })
                .then(() => {
                    alert("Book updated successfully!");
                    setEditingId(null);
                    fetchBooks();
                })
                .catch(error => console.error("Error updating book:", error));
        } else {
            axios.post('http://127.0.0.1:8000/api/books/create/', bookData, { headers: { Authorization: `Token ${token}` } })
                .then(() => {
                    alert("Book added successfully!");
                    fetchBooks();
                })
                .catch(error => console.error("Error adding book:", error));
        }

        setTitle('');
        setAuthor('');
        setIsbn('');
        setPublishedDate('');
        setGenre('');
    };

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/books/delete/${id}/`, { headers: { Authorization: `Token ${token}` } })
            .then(() => {
                alert("Book deleted successfully!");
                fetchBooks();
            })
            .catch(error => console.error("Error deleting book:", error));
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // ✅ Remove token
        navigate('/login'); // ✅ Redirect to login
    };

    return (
        <div>
            <h2>Manage Books</h2>

            <button onClick={handleLogout}>Logout</button>
            
            <form onSubmit={handleCreateOrUpdate}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
                <input type="date" value={published_date} onChange={(e) => setPublishedDate(e.target.value)} required />
                <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                <button type="submit">{editingId ? "Update Book" : "Add Book"}</button>
            </form>

            <h3>All Books</h3>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author} (ISBN: {book.isbn})
                        <button onClick={() => {
                            setTitle(book.title);
                            setAuthor(book.author);
                            setIsbn(book.isbn);
                            setPublishedDate(book.published_date);
                            setGenre(book.genre);
                            setEditingId(book.id);
                        }}>Edit</button>
                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
