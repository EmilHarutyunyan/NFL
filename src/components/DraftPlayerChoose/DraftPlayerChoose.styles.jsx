import styled from "styled-components";

export const Wrapper = styled.div`
`;

export const SelectTeam = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .team {
    display: flex;
    align-items: center;
    gap: 30px;
  }
`;
export const NumWrapper = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 24px;
`;
export const NumItem = styled.div`
  width: 53.12px;
  height: 32px;
  border: 1px solid #989ea4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px 14px;

  &.active {
    border: 2px solid #004ea3;
  }

  span {
    color: #0e1118;
    font-size: 18px;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 400;
  }
`;

export const DraftPlayerWrapper = styled.div``;

export const DraftPlayerItems = styled.ul``;

export const DraftPlayerItem = styled.li`
  border-bottom: 1px solid #afb4b9;
  padding-bottom: 16px;
  .player-draft {
    padding: 0 30px;
    display: flex;
    align-items: center;
    gap: 30px;
    margin-top: 40px;
  }
  .player-rank,
  .player-adp {
    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 31px;
      color: #46484a;
    }
    span {
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      color: #000000;
    }
  }
  .player-name {
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    color: #004ea3;
  }
  .player-position {
    background: #2d7341;
    border-radius: 4px;
    padding: 5px 16px;
    color: #ffffff;
  }
  .player-college {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 31px;
    color: #46484a;
  }

  .player-draft-btn {
    background: #004ea3;
    border-radius: 4px;
    padding: 12px 24px;
    font-weight: 400;
    border: none;
    color: #fff;
    cursor: pointer;
  }
`;
