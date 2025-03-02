import React from "react";

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
} from "@heroui/react";
import Navbar from "../components/Navbar";
import { FaPlusCircle } from "react-icons/fa";
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    salary: "$60,000 - $80,000",
    job_type: "Full Time",
    description:
      "We are looking for a skilled Frontend Developer to build and maintain our web applications.",
    qualifications: "Bachelor's degree in Computer Science or related field.",
    skills: "React, JavaScript, CSS, HTML, Git",
    applyLink: "#",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "InnovateX",
    location: "New York, USA",
    salary: "$70,000 - $90,000",
    job_type: "Full Time",
    description:
      "Seeking an experienced Backend Developer to create scalable APIs and manage databases.",
    qualifications:
      "Bachelor's degree in Computer Science or equivalent experience.",
    skills: "Node.js, Express, SQL, NoSQL, REST APIs",
    applyLink: "#",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "San Francisco, USA",
    salary: "$50,000 - $70,000",
    job_type: "Internship",
    description:
      "Exciting opportunity for a UI/UX Designer to design user-friendly interfaces.",
    qualifications: "Degree in Graphic Design, UI/UX, or related field.",
    skills: "Figma, Adobe XD, User Research, Prototyping",
    applyLink: "#",
  },
  {
    id: 4,
    title: "Software Engineer",
    company: "Infosys",
    location: "Bangalore, India",
    salary: "₹8,00,000 - ₹12,00,000",
    description:
      "Looking for an experienced Software Engineer to develop scalable applications.",
    qualifications: "B.E/B.Tech in Computer Science or related field.",
    skills: "Java, Spring Boot, Microservices, SQL",
    applyLink: "https://infosys.jobs/softwareengineer",
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "TCS",
    location: "Mumbai, India",
    salary: "₹6,00,000 - ₹9,00,000",
    description:
      "Seeking a Data Analyst to analyze large data sets and generate insights.",
    qualifications:
      "Bachelor's degree in Statistics, Mathematics, or relevant field.",
    skills: "Python, SQL, Excel, Power BI, Tableau",
    applyLink: "https://tcs.jobs/dataanalyst",
  },
  {
    id: 6,
    title: "Cyber Security Analyst",
    company: "Wipro",
    location: "Hyderabad, India",
    salary: "₹7,50,000 - ₹11,00,000",
    description:
      "Hiring a Cyber Security Analyst to secure networks and prevent cyber threats.",
    qualifications: "B.Tech/M.Tech in Cyber Security or relevant field.",
    skills: "Network Security, Ethical Hacking, SIEM, IDS/IPS",
    applyLink: "https://wipro.jobs/cybersecurity",
  },
];

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                  <Input placeholder="Job Title" />
                  <Input placeholder="Company" />
                  <Input placeholder="Location" />
                  <Input placeholder="Salary" />
                  <Textarea placeholder="Description" />
                  <Input placeholder="Qualifications" />
                  <Input placeholder="Skills" />
                  <Input placeholder="Apply Link" />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary">Save</Button>
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
