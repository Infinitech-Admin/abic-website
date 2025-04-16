"use client";
import React, { useState, useRef } from "react";
import * as Yup from "yup";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent,
  Input,
  Card,
  CardBody,
  Image,
} from "@nextui-org/react";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

interface Career {
  id: string;
  position: string;
  slots: number;
  image: string;
}

interface CareersProps {
  career: Career[];
}

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits with no letters or special characters")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  resume: Yup.mixed<File>()
    .required("Resume is required")
    .test("fileSize", "File too large (max 5MB)", (value) =>
      value ? value.size <= 5 * 1024 * 1024 : true
    ),
});

const CareersCard: React.FC<CareersProps> = ({ career }) => {
  const [selectedPosition, setSelectedPosition] = useState<string>(
    career[0]?.position || ""
  );
  const [selectedSlots, setSelectedSlots] = useState<number>(0);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(
    career[0] || null
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  // Ref for file input to clear after successful submission
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePositionChange = (position: string) => {
    setSelectedPosition(position);
    const selectedCareer = career.find((item) => item.position === position);

    if (selectedCareer) {
      setSelectedSlots(selectedCareer.slots);
    }
  };

  const formik = useFormik({
    initialValues: {
      career_id: selectedCareer?.id || "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      resume: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]: [string, unknown]) => {
          if (value !== null && value !== undefined) {
            if (key === "resume" && value instanceof File) {
              formData.append(key, value);
            } else if (typeof value === "string") {
              formData.append(key, value);
            }
          }
        });

        await axios.post(
          "https://abicmanpowerservicecorp.com/api/main/submit-application",
          formData
        );
        toast.success("Application submitted successfully!");

        // Reset form and clear file input after successful submission
        resetForm({
          values: {
            career_id: selectedCareer?.id || "",
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            address: "",
            resume: null,
          },
        });

        // Clear file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            toast.error(
              error.response.data.message ||
                "Failed to submit your application. Please try again later."
            );
          } else if (error.request) {
            toast.error("No response from server. Please try again later.");
          }
        } else {
          toast.error("Unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-auto max-w-screen-md">
        <div>
          <Card>
            <CardBody>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full">
                  <Image
                    alt="HeroUI hero Image"
                    src="https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-careers.png"
                    width={1000}
                  />
                </div>
                <div className="w-full md:px-6">
                  <h1 className="py-2">Slots: {selectedSlots || "0"}</h1>
                  <div className="flex flex-col gap-4">
                    <div className="w-full">
                      <Autocomplete
                        placeholder="Select a Position"
                        value={selectedPosition}
                        onSelectionChange={(key) => {
                          const selectedCareer = career.find(
                            (item) => item.id === key
                          );

                          if (selectedCareer) {
                            handlePositionChange(selectedCareer.position);
                          }
                        }}
                      >
                        {career.map((item) => (
                          <AutocompleteItem
                            key={item.id}
                            textValue={item.position}
                            value={item.id}
                          >
                            {item.position}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>

                    <div>
                      <Button
                        className="bg-violet-700 text-white uppercase w-full"
                        onPress={onOpen}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Apply for {selectedPosition}
                </ModalHeader>
                <form onSubmit={formik.handleSubmit}>
                  <ModalBody>
                    <Input
                      label="First Name"
                      name="first_name"
                      placeholder="eg. Juan"
                      type="text"
                      value={formik.values.first_name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.first_name && formik.errors.first_name && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.first_name}
                      </p>
                    )}
                    <Input
                      label="Last Name"
                      name="last_name"
                      placeholder="eg. Dela Cruz"
                      type="text"
                      value={formik.values.last_name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.last_name && formik.errors.last_name && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.last_name}
                      </p>
                    )}
                    <Input
                      label="Email"
                      name="email"
                      placeholder="eg. juan@gmail.com"
                      type="email"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.email}
                      </p>
                    )}
                    <Input
                      label="Phone Number"
                      name="phone"
                      placeholder="eg. 09924401097"
                      type="text"
                      value={formik.values.phone}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.phone}
                      </p>
                    )}
                    <Input
                      label="Address"
                      name="address"
                      placeholder="eg. Makati City, Philippines"
                      type="text"
                      value={formik.values.address}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.address}
                      </p>
                    )}
                    <Input
                      name="resume"
                      type="file"
                      ref={fileInputRef} // Ref to clear the input
                      onBlur={formik.handleBlur}
                      onChange={(event) => {
                        const file = event.currentTarget.files
                          ? event.currentTarget.files[0]
                          : null;
                        formik.setFieldValue("resume", file);
                      }}
                    />
                    {formik.touched.resume && formik.errors.resume && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.resume}
                      </p>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" isLoading={loading} type="submit">
                      {loading ? "Sending Application..." : "Send Application"}
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default CareersCard;
