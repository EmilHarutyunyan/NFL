import { getRandom } from "../../utils/utils";
function draftAutoSettings(draftCardDepth, draftRandomnessTeam, roundBPA, roundDepth, round, playersAll, tradeValueTeam) {
  const playerPosition = Array.from({ length: draftCardDepth }, (_, i) => i + 1)
  const playerRange = playersAll.slice(0,draftCardDepth);
  const tradeValueTeamId = tradeValueTeam.round.id;
  const positionPlayers = []
  const playerChoose = {};
  if(draftRandomnessTeam.includes(tradeValueTeamId)) {
    const [randomPosition] = getRandom(playerPosition.slice(1, draftCardDepth),1)
    const playerRandomIdExceptTop = playerRange[randomPosition]
    positionPlayers.push(randomPosition)
    playerChoose["player"] = playerRandomIdExceptTop;
    playerChoose["playerDepth"] = randomPosition
  } else if (!roundBPA.length) {
    const [randomPosition] = getRandom(playerPosition.slice(0, draftCardDepth),1)
    const playerRandomId = playerRange[randomPosition]
    positionPlayers.push(randomPosition)
    playerChoose["player"] = playerRandomId;
    playerChoose["playerDepth"] = randomPosition

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