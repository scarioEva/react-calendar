import { useEffect, useState } from "react";
import holidays from "../../json/holidays.json";
import { Events, Sidebar } from "../../components";
import { useDimensions } from "../../hooks/useDimensions";

export const Home = () => {
  const { isXS } = useDimensions(); //screen size resolution
  const [days, setDays] = useState(0);
  const [currentDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [sidebar, setSidebar] = useState(false);
  const [eventData, setEventData] = useState<any>({
    month: "",
    date: 0,
    year: 0,
    localData: {},
    holidayData: {},
  });

  const weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //get number of days in current month and year
  const getDaysInMonth = (month: number, year: number) => {
    setDays(new Date(year, month, 0).getDate());
  };

  useEffect(() => {
    getDaysInMonth(month, year);
  }, [month, year]);

  //if local storage data is present then show it on calendar
  const getLocalEvent = (date: number) => {
    let localEventList = JSON.parse(localStorage.getItem("custom-event")) || [];
    let list = localEventList.find(
      (item) => item?.date === date + " " + months[month - 1] + ", " + year
    );
    if (list)
      return (
        <span className='text-xs w-full  text-ellipsis  block leading-tight bg-red-300 p-1 rounded-lg'>
          {!isXS && list.title}
        </span>
      );
  };

  //if bank holiday json data is present then show it on calendar
  const getHolidayEvent = (date: number) => {
    let data = holidays.find(
      (item) =>
        item.start.date ===
        year +
          "-" +
          (month < 10 ? "0" + month : month) +
          "-" +
          (date < 10 ? "0" + date : date)
    )?.summary;

    if (data)
      return (
        <span className='text-xs w-full  text-ellipsis  block leading-tight bg-blue-300 p-1 rounded-lg'>
          {!isXS && data}
        </span>
      );
  };

  //get local data and json data based on date, month and year and pass it on sidebar to show details
  const passHolidayEventData = (date: number) => {
    let holidayData = holidays.find(
      (item) =>
        item.start.date.slice(item.start.date.indexOf("-")) ===
        "-" +
          (month < 10 ? "0" + month : month) +
          "-" +
          (date < 10 ? "0" + date : date)
    );

    let localEventList = JSON.parse(localStorage.getItem("custom-event")) || [];
    let localData = localEventList.find(
      (item) => item?.date === date + " " + months[month - 1] + ", " + year
    );
    setEventData({
      month: months[month - 1],
      year: year,
      date: date,
      holidayData: holidayData,
      localData: localData,
    });
  };

  return (
    <div className='h-screen'>
      <Sidebar
        close={() => {
          setSidebar(false);
          setEventData({
            month: "",
            date: 0,
            year: 0,
            localData: {},
            holidayData: {},
          });
        }}
        status={sidebar}
      >
        <>
          <Events data={eventData} setUpdate={() => setSidebar(false)} />
        </>
      </Sidebar>
      <div className='flex flex-col h-full'>
        <div>
          <div className='px-4 py-4'>
            <div>
              <div className='flex items-center justify-between'>
                <div>
                  <button
                    className='w-8 h-8'
                    onClick={() => {
                      setMonth(month - 1);
                      if (month === 1) {
                        //if month is january then on click set year to -1 and month to december
                        setYear(year - 1);
                        setMonth(12);
                      }
                    }}
                  >
                    <img
                      src='/images/arrowcircle.svg'
                      className='w-full h-full'
                      alt='arrow-left'
                    />
                  </button>
                </div>
                <div>
                  <div className='flex gap-2 items-center'>
                    <div>
                      <span className='font-bold text-3xl'>
                        {months[month - 1]},
                      </span>
                    </div>
                    <div>
                      <span className='font-bold text-3xl'>{year}</span>
                    </div>
                  </div>

                  {/* <span className='font-bold text-3xl'>{year}</span> */}
                </div>
                <div>
                  <div className='flex flex-row  gap-2'>
                    <div>
                      {/* today button */}
                      <button
                        onClick={() => {
                          setMonth(currentDate.getMonth() + 1);
                          setYear(currentDate.getFullYear());
                        }}
                        className='bg-blue-500 px-2 py-1 text-white rounded-md'
                      >
                        Today
                      </button>
                    </div>
                    <div>
                      <button
                        className='w-8 h-8'
                        onClick={() => {
                          setMonth(month + 1);
                          if (month === 12) {
                            //if month is december then on click set year to +1 and month to january
                            setYear(year + 1);
                            setMonth(1);
                          }
                        }}
                      >
                        <img
                          src='/images/arrowcircle.svg'
                          className='transform rotate-180 w-full h-ful'
                          alt=''
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='grid grid-cols-7  border-x border'>
            {/* weeks listing */}
            {weeks.map((item) => {
              return (
                <div key={item} className='text-center py-4'>
                  <span
                    className={`font-bold ${
                      item == "Sunday" && "text-red-500"
                    } `}
                  >
                    {isXS ? item.charAt(0) : item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex-grow '>
          <div className='grid grid-cols-7 h-full'>
            {/* set empty div based on grid to set the 1st date on exact week of the month */}
            {[...Array(new Date(`${month} 1 ${year}`).getDay())].map(
              (itm, index) => {
                return <div key={index}></div>;
              }
            )}
            {/* get total days from getDaysInMonth() function and display day number from array index+1  */}
            {[...Array(days)].map((itm, index) => {
              return (
                <div
                  onClick={() => {
                    setSidebar(true);
                    passHolidayEventData(index + 1);
                  }}
                  key={index + 1}
                  className={`border  cursor-pointer hover:bg-gray-100 transition ease-in-out duration-200
                  ${
                    // focus current day
                    month === currentDate.getMonth() + 1 &&
                    year === currentDate.getFullYear() &&
                    index + 1 === currentDate.getDate() &&
                    "bg-green-200"
                  } border-gray-200 p-4  `}
                >
                  <div className='relative '>
                    <span>{index + 1}</span>
                    <div className='flex flex-col gap-2'>
                      {/* display bank holiday  */}
                      <div>{getHolidayEvent(index + 1)}</div>
                      {/* display local event */}
                      <div>{getLocalEvent(index + 1)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
