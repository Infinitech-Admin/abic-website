"use client";
import React, { useState } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { getAuthHeaders } from "../headers";

export const type = [
  { key: "Sales Inquiry", label: "Sales Inquiry" },
  { key: "Customer Care Concerns", label: "Customer Care Concerns" },
  { key: "Leasing Inquiry", label: "Leasing Inquiry" },
  { key: "Others Concerns", label: "Other Concerns" },
];

// Validation schema using Yup
const validationSchema = Yup.object({
  type: Yup.string().required("Inquiry type is required"),
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


const ContactCard = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      type: "",
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
            "API URL is not defined in the environment variables"
          );
        }

        const response = await axios.post(
          endpoint,
          values,

          { headers }
        );

        const emailAgentResponse = await axios.post(
          `/api/email/inquiry`,
          {
            name: values.first_name + " " + values.last_name,
            sender_email: values.email,
            phone: values.phone,
            MdEmail: values.email,
            type: values.type,
            message: values.message,
            email: "abicrealtycorporation@gmail.com",
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
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
                "Failed to submit inquiry. Please try again later."
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
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <Select
          className="w-full"
          label="What can we help you with?"
          name="type"
          placeholder="Select an inquiry"
          value={formik.values.type}
          onChange={(e) => formik.setFieldValue("type", e.target.value)}
        >
          {type.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-sm">{formik.errors.type}</p>
        )}

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
          placeholder="e.g. 9924401097"
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
        </Button>
      </form>
    </>
  );
};

export default ContactCard;
