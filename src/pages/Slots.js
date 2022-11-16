import { useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SlotsHeader, SlotsList } from "../components";
import { makeGetRequest, makePostRequest } from "../http/API";
import {
  APPOINTMENT_TYPES,
  BOOKAPPOINTMENT,
  INSURANCE_OPTIONS,
} from "../http/Costants";
import { locale } from "moment/moment";

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function getDayAndDate(dateStr) {
  var date = new Date(dateStr);
  const day = date.toLocaleDateString(locale, { weekday: "short" });
  return day;
}

const Slots = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useParams();
  const { slotsData, appointmentTypes, insuranceOptions, locationId } =
    location.state;

  // Handle the state about is it scrolling or not
  const [isScrolling, setIsScrolling] = useState(false);

  // Holds the loading state to show loading when the backend request is happening
  const [loading, setLoading] = useState(false);

  // Holds data to do req to book an appointment
  const [reqData, setReqData] = useState({
    providerName: "",
    slotTime: "",
  });

  // Holds the date
  const [date, setDate] = useState(new Date());

  // Holds How many number of days in the current month
  const [noOfDays, setNoOfDays] = useState("");

  useLayoutEffect(() => {
    var now = date;
    setNoOfDays(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
  }, [date]);

  const [calendarData, setCalendarData] = useState([]);

  useLayoutEffect(() => {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      const now = new Date();
      var newDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
      let days = getDaysInMonth(newDate.getFullYear(), newDate.getMonth() + 1);
      for (let j = 0; j < days; j++) {
        const fullYear = newDate.getFullYear();
        const month = newDate.getMonth();
        arr.push(
          `${getDayAndDate(new Date(`${month + 1}/${j + 1}/${fullYear}`))} ${
            j + 1
          }   ${new Date(`${month + 1}/${j + 1}/${fullYear}`)}`
        );
      }
    }
    setCalendarData(arr);
  }, []);

  // Reference for the Slot headers
  const ref = useRef(null);
  // Reference for the Slots container
  const scroll = (scrollOffset) => {
    if (!isScrolling) {
      if (+scrollOffset.toString().includes("-")) {
        setDate(new Date(date.getTime() - 24 * 60 * 60 * 1000));
      } else {
        setDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
      }
      setIsScrolling(true);
      ref.current.scrollTo({
        left: ref.current?.scrollLeft + scrollOffset,
        behavior: "smooth",
      });

      setTimeout(() => {
        setIsScrolling(false);
      }, 350);
    }
  };

  const [isDatePicked, setIsDatePicked] = useState(false);

  // Runs When User click on Continue button
  const continueHandler = async () => {
    // makePostRequest
    if (reqData.slotTime !== "" && reqData.providerName !== "") {
      try {
        setLoading(true);
        const { status } = await makePostRequest(BOOKAPPOINTMENT, {
          location: locationId,
          appointment_type: appointmentTypes,
          insurance_option: insuranceOptions,
          provider_name: reqData.providerName,
          slot_time: reqData.slotTime,
          patient_name: "Patient 1 (placeholder)",
        });
        if (status === 200) {
          navigate("/schedulling/:user/slotbook", {
            state: {
              reqData: reqData,
            },
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Runs When User click on Back button
  const backHandler = async () => {
    try {
      setLoading(true);
      const appointmentTypesRes = await makeGetRequest(
        `${APPOINTMENT_TYPES}?location=${locationId}`
      );
      const insuranceOptionsRes = await makeGetRequest(
        `${INSURANCE_OPTIONS}?location=${locationId}`
      );

      // Destructuring Status from the response
      const { status: appointmentResStatus } = appointmentTypesRes;
      const { status: insuranceOptionsStatus } = insuranceOptionsRes;

      // Checking is status is OK from the response and then navigate to the menu Screen
      if (appointmentResStatus === 200 && insuranceOptionsStatus === 200) {
        navigate(`/schedulling/${user}/menu`, {
          state: {
            appointmentTypes: appointmentTypesRes.data,
            insuranceOptions: insuranceOptionsRes.data,
            locationId,
          },
        });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {slotsData ? (
        <div className="flex-1 flex flex-col">
          <h1 className="text-[#652293] border-[#652293] border-b text-center py-3 text-3xl font-semibold">
            Location 1
          </h1>
          <div className="xxs:max-w-[320px] xs:max-w-[432px] md:max-w-[704px] w-full px-4  mx-auto my-4 space-y-4">
            <SlotsHeader
              isDatePicked={isDatePicked}
              setIsDatePicked={setIsDatePicked}
              calendarData={calendarData}
              date={date}
              setDate={setDate}
              scroll={scroll}
              divRef={ref}
              noOfDays={noOfDays}
              setNoOfDays={setNoOfDays}
            />
            {slotsData?.result?.map((data) => (
              <SlotsList
                setDate={setDate}
                isDatePicked={isDatePicked}
                calendarData={calendarData}
                date={date}
                selectedSlotTime={reqData.slotTime}
                setReqData={setReqData}
                key={data._id}
                data={data}
                noOfDays={noOfDays}
              />
            ))}

            <div
              className={`${
                loading && "opacity-50"
              } flex items-center justify-between`}
            >
              <button
                disabled={loading}
                onClick={() => {
                  backHandler(locationId);
                }}
                className="py-2 px-6 sm:px-10 md:px-20 bg-[#652293] text-[#ffffff] font-semibold"
              >
                Back
              </button>
              <button
                disabled={loading}
                onClick={continueHandler}
                className="py-2 px-6 sm:px-10 md:px-20 bg-[#652293] text-[#ffffff] font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Slots;
