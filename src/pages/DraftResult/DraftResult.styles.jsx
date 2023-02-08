import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  &.main-container {
    margin-top: 44px;
  }
  & .draftResultTitle {
    margin-bottom: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 57px;
    color: #000000;
  }
  & .share-draft-wrap {
    margin: 24px 0;
  }
  & .share-draft {
    display: flex;
    align-items: center;
    gap: 24px;
    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 30px;
      color: #000000;
    }
  }
`;

export const ImgWrap = styled.div`
  > img {
    display: block;
    object-fit: cover;
    width: 78px;
    height: 98px;
  }
`;
export const DraftResultShare = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .enter-draft-btn {
    margin: 0;
  }
`;
export const DraftResultWrap = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 1075px;
  background: #ffffff;
  margin: 0 auto;
  border-radius: 10px;
  margin-bottom: 100px;
`;

export const DraftResultHead = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  background: #022142;
  border-radius: 10px 10px 0px 0px;
  padding: 11px 16px 11px 16px;
`;
export const DraftResultRound = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cad2da;
`;

export const DraftResultRoundItem = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #0e1118;
  padding: 15px 16px;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      background: #004ea3;
      color: #fff;
    `}
`;
export const DraftResultFull = styled.div`
  display: flex;
  gap: 21px;
`;
export const DraftResultTeam = styled.div`
  background-image: url(${(props) => props.backImg || ""});
  background-position: center;
  background-repeat: repeat-y;
`;

export const DraftResultTeamItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e8ebef;
  padding: 16px 0;

  & div {
    width: calc(100% / 6);
    text-align: center;
  }
  .draft-result-team {
    &-round {
      font-weight: 600;
      font-size: 28px;
      line-height: 60px;
      color: #3e464f;
      margin-right: auto;
      padding-left: 17px;
      text-align: left;
    }
    &-adp {
      color: #50647b;
      font-weight: 400;
      font-size: 20px;
      line-height: 31px;
      width: 35%;
    }
    &-log {
      display: flex;
      align-items: center;
      gap: 15px;
      width: 35%;
      p {
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        color: #004ea3;
      }
    }
    &-rating {
      display: flex;
      align-items: center;
      margin-left: auto;
      gap: 5px;
      padding-right: 22px;
      text-align: right;
      justify-content: flex-end;

    }
  }
`;
export const GradeBox = styled.p`
  width: 14px;
  height: 14px;
  background: ${({ color }) => (color ? `${color}` : "#3adf00")};
`;
export const DraftResultPick = styled.div`
  width: 100%;
  max-width: 345px;
  .downland-btn {
    display:flex;
    align-items: center;
    color: #004EA3;
    gap: 6px;
    margin-bottom: 12px;
  }

`
export const DraftResultPickWrap = styled.div`
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  & .draft-result-pick {
    &-logo {
      background-color: #022142;
      display: flex;
      align-items: center;
      color: #fff;
      gap: 20px;
      padding: 12px 0 12px 15px;
      & img {
        display: block;
        width:42px;
        height: auto;
      }
      p {
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        color: #ffffff;
      }
    }
    &-item {
      display: flex;
      /* justify-content: center; */
      align-items: center;
      flex-wrap: wrap;
      background: #ffffff;

      padding: 0px 16px;
      border: 1px solid #e8ebef;
      :last-child {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      &-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 20px;
      }
      &-text {
        display: flex;
        align-items: center;
        gap: 35px;
        margin-top: 20px;
        margin-bottom: 16px;
      }
    }
    &-round {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #3e464f;
    }
    &-adp {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #50647b;
    }
    &-name {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #004ea3;
    }
    &-pos {
      background: #dce6ee;
      border-radius: 4px;
      padding: 4px 16px;
      p {
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #0e1118;
      }
    }
    &-college {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #46484a;
    }
    &-rating {
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #46484a;
      gap: 5px;
      &-block {
        width: 14px;
        height: 14px;
        background: #3adf00;
      }
    }
  }
`;

export const DraftResultFooter = styled.div`
  background: #cad2da;
  border-radius: 0px 0px 10px 10px;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #022142;
  text-align: center;
  padding: 12px 0;
`;