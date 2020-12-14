import styled from 'styled-components';

export const CalendarPopUp = styled.div`
  grid-area: calendar;
  box-sizing: content-box;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
  display: grid;
  grid-template-rows: repeat(5, auto);
  flex-flow: row;
  padding: 24px 32px 16px;
  margin: auto;
  position: absolute;
  top: 54px;
  right: -5px;
  width: 597px;
  z-index: 1;
  min-height: 460px;
  height: auto;
  border-radius: 16px;
  background: white;
`;

export const CalendarHeaderRow = styled.div`
  display: flex;
  rgb(34, 34, 34);
  width: 100%;
  padding: 2px 0;
`;

export const CalendarHeaderRowLeft = styled.div`
  display: flex;
  flex-flow: column;
  width: auto;
`;

export const SelectDates = styled.div`
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 8px;
`;

export const MinimumStay = styled.div`
  color: rgb(113, 113, 113);
  font-size: 14px;
  line-height:18px;
`;

export const CalendarGridRow = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  scroll-snap-type: x mandatory;
`;

export const CalendarWindow = styled.div`
  display: flex;
  flex-flow: row;
  border: thin transparent solid;
  width: 609px;
  height: auto;
  overflow: hidden;
  margin-left: -10px;
  padding-left: 10px;
`;

export const ArrowWindow = styled.div`
  display: grid;
  width: 620px;
  grid-templates-columns: "auto 1fr auto"
`;

export const MonthWindow = styled(CalendarWindow)`
  grid-column:2;
  width: 510px;

`;

export const LeftArrow = styled.button`
  cursor: ${(props) => (props.xTransMonth === 0 ? 'not-allowed' : 'pointer')};
  grid-column: 1;
  font-size: 18px;
  align-self: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: transparent;
  outline:none;
  &:hover {
    background: rgb(247,247,247);
  }
`;

export const RightArrow = styled(LeftArrow)`
  grid-column: 3;
`;

export const MonthHeaderTitle = styled.div`
  font-family: 'Airbnb Cereal App Medium', sans-serif;
  font-size: 16px !important;
  line-height: 20px margin!important;
  min-width: 185px;
  align-self: center;
  text-align: center;
  padding: 26px 0px;
  margin-right: 136px;
`;

export const FooterRow = styled.div`
  margin-left: -5px;
  width: 602px;
  height: 32px;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
`;

export const WeekdayRow = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
`;

export const PriceWarning = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  line-height: 16px;
  color: rgb(113, 113, 113);
`;

export const KeyboardInner = styled.div`
    svg {
    color: rgb(113,113,113);
    height: 20px;
    };
`;

export const KeyboardOuter = styled.div`
    display: inline-flex;
    align-self: center;
    margin-right: 8px;
    border: black solid 0px;
    border-radius: 25px;
    background: transparent;
    padding: 10px;
    : hover {
      background: rgb(247, 247, 247);
    }
`;
