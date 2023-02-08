import { tradeValueData } from "./data";

export const toggleArrObj = (arr, item, getValue = (item) => item) => {
  if (arr.some((i) => getValue(i) === getValue(item)))
    return arr.filter((i) => getValue(i) !== getValue(item));
  else return [...arr, item];
};

export const searchInfo = (arr, item, getValue = (item) => item) => {
  return arr.filter((i) => getValue(i) === getValue(item));
};

export const percentPick = (teamValue, playerValue, percent = 20) => {
  return +(((teamValue - playerValue) * percent) / 100).toFixed(2);
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
    const pricentValue = +(midPoint * (players.length - idx - 1)).toFixed(2);
    if (idx === players.length - 1) {
      return {
        ...player,
        value: +(player[key] + pricentValuePlayer),
        pricentValue: pricentValuePlayer,
      };
    }
    return {
      ...player,
      value: +(player[key] - pricentValue),
      pricentValue: -pricentValue,
    };
  });
};

// Round Calc Create New Data
export const roundTeam = (roundCount, teams) => {
  const newData = [];
  let indexCount = 1;
  for (let i = 1; i <= roundCount; ++i) {
    for (let j = 0; j < teams.length; ++j) {
      newData.push({
        id: Math.random(),
        index: indexCount,
        round_index: `${i} Round`,
        round: teams[j],
      });
      indexCount++;
    }
  }
  return newData;
};

export const getFilterTwoData = (
  arr,
  secondArr,
  key,
  deepKey = "",
  bitwiseOperator = "XOR"
) => {
  if (bitwiseOperator === "AND") {
    if (deepKey) {
      return arr.filter((item) => secondArr.includes(item[key][deepKey]));
    } else return arr.filter((item) => secondArr.includes(item[key]));
  } else if (bitwiseOperator === "XOR") {
    if (deepKey) {
      return arr.filter((item) => !secondArr.includes(item[key][deepKey]));
    } else return arr.filter((item) => !secondArr.includes(item[key]));
  }
};

export const objectSet = (arr,key) => {
  const mySet = [];
  const setObject = []
  arr.forEach(item => {
    if(!mySet.includes(item[key])) {
      mySet.push(item[key])
      setObject.push(item)
    }
  })
  return setObject
}

// Get Random Team
export const getRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};


const fanatic = [
  {
    mode: 1,
    iteration: 5,
  },
  {
    mode: 2,
    iteration: 10,
  },
  {
    mode: 3,
    iteration: 15,
  },
];
const makeRepeated = (arr, repeats) => Array.from({ length: repeats }, () => arr).flat();


export const iterationRound = ({_}) => {
  let startSlice = 0;
  let endSlice = undefined;
 for (let i = 0; i < fanatic.length; ++i) {
  for (let j = 0; j < tradeValueData.length; ++j) {
       
  }
 }
}