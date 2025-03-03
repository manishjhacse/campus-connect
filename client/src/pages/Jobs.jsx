import React, { useEffect, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import Navbar from "../components/Navbar";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
const JobCard = ({ job }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="bg-[#fafafa] dark:bg-[#111] shadow-lg rounded-lg p-4 flex justify-between items-center w-full ">
      <div>
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <p className="text-gray-600">
          {job.company} - {job.location}
        </p>
        <p className="text-gray-500">Type: {job.job_type}</p>
        <p className="text-green-500 font-medium">{job.salary}</p>
      </div>
      <Button color="primary" onPress={onOpen}>
        Details
      </Button>
      <Modal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange}>
        <ModalContent className="text-black dark:text-white pt-4">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {job.title} at {job.company}
              </ModalHeader>
              <ModalBody>
                <p>
                  <strong>Description:</strong> {job.description}
                </p>
                <p>
                  <strong>Qualifications:</strong> {job.qualifications}
                </p>
                <p>
                  <strong>Skills Required:</strong> {job.skills}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button color="primary">Apply</Button>
                </a>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

const JobPortal = () => {
  const token = localStorage.getItem("token");
  const [jobs, setJobs] = useState([])
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    job_type: "Full-Time",
    description: "",
    qualifications: "",
    skills: "",
    applyLink: "",
  });
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = import.meta.env.VITE_BASE_URL;
    if (!formData.title || !formData.company || !formData.location || !formData.job_type || !formData.applyLink) {
      toast.error("Required fields missing");
      return;
    }

    let toastID = toast.loading("Posting Job");

    try {
      const response = await axios.post(`${url}/addjob`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.dismiss(toastID);
      toast.success(response.data.message);
      setJobs((prev) => [response.data.job, ...prev]);
      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        job_type: "Full-Time",
        description: "",
        qualifications: "",
        skills: "",
        applyLink: "",
      });
    } catch (err) {
      console.error(err);
      toast.dismiss(toastID);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
    onclose()
  };

  const getAllJobs = async () => {
    const url = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${url}/getjobs`);
      setJobs(response.data.jobs || []);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch Jobs!");
    }
  };
  useEffect(() => {
    getAllJobs();
  }, []);
  
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-black dark:text-white">
      <Navbar />
      <div className=" flex justify-center items-center mb-8">
        <span className="relative inline-flex sm:inline mt-24">
          <span className="bg-gradient-to-r from-[#ffef44] via-[#ff4a44] to-[#FF675E] blur-xl  filter opacity-40 w-full h-full absolute inset-0"></span>
          <span className="relative text-xl md:text-3xl tracking-tighter text-center font-poppins">
            {" "}
            Jobs & Internships 🧑🏻‍💻{" "}
          </span>
        </span>
      </div>

      {/* add Jobs section---->>>> */}
      <div className=" flex justify-center items-center mb-3">
        <Button
          color="success"
          onPress={onOpen}
          className=" text-sm md:text-lg font-semibold w-28 md:w-32 h-8 md:h-10"
        >
          <FaPlusCircle />
          Add Job
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="text-black dark:text-white pt-3">
            {(onClose) => (
              <>
                <ModalHeader>Add New Job</ModalHeader>
                <ModalBody>
                  <Input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} />
                  <Input name="company" placeholder="Company" value={formData.company} onChange={handleChange} />
                  <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                  <Input name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
                  <Select name="job_type" label="Select Job Type" value={formData.job_type} onChange={handleChange} className="w-full rounded">
                    {["Full-Time", "Part-Time", "Contract", "Internship", "Freelance"].map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </Select>
                  <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                  <Input name="qualifications" placeholder="Qualifications" value={formData.qualifications} onChange={handleChange} />
                  <Input name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} />
                  <Input name="applyLink" placeholder="Apply Link" value={formData.applyLink} onChange={handleChange} />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} type="submit" color="primary">Save</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 ">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobPortal;
