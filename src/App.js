import React from 'react';
import cn from 'classnames';
import './App.scss';

import { generateTiles } from './utils/generateTiles';
import { areTilesNear } from './utils/areTilesNear';
import { switchTiles } from './utils/switchTiles';

const grid = generateTiles();

class App extends React.Component {
  state = {
    tiles: grid,
    isGameOver: false,
  };

  moveTile = (tile) => {
    const { tiles } = this.state;
    const emptyTile = tiles.find(t => t.number === 0);

    if (areTilesNear(tile, emptyTile)) {
      const emptyTileIndex = tiles.indexOf(emptyTile);
      const clickedTileIndex = tiles.findIndex(t => t.number === tile.number);
      const clone = Array.from(tiles).map(obj => ({ ...obj }));

      switchTiles(
        clone,
        emptyTileIndex,
        clickedTileIndex,
        ['row', 'column', 'id']
      );

      const temp = clone[emptyTileIndex];

      clone[emptyTileIndex] = clone[clickedTileIndex];
      clone[clickedTileIndex] = temp;

      const isGameOver = this.checkGameOver(clone);

      this.setState({
        tiles: clone,
        isGameOver,
      });
    }
  };

  checkGameOver = tiles => tiles.slice(0, 15).every(
    (tile, index) => index + 1 === tile.number
  )

  setNewGame = () => {
    this.setState({
      tiles: generateTiles(),
    });
  };

  render = () => {
    const { tiles, isGameOver } = this.state;

    return (
      <div className="game">
        <h1 className="main-title">15-puzzle Game</h1>

        <div className="game__grid">
          {tiles.map(tile => (
            <button
              className={cn(
                'game__tile',
                tile.number === 0 && 'game__tile--invisible',
              )}
              key={tile.id}
              type="button"
              onClick={() => this.moveTile(tile)}
              disabled={isGameOver || tile.number === 0}
            >
              {tile.number !== 0 && tile.number}
            </button>
          ))}
        </div>

        <div className="game__message">
          {isGameOver && ('Congratulations! You have won!')}
        </div>

        <button
          className="game__new-game-btn"
          type="button"
          onClick={this.setNewGame}
        >
          New game
        </button>
      </div>
    );
  }
}

export default App;
