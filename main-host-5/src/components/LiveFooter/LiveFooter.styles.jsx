import styled from "styled-components";
export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 2;
`;

export const LiveFooterHead = styled.div`
  display: flex;
`;

export const LiveFooterBody = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 25px;
  background-color: #0e1118;
  padding: 16px 20px;
  z-index: 1;
  min-height: 72px;
  overflow: hidden;
  overflow-x: auto;
  transition: .5s;
  ::-webkit-scrollbar {
    width: 2px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ffffff;
  }
  ::-webkit-scrollbar-track {
    background: #000000;
    border-radius: 2px;
  }
`;
export const LiveSelect = styled.div`
  max-width: 640px;
  width: 100%;
  background: #afb4b9;

  position: relative;

  :last-child {
    background: #989ea4;
  }
`;

export const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 12px 6px 24px;
  .info {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 24px;
  }
  .info span {
    color: #0e1118;
    font-family: "Saira Semi Condensed";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
  .info p {
    color: #0e1118;
    font-family: "Saira Semi Condensed";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
  .info span:last-child {
    padding: 4px 8px;
    border-radius: 10px;
    background-color: #e8ebef;
    color: var(--Dark-gray, #0e1118);
    font-family: "Saira Semi Condensed";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
  button {
    cursor: pointer;
  }
`;

export const SelectBoxItem = styled.div`
  display: flex;
  align-items: center;
`;

export const ResultPick = styled.div`
  display: flex;
  align-items: stretch;
  gap: 18px;
  animation: animateOpacityImage 1s;

  .line {
    width: 1px;
    background-color: #fff;
  }
`;

export const ResultTeam = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 105px;
  p {
    color: #fff;
    font-family: "Saira Semi Condensed";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    text-wrap: nowrap;
  }
  img {
    display: block;
    width: 100%;
    max-width: 40px;
    height: auto;
    object-fit: cover;
  }
`;

export const LastPick = styled.div`
  background-color: #0e1118;
  width: 100%;
  max-width: 640px;
  padding: 5px 0 6px 40px;
  color: #fff;
  font-family: "Saira Semi Condensed";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const InfoTrade = styled.div`
  position: absolute;
  width: 100%;
  /* transform: translateY(100%); */
  top: 100%;
  left: 0;
  transition: all 1s ease-in-out;
  &.active {
    top: ${(props) => props.top};
  }
`;
