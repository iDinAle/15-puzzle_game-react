export const switchTiles = (arr, indexA, indexB, fields) => {
  const result = arr;

  fields.forEach((field) => {
    const temp = result[indexA][field];

    result[indexA][field] = result[indexB][field];
    result[indexB][field] = temp;
  });

  return arr;
};
