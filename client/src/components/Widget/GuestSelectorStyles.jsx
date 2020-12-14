import styled from 'styled-components';

export const SelectorWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  height: 38px;
  color: rgb(34, 34, 34);
`;

export const GuestCategoryWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-self: center;
`;

export const GuestCategory = styled.div`
  font-family: 'Airbnb Cereal App Medium';
  font-size: 16px;
  line-height: 20px;
  text-transform: capitalize;
`;

export const GuestSubtext = styled.div`
  font-family: 'Airbnb Cereal App Light', sans-serif;
  font-size: 14px;
  line-height: 18px;
  vertical-align: top;
  color: rgb(34, 34, 34);
`;

export const CountWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const PlusMinusButton = styled.button`
    font-family: 'Airbnb Cereal App Light', sans-serif;
    width: 32px;
    height: 32px;
    cursor: pointer;
    border-radius: 50%;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(176, 176, 176);
    color: rgb(113, 113, 113);
    background: rgb(255, 255, 255);
    font-size: 25px;
    outline: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 5px;
}
`;

export const PlusMinusButtonDisabled = styled(PlusMinusButton)`
    border-color:  rgb(235, 235, 235);
    color:  rgb(235, 235, 235);
    cursor: not-allowed;
}
`;

export const Count = styled.div`
  display: flex-inline;
  margin: 0 8px;
  margin-top: -5px;
  width: 22px;
  text-align: center;
  align-self: center;
`;
