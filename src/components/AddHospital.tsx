import NavBar from "./NavBar";
import { faHospital } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faLocationDot,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import * as yup from "yup";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "../axiosInstance";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "*Name must be atleast 2 character")
    .required("*Name is required"),
  email: yup.string().email("*Invalid email").required("*Email is required"),
  type: yup.string().required("*field is Required"),
  phone: yup
    .string()
    .min(10, "*Must be atleast 10 numbers")
    .required("*Phone number is required"),
  beds: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("*field is required")
    .positive("*Must be a positive number")
    .typeError("*Please enter a valid number"),
  departments: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("*field is required")
    .positive("*Must be a positive number")
    .typeError("*Please enter a valid number"),
  address: yup.string().required("address is required"),
  Description: yup.string().required("field is required"),
});

const AddHospital = () => {
  type Hospital = {
    _id: string;
    hospital: string;
    type: string;
    bed: number;
    departments: number;
    hospital_email: string;
    phone: string;
    hospital_address: string;
    Description: string;
  };

  const [addHospital, setAddHospital] = useState(false);
  const [HospitalList, setHospitalList] = useState<Hospital[] | null>(null);
  const [loadingHospitals, setLoadingHospitals] = useState(false);

  const type = [
    { label: "General Hospital", value: "general" },
    { label: "Speciality Clinic", value: "speciality" },
    { label: "Pediatric Hospital", value: "pediatric" },
    { label: "Cardiac Center", value: "cardiac" },
    { label: "Cancer Center", value: "cancer" },
    { label: "Orthopedic Clinic", value: "orthopedic" },
  ];

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
    type: string;
    beds: number;
    departments: number;
    email: string;
    phone: string;
    address: string;
    Description: string;
  };

  const fetchHospitals = async () => {
    try {
      const res = await axios.get("/hospitals");
      if (!res.data) throw new Error("Failed to fetch hospitals");
      const data = await res.data;
      setHospitalList(data);
    } catch (err) {
      toast.error("Failed to fetch hospitals");
      console.error(err);
    }
  };

  const onSubmit = async (data: FormData) => {
    const hosData = {
      hospital: data.name,
      type: data.type,
      bed: data.beds,
      departments: data.departments,
      hospital_email: data.email,
      hospital_phone: data.phone,
      hospital_address: data.address,
      description: data.Description,
    };
    setLoadingHospitals(true);
    await axios.post("/admin/hospital/create", hosData);
    toast.success("Hospital added successfully");
    setAddHospital(false);
    fetchHospitals();
    setLoadingHospitals(false);
    reset();
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const deleteHospital = async (id: string) => {
    try {
      await axios.delete(`/admin/hospital/delete/${id}`);
      toast.success("Hospital deleted successfully");
      fetchHospitals();
    } catch (err) {
      toast.error("Failed to delete hospital");
      console.error(err);
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
                    Manage Hospitals
                  </h1>
                  <h1 className="text-text-muted mt-2">
                    Add and manage healthcare facilities in your network
                  </h1>
                </div>
                <div className="relative">
                  <FontAwesomeIcon
                    className="absolute top-1/2 -translate-y-1/2 px-2 text-white"
                    icon={faHospital}
                  />

                  <button
                    onClick={() => setAddHospital(true)}
                    className="inline-flex pl-8 items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-10 px-4 py-2 bg-teal-500 hover:bg-teal-600"
                  >
                    Add Hospital
                  </button>
                </div>
              </div>
              {addHospital && (
                <div className="mt-4 mb-6 p-6 bg-white rounded-2xl">
                  <div className=" text-2xl font-semibold leading-none text-text pb-5 flex items-center gap-2">
                    <FontAwesomeIcon icon={faHospital} />
                    <h1 className="">Add New Hospital</h1>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-3"
                  >
                    <div>
                      <h1 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed text-text peer-disabled:opacity-70 pb-4">
                        Hospital Photo{" "}
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
                            icon={faHospital}
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
                          Hospital Name
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
                          Hospital Type
                        </label>
                        <Controller
                          name="type"
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
                              options={type}
                              onChange={(option) =>
                                field.onChange(option?.value)
                              } // only pass string
                              value={type.find(
                                (option) => option.value === field.value
                              )}
                              isSearchable
                              isClearable
                              placeholder="Select type"
                            />
                          )}
                        />

                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.type?.message}
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="experience"
                          className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {" "}
                          Number Of Beds
                        </label>
                        <input
                          {...register("beds", { valueAsNumber: true })}
                          placeholder=""
                          className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                          type="number"
                          id="experience"
                        />
                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.beds?.message}
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="experience"
                          className="text-sm text-text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {" "}
                          Number Of Departments
                        </label>
                        <input
                          {...register("departments", { valueAsNumber: true })}
                          placeholder=""
                          className="flex h-10 w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                          type="number"
                          id="experience"
                        />
                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.departments?.message}
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
                      <div className="col-start-1 col-end-3">
                        <label
                          className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="address"
                        >
                          Address
                        </label>
                        <textarea
                          {...register("address")}
                          name="address"
                          id="address"
                          placeholder="Address"
                          className="flex min-h-[80px] w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-teal focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                        ></textarea>
                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.address?.message}
                        </p>
                      </div>
                      <div className="col-start-1 col-end-3">
                        <label
                          className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="Description"
                        >
                          Description
                        </label>
                        <textarea
                          {...register("Description")}
                          name="Description"
                          id="Description"
                          placeholder="Description"
                          className="flex min-h-[80px] w-full rounded-xl border  border-text-muted bg-white px-3 py-2 text-sm ring-offset-bg placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-teal focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                        ></textarea>
                        <p className=" text-red-600 text-sm p-0.5 ">
                          {errors.Description?.message}
                        </p>
                      </div>
                    </div>

                    <div className="col-start-3 col-end-4 pt-10 flex justify-end gap-4">
                      <button
                        onClick={() => setAddHospital(false)}
                        type="button"
                        className="inline-flex text-red-500 items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:text-text focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-red-500 hover:text-white h-10 px-4 py-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text h-10 px-4 py-2 bg-teal-500 hover:bg-teal-600"
                      >
                        {loadingHospitals ? (
                          <div className="w-7 h-7 border-4 border-white border-t-teal-600 rounded-full animate-spin"></div>
                        ) : (
                          "Add Hospital"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-2xl p-6">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h1 className="text-2xl font-semibold leading-none text-text">
                    {HospitalList && HospitalList.length === 0
                      ? "No Hospitals Found"
                      : "Hospitals List"}
                  </h1>
                </div>
                {HospitalList === null ? (
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
                  <div>
                    {HospitalList?.map((hospital) => (
                      <div
                        key={hospital._id}
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
                              {hospital.hospital}
                            </h1>
                            <h1 className="text-teal font-medium">
                              {hospital.type}
                            </h1>
                            <div className="flex text-text-muted text-sm  items-center gap-1">
                              <FontAwesomeIcon icon={faLocationDot} />
                              <h1>{hospital.hospital_address}</h1>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-text-muted mt-1">
                              <div className="flex  items-center gap-1">
                                <FontAwesomeIcon icon={faBed} />
                                <h1>{hospital.bed} beds</h1>
                              </div>
                              <div className="flex  items-center gap-1">
                                <FontAwesomeIcon icon={faUsers} />
                                <h1>{hospital.departments} departments</h1>
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
                              onClick={() => deleteHospital(hospital._id)}
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

export default AddHospital;
