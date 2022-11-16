import React, { useLayoutEffect, useState, memo, useRef } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import SlotItem from "./SlotItem";

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

const SlotsList = ({
  calendarData = "",
  date = "",
  data,
  isDatePicked = "",
  selectedSlotTime = "",
  setReqData = () => {},
  setDate = () => {},
}) => {
  const { width } = useWindowDimensions();
  const ref2 = useRef(null);

  // Holds the array of data of the slots of each month
  const [slotsDataTransformed, setSlotsDataTransformed] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    let offSet = "";
    if (width >= 640) {
      offSet = 112;
    } else if (width > 640) {
      offSet = 348;
    } else if (width > 447) {
      offSet = 336 + 12;
    } else if (width > 325) {
      offSet = 224 + 12;
    }
    const currentMonth = new Date().getMonth();
    const selectedMonth = date.getMonth();

    const now = new Date();
    let firstMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    let secondMonth = new Date(now.getFullYear(), now.getMonth() + 2, 1);
    let thirdMonth = new Date(now.getFullYear(), now.getMonth() + 3, 1);
    let fourthMonth = new Date(now.getFullYear(), now.getMonth() + 4, 1);
    let fifthMonth = new Date(now.getFullYear(), now.getMonth() + 5, 1);

    if (currentMonth === selectedMonth) {
      ref2?.current?.scrollTo({
        top: 0,
        left: (date.getDate() - 1) * offSet,
        behavior: "smooth",
      });
    } else if (selectedMonth === currentMonth + 1) {
      const noOfDays = getDaysInMonth(
        new Date().getFullYear(),
        new Date().getMonth() + 1
      );

      ref2?.current?.scrollTo({
        top: 0,
        left: noOfDays * offSet + date.getDate() * offSet - offSet,
        behavior: "smooth",
      });
    } else if (selectedMonth === currentMonth + 2) {
      const noOfDaysMonthOne = getDaysInMonth(
        new Date().getFullYear(),
        new Date().getMonth() + 1
      );
      const now = new Date();
      let newDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const noOfDaysMonthTwo = getDaysInMonth(
        newDate.getFullYear(),
        newDate.getMonth() + 1
      );

      const totalDays = noOfDaysMonthOne + noOfDaysMonthTwo;

      ref2?.current?.scrollTo({
        top: 0,
        left: totalDays * offSet + date.getDate() * offSet - offSet,
        behavior: "smooth",
      });
    } else if (selectedMonth === thirdMonth.getMonth()) {
      const noOfDaysMonthOne = getDaysInMonth(
        new Date().getFullYear(),
        new Date().getMonth() + 1
      );

      const noOfDaysMonthTwo = getDaysInMonth(
        firstMonth.getFullYear(),
        firstMonth.getMonth() + 1
      );

      const noOfDaysMonthThree = getDaysInMonth(
        secondMonth.getFullYear(),
        secondMonth.getMonth() + 1
      );  

      const totalDays =
        noOfDaysMonthOne + noOfDaysMonthTwo + noOfDaysMonthThree;

      ref2?.current?.scrollTo({
        top: 0,
        left: totalDays * offSet + date.getDate() * offSet - offSet,
        behavior: "smooth",
      });
    } else if (selectedMonth === fourthMonth.getMonth()) {
      const noOfDaysMonthOne = getDaysInMonth(
        new Date().getFullYear(),
        new Date().getMonth() + 1
      );

      const noOfDaysMonthTwo = getDaysInMonth(
        firstMonth.getFullYear(),
        firstMonth.getMonth() + 1
      );

      const noOfDaysMonthThree = getDaysInMonth(
        secondMonth.getFullYear(),
        secondMonth.getMonth() + 1
      );

      const noOfDaysMonthfourth = getDaysInMonth(
        thirdMonth.getFullYear(),
        thirdMonth.getMonth() + 1
      );

      const totalDays =
        noOfDaysMonthOne +
        noOfDaysMonthTwo +
        noOfDaysMonthThree +
        noOfDaysMonthfourth;

      ref2?.current?.scrollTo({
        top: 0,
        left: totalDays * offSet + date.getDate() * offSet - offSet,
        behavior: "smooth",
      });
    } else if (selectedMonth === fifthMonth.getMonth()) {
      const noOfDaysMonthOne = getDaysInMonth(
        new Date().getFullYear(),
        new Date().getMonth() + 1
      );

      const noOfDaysMonthTwo = getDaysInMonth(
        firstMonth.getFullYear(),
        firstMonth.getMonth() + 1
      );

      const noOfDaysMonthThree = getDaysInMonth(
        secondMonth.getFullYear(),
        secondMonth.getMonth() + 1
      );

      const noOfDaysMonthfourth = getDaysInMonth(
        thirdMonth.getFullYear(),
        thirdMonth.getMonth() + 1
      );
      const noOfDaysMonthfive = getDaysInMonth(
        fourthMonth.getFullYear(),
        fourthMonth.getMonth() + 1
      );
      const totalDays =
        noOfDaysMonthOne +
        noOfDaysMonthTwo +
        noOfDaysMonthThree +
        noOfDaysMonthfourth +
        noOfDaysMonthfive;

      ref2?.current?.scrollTo({
        top: 0,
        left: totalDays * offSet + date.getDate() * offSet - offSet,
        behavior: "smooth",
      });
    }
  }, [ref2, slotsDataTransformed, isDatePicked, isLoading, date, width]);

  useLayoutEffect(() => {
    const validate = (monthDate) => {
      let dateStr = monthDate.slice(-58);
      dateStr = new Date(dateStr);
      const arr = data.slots.filter((data) => {
        const resDate = new Date(data.time);
        return (
          resDate.getDate() === dateStr.getDate() &&
          resDate.getMonth() === dateStr.getMonth() &&
          resDate.getFullYear() === dateStr.getFullYear()
        );
      });
      return arr;
    };
    const res = calendarData.map((data) => {
      return validate(data);
    });

    setSlotsDataTransformed(res);
    setIsLoading(false);
  }, [calendarData, data.slots]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log("Refixed");
  return (
    <div className="rounded-t-3xl rounded-br-3xl bg-[#ffffff] py-4 px-8 ">
      <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row">
        <div className="md:w-[45%] space-y-4">
          <div className="flex items-center space-x-2">
            <img
              className="rounded-full h-14 w-14 object-contain "
              src="https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
              alt="avatar"
            />
            <div>
              <p className="opacity-60 text-xs">Dentist</p>
              <h1 className="text-base font-semibold">{data.provider_name}</h1>
            </div>
          </div>

          <div className="text-[#652293]">
            <h1 className="font-semibold text-2xl">Next Availability:</h1>
            <h3
              onClick={() => {
                setDate(new Date(data.next_available_date));
              }}
            >
              {new Date(data.next_available_date).toDateString()}
            </h3>
          </div>
        </div>

        <div className="md:w-[55%] ">
          <div
            ref={ref2}
            className=" flex overflow-hidden space-x-3 noScrollbar"
          >
            {slotsDataTransformed.map((dataArray, _index) => (
              <div
                className="xxs:min-w-[224px] xs:min-w-[336px]  sm:min-w-[100px] "
                key={_index}
              >
                <SlotItem
                  date={date}
                  dataArray={dataArray}
                  providername={data.provider_name}
                  selectedSlotTime={selectedSlotTime}
                  setReqData={setReqData}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SlotsList);
