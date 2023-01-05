import styled from "styled-components";

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
  height: 600px;
  margin: 0 auto;
  border-radius: 10px;
`;
export const DraftResultRound = styled.div``;

export const DraftResultTeam = styled.div``;
