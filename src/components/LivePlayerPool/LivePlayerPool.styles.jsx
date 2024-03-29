import styled, { css } from "styled-components";
export const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  font-family: "Saira Semi Condensed";
`;
export const Content = styled.div`
  padding: 24px;
`;

export const LivePickHead = styled.div`
  border-radius: 10px 10px 0px 0px;
  background: #022142;
  padding: 24px 0 24px 24px;
  h2 {
    color: #fff;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: 41.6px;
  }
`;

export const PositionWrap = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  & div {
    margin: inherit;
  }
  .trades-btn button {
    background: #004ea3;
    border-radius: 4px;
    padding: 12px 24px;
    font-weight: 400;
    border: none;
    color: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    margin: 0 auto;
    cursor: pointer;
    justify-content: center;
  }
`;

export const PositionItem = styled.div`
  width: 53.12px;
  /* height: 32px; */
  border: 1px solid #989ea4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px 14px;
  margin: 0 auto;

  ${(props) =>
    props.backColor &&
    css`
      background-color: ${(props) => props.backColor};
      border: none;
    `}

  &.active {
    border: 2px solid #004ea3;
  }
  span {
    color: #0e1118;
    font-size: 16px;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 400;
  }
`;

export const PlayerSettings = styled.div``;

export const PlayerFilter = styled.form`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
  .search-player {
    max-width: 329px;
    width: 100%;
  }
  .sort-by {
    display: flex;
    gap: 8px;
    input {
      width: 24px;
      height: 24px;
    }
  }
`;

export const PlayerTable = styled.div`
  overflow-x: auto;
  height: 485px;
  padding-top: 10px;
  animation: animateOpacityImage 1s;
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
    background: #022142;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0 20px;
  }
  tr td {
    padding: 5px 0;
    width: ${(props) => (props.topping ? `calc(100% / 6)` : `calc(100% / 5)`)};
  }
  .player-choose {
    width: 25px;
    height: 25px;
    input {
      width: 100%;
      height: 100%;
      filter: hue-rotate(240deg);
    }
  }
  .player-que-move {
    display: flex;
  }
  .player-que-arrow {
    cursor: pointer;
  }
   .player-draft {
    cursor: pointer;
    button {
      padding: 0px 10px;
      border-radius: 4px;
      background-color: #004ea3;
      color: #fff;
      height: 32px;
      font-weight: 400;
      font-size: 12px;
      cursor: pointer;
      :disabled {
        background-color: #5891ca;
      }
    }
  }
  .player-rank {
    display: flex;
    gap: 10px;
    align-items: center;
    h4 {
      color: #50647b;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    p {
      color: #0e1118;

      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 30px;
    }
  }
  .player-adp {
    color: #50647b;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .player-name {
    color: #004ea3;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
  }
  .player-state {
    color: #46484a;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
