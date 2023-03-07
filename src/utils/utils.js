export const toggleArrObj = (arr, item, getValue = (item) => item) => {
  if (arr.some((i) => getValue(i) === getValue(item)))
    return arr.filter((i) => getValue(i) !== getValue(item));
  else return [...arr, item];
};

export const searchInfo = (arr, item, getValue = (item) => item) => {
  return arr.filter((i) => getValue(i) === getValue(item));
};

export const percentPick = (teamValue, playerValue, percent = 50) => {
  return +(((teamValue - playerValue) * percent) / 100).toFixed(2);
};

export const dataURLtoBlob = (dataurl) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
   
    
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
     console.log("mime :", mime);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
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

export const objectSet = (arr, key) => {
  const mySet = [];
  const setObject = [];
  arr.forEach((item) => {
    if (!mySet.includes(item[key])) {
      mySet.push(item[key]);
      setObject.push(item);
    }
  });
  return setObject;
};

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

export const makeRepeated = (arr, repeats) =>
  Array.from({ length: repeats }, (v, idx) => {
    const arrIteration = arr.map((item) => {
      return { ...item, iteration: idx + 1 };
    });
    return arrIteration;
  }).flat();

export const iterationRound = ({ fanaticChallenge, tradeValueData, round }) => {
  let startSlice = 0;
  let endSlice = 0;
  let newIterationTrade = [];
  let roundStart = [1];
  let flagRound = false
  let flagMode = false
  
  let fanaticSlices = [
    {
      round: 1,
      start: null,
      end: null,
      challenge: false,
      iteration: 5,
      chose: true,
    },
    {
      round: 2,
      start: null,
      end: null,
      challenge: false,
      iteration: 10,
      chose: false,
    },
    {
      round: 3,
      start: null,
      end: null,
      challenge: false,
      iteration: 15,
      chose: false,
    },
  ];
  for (let i = 0; i < fanaticChallenge.length; ++i) {
    let roundName = fanaticChallenge[i].mode;
    fanaticSlices[roundName - 1].challenge = true;
    if (fanaticChallenge[i].mode === 3) {
     
      fanaticSlices[roundName - 1 - 1].chose = true;
    }
     fanaticSlices[roundName - 1].chose = true;
  }
  for (let i = 0; i < tradeValueData.length; i++) {
    if(+tradeValueData[i].round_index_number === 1 && fanaticSlices[0].start === null ) {
      fanaticSlices[0].start = i;
      roundStart.push(i + 1);
    }
    if(+tradeValueData[i].round_index_number === 2 && fanaticSlices[1].start === null) {
      fanaticSlices[0].end = i;
      fanaticSlices[1].start = i;
       roundStart.push(i + 1);
    }
    if(+tradeValueData[i].round_index_number === 3 && fanaticSlices[2].start === null) {
      fanaticSlices[2].start = i;
      fanaticSlices[1].end = i;
       roundStart.push(i + 1);
    }
    if(tradeValueData.length - 1 === i) {
      fanaticSlices[round - 1].end = i
    }
  }
  for(let i = 0; i < fanaticSlices.length; i++) {
    if(fanaticSlices[i].challenge) {
        const sliceTradeValue = tradeValueData.slice(
          fanaticSlices[i].start,
          fanaticSlices[i].end
        );
        const iterationRound = makeRepeated(
          sliceTradeValue,
          fanaticSlices[i].iteration
        );
        
        newIterationTrade.push(...iterationRound);
    } else {
      if(fanaticSlices[i].chose) {
        const sliceTradeValue = tradeValueData.slice(
          fanaticSlices[i].start,
          fanaticSlices[i].end
        );
       
        roundStart.push(endSlice + 1);
        newIterationTrade.push(...sliceTradeValue);
      }
    }
  }
  // if(fanaticChallenge[0].mode === 1) {
  //   const sliceTradeValue = tradeValueData.slice(fanaticSlices[0].start, fanaticSlices);
  //         const iterationRound = makeRepeated(
  //           sliceTradeValue,
  //           fanaticChallenge[0].iteration
  //         );
  //         roundStart.push(endSlice + 1);
  //         newIterationTrade.push(...iterationRound);
  // }

  // for (let i = 0; i < fanaticChallenge.length; ++i) {
  //   startSlice = endSlice;
  //   for (let j = endSlice; j < tradeValueData.length; ++j) {
  //     if(fanaticChallenge[i].mode === +tradeValueData[j].round_index_number) {
  //       if (!flagMode) {
  //         startSlice = j;
  //         flagMode = true
  //       }
  //       flagRound = true
  //     }
  //     if(fanaticChallenge[i].mode < +tradeValueData[j].round_index_number && fanaticChallenge.length-1 === i) {
  //       const sliceTradeValue = tradeValueData.slice(startSlice, endSlice);
  //       const iterationRound = makeRepeated(
  //         sliceTradeValue,
  //         fanaticChallenge[i].iteration
  //       );
  //       roundStart.push(endSlice + 1);
  //       newIterationTrade.push(...iterationRound);
  //         flagMode = false
  //     } if(!flagRound) {
   
  //       newIterationTrade.push(tradeValueData[j]) 
  //     }
  //     endSlice++;
  //   }
  //   //   if (
  //   //     fanaticChallenge[i].mode !== +tradeValueData[j].round_index_number ||
  //   //     endSlice + 1 === tradeValueData.length
  //   //   ) {
  //   //     endSlice =
  //   //       endSlice + 1 === tradeValueData.length ? endSlice + 1 : endSlice;
  //   //     const sliceTradeValue = tradeValueData.slice(startSlice, endSlice);
  //   //     const iterationRound = makeRepeated(
  //   //       sliceTradeValue,
  //   //       fanaticChallenge[i].iteration
  //   //     );
  //   //     roundStart.push(endSlice + 1);
  //   //     newIterationTrade.push(...iterationRound);
  //   //     break;
  //   //   }
  //   //   endSlice++;
  //   // } 
  // }

  

    const cutTradeValue = [...newIterationTrade];
    const newTradeValue = cutTradeValue.map((item, idx) => {
      const newItem = structuredClone(item);
      newItem["index_position"] = idx + 1;
      return newItem;
    });

    return { count: newTradeValue.length, newTradeValue, roundStart };
  
};

export const objectDeleteValue = ({ objectData, deleteKey }) => {
  const objectDelete = Object.keys(objectData)
    .filter((key) => !deleteKey.includes(key))
    .reduce((obj, key) => {
      obj[key] = objectData[key];
      return obj;
    }, {});
  return objectDelete;
};

// sort array
export const sortArray = ({ arr, key }) => {
  return arr.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));
};

export const filteredArray = ({ arr, arr2, key }) => {
  const filterArr = arr.filter(function (array_el) {
    return (
      arr2.filter(function (anotherOne_el) {
        return anotherOne_el[key] === array_el[key];
      }).length === 0
    );
  });
  return filterArr;
};

export const  loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src
    img.onload = () => {
      const canvas = document.createElement("canvas");

      // Set the width and height of the canvas to be the same as the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Get the PNG data URL from the canvas
      const pngDataUrl = canvas.toDataURL("image/png");

      // Use the PNG data URL as needed
      console.log(pngDataUrl);
      resolve(pngDataUrl);
    };
    img.onerror = (e) => {
      reject(e);
    };
    img.src = src;
  });
}