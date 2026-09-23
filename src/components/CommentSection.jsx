import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../api/axios';

function CommentSection({ songId }) {
    const { user, token } = useSelector((state) => state.auth);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');

    const loadComments = async () => {
        const res = await api.get(`/comments/song/${songId}`);
        setComments(res.data);
    };

    useEffect(() => {
        loadComments();
    }, [songId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        await api.post(`/comments/song/${songId}`, { text });
        setText('');
        loadComments();
    };

    const handleDelete = async (commentId) => {
        await api.delete(`/comments/${commentId}`);
        loadComments();
    };

    return (
        <div className="comment-section">
            <h4>Comments ({comments.length})</h4>

            {token && (
                <form onSubmit={handleSubmit} className="comment-form">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button type="submit">Post</button>
                </form>
            )}

            <div className="comment-list">
                {comments.map((c) => (
                    <div key={c._id} className="comment-item">
                        <strong>{c.user?.username || 'Unknown'}</strong>
                        <p>{c.text}</p>
                        {user?.id === c.user?._id && (
                            <button className="comment-delete" onClick={() => handleDelete(c._id)}>Delete</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;
