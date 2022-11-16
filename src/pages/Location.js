import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { Loader } from "../components";
import { makeGetRequest } from "../http/API";
import {
  APPOINTMENT_TYPES,
  INSURANCE_OPTIONS,
  LOCATION,
} from "../http/Costants";

const Location = () => {
  const navigate = useNavigate();
  const { user } = useParams();

  // Holds the array of Locations that will comes from the backend
  const [locations, setLocations] = useState([]);
  //   Holds the loading state for that time the request is happening to the server
  const [loading, setLoading] = useState();

  useLayoutEffect(() => {
    // DO request to the backend to get available locations
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const { data } = await makeGetRequest(LOCATION);
        const { result } = data;
        console.log({ result });
        if (result.length === 0) {
          fetchData();
        }
        setLocations(result);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const fetchData = async (locationId = "") => {
    let appointmentUrl = "";
    let insuranceUrl = "";
    if (locationId === "") {
      appointmentUrl = `${APPOINTMENT_TYPES}`;
      insuranceUrl = `${INSURANCE_OPTIONS}`;
    } else {
      appointmentUrl = `${APPOINTMENT_TYPES}?location=${locationId}`;
      insuranceUrl = `${INSURANCE_OPTIONS}?location=${locationId}`;
    }
    try {
      console.log(appointmentUrl, insuranceUrl);
      setLoading(true);
      const appointmentTypesRes = await makeGetRequest(appointmentUrl);
      const insuranceOptionsRes = await makeGetRequest(insuranceUrl);

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
  // Click handler on the click of location
  const clickHandler = async (locationId) => {
    fetchData(locationId);
  };
  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-[#652293] border-[#652293] border-b text-center py-3 text-3xl font-semibold">
        Select your Location
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid sm:grid-cols-2 max-w-5xl mx-auto my-3 sm:my-5">
          {locations &&
            locations.map(({ name, id }) => (
              <div
                onClick={() => {
                  clickHandler(id);
                }}
                key={id}
                className="bg-[#ffffff] rounded-t-3xl rounded-br-3xl p-6 sm:mx-8 my-2 w-72 sm:w-72 md:w-96 duration-300 hover:scale-105 md:cursor-pointer"
              >
                <h1 className="text-[#652293] pb-4 font-bold">{name}</h1>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Location;
