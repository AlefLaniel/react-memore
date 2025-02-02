import React from "react";
import * as C from "./styles";

type Props = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
};

const Button = ({ label, icon, onClick }: Props) => {
  return (
    <C.Container onClick={onClick}>
      {icon && (
        <C.IconArea>
          <C.Icon src={icon} />
        </C.IconArea>
      )}
      <C.Label>{label}</C.Label>
    </C.Container>
  );
};

export default Button;
