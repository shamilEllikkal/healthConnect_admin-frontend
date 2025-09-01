import NavBar from "./NavBar";
import {
  faFilter,
  faLocationDot,
  faPhone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar,
  faCheckCircle,
  faClock,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { dataStore } from "../store/dataStore";

const statusOptions = [{ value: "confirm", label: "confirm" }];

const ViewAppointments = () => {
  type Appointment = {
    id: string;
    doctor: string;
    speciality: string;
    hospital: string;
    date: string;
    time: string;
  };

  const [appointmentList, setAppointmentList] = useState<Appointment[] | null>(
    null
  );

  const [selectStatus, setSelectStatus] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const { appointments, fetchAppointments, loading } = dataStore();

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    setAppointmentList(appointments as Appointment[] | null);
    console.log(appointments);
  }, [appointments]);

  return (
    <>
      <div className="pl-64 max-sm:pl-0">
        <div className="w-full flex flex-col">
          <NavBar />
          <div className="pt-16">
            <div className="bg-bg min-h-dvh max-sm:p-4 p-8 space-y-8">
              <div className="">
                <h1 className="text-3xl font-bold text-text">
                  View Appointments
                </h1>
                <h1 className="text-text-muted mt-2">
                  Monitor and manage all patient appointments
                </h1>
              </div>
              <div className=" grid grid-cols-4 gap-6  ">
                <div className="bg-white hover:scale-110 transition-all duration-300 ease-out hover:shadow-xl shadow p-6 rounded-2xl flex flex-col justify-center items-center">
                  <h1 className="text-sm text-text-muted mb-2">
                    Total Appointments
                  </h1>
                  <h1 className="text-3xl font-bold text-text mb-2">2,847</h1>
                  <h1 className="text-sm font-medium text-green-600">+18%</h1>
                </div>
                <div className="bg-white hover:scale-110 transition-all duration-300  hover:shadow-xl shadow ease-out p-6 rounded-2xl flex flex-col justify-center items-center">
                  <h1 className="text-sm text-text-muted mb-2">
                    Today's Appointments
                  </h1>
                  <h1 className="text-3xl font-bold text-text mb-2">24</h1>
                  <h1 className="text-sm font-medium text-green-600">+12%</h1>
                </div>
                <div className="bg-white hover:scale-110 transition-all duration-300 hover:shadow-xl shadow ease-out p-6 rounded-2xl flex flex-col justify-center items-center">
                  <h1 className="text-sm text-text-muted mb-2">
                    Pending Approval
                  </h1>
                  <h1 className="text-3xl font-bold text-text mb-2">8</h1>
                  <h1 className="text-sm font-medium text-yellow-600">-5%</h1>
                </div>
                <div className="bg-white hover:scale-110 transition-all duration-300 hover:shadow-xl shadow ease-out p-6 rounded-2xl flex flex-col justify-center items-center">
                  <h1 className="text-sm text-text-muted mb-2">
                    Completed Today
                  </h1>
                  <h1 className="text-3xl font-bold text-text mb-2">16</h1>
                  <h1 className="text-sm font-medium text-green-600">+25%</h1>
                </div>
              </div>
              <div className="bg-white p-6">
                <div className="flex gap-2 pb-6">
                  <div className="text-text text-2xl">
                    <FontAwesomeIcon icon={faFilter} />
                  </div>
                  <h1 className="text-2xl font-semibold leading-none text-text flex items-center gap-2">
                    Filter Appointments
                  </h1>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="relative ">
                    <div className="absolute top-1/2 left-2 -translate-y-1/2">
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <input
                      placeholder="search Doctors"
                      className="flex h-10 w-full  px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-bg file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none  focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 pl-10 bg-white border-1  border-black/20   focus:bg-white focus:border-2 focus:border-blue-500 rounded-xl"
                      type="text"
                    />
                  </div>
                  <div>
                    <Select
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          height: "40px",
                          borderRadius: "8px",
                          "&:hover": {
                            borderColor: state.isFocused ? "" : "#BDBDBD",
                          },
                        }),
                      }}
                      isSearchable
                      isClearable
                      placeholder="All Status"
                      options={statusOptions}
                      value={selectStatus}
                      onChange={(e) => setSelectStatus(e)}
                    />
                  </div>
                  <div>
                    <input
                      className="flex h-10 w-full border-input px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-bg file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-bg focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50  border-1 border-black/20 focus:bg-white focus:border-2 focus:border-blue-500 rounded-xl"
                      type="date"
                    />
                  </div>
                  <div>
                    <button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-10 px-4 py-2 bg-teal-500 hover:bg-teal-600">
                      Apply Filters{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 pb-6">
                    <div className="text-text text-2xl">
                      <FontAwesomeIcon icon={faCalendar} />
                    </div>
                    <h1 className="text-2xl font-semibold leading-none text-text flex items-center gap-2">
                      All Appointments ({appointmentList?.length})
                    </h1>
                  </div>
                  <div className="relative">
                    <div className="absolute top-1/2 left-4 text-white -translate-1/2">
                      {" "}
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <button className="inline-flex pl-8 items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-10 px-4 py-2 bg-teal-500 hover:bg-teal-600">
                      Bulk Action
                    </button>
                  </div>
                </div>
                {loading && appointmentList === null ? (
                  <div>
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex justify-between p-6 rounded-2xl bg-gray-100 border-2 border-gray-200 mb-4 animate-pulse"
                      >
                        <div className="flex gap-5">
                          <div className="w-16 h-16 rounded-full bg-gray-300" />
                          <div>
                            <div className="h-4 w-32 bg-gray-300 rounded mb-2" />
                            <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
                            <div className="flex gap-4">
                              <div className="h-3 w-16 bg-gray-200 rounded" />
                              <div className="h-3 w-16 bg-gray-200 rounded" />
                              <div className="h-3 w-10 bg-gray-200 rounded" />
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <div className="h-6 w-16 bg-gray-200 rounded-full" />
                          <div className="h-9 w-16 bg-gray-200 rounded-xl" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pt-6">
                    {appointmentList?.map((appointment) => (
                      <div className="flex justify-between items-center p-6 border-1 rounded-2xl border-black/20 mb-3 ">
                        <div className="flex gap-4">
                          <div>
                            <img
                              className="w-12 h-12 rounded-xl object-cover"
                              src="/defaultprofile.jpg"
                              alt=""
                            />
                          </div>
                          <div>
                            <h1 className="font-semibold text-text">
                              {appointment.doctor}
                            </h1>
                            <h1 className="text-teal-600 font-medium text-sm">
                              {appointment.speciality}
                            </h1>
                            <div className="flex items-center space-x-4 text-xs text-text-muted mt-1">
                              <div className="flex gap-1">
                                <FontAwesomeIcon icon={faCalendar} />
                                <h1>{appointment.date}</h1>
                              </div>
                              <div className="flex gap-1">
                                <FontAwesomeIcon icon={faClock} />
                                <h1>{appointment.time}</h1>
                              </div>
                              <div className="flex gap-1">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <h1>{appointment.hospital}</h1>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="relative">
                            <div className="absolute top-1/2 left-4 text-teal -translate-1/2">
                              {" "}
                              <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <button className="pl-8 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-accent-bg h-9 rounded-xl px-3 border-teal-200 text-teal-600 hover:bg-teal-50 bg-bg">
                              Call
                            </button>
                          </div>
                          <div className="relative">
                            <div className="absolute top-1/2 left-4 text-teal -translate-1/2">
                              {" "}
                              <FontAwesomeIcon icon={faMessage} />
                            </div>
                            <button className="pl-8 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-accent-bg h-9 rounded-xl px-3 border-teal-200 text-teal-600 hover:bg-teal-50 bg-bg">
                              Message
                            </button>
                          </div>
                          <div className="">
                            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-accent-bg h-9 rounded-xl px-3 border-teal-200 text-teal-600 hover:bg-teal-50 bg-bg">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAppointments;
