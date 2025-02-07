import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  background-color: #1550ff;
  border-radius: 10px;
  cursor: pointer;
  opacity: 1;
  transition: all ease 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

export const Label = styled.div`
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0 20px;
  font-size: 15px;
  color: #fff;
`;

export const IconArea = styled.div`
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0 15px;
`;

export const Icon = styled.img`
  height: 25px;
`;
