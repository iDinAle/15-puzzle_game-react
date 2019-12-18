export const generateTiles = () => {
  const arr = [];
  const result = [];

  for (let i = 0; i < 16; i += 1) {
    arr[i] = i;
  }

  let i = arr.length;
  let temp;
  let index;

  while (i >= 0) {
    index = Math.floor((i + 1) * Math.random());
    temp = arr[index];
    arr[index] = arr[i];
    arr[i] = temp;
    i -= 1;
  }

  let inv = 0;

  for (let k = 0; k < 16; k += 1) {
    if (arr[k]) {
      for (let j = 0; j < k; j += 1) {
        if (arr[j] > arr[k]) {
          inv += 1;
        }
      }
    } else {
      inv += 1 + Math.floor(k / 4);
    }
  }

  if (inv % 2 === 1) {
    generateTiles();
  }

  for (let x = 0; x < arr.length; x += 1) {
    const column = x % 4;
    const row = Math.floor(x / 4);

    result.push({
      id: x,
      number: arr[x],
      column,
      row,
    });
  }

  return result;
};
