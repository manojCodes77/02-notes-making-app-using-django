import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import LoadingIndicator from "../components/LoadingIndicator";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import LoadingBar from "../components/LoadingBar";

function Home() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        setLoading(true);
        api.get("/api/notes/all/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message || "Failed to fetch notes");
            });
    };

    const deleteNote = (id) => {
        setDeleteLoading(true);
        api.delete(`/api/notes/delete/${id}/`)
            .then(() => {
                toast.success("Note deleted successfully!");
                getNotes();
            })
            .catch((error) => {
                toast.error("Failed to delete note");
                console.error(error);
            }).finally(() => {
                setDeleteLoading(false);
            });
    };

    const createNote = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error("Please fill in both title and content");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await api.post("/api/notes/", { content, title });
            if (res.status === 201) {
                toast.success("Note created successfully!");
                setTitle("");
                setContent("");
                getNotes();
            }
        } catch (err) {
            toast.error(err.message || "Failed to create note");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
            {(deleteLoading || isSubmitting) && <LoadingBar />}
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        My Notes
                    </h1>
                    <Link 
                        to="/logout" 
                        className="px-4 py-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-200 rounded-lg hover:bg-red-50"
                    >
                        Logout
                    </Link>
                </div>

                {/* Create Note Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 transition-all duration-300 hover:shadow-2xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Note</h2>
                    <form onSubmit={createNote} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Note title..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 
                                focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-gray-100 
                                placeholder-gray-400"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your note here..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 
                                focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-gray-100 
                                placeholder-gray-400 h-40 resize-none"
                                disabled={isSubmitting}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold 
                            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                            transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] 
                            disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    Creating...
                                </span>
                            ) : (
                                "Create Note"
                            )}
                        </button>
                    </form>
                </div>

                {/* Notes Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <LoadingIndicator />
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                        {notes.length === 0 ? (
                            <div className="col-span-2 text-center py-12">
                                <p className="text-gray-500 text-lg">No notes yet. Create your first note above!</p>
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
                )}
            </div>

            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 3000,
                    success: {
                        style: {
                            background: '#059669',
                            color: '#fff',
                        },
                    },
                    error: {
                        style: {
                            background: '#DC2626',
                            color: '#fff',
                        },
                    },
                }}
            />
        </div>
    );
}

export default Home;