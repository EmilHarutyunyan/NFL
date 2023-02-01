import { getRandom } from "../../utils/utils";
function draftAutoSettings(draftCardDepth, draftRandomnessTeam, roundBPA, roundDepth, round, playersAll, teamDepth, tradeValueTeam, selectCardDepth, roundIndexBool, roundIndex) {
  const pointDepth = round - roundDepth - roundBPA.length
  const playerPosition = Array.from({ length: draftCardDepth }, (_, i) => i + 1)
  const playerRange = playersAll.slice(0, draftCardDepth);
  const tradeValueTeamId = tradeValueTeam.round.index;
  const positionPlayers = []
  const playerChoose = {};

  // if (roundDepth - round && roundDepth.length === 0) {

  // }
  
  // Round BPA Set
  if (roundBPA.length && !roundIndexBool) {
    playerChoose["player"] = playerRange[0]
    playerChoose["playerDepth"] = 1
  }

  // Except  Round 1 Similar Depth
  else if (teamDepth.length) {
    playerChoose["player"] = playerRange[teamDepth[0].playerDepth - 1]
    playerChoose["playerDepth"] = teamDepth[0].playerDepth
  }
  else if (roundIndex > roundDepth) {
    playerChoose["player"] = playerRange[0]
    playerChoose["playerDepth"] = 1
  }
  // Except Top-1 Player Round 1
  else if (draftRandomnessTeam.includes(tradeValueTeamId)) {
    const [randomPosition] = getRandom(playerPosition.slice(1, draftCardDepth), 1)
    const playerRandomIdExceptTop = playerRange[randomPosition - 1]
    positionPlayers.push(randomPosition)
    playerChoose["player"] = playerRandomIdExceptTop;
    playerChoose["playerDepth"] = randomPosition
  } 
  // Round 1
  else {
    const [randomPosition] = getRandom(playerPosition.slice(0, draftCardDepth), 1)
    const playerRandomId = playerRange[randomPosition - 1]
    positionPlayers.push(randomPosition)
    playerChoose["player"] = playerRandomId;
    playerChoose["playerDepth"] = randomPosition;

    // Pick Card Depth Minimal Last
    if (selectCardDepth.length > draftCardDepth && !selectCardDepth.includes(draftCardDepth)) {
      playerChoose["player"] = playerRange[draftCardDepth]
      playerChoose["playerDepth"] = draftCardDepth
    }

  }
  return playerChoose;
  // // RoundBPA
  // if(roundBPA.includes(round)) {

  // }
}
// function chooseRoundBPA() {
//   return ""
// }
export default draftAutoSettings