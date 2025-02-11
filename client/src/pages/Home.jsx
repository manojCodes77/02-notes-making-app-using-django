import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import LoadingIndicator from "../components/LoadingIndicator";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function Home() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/all/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err);
            });
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) toast.success("Note deleted!");
                else toast.error("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) toast.success("Note created!");
                else toast.error("Failed to create note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <form onSubmit={createNote} className="bg-white rounded-xl shadow-lg p-8 mb-10 transform transition-all duration-300 hover:shadow-2xl">
                    <div className="flex flex-row justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-indigo-800 border-b pb-2">Create New Note</h2>
                        <p className="text-right mb-4">
                            <Link to={'/logout'} className="text-red-600 hover:text-red-800 font-medium">
                                Logout
                            </Link>
                        </p>
                    </div>
                    <div className="space-y-6">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter note title..."
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-gray-50"
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note content here..."
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-gray-50 h-48 resize-none"
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                        >
                            Add Note
                        </button>
                    </div>
                </form>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {loading ? (
                        <div className="col-span-2">
                            <LoadingIndicator />
                        </div>
                    ) : (
                        notes.map((note) => (
                            <Note
                                key={note.id}
                                {...note}
                                onDelete={deleteNote}
                            />
                        ))
                    )}
                </div>
            </div>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#4338ca',
                        color: '#fff',
                    },
                }}
            />
        </div>
    );
}

export default Home;