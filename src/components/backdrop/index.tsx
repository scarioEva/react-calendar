import React from "react";

interface props {
  backdropClick: any;
  status: boolean;
  children?: React.ReactNode;
}
//backdrop for sidebar component

export const Backdrop: React.FC<props> = ({
  children,
  backdropClick,
  status,
}) => {
  return (
    <div
      className={`fixed cursor-pointer9 top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 transition ease-in-out duration-100  ${
        !status ? "opacity-0 pointer-events-none" : ""
      }`}
      onClick={backdropClick}
    >
      {children}
    </div>
  );
};
