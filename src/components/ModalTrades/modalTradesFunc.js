function changeAccept(teamPick, myTeamPick, tradeValue) {
  const teamPickValue = tradeValue.reduce((acc, item) => {
    if (teamPick.includes(item.index)) {
      return acc + parseInt(item.value);
    } else return acc + 0;
  }, 0);
  const myTeamPickValue = tradeValue.reduce((acc, item) => {
    if (myTeamPick.includes(item.index)) {
      return acc + parseInt(item.value);
    } else return acc + 0;
  }, 0);
  return myTeamPickValue > teamPickValue;
}
export default function changeTeamPick({
  teamPick,
  myTeamPick,
  tradeValue,
  acceptFlag,
  teamMainData,
  myTeamData,
}) {
  const teamPickSort = teamPick.sort((a, b) => a - b);
  const myTeamPickSort = myTeamPick.sort((a, b) => a - b);
  const teamPickIndex = structuredClone(teamPick);
  const myTeamPickIndex = structuredClone(myTeamPick);
  const dataTradeValue = structuredClone(tradeValue);
  if (acceptFlag) {
    for (let i = 0; i < myTeamPickIndex.length; i++) {
      let myTeamPickClone = JSON.parse(
        JSON.stringify(tradeValue[myTeamPickSort[i] - 1])
      );
      dataTradeValue[myTeamPickSort[i] - 1] = {
        ...myTeamPickClone,
        ...teamMainData,
      };
    }
    for (let i = 0; i < teamPickSort.length; i++) {
      let teamPickClone = JSON.parse(
        JSON.stringify(tradeValue[teamPickSort[i] - 1])
      );
      dataTradeValue[teamPickSort[i] - 1] = {
        ...teamPickClone,
        ...myTeamData,
      };
    }
    console.log(dataTradeValue);
    // if (myTeamPickSort.length > teamPickSort.length) {
    //   for (let i = 0; i < myTeamPickSort.length; i++) {
    //     let myTeamPickClone = JSON.parse(
    //       JSON.stringify(tradeValue[myTeamPickSort[i] - 1])
    //     );
    //     let teamPickClone = JSON.parse(
    //       JSON.stringify(tradeValue[teamPick[0] - 1])
    //     );

    //     let myTeamIndexPick = {
    //       index: myTeamPickClone.index,
    //       pick: myTeamPickClone.pick,
    //       value: myTeamPickClone.value,
    //     };
    //     let teamIndexPick = {
    //       index: teamPickClone.index,
    //       pick: teamPickClone.pick,
    //       value: teamPickClone.value,
    //     };
    //     dataTradeValue[myTeamPickSort[i] - 1] = {
    //       ...teamPickClone,
    //       ...myTeamIndexPick,
    //     };
    //     dataTradeValue[teamPickSort[0] - 1] = {
    //       ...myTeamPickClone,
    //       ...teamIndexPick,
    //     };
    //     newTeamPickIndex.push(teamPickClone.index);
    //     if (teamPickSort.length > 1) {
    //       teamPickSort.shift();
    //     }
    //   }
    // } else if (myTeamPickSort.length < teamPickSort.length) {
    //   for (let i = 0; i < myTeamPickSort.length; i++) {
    //     // let myTeamPickClone = structuredClone(dataTradeValue[myTeamPickSort[0]]);
    //     // let teamPickClone = structuredClone(dataTradeValue[teamPickSort[i]]);
    //     let myTeamPickClone = JSON.parse(
    //       JSON.stringify(tradeValue[myTeamPickSort[0] - 1])
    //     );
    //     let teamPickClone = JSON.parse(
    //       JSON.stringify(tradeValue[teamPick[i] - 1])
    //     );
    //     let myTeamIndexPick = {
    //       index: myTeamPickClone.index,
    //       pick: myTeamPickClone.pick,
    //     };
    //     let teamIndexPick = {
    //       index: teamPickClone.index,
    //       pick: teamPickClone.pick,
    //     };

    //     dataTradeValue[myTeamPickSort[0] - 1] = {
    //       ...teamPickClone,
    //       ...myTeamIndexPick,
    //     };
    //     dataTradeValue[teamPickSort[i] - 1] = {
    //       ...myTeamPickClone,
    //       ...teamIndexPick,
    //     };
    //     newTeamPickIndex.push(teamPickClone.index);
    //     if (myTeamPickSort.length > 1) {
    //       myTeamPickSort.shift();
    //     }
    //   }
    // } else {
    //   for (let i = 0; i < myTeamPickSort.length; i++) {
    //     // let myTeamPickClone = structuredClone(dataTradeValue[myTeamPickSort[i]]);
    //     // let teamPickClone = structuredClone(dataTradeValue[teamPickSort[i]]);
    //     let myTeamPickClone = JSON.parse(
    //       JSON.stringify(tradeValue[myTeamPickSort[i] - 1])
    //     );
    //     let teamPickClone = JSON.parse(
    //       JSON.stringify(tradeValue[teamPickSort[i] - 1])
    //     );
    //     let myTeamIndexPick = {
    //       index: myTeamPickClone.index,
    //       pick: myTeamPickClone.pick,
    //     };
    //     let teamIndexPick = {
    //       index: teamPickClone.index,
    //       pick: teamPickClone.pick,
    //     };
    //     dataTradeValue[myTeamPickSort[i] - 1] = {
    //       ...teamPickClone,
    //       ...myTeamIndexPick,
    //     };
    //     dataTradeValue[teamPickSort[i] - 1] = {
    //       ...myTeamPickClone,
    //       ...teamIndexPick,
    //     };
    //     newTeamPickIndex.push(teamPickClone.index);
    //     myTeamPick.shift();
    //     teamPickSort.shift();
    //   }
    // }
    return {
      tradeValue: dataTradeValue,
      teamPickIndex,
      myTeamPickIndex,
    };
  }
}
