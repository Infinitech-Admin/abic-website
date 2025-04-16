"use client";
import React, { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FaLongArrowAltRight } from "react-icons/fa";

import { getAuthHeaders } from "@/components/headers";

const validationSchema = Yup.object({
  last_name: Yup.string().required("Last name is required"),
  first_name: Yup.string().required("First name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits with no letters or special characters")
    .required("Phone number is required"),
  message: Yup.string().required("Message is required"),
});




interface Property {
  name: string;
}

interface PropertyProps {
  data: Property;
}

const PropertyInquiry: React.FC<PropertyProps> = ({ data }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      type: "Property Viewing",
      properties: data?.name,
      last_name: "",
      first_name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/submit-inquiry`;
        const headers = getAuthHeaders();

        if (!endpoint) {
          throw new Error(
            "API URL is not defined in the environment variables",
          );
        }

        const response = await axios.post(endpoint, values, { headers });

        const emailAgentResponse = await axios.post(
          `/api/email/inquiry/property`,
          {
            name: values.first_name + " " + values.last_name,
            sender_email: values.email,
            phone: values.phone,
            MdEmail: values.email,
            properties: values.properties,
            message: values.message,
            email: "abicrealtycorporation@gmail.com",
          },
          {
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (response?.data && emailAgentResponse?.data) {
          resetForm();
          toast.success("Inquiry sent successfully!");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // The error is an AxiosError
          if (error.response) {
            toast.error(
              error.response.data.message ||
                "Failed to submit inquiry. Please try again later.",
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

      <div className="flex flex-col mt-6 gap-4">
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <Input
            label="Last Name"
            name="last_name"
            placeholder="e.g. Dela Cruz"
            type="text"
            value={formik.values.last_name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.last_name && formik.errors.last_name && (
            <p className="text-red-500 text-sm">{formik.errors.last_name}</p>
          )}

          <Input
            label="First Name"
            name="first_name"
            placeholder="e.g. Juan"
            type="text"
            value={formik.values.first_name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.first_name && formik.errors.first_name && (
            <p className="text-red-500 text-sm">{formik.errors.first_name}</p>
          )}

          <Input
            label="Email"
            name="email"
            placeholder="eg. juandelacruz@gmail.com"
            type="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}

          <Input
            label="Phone Number"
            name="phone"
            placeholder="e.g. 09924401097"
            type="text"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
          )}

          <Textarea
            className="w-full"
            label="Message"
            name="message"
            placeholder="Leave us a message..."
            value={formik.values.message}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.message && formik.errors.message && (
            <p className="text-red-500 text-sm">{formik.errors.message}</p>
          )}

          <Button
            className="bg-violet-700 text-white uppercase font-medium"
            isLoading={loading}
            size="lg"
            type="submit"
          >
            {loading ? "Sending Inquiry..." : "Send Inquiry"}
            <span>
              <FaLongArrowAltRight size={16} />
            </span>
          </Button>
        </form>
      </div>
    </>
  );
};

export default PropertyInquiry;
