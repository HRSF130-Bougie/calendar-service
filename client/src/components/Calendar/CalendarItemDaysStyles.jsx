import styled from 'styled-components';

export const DayCellWrapper = styled.div`
  background: ${(props) => ((props.inBetween === 'inBetween' || (props.inBetween === 'selected' && props.inOrOut)) ? '#f7f7f7' : 'transparent')};
  border-radius: 0;
  border-radius: ${(props) => ((props.inOrOut === 'in') && '50% 0% 0% 50%')};
  border-radius: ${(props) => ((props.inOrOut === 'out') && '0 50% 50% 0')};
`;

export const DayCell = styled.div`
  font-family: 'Airbnb Cereal App Book', sans-serif;
  display: flex;
  flex-flow: column;
  align-self: center;
  font-size: 14px;
  line-height: 18px;
  color: rgb(34, 34, 34);
  height:-webkit-fill-available;
  justify-content: center;
  border-radius: 50%;
  width: -webkit-fill-available;
  &:hover {
    border: thin solid rgb(34,34,34);
    background:white;
}
`;

export const SelectedCheck = styled(DayCell)`
  background: black;
  color: white !important;
  border-radius: 50%;
  &:hover {
    border: thin solid white;
    background:black;
}
`;

export const Available = styled.div`
  font-family: 'Airbnb Cereal App Medium', sans-serif;
  display: flex;
  flex-flow: column;
  text-align: center;
  padding: 3px;
`;

export const Unavailable = styled(Available)`
  color: rgb(176, 176, 176);
  text-decoration: line-through;
`;

export const InBetween = styled(Available)`
  background: #f7f7f7;
  height:-webkit-fill-available;
  display: inline-flex;
  justify-content: center;
  &:hover {
      border: thin solid black;
      background:white;
      border-radius:50%;
  }
`;

export const DateDisplay = styled.div`
  font-size: 14px;
  line-height: 18px;
  align-self: center;
`;

export const PriceDisplay = styled.div`
  font-family: 'Airbnb Cereal App Book', sans-serif;
  font-size: 10px;
  line-height: 12px;
  color: ${(props) => (props.selected === 'selected' ? 'white' : 'rgb(113, 113, 113)')};
  align-self: center;
`;
