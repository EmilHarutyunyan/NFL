export const toggleArrObj = (arr, item, getValue = item => item) => {
  if (arr.some(i => getValue(i) === getValue(item)))
    return arr.filter(i => getValue(i) !== getValue(item));
  else return [...arr, item];
};

export const searchInfo = (arr,item, getValue = item => item) => {
  return arr.filter(i => getValue(i) === getValue(item))
}