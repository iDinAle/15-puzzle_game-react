export const areTilesNear = (tile, emptyTile) => {
  const sameRow = tile.row === emptyTile.row;
  const sameColumn = tile.column === emptyTile.column;
  const diffColumn = Math.abs(tile.column - emptyTile.column) === 1;
  const diffRow = Math.abs(tile.row - emptyTile.row) === 1;

  return (sameRow && diffColumn) || (sameColumn && diffRow);
};
