import styled from "styled-components";

export const SettingItem = styled.div`
  display: flex;
  gap: 17px;
  align-items: flex-start;
  margin-bottom: 28px;
  /* justify-content: space-between; */
  
  & .MuiSlider-root {
    color: #00438b;
  }
  h2.advanced-setting-title {
    color: #2d7341;
    font-size: 20px;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 600;
    margin-top: 68px;
    margin-bottom: 24px;
  }
  h2.setting-title {
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 30px;
    color: #3e464f;
    margin-bottom: 0;
  }
  label {
    font-size: 16px;
    color: #3e464f;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
`;
export const NumWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 6px;
  align-items: center;
`;
export const NumItem = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #004EA3;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #004EA3;

  &.active-round {
    background: #004ea3;
    span {
      color: #ffffff;
    }
  }

  span {
    color: #0e1118;
    font-size: 18px;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 400;
  }
`;
export const Speed = styled.div`
  width: 100%;
  input {
    width: 350px;
    background: linear-gradient(97.81deg, #00438b 0%, #0059b9 100%);
    border-radius: 10px;
    height: 4px;
  }
`;
export const SettingMarks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #989ea4;
  }
`;
