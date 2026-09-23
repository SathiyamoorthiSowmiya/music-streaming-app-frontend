import { useRef } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import {
    togglePlay,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    playNext,
    playPrevious,
} from '../features/player/playerSlice';

function PlayerBar() {
    const dispatch = useDispatch();
    const { currentSong, isPlaying, volume, shuffle, repeat } = useSelector((state) => state.player);
    const playerRef = useRef(null);

    if (!currentSong) return null;

    return (
        <div className="player-bar">
            <div className="player-bar-song">
                <img src={currentSong.coverImage || 'https://via.placeholder.com/60'} alt={currentSong.title} />
                <div>
                    <h5>{currentSong.title}</h5>
                    <p>{currentSong.artist}</p>
                </div>
            </div>

            <div className="player-bar-controls">
                <button
                    className={`icon-btn ${shuffle ? 'active' : ''}`}
                    onClick={() => dispatch(toggleShuffle())}
                    title="Shuffle"
                >
                    🔀
                </button>
                <button className="icon-btn" onClick={() => dispatch(playPrevious())} title="Previous">
                    ⏮
                </button>
                <button className="icon-btn play-btn" onClick={() => dispatch(togglePlay())} title="Play/Pause">
                    {isPlaying ? '⏸' : '▶'}
                </button>
                <button className="icon-btn" onClick={() => dispatch(playNext())} title="Next">
                    ⏭
                </button>
                <button
                    className={`icon-btn ${repeat ? 'active' : ''}`}
                    onClick={() => dispatch(toggleRepeat())}
                    title="Repeat"
                >
                    🔁
                </button>
            </div>

            <div className="player-bar-volume">
                <span>🔊</span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => dispatch(setVolume(Number(e.target.value)))}
                />
            </div>

            <div style={{ display: 'none' }}>
                <ReactPlayer
                    ref={playerRef}
                    src={currentSong.audioUrl}
                    playing={isPlaying}
                    volume={volume}
                    onEnded={() => dispatch(playNext())}
                    controls={false}
                />
            </div>
        </div>
    );
}

export default PlayerBar;
