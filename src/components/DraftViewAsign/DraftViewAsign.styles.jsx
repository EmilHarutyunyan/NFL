import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 588px;
  height: 100%;
  max-height: 1450px;
  
  ul {
    overflow-x: hidden;
    max-height: 1450px;
    position: relative;
    ::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1; 
      border-radius: 8px;
    }
 
    /* Handle */
    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      /* background:#1B90D2 */
      background: #20A446;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
     
    }
  }
  ul li {
    position: relative;
    height: 75px;
  }
  .round {
    padding:15px 0px 15px 16px;
    color: #3E464F;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    background: #CAD2DA;
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
  }
  .pick {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .player-dashed {
    color: #989EA4;
    font-size: 25px;
  }
  .player-team {
    display: flex;
    align-items: center;
    gap: 25px;
    border-bottom: 1px solid #AFB4B9;
    background-color: #fff;
    padding: 12px 21px 12px 13px;
    &.active {
      border-left: 4px solid #2D7341;
    }
  }
  .player-team-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
   
  }
  img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
`