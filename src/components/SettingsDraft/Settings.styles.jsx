import styled from "styled-components";

export const SettingItem = styled.div`
  margin-bottom: 28px;
  h2.advanced-setting-title {
    color: #2d7341;
    font-size: 20px;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 600;
    margin-top: 68px;
    margin-bottom: 24px;
  }
  h2.setting-title {
    color: #3e464f;
    font-size: 16px;
    font-family: "Saira Semi Condensed", sans-serif;
    font-weight: 600;
    margin-bottom: 16px;
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
  gap:20px;
  align-items: center;
  `;
export const NumItem = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #989ea4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &.active-round  {
    background: #004EA3;
    span {
      color: #FFFFFF;
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
  input {
    width: 350px;
    background: linear-gradient(97.81deg, #00438b 0%, #0059b9 100%);
    border-radius: 10px;
    height: 4px;
  }
`;
