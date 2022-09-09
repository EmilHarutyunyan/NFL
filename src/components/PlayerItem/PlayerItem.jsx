
import React from 'react'
import Player from "./Player.png"

// Styles
import { Table, Td, Th, Tr, Wrapper } from './PlayerItem.styles'



const PlayerItem = ({player}) => {

  return (
    <Wrapper>
    <img src={Player} alt="" />
      <Table>
      <thead>
      <Tr>
        <Th className='player-name'>Name</Th>
        <Th className='player-possition'>Possition</Th>
        <Th className='player-college'>College</Th>
        <Th className='player-conferance'>Conferance</Th>
        <Th className='player-rating'>Rating</Th>
      </Tr>
      </thead>
      <tbody>
      <Tr>
        <Td>{player?.player}</Td>
        <Td>{player?.position}</Td>
        <Td>{player?.school}</Td>
        <Td >Lorem ipsum</Td>
        <Td>
          <span>78</span>
          <span>95</span>
        </Td>
      </Tr>
      </tbody>
     
    </Table>
    </Wrapper>
    
    // <div className={styles.playerWrap}>
    //   <div className={styles.playerContent}>
    //     <div className={styles.playerPhoto}>
    //       <img src={Player} alt="" />
    //     </div>
    //     <div className={styles.playerName}>
    //       <h3>Name</h3>
    //       <h2>{player?.player}</h2>
    //     </div>
    //     <div className={styles.playerPossition}>
    //       <h3>Possition</h3>
    //       <h2>{player?.position}</h2>
    //     </div>
    //     <div className={styles.playerCollege}>
    //       <h3>College</h3>
    //       <h2>{player?.school}</h2>
    //     </div>
    //     <div className={styles.playerConferance} >
    //       <h3>Conferance</h3>
    //       <h2>Loorem ipsum</h2>
    //     </div>
    //     <div className={styles.playerRating}>
    //       <h3> Rating</h3>
    //       <div className={styles.playerRatingCount}>
    //         <span>75</span>
    //         <span>95</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default PlayerItem