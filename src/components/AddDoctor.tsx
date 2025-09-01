import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faStar,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { dataStore } from "../store/dataStore";
import axios from "../axiosInstance";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "*Name must be atleast 2 character")
    .required("*Name is required"),
  email: yup.string().email("*Invalid email").required("*Email is required"),
  speciality: yup.string().required("*field is Required"),
  phone: yup
    .string()
    .min(10, "*Must be atleast 10 numbers")
    .required("*Phone number is required"),
  experience: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("*field is required")
    .positive("*Must be a positive number")
    .typeError("*Please enter a valid number"),
  hospital: yup.string().required("*Hospital is required"),
  fees: yup.string().required("*fees is required"),
});

const AddDoctor = () => {
  type Doctor = {
    _id: string;
    doctor: string;
    speciality: string;
    experience: number;
    hospital: string;
    doctor_email: string;
    doctor_phone: string;
    biography: string;
    availability: string;
    user_id: string;
    price: string;
  };

  type Hospital = {
    _id: string;
    hospital: string;
  };

  const [addDoctor, setAddDoctor] = useState(false);
  const [doctorList, setDoctorList] = useState<Doctor[] | null>(null);
  const [hospitalList, setHospitalList] = useState<Hospital[] | null>(null);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  const speciality = [
    { label: "Dermatology", value: "dermatology" },
    { label: "Cardiology", value: "cardiology" },
    { label: "Neurology", value: "neurology" },
    { label: "Pediatrics", value: "pediatrics" },
  ];
  const hospital =
    hospitalList?.map((hospital) => ({
      label: hospital.hospital,
      value: hospital.hospital,
    })) || [];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  type FormData = {
    name: string;
    email: string;
    phone: string;
    experience: number;
    hospital: string;
    speciality: string;
    fees: string;
  };

  const onSubmit = async (data: FormData) => {
    const doctorData = {
      doctor: data.name,
      doctor_email: data.email,
      doctor_phone: data.phone,
      speciality: data.speciality,
      experience: data.experience,
      hospital: data.hospital,
      price: data.fees,
      availability: "Available",
      biography: "No biography provided",
    };
    setLoadingDoctors(true);
    try {
      await axios.post("/admin/doctor/create", JSON.stringify(doctorData), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Doctor added successfully");
      setAddDoctor(false);
      fetchDoctors();
    } catch (err) {
      console.error(err);
    }
    setLoadingDoctors(false);
    reset();
  };

  const { doctors, fetchDoctors, loading } = dataStore();

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  useEffect(() => {
    setDoctorList(doctors);
  }, [doctors]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get("/hospitals");
        setHospitalList(res.data);
        // console.log(res.data,"hos");
      } catch (err) {
        console.error(err);
      }
    };
    fetchHospitals();
  }, []);

  const deleteDoctor = async (id: string) => {
    try {
      await axios.delete(`/admin/doctor/delete/${id}`);
      toast.success("Doctor deleted successfully");
      fetchDoctors();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="pl-64 max-sm:pl-0">
        <div className="w-full flex flex-col">
          <NavBar />
          <div className="pt-16">
            <div className="bg-bg min-h-dvh max-sm:p-4 p-8 ">
              <div className="flex justify-between items-center pb-6">
                <div>
                  <h1 className="text-3xl font-bold text-text">
                    Manage Doctors
                  </h1>
                  <h1 className="text-text-muted mt-2">
                    Add and manage doctors in your platform
                  </h1>
                </div>
                <div className="relative">
                  <FontAwesomeIcon
                    className="absolute top-1/2 -translate-y-1/2 px-2 text-white"
                    icon={faUser}
                  />

                  <button
                    onClick={() => setAddDoctor(true)}
                    className="inline-flex pl-8 items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-10 px-4 py-2 bg-teal-500 hover:bg-teal-600"
                  >
                    Add Doctor
                  </button>
                </div>
              </div>
              {addDoctor && (
                <div className="mt-4 mb-6 p-6 bg-white rounded-2xl">
                  <div className=" text-2xl font-semibold leading-none text-text pb-5 flex items-center gap-2">
                    <FontAwesomeIcon icon={faUserPlus} />
                    <h1 className="">Add New Doctor</h1>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-3"
                  >
                    <div>
                      <h1 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed text-text peer-disabled:opacity-70 pb-4">
                        Doctor Photo{" "}
                      </h1>

                      <img
                        className="w-32 h-32 mb-4 rounded-full object-cover border-4 border-gray-200 mx-auto"
                        src="/defaultprofile.jpg"
                        alt=""
                      />
                      <div className="relative flex justify-center">
                        <div className="absolute top-1/2 left-[33%] -translate-y-1/2">
                          <FontAwesomeIcon
                            className=" text-teal-700 rounded-lg cursor-pointer"
                            icon={faUserPlus}
                          />
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center px-4 pl-8 py-2 bg-teal-100 text-teal-700 rounded-lg cursor-pointer hover:bg-teal-200 transition-colors"
                        >
                          Upload Photo
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 justify-center items-center max-sm:grid-cols-1 gap-4 col-start-2 col-end-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Full Name
                        </label>
                        <input
                          placeholder="Full Name"
                          {...register("name")}
                          className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-teal focus-visible:ring-2  disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                          type="text"
                          id="fullName"
                        />
                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.name?.message}
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="emailAddress"
                          className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Specialty
                        </label>
                        <Controller
                          name="speciality"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field.value}
                              styles={{
                                control: (baseStyles, state) => {
                                  // remove borderColor from baseStyles
                                  const { ...filteredBase } = baseStyles;

                                  return {
                                    ...filteredBase, // spread everything except default borderColor
                                    borderRadius: "12px",
                                    marginTop: "8px",
                                    height: "40px",
                                    borderWidth: state.isFocused
                                      ? "3px"
                                      : baseStyles.borderWidth,
                                    borderColor: state.isFocused
                                      ? "#069494"
                                      : "#64748b",

                                    boxShadow: "none", // sometimes needed to override focus ring
                                    "&:hover": {
                                      borderColor: "",
                                    },
                                  };
                                },
                              }}
                              options={speciality}
                              onChange={(option) =>
                                field.onChange(option?.value)
                              } // only pass string
                              value={speciality.find(
                                (option) => option.value === field.value
                              )}
                              isSearchable
                              isClearable
                              placeholder="Select speciality"
                            />
                          )}
                        />

                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.speciality?.message}
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="experience"
                          className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {" "}
                          Years of Experience
                        </label>
                        <input
                          {...register("experience", { valueAsNumber: true })}
                          placeholder=""
                          className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                          type="number"
                          id="experience"
                        />
                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.experience?.message}
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="fullName"
                          className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Fees
                        </label>
                        <input
                          placeholder="Fees"
                          {...register("fees", { valueAsNumber: true })}
                          className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-teal focus-visible:ring-2  disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                          type="text"
                          id="fullName"
                        />
                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.name?.message}
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="dateOfBirth"
                          className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {" "}
                          Hospital
                        </label>
                        <Controller
                          name="hospital"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field.value}
                              styles={{
                                control: (baseStyles, state) => {
                                  // remove borderColor from baseStyles
                                  const { ...filteredBase } = baseStyles;

                                  return {
                                    ...filteredBase, // spread everything except default borderColor
                                    borderRadius: "12px",
                                    marginTop: "8px",
                                    height: "40px",
                                    borderWidth: state.isFocused
                                      ? "3px"
                                      : baseStyles.borderWidth,
                                    borderColor: state.isFocused
                                      ? "#069494"
                                      : "#64748b",

                                    boxShadow: "none", // sometimes needed to override focus ring
                                    "&:hover": {
                                      borderColor: "",
                                    },
                                  };
                                },
                              }}
                              options={hospital}
                              onChange={(option) =>
                                field.onChange(option?.value)
                              } // only pass string
                              value={hospital.find(
                                (option) => option.value === field.value
                              )}
                              isSearchable
                              isClearable
                              placeholder="Select hospital"
                            />
                          )}
                        />
                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.hospital?.message}
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="gender"
                          className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Email Address
                        </label>
                        <input
                          placeholder="Email Address"
                          {...register("email")}
                          className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                          type="text"
                          id="emailAddress"
                        />
                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.email?.message}
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {" "}
                          Phone Number
                        </label>
                        <input
                          {...register("phone")}
                          className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                          type="text"
                          placeholder="Enter Phone number"
                          id="phone"
                        />
                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.phone?.message}
                        </p>
                      </div>
                    </div>
                    <div className="col-start-3 col-end-4 pt-10 flex justify-end gap-4">
                      <button
                        onClick={() => setAddDoctor(false)}
                        type="button"
                        className="inline-flex text-red-500 items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:text-text focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-red-500 hover:text-white h-10 px-4 py-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text h-10 px-4 py-2 bg-teal-500 hover:bg-teal-600"
                      >
                        {loadingDoctors ? (
                          <div className="w-7 h-7 border-4 border-white border-t-teal-600 rounded-full animate-spin"></div>
                        ) : (
                          "Add Doctor"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-2xl p-6">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h1 className="text-2xl font-semibold leading-none text-text">
                    {doctorList && doctorList.length == 0
                      ? "No Doctors Found"
                      : "Current Doctors"}
                  </h1>
                </div>
                {loading && !addDoctor ? (
                  <div>
                    {[...Array(doctorList?.length)].map((_, i) => (
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
                  <div>
                    {" "}
                    {doctorList?.map((doctors) => (
                      <div
                        key={doctors._id}
                        className="flex justify-between p-6 rounded-2xl bg-gray-50 border-2 border-gray-100 mb-4"
                      >
                        <div className="flex gap-5 ">
                          <div>
                            <img
                              className="w-16 h-16 rounded-full object-cover"
                              src="/defaultprofile.jpg"
                              alt=""
                            />
                          </div>
                          <div>
                            <h1 className="font-semibold text-text">
                              Dr. {doctors.doctor}
                            </h1>
                            <h1 className="text-teal font-medium">
                              {doctors.speciality}
                            </h1>
                            <div className="flex items-center space-x-4 text-sm text-text-muted mt-1">
                              <div className="flex  items-center gap-1">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <h1>{doctors.hospital}</h1>
                              </div>
                              <div className="flex  items-center gap-1">
                                <FontAwesomeIcon icon={faClock} />
                                <h1>{doctors.experience} years</h1>
                              </div>
                              <div className="flex items-center gap-1">
                                <FontAwesomeIcon
                                  className="text-yellow-500"
                                  icon={faStar}
                                />
                                <h1>4.9</h1>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-bg focus:ring-offset-2 border-transparent bg-bg text-teal hover:text-white hover:bg-teal/80 duration-300">
                            <h1>Active</h1>
                          </div>
                          {/* <div>
                        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-yellow-50 hover:bg-yellow-400 hover:text-white text-yellow-500 h-9 rounded-xl px-3 duration-200 ">
                          Edit
                        </button>
                      </div> */}
                          <div>
                            <button
                              onClick={() => deleteDoctor(doctors._id)}
                              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-50 text-red-500 hover:bg-red-500/90 h-9 rounded-xl px-3 hover:text-white duration-200"
                            >
                              Remove
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

export default AddDoctor;
