import React, { useState } from "react";
import { Backdrop } from "..";

interface props {
  close: any;
  width?: string;
  right?: boolean;
  closeButton?: boolean;
  status: boolean;
  children?: React.ReactNode;
}

export const Sidebar: React.FC<props> = ({
  close,
  width = "md:w-1/3",
  right = true,
  children,
  closeButton = true,
  status,
}) => {
  const [clickState, setClickState] = useState(true);

  return (
    <div>
      <Backdrop
        backdropClick={() => (clickState ? close() : null)}
        status={status}
      >
        <div
          className={`h-screen bg-white w-full ${width} absolute ${
            right ? "right-0" : "left-0"
          } overflow-y-auto transition ease-in-out duration-200 `}
          style={{ transform: status ? "translateX(0%)" : "translateX(100%)" }}
          onMouseEnter={() => setClickState(false)}
          onMouseLeave={() => setClickState(true)}
        >
          <div className='relative p-4'>
            {closeButton ? (
              <div
                className=' left-10 cursor-pointer text-right md:text-left'
                onClick={close}
              >
                <div className='w-8 h-8 inline-block'>
                  <img
                    src='/images/x-circle-fill.svg'
                    className='w-full h-full object-contain'
                    alt='close'
                  />
                </div>
              </div>
            ) : null}
            <div className='mt-5'>{children}</div>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};
