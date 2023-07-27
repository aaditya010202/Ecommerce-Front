import { primaryColor } from "@/lib/colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  background-color: ${primaryColor};
  color: #fff;
  border: 0;
  padding: 5px 15px;
  border-radius: 3px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #aaa;
      color: #000;

      &:hover {
        background-color: #fff;
      }
    `}

  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #aaa;
      border: 1px solid #aaa;

      &:hover {
        background-color: #aaa;
        color: #fff;
      }
    `}

  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: #aaa;
      color: #fff;
      border: 1px solid #aaa;
      &:hover {
        background-color: ${primaryColor};
        color: #fff;
      }
    `}
    
  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${primaryColor};
      border: 1px solid ${primaryColor};

      &:hover {
        background-color: ${primaryColor};
        color: #fff;
      }
    `}

  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 22px;
      }
    `}
`;
const StyledBtn = styled.button`
  ${ButtonStyle}
`;
export default function Button({ children, ...rest }) {
  return <StyledBtn {...rest}>{children}</StyledBtn>;
}
