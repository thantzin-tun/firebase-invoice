import styled from "styled-components";
import {} from 'react-icons/'

export const SideBarStyle = styled.div`

    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 150px;
    background-color: ${props => props.bgColor || "black"};

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 15px;

    .link {
      width: 100%;
      border: none;
      outline: none;
      padding: 10px 20px;
      margin-bottom: 20px;
      font-size: 0.8rem;
      color: ${props => props.color || "black"};
      border-radius: 5px;
      display: flex;
      align-items: center;
      transition: all 0.2s linear;
      text-decoration: none;
      &:hover {
      background-color: ${props => props.buttonBg || "white"};
      }
    }

`