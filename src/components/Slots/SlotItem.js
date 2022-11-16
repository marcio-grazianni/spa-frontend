import { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const SlotItem = ({
  selectedSlotTime = "",
  dataArray = [],
  providername = "",
  setReqData = () => {},
}) => {
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  // Holds the list of slots to render on the screen
  const [slotsList, setSlotsList] = useState([]);

  useEffect(() => {
    const len = width < 640 ? dataArray.length : 3;
    dataArray.length > 3
      ? setSlotsList(dataArray.slice(0, len))
      : setSlotsList(dataArray);
  }, [dataArray, width]);

  return (
    <>
      {dataArray.length > 0 ? (
        <div>
          <div className="hidden sm:block">
            {slotsList?.map(({ _id, status, time }) => (
              <div
                key={_id}
                onClick={() => {
                  if (status === "available") {
                    setReqData({ providername, slotTime: time });
                  }
                }}
                className={`${
                  selectedSlotTime === time && "bg-[#d80b6d] border-[#d80b6d]"
                } ${
                  status === "available" &&
                  "bg-[#652293] border-[#652293] text-[#ffffff]"
                } ${
                  status === "unavailable" &&
                  "bg-[lightgray] border-[lightgray] text-[#000000]"
                } rounded-md border-4 w-full   text-center font-semibold duration-300 my-2 `}
              >
                <div>
                  {new Date(time).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-start sm:hidden">
            {slotsList?.map(({ _id, status, time }) => (
              <div
                key={_id}
                onClick={() => {
                  if (status === "available") {
                    setReqData({ providername, slotTime: time });
                  }
                }}
                className={`${
                  selectedSlotTime === time && "bg-[#d80b6d] border-[#d80b6d]"
                } ${
                  status === "available" &&
                  "bg-[#652293] border-[#652293] text-[#ffffff]"
                } ${
                  status === "unavailable" &&
                  "bg-[lightgray] border-[lightgray] text-[#000000]"
                } rounded-md border-4 m-2 w-[58px] xs:w-[90px]  text-center text-[10px] xs:text-base font-medium xs:font-semibold duration-300 my-2 `}
              >
                <div>
                  {new Date(time).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="hidden sm:block">
            {dataArray.length > 3 && (
              <div
                onClick={() => {
                  setIsOpen(!isOpen);

                  isOpen
                    ? setSlotsList(dataArray.slice(0, 3))
                    : setSlotsList(dataArray);
                }}
                className="text-center w-full  bg-[#ffffff] border font-semibold border-slate-500 rounded-md"
              >
                {!isOpen ? (
                  <div className="flex items-center justify-center">
                    <span>More</span>
                    <BsChevronDown />
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Less</span>
                    <BsChevronUp />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">No Slot available</div>
      )}
    </>
  );
};

export default SlotItem;
