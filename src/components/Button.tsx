/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  props?: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  props,
  onClick,
}: ButtonProps) => {
  return (
    <button type="button" className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
