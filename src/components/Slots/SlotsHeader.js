import { useLayoutEffect, useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";
import DatePicker from "react-datepicker";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import "react-datepicker/dist/react-datepicker.css";

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

const SlotsHeader = ({
  calendarData = [],
  date = "",
  setDate = () => {},
  divRef,
  scroll,
  isDatePicked = {},
  setIsDatePicked = () => {},
}) => {
  const { width } = useWindowDimensions();

  // Do scroll to that date when date is changed from right side
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
      divRef?.current?.scrollTo({
        top: 0,
        left: (date.getDate() - 1) * offSet,
        behavior: "smooth",
      });
    } else if (selectedMonth === currentMonth + 1) {
      const noOfDays = getDaysInMonth(
        new Date().getFullYear(),
        new Date().getMonth() + 1
      );

      divRef?.current?.scrollTo({
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

      divRef?.current?.scrollTo({
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

      divRef?.current?.scrollTo({
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

      divRef?.current?.scrollTo({
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

      divRef?.current?.scrollTo({
        top: 0,
        left: totalDays * offSet + date.getDate() * offSet - offSet,
        behavior: "smooth",
      });
    }
  }, [divRef, calendarData, isDatePicked, date, width]);

  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    let now = new Date();
    const thirdMonth = now;
    thirdMonth.setMonth(now.getMonth() + 6);
    const fullYear = thirdMonth.getFullYear();
    const month = thirdMonth.getMonth();
    const days = getDaysInMonth(fullYear, month);

    const newDate = new Date(`${month}-${days}-${fullYear}`);
    setMaxDate(newDate);
  }, []);

  return (
    <div className="bg-[#ffffff] py-4 px-8">
      <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row">
        <div className=" md:w-[45%] flex justify-center">
          <div className="rounded-full px-4 py-1 bg-[#e6e6e6] flex items-center w-36">
            <DatePicker
              placeholderText="Select Date"
              className="bg-transparent w-full outline-none"
              selected={new Date(date)}
              onChange={(date) => {
                setIsDatePicked(!isDatePicked);
                setDate(date);
              }}
              minDate={new Date()}
              maxDate={maxDate}
              disabledKeyboardNavigation
            />
            <GoCalendar />
          </div>
        </div>
        <div className="md:w-[55%] ">
          <div className="flex justify-center mb-2">
            <h2 className="font-semibold text-lg">{`${date.toLocaleString(
              "default",
              {
                month: "short",
              }
            )} ${date.getFullYear()}`}</h2>
          </div>
          <div className="relative flex items-center">
            <div
              onClick={() => {
                if (
                  date.getDate() === new Date().getDate() &&
                  date.getMonth() === new Date().getMonth() &&
                  date.getFullYear() === new Date().getFullYear()
                ) {
                  return;
                }
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
                scroll(-offSet);
              }}
              className="absolute top-1/2 bg-[#ffffff] z-0  -translate-y-1/2 left-0"
            >
              <BsChevronLeft />
            </div>
            <div
              ref={divRef}
              className=" flex overflow-hidden space-x-3 noScrollbar"
            >
              {calendarData.map((date, index) => (
                <div
                  id={index}
                  key={index}
                  className="xxs:min-w-[224px] xs:min-w-[336px]  sm:min-w-[100px] text-center"
                >
                  {date.slice(0, 6)}
                </div>
              ))}
            </div>
            <div
              onClick={() => {
                if (
                  date.getDate() === maxDate.getDate() &&
                  date.getMonth() === maxDate.getMonth() &&
                  date.getFullYear() === maxDate.getFullYear()
                ) {
                  return;
                }
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
                scroll(offSet);
              }}
              className="absolute top-1/2 bg-[#ffffff] z-0 -translate-y-1/2 right-0"
            >
              <BsChevronRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotsHeader;
