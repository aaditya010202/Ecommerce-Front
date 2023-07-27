import { styled } from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  thead {
    font-weight: 400;
    font-size: larger;
    text-align: left;
    color: #aaa;
    text-transform: uppercase;
  }
  tbody td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
export default function Table(props) {
  return <StyledTable {...props} />;
}
