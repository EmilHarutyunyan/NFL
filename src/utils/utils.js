export const toggleArrObj = (arr, item, getValue = item => item) => {
  if (arr.some(i => getValue(i) === getValue(item)))
    return arr.filter(i => getValue(i) !== getValue(item));
  else return [...arr, item];
};

export const searchInfo = (arr,item, getValue = item => item) => {
  return arr.filter(i => getValue(i) === getValue(item))
}


export const pricentPick = (teamValue,playerValue,pricent=20) => {

  debugger
  return +(((teamValue-playerValue)*pricent)/100).toFixed(2)
}

export const upUsersCals = (players,pricentValue) => {
  return players.map((player,idx) =>  {
    const {value} = player;
    return {...player,value: value + (pricentValue/players.length) * players.length - idx};
  })

}