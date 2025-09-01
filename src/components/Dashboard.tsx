import NavBar from "./NavBar";
import { useState } from "react";
import {
  faChartLine,
  faUserPlus,
  faStar,
  faNotesMedical,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar,
  faClock,
  faHeart,
  faHospital,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { dataStore } from "../store/dataStore";

const Dashboard = () => {

  type appointment = {

    doctor:string;
    date:string;
    time:string;
    hospital:string;
  }

const [appointmentList,setAppointmentList] = useState<appointment[] | null>(null);


  const {
    appointments,
    fetchAppointments,
  } = dataStore();

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    // Transform the appointments data to match the appointment type
    if (appointments) {
      const formattedAppointments = appointments.map(app => {
        if (typeof app === 'object' && app !== null) {
          return app as unknown as appointment;
        }
        // Handle string data or other formats if needed
        return {
          doctor: 'Unknown',
          date: 'Unknown',
          time: 'Unknown',
          hospital: 'Unknown'
        };
      });
      setAppointmentList(formattedAppointments);
    } else {
      setAppointmentList(null);
    }
  }, [ appointments]);

  return (
    <>
      <div className="pl-64 max-sm:pl-0">
        <div className="w-full flex flex-col">
          <NavBar />
          <div className="pt-16">
            <div className="bg-bg min-h-dvh max-sm:p-4 p-8 ">
              <div>
                <h1 className="text-4xl font-bold text-text mb-3">
                  Admin Dashboard
                </h1>
                <p className="text-text-muted text-lg">
                  Overview of your healthcare platform
                </p>
              </div>
              <div className="grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 gap-6 py-8">
                <div className="rounded-2xl   text-card-foreground  shadow-sm hover-lift border-0 soft-shadow bg-white p-6 flex items-center justify-between transition-transform hover:scale-110 duration-300 ease-in-out">
                  <div>
                    <h1 className="text-sm text-text-muted mb-2">
                      Total Doctors
                    </h1>
                    <h1 className="text-3xl font-bold text-text mb-2">156</h1>
                    <div className="flex items-center text-sm text-green-600 font-medium">
                      <FontAwesomeIcon icon={faChartLine} />

                      <h1>+12%</h1>
                    </div>
                  </div>
                  <div>
                    <div className="w-14 h-14 gradient-teal-500 text-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-white rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                  </div>
                </div>
                <div className=" transition-transform hover:scale-110 duration-300 ease-in-out rounded-2xl items-center text-card-foreground shadow-sm hover-lift border-0 soft-shadow bg-white p-6 flex justify-between">
                  <div>
                    <h1 className="text-sm text-text-muted mb-2">
                      Total Hospitals{" "}
                    </h1>
                    <h1 className="text-3xl font-bold text-text mb-2">24</h1>
                    <div className="flex items-center text-sm text-green-600 font-medium">
                      <FontAwesomeIcon icon={faChartLine} />
                      <h1>+3%</h1>
                    </div>
                  </div>
                  <div>
                    <div className="w-14 h-14 gradient-teal-500 text-2xl bg-gradient-to-br from-[#22d3ee] to-[#06b6d4] text-white rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faHospital} />
                    </div>
                  </div>
                </div>
                <div className="transition-transform hover:scale-110 duration-300 ease-in-out rounded-2xl items-center text-card-foreground shadow-sm hover-lift border-0 soft-shadow bg-white p-6 flex justify-between">
                  <div>
                    <h1 className="text-sm text-text-muted mb-2">
                      Total Appointments
                    </h1>
                    <h1 className="text-3xl font-bold text-text mb-2">2587</h1>
                    <div className="flex items-center text-sm text-green-600 font-medium">
                      <FontAwesomeIcon icon={faChartLine} />
                      <h1>+18%</h1>
                    </div>
                  </div>
                  <div>
                    <div className="w-14 h-14 gradient-teal-500 text-2xl bg-gradient-to-br from-purple-400 to-purple-600 bg-teal-600 text-white rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faCalendar} />
                    </div>
                  </div>
                </div>
                <div className="transition-transform  hover:scale-110 duration-300 ease-in-out rounded-2xl items-center text-card-foreground shadow-sm hover-lift border-0 soft-shadow bg-white p-6 flex justify-between">
                  <div>
                    <h1 className="text-sm text-text-muted mb-2">
                      Active Patients
                    </h1>
                    <h1 className="text-3xl font-bold text-text mb-2">1234</h1>
                    <div className="flex items-center text-sm text-green-600 font-medium">
                      <FontAwesomeIcon icon={faChartLine} />
                      <h1>+8%</h1>
                    </div>
                  </div>
                  <div>
                    <div className="w-14 h-14 gradient-teal-500 text-2xl bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faUsers} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-8">
                <div className="bg-white p-6 rounded-2xl col-start-1 col-end-3 max-lg:col-end-1 ">
                  <div className="flex items-center gap-3 pb-6">
                    <div className="w-8 h-8 bg-gradient-to-br text-white text-xl from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faCalendar} />
                    </div>
                    <div>
                      <h1 className="font-semibold text-text text-xl">
                        Recent Appointments
                      </h1>
                    </div>
                  </div>
                  {appointmentList?.map((doctor, index) => (
                    <div key={index} className="flex justify-between items-center hover:bg-gray-100 bg-gray-50 transition-all duration-300 ease-in-out rounded-2xl mb-2 p-6 pt-4">
                      <div>
                        <h1 className="font-semibold text-text"> {doctor.doctor}</h1>
                        <h1 className="text-sm text-teal font-medium">
                         {doctor.hospital}
                        </h1>
                        <div className=" gap-2 flex items-center text-xs text-text-muted mt-1">
                          <FontAwesomeIcon icon={faClock} />
                          <h1>{doctor.date} at {doctor.time}</h1>
                        </div>
                      </div>
                      <div className="inline-flex items-center rounded-full border px-2.5 h-7 text-center py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 hover:bg-teal/80 bg-green-100 text-green-800 border-green-200">
                        confirmed
                      </div>
                    </div>
                  ))}
            
                </div>
                <div className="bg-white p-6 rounded-2xl">
                  <div className="flex items-center gap-3 pb-6">
                    <div className="w-8 h-8 bg-gradient-to-br text-white text-xl from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faNotesMedical} />
                    </div>
                    <div>
                      <h1 className="font-semibold text-text text-xl">
                        Top Doctors
                      </h1>
                    </div>
                  </div>
                  <div className="flex gap-4 pb-3 pt-4">
                    <img
                      className="w-12 h-12 rounded-xl object-cover"
                      src="/defaultprofile.jpg"
                      alt=""
                    />
                    <div>
                      <h1 className="font-semibold text-text text-sm">
                        Dr. Sarah Johnson
                      </h1>
                      <h1 className="text-xs text-teal-500">Cardiologist</h1>
                      <div className="flex max-xl:flex-col max-xl:items-start max-xl:gap-1 items-center pt-1 gap-2">
                        <div className="flex gap-1">
                          <FontAwesomeIcon
                            className="text-yellow-500"
                            icon={faStar}
                          />
                          <h1 className="text-xs text-text-muted">4.9</h1>
                        </div>
                        <h1 className="text-xs text-text-muted">
                          • 234 patients
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white p-6 mt-8 rounded-2xl">
                  <div className="flex items-center gap-3 pb-6">
                    <div className="w-8 h-8 bg-gradient-to-br text-white text-xl from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div>
                      <h1 className="font-semibold text-text text-xl">
                        Quick Actions
                      </h1>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 gap-5">
                    <Link to={"/admin/add-doctors"}>
                      <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 group">
                        <FontAwesomeIcon
                          className=" text-4xl text-teal-500 mb-4 group-hover:scale-110 transition-transform"
                          icon={faUserPlus}
                        />
                        <h1 className="font-semibold text-text mb-1">
                          Add Doctor
                        </h1>
                        <h1 className="text-sm text-text-muted">
                          Register new doctor
                        </h1>
                      </div>
                    </Link>
                    <Link to={"/admin/add-hospitals"}>
                      <div className=" hover:scale-105 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg cursor-pointer transition-all duration-300 group">
                        <FontAwesomeIcon
                          className=" text-4xl text-blue-500 mb-4 group-hover:scale-110 transition-transform"
                          icon={faHospital}
                        />
                        <h1 className="font-semibold text-text mb-1">
                          Add Hospital
                        </h1>
                        <h1 className="text-sm text-text-muted">
                          Register new hospital
                        </h1>
                      </div>
                    </Link>
                    <Link to={"/admin/view-appointments"}>
                      <div className=" hover:scale-105 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-lg cursor-pointer transition-all duration-300 group">
                        <FontAwesomeIcon
                          className=" text-4xl text-purple-500 mb-4 group-hover:scale-110 transition-transform"
                          icon={faCalendar}
                        />
                        <h1 className="font-semibold text-text mb-1">
                          Appointments
                        </h1>
                        <h1 className="text-sm text-text-muted">
                          Manage appointments
                        </h1>
                      </div>
                    </Link>
                    <Link to={"/admin/manage-users"}>
                      <div className=" hover:scale-105 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-lg cursor-pointer transition-all duration-300 group">
                        <FontAwesomeIcon
                          className=" text-4xl text-green-500 mb-4 group-hover:scale-110 transition-transform"
                          icon={faUsers}
                        />
                        <h1 className="font-semibold text-text mb-1">
                          Manage Users
                        </h1>
                        <h1 className="text-sm text-text-muted">
                          User management
                        </h1>
                      </div>
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 mt-8">
                    <div className="bg-white p-6 rounded-2xl mt-8">
                      <h3 className="font-semibold text-text text-xl pb-4">
                        Appointment Trends
                      </h3>
                      <div className="h-64 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl flex flex-col items-center justify-center">
                        <FontAwesomeIcon
                          className=" text-4xl text-teal-500 mb-4 group-hover:scale-110 transition-transform"
                          icon={faChartLine}
                        />
                        <h1 className="text-text-muted text">
                          Chart visualization would go here <br /> Appointment
                          trends over time
                        </h1>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl mt-8">
                      <h3 className="font-semibold text-text text-xl pb-4">
                        Popular Specialties
                      </h3>
                      <div className="h-64 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl flex flex-col items-center justify-center">
                        <FontAwesomeIcon
                          className=" text-4xl text-teal-500 mb-4 group-hover:scale-110 transition-transform"
                          icon={faHeart}
                        />
                        <h1 className="text-text-muted text">
                          Chart visualization would go here <br /> Most booked
                          specialties
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
