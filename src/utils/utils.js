export const toggleArrObj = (arr, item, getValue = (item) => item) => {
  if (arr.some((i) => getValue(i) === getValue(item)))
    return arr.filter((i) => getValue(i) !== getValue(item));
  else return [...arr, item];
};

export const searchInfo = (arr, item, getValue = (item) => item) => {
  return arr.filter((i) => getValue(i) === getValue(item));
};

export const pricentPick = (teamValue, playerValue, pricent = 20) => {
  return +(((teamValue - playerValue) * pricent) / 100).toFixed(2);
};

let sumNumber = (num) => {
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }
  return sum;
};

export const upUsersCals = (players, pricentValuePlayer, key) => {
  const point = sumNumber(players.length - 1);
  const midPoint = pricentValuePlayer / point;
  return players.map((player, idx) => {
    const pricentValue = +((midPoint * (players.length - idx - 1)).toFixed(2));
    if(idx === (players.length - 1)) {
      return { ...player, value: +(player[key] + pricentValuePlayer), pricentValuePlayer };
    }
    return { ...player, value: +(player[key] - pricentValue), pricentValue: -pricentValue};
  });
};
