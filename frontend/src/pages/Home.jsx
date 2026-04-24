import { useState, useEffect } from "react";
import api from "../api";
import "./Home.css"; // Ensure this file exists in the same folder

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data); })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
                setTitle("");
                setContent("");
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="home-container">
            <h1>Mission Control</h1>
            <hr />
            
            <div className="notes-section">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div key={note.id} className="note-card">
                            <p className="note-title">{note.title}</p>
                            <p className="note-content">{note.content}</p>
                            <p className="note-date">{new Date(note.created_at).toLocaleDateString()}</p>
                            <button className="delete-button" onClick={() => deleteNote(note.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No mission logs found. Start a new entry below.</p>
                )}
            </div>

            <div className="note-form">
                <h2>Create a Note</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        required 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title} 
                    />
                    
                    <label htmlFor="content">Content:</label>
                    <textarea 
                        id="content" 
                        name="content" 
                        required 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    
                    <button type="submit" className="submit-button">Submit Entry</button>
                </form>
            </div>
        </div>
    );
} // This is the '}' that was likely missing!

export default Home;