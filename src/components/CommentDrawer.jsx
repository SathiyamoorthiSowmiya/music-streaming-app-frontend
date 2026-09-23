import { useDispatch, useSelector } from 'react-redux';
import { closeComments } from '../features/ui/uiSlice';
import CommentSection from './CommentSection';

function CommentDrawer() {
    const dispatch = useDispatch();
    const song = useSelector((state) => state.ui.commentSong);

    if (!song) return null;

    return (
        <>
            <div className="drawer-overlay" onClick={() => dispatch(closeComments())} />
            <div className="comment-drawer">
                <div className="comment-drawer-header">
                    <div>
                        <h3>{song.title}</h3>
                        <p>{song.artist}</p>
                    </div>
                    <button className="drawer-close" onClick={() => dispatch(closeComments())}>✕</button>
                </div>
                <CommentSection songId={song._id} />
            </div>
        </>
    );
}

export default CommentDrawer;
