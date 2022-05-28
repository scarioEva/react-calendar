import React, { useState } from "react";
import { Add } from "./add";

interface props {
  data: any;
  setUpdate: any;
}

export const Events: React.FC<props> = ({ data, setUpdate }) => {
  const [add, setAdd] = useState(false);
  return (
    <div className='overflow-x-hidden'>
      <div
        className='transition ease-in-out duration-150'
        style={{
          width: "200%",
          transform: add ? "translateX(-50%)" : "translateX(0px)",
        }}
      >
        <div className='grid grid-cols-2'>
          <div>
            <h1 className='font-bold text-2xl'>
              {data.date} {data.month}, {data.year}
            </h1>
            {data.holidayData || data.localData ? (
              <div>
                <div className='mt-4'>
                  <span className='text-blue-500 text-xl font-bold block'>
                    {data?.holidayData?.summary}
                  </span>
                  <span className=''>{data?.holidayData?.description}</span>
                </div>
                <div className='mt-4'>
                  <span className='text-red-500 text-xl font-bold block'>
                    {data?.localData?.title}
                  </span>
                  <span className=''>{data?.localData?.description}</span>
                </div>
              </div>
            ) : (
              <div className='text-center mt-4'>
                <span>No event</span>
              </div>
            )}
            {!data.localData && (
              <button
                onClick={() => setAdd(true)}
                className='mt-10 bg-blue-500 w-full text-center py-2 text-white rounded-lg '
              >
                Add event
              </button>
            )}
          </div>
          <div>
            {/* Add event component */}
            <Add
              date={{ date: data.date, month: data.month, year: data.year }}
              update={setUpdate}
              showEvent={() => {
                setAdd(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
