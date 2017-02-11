import React, { PropTypes } from 'react';
import { PLAY_MODE_DISPLAY } from '../constants/playmodes';

const isCurrentPlayMode = (currentPlayModeName, playMode) => currentPlayModeName === playMode.name;

let PlayMode = ({ currentPlayMode, dispatches}) => {
  let onPlayModeChange = (e) => {
    dispatches.onPlayModeChange(e.target.value);
  }
  return (
    <div id="play-mode-selector">
      <form id="play-mode-form">
        {PLAY_MODE_DISPLAY.map(playMode =>
          <div key={playMode.name}>
            <input type="radio"
              key={playMode.name}
              name={playMode.name}
              value={playMode.name}
              onChange={onPlayModeChange}
              checked={isCurrentPlayMode(currentPlayMode, playMode)}
            / >
            <span>{playMode.displayName}</span>
          </div>)}
      </form>
    </div>
  );
}

PlayMode.propTypes = {
  currentPlayMode: PropTypes.string.isRequired,
  dispatches: PropTypes.object.isRequired,
};

export default PlayMode;
