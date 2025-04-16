"use client";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { getAuthHeaders } from "../headers";
import { LuTrash2, LuX } from "react-icons/lu";
import Image from 'next/image'; // Import Image from next/image

export const agents = [
  { key: "Owner", label: "Owner" },
  { key: "Agent", label: "Agent" },
  { key: "Broker", label: "Broker" },
];

const agreementMessages: Record<string, string> = {
  Owner:
    "I agree to provide 1 month full commission when renting out and another 1 month for renewal.",
  Agent: "I agree to a 50/50 commission sharing on the transaction.",
  Broker: "I agree to a 60/40 commission sharing on the transaction.",
};

export const status = [
  { key: "For Rent", label: "For Rent" },
  { key: "For Sale", label: "For Sale" },
];

export const parking = [
  { key: "0", label: "With Parking" },
  { key: "1", label: "No Parking" },
];

export const type = [
  { key: "Studio Type", label: "Studio Type" },
  { key: "1BR", label: "1BR" },
  { key: "2BR", label: "2BR" },
  { key: "3BR", label: "3BR" },
  { key: "Loft", label: "Loft" },
  { key: "Penthouse", label: "Penthouse" },
];

export const furnished = [
  { key: "Bare", label: "Bare" },
  { key: "Semi-Furnished", label: "Semi-Furnished" },
  { key: "Fully-Furnished", label: "Fully-Furnished" },
  { key: "Interiored", label: "Interiored" },
];

export const rent = [
  { key: "6 Months", label: "6 Months" },
  { key: "1 Year", label: "1 Year" },
  { key: "2 Year", label: "2 Years" },
];

export const sale = [
  { key: "RFO", label: "RFO" },
  { key: "Pre-Selling", label: "Pre-Selling" },
];

export const payment = [
  { key: "Cash", label: "Cash" },
  { key: "Bank Financing", label: "Bank Financing" },
];

export const amenities = [
  { key: "Pool Area", label: "Pool Area" },
  { key: "Balcony/Terrace", label: "Balcony/Terrace" },
  { key: "Elevator", label: "Elevator" },
  { key: "Guest Suite", label: "Guest Suite" },
  { key: "Club House", label: "Club House" },
  { key: "Concierge Services", label: "Concierge Services" },
  { key: "Underground Parking", label: "Underground Parking" },
  { key: "Gym/Fitness Center", label: "Gym/Fitness Center" },
  { key: "Security", label: "Security" },
  { key: "Pet-Friendly Facilities", label: "Pet-Friendly Facilities" },
];

const validationSchema = Yup.object({
  // Personal Information
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      /^\d{10}$/,
      "Phone number must be exactly 11 digits with no letters or special characters"
    )
    .required("Phone number is required"),
  type: Yup.string().required("Type is required"),

  // Property Information
  name: Yup.string().required("Property name is required"),
  unit_type: Yup.string().required("Unit Type is required"),
  unit_status: Yup.string().required("Unit Status is required"),
  location: Yup.string().required("Location is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Property price is required"),
  area: Yup.number()
    .typeError("Square meter must be a number")
    .positive("Square meter must be positive")
    .required("Square meter is required"),
  unit_number: Yup.number()
    .typeError("Floor number must be a number")
    .positive("Floor number must be positive")
    .required("Floor number is required"),
  parking: Yup.string().required("Parking is required"),
  status: Yup.string().required("Property Status is required"),
  amenities: Yup.array()
    .of(Yup.string())
    .min(1, "At least one amenity is required")
    .required("Amenities are required"),
  acceptedCondition: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

const SubmitPropertyCard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      type: "",
      name: "",
      location: "",
      price: "",
      area: "",
      parking: "",
      description: "N/A",
      unit_number: "",
      unit_type: "",
      unit_status: "",
      title: "N/A",
      payment: "N/A",
      turnover: "N/A",
      terms: "N/A",
      category: "",
      badge: "",
      published: "0",
      status: "",
      sale_type: "N/A",
      amenities: [] as string[],
      images: "",
      acceptedCondition: false, // Initialize the terms checkbox
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Proceed with form submission if validation passes
      setLoading(true);
      try {
        const formData = new FormData();
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/submit-property`;
        const headers = getAuthHeaders();

        Object.entries(values).forEach(([key, value]) => {
          if (key === "images" && value instanceof FileList) {
            Array.from(value).forEach((file) => {
              formData.append("images[]", file);
            });
          } else if (key === "amenities" && Array.isArray(value)) {
            value.forEach((amenity) => {
              formData.append("amenities[]", amenity);
            });
          } else if (typeof value === "string" || typeof value === "number") {
            formData.append(key, value.toString());
          }
        });

        const response = await axios.post(endpoint, formData, { headers });
        toast.success("Inquiry submitted successfully!");
        resetForm();
        window.location.reload(); // Reload the page after successful submission
      } catch (error) {
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.message || errorMessage;
        }
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      // Clear previous previews
      setPreviews([]);

      formik.setFieldValue("images", files);
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(newPreviews);
    }
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTermsClick = () => {
    setShowTermsModal(true);
  };

  const handleCloseModal = () => {
    setShowTermsModal(false);
  };

  return (
    <div className="w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={formik.handleSubmit}>
        <Card className="w-full">
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-6">
              <div className="col-span-2 py-2">
                <h1 className="text-xl text-violet-700 font-bold">
                  Personal Information
                </h1>
              </div>
              <div className="col-span-2 md:col-span-1">
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
              </div>
              <div className="col-span-2 md:col-span-1">
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
              </div>
              <div className="col-span-2 md:col-span-1">
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
              </div>
              <div className="col-span-2 md:col-span-1">
                <Input
                  label="Phone Number"
                  name="phone"
                  placeholder="eg. 09924401097"
                  type="number"
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                )}
              </div>
              <div className="col-span-2 md:col-span-1">
                <Select
                  label="Type"
                  name="type"
                  placeholder="Select Type"
                  value={formik.values.type}
                  onChange={(e) => formik.setFieldValue("type", e.target.value)}
                >
                  {agents.map((agent) => (
                    <SelectItem key={agent.key} value={agent.key}>
                      {agent.label}
                    </SelectItem>
                  ))}
                </Select>
                {formik.touched.type && formik.errors.type && (
                  <p className="text-red-500 text-sm">{formik.errors.type}</p>
                )}
              </div>

              <div className="col-span-2 md:col-span-1">
                {formik.values.type && (
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-gray-700 text-sm">
                      {agreementMessages[formik.values.type]}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-6">
              <div className="col-span-3 py-4">
                <h1 className="text-xl text-violet-700 font-bold">
                  Property Information
                </h1>
              </div>
              <div className="col-span-3 md:col-span-1">
                <Input
                  label="Property Name"
                  name="name"
                  placeholder="eg. Prisma Residences"
                  type="text"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
              </div>
              <div className="col-span-3 md:col-span-1">
                <Select
                  label="Unit Type"
                  name="unit_type"
                  placeholder="eg. 1 BR"
                  onChange={(e) =>
                    formik.setFieldValue("unit_type", e.target.value)
                  }
                >
                  {type.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
                {formik.touched.unit_type && formik.errors.unit_type && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.unit_type}
                  </p>
                )}
              </div>

              <div className="col-span-3 md:col-span-1">
                <Select
                  label="Unit Status"
                  name="unit_status"
                  placeholder="Fully Furnished"
                  onChange={(e) =>
                    formik.setFieldValue("unit_status", e.target.value)
                  }
                >
                  {furnished.map((furnished) => (
                    <SelectItem key={furnished.key}>
                      {furnished.label}
                    </SelectItem>
                  ))}
                </Select>
                {formik.touched.unit_status && formik.errors.unit_status && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.unit_status}
                  </p>
                )}
              </div>

              <div className="col-span-3">
                <Input
                  label="Location"
                  name="location"
                  placeholder="eg. Makati City"
                  type="text"
                  value={formik.values.location}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.location && formik.errors.location && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.location}
                  </p>
                )}
              </div>

              <div className="col-span-3 md:col-span-1">
                <Input
                  label="Property Price"
                  name="price"
                  placeholder="eg. 0.00"
                  type="text"
                  value={formik.values.price}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-red-500 text-sm">{formik.errors.price}</p>
                )}
              </div>

              <div className="col-span-3 md:col-span-1">
                <Input
                  label="Square Meter"
                  name="area"
                  placeholder="eg. 0.00"
                  type="text"
                  value={formik.values.area}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.area && formik.errors.area && (
                  <p className="text-red-500 text-sm">{formik.errors.area}</p>
                )}
              </div>

              <div className="col-span-3 md:col-span-1">
                <Input
                  label="Floor Number"
                  name="unit_number"
                  placeholder="eg. 0.00"
                  type="text"
                  value={formik.values.unit_number}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.unit_number && formik.errors.unit_number && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.unit_number}
                  </p>
                )}
              </div>

              <div className="col-span-3 md:col-span-1">
                <Select
                  label="Parking"
                  name="parking"
                  placeholder="Select Parking"
                  onChange={(e) =>
                    formik.setFieldValue("parking", e.target.value)
                  }
                >
                  {parking.map((parking) => (
                    <SelectItem key={parking.key}>{parking.label}</SelectItem>
                  ))}
                </Select>
                {formik.touched.parking && formik.errors.parking && (
                  <p className="text-red-500 text-sm ">
                    {formik.errors.parking}
                  </p>
                )}
              </div>

              <div className="col-span-3 md:col-span-1">
                <Select
                  label="Property Status"
                  name="status"
                  placeholder="Property Status"
                  value={formik.values.status}
                  onChange={(e) =>
                    formik.setFieldValue("status", e.target.value)
                  }
                >
                  {status.map((statusItem) => (
                    <SelectItem key={statusItem.key} value={statusItem.key}>
                      {statusItem.label}
                    </SelectItem>
                  ))}
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <p className="text-red-500 text-sm">{formik.errors.status}</p>
                )}
              </div>

              {formik.values.status === "For Rent" && (
                <div className="col-span-3 md:col-span-1">
                  <Select
                    label="Minimum Lease Term"
                    name="terms"
                    placeholder="Lease Term"
                    value={formik.values.terms}
                    onChange={(e) =>
                      formik.setFieldValue("terms", e.target.value)
                    }
                  >
                    {rent.map((rentItem) => (
                      <SelectItem key={rentItem.key} value={rentItem.key}>
                        {rentItem.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              )}

              {formik.values.status === "For Sale" && (
                <>
                  <div className="col-span-2 md:col-span-1">
                    <Select
                      label="Sale Type"
                      name="sale_type"
                      placeholder="Select Sale Type"
                      value={formik.values.sale_type}
                      onChange={(e) =>
                        formik.setFieldValue("sale_type", e.target.value)
                      }
                    >
                      {sale.map((saleItem) => (
                        <SelectItem key={saleItem.key} value={saleItem.key}>
                          {saleItem.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  {formik.values.sale_type === "RFO" && (
                    <>
                      <div className="col-span-2 md:col-span-1">
                        <Select
                          label="Payment Type"
                          name="payment"
                          placeholder="Select Payment Type"
                          value={formik.values.payment}
                          onChange={(e) =>
                            formik.setFieldValue("payment", e.target.value)
                          }
                        >
                          {payment.map((paymentItem) => (
                            <SelectItem
                              key={paymentItem.key}
                              value={paymentItem.key}
                            >
                              {paymentItem.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>

                      <div className="col-span-2 md:col-span-1">
                        <Input
                          label="Title Status"
                          name="title"
                          placeholder="Enter Title Status"
                          type="text"
                          value={formik.values.title}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.title && formik.errors.title && (
                          <p className="text-red-500 text-sm">
                            {formik.errors.title}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {formik.values.sale_type === "Pre-Selling" && (
                    <div className="col-span-2 md:col-span-1">
                      <Input
                        label="Turnover Date"
                        name="turnover"
                        placeholder="Enter Turnover Date"
                        type="date"
                        value={formik.values.turnover}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.turnover && formik.errors.turnover && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.turnover}
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <Divider className="my-4" />

            <div className="md:px-6">
              <h1 className="font-bold text-violet-700">
                Features and Amenities
              </h1>

              <div className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {amenities.map((amenitiesItem) => (
                    <div key={amenitiesItem.key} className="flex items-center">
                      <input
                        checked={formik.values.amenities.includes(
                          amenitiesItem.key
                        )}
                        className="w-4 h-4"
                        id={amenitiesItem.key}
                        name="amenities"
                        type="checkbox"
                        value={amenitiesItem.key}
                        onChange={(e) => {
                          if (e.target.checked) {
                            formik.setFieldValue("amenities", [
                              ...formik.values.amenities,
                              amenitiesItem.key,
                            ]);
                          } else {
                            formik.setFieldValue(
                              "amenities",
                              formik.values.amenities.filter(
                                (key) => key !== amenitiesItem.key
                              )
                            );
                          }
                        }}
                      />
                      <label
                        className="ms-2 text-md font-medium text-default-500"
                        htmlFor={amenitiesItem.key}
                      >
                        {amenitiesItem.label}
                      </label>
                    </div>
                  ))}

                  {formik.errors.amenities && formik.touched.amenities && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.amenities}
                    </div>
                  )}
                </div>
              </div>

              <h1 className="font-bold text-violet-700">Property Image</h1>

              <div className="col-span-3 md:col-span-1 py-8">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="images"
                >
                  Upload Image
                </label>
                <Input
                  multiple
                  accept="image/*"
                  className="w-full col-span-1 mt-1 block"
                  id="images"
                  name="images"
                  type="file"
                  onChange={handleImageChange}
                />
                {formik.errors.images && formik.touched.images && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.images}
                  </div>
                )}

                {/* Image preview section */}
                {previews.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {previews.map((src, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="rounded-lg h-24"
                          width={100} // Specify width
                          height={100} // Specify height
                        />
                        <button
                          className="absolute z-50 top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 py-1"
                          onClick={() => removeImage(index)}
                        >
                          <LuX size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="acceptedCondition"
                  checked={formik.values.acceptedCondition}
                  onChange={(e) =>
                    formik.setFieldValue("acceptedCondition", e.target.checked)
                  }
                  className="w-4 h-4"
                />
                <label htmlFor="acceptedCondition" className="ml-2 text-sm">
                  I accept the{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={handleTermsClick}
                  >
                    Terms and Conditions
                  </span>
                </label>
              </div>

              {formik.touched.acceptedCondition &&
                formik.errors.acceptedCondition && (
                  <p className="text-red-500 text-sm mb-4">
                    {formik.errors.acceptedCondition}
                  </p>
                )}

              <Button
                className="bg-violet-600 text-white font-bold uppercase mb-4"
                endContent={<FaArrowRightLong />}
                isLoading={loading}
                size="lg"
                type="submit"
              >
                {loading ? "Sending Property..." : "Submit Property"}
              </Button>
            </div>
          </CardBody>
        </Card>
      </form>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
            <h3 className="text-lg font-bold mb-3">Terms and Conditions</h3>
            <div className="text-gray-600 text-sm overflow-y-auto max-h-80">
              <p><strong>1. Definitions</strong></p>
              <ul className="list-disc list-inside mb-3">
                <li><strong>&quot;Website&quot;</strong> refers to abicrealtyph.com, operated by ABIC Realty.</li>
                <li><strong>&quot;User  &quot;</strong> refers to any person accessing the website.</li>
                <li><strong>&quot;We,&quot; &quot;Us,&quot; or &quot;Our&quot;</strong> refers to ABIC Realty.</li>
              </ul>

              <p><strong>2. Use of the Website</strong></p>
              <ul className="list-disc list-inside mb-3">
                <li>The website is intended for informational purposes only regarding properties listed by ABIC Realty and Consultancy Corporation.</li>
                <li>You must be at least 18 years old to use this website.</li>
                <li>You agree to provide accurate and lawful information when using our services.</li>
              </ul>

              <p><strong>3. Property Listings Disclaimer</strong></p>
              <ul className="list-disc list-inside mb-3">
                <li>The property listings are provided for general information only and do not constitute a formal offer.</li>
                <li>Prices, availability, and features of properties are subject to change without prior notice.</li>
                <li>ABIC Realty is not responsible for any inaccuracies, typographical errors, or outdated information.</li>
              </ul>

              <p><strong>4. Intellectual Property</strong></p>
              <ul className="list-disc list-inside mb-3">
                <li>All content on this website, including text, images, logos, and design, is owned or licensed by ABIC Realty.</li>
                <li>Users may not copy, distribute, modify, or use our content without prior written consent.</li>
              </ul>

              <p><strong>5. Third-Party Links</strong></p>
              <p className="mb-3">Our website may contain links to third-party websites. We do not endorse or control these sites and are not responsible for their content or policies.</p>

              <p><strong>6. Limitation of Liability</strong></p>
              <ul className="list-disc list-inside mb-3">
                <li>ABIC Realty is not liable for any losses, damages, or claims arising from the use of our website.</li>
                <li>We do not guarantee the accuracy, completeness, or reliability of property information.</li>
              </ul>

              <p><strong>7. Privacy Policy</strong></p>
              <p className="mb-3">We respect your privacy and process your personal data as described in our Privacy Policy.</p>

              <p><strong>8. Amendments to Terms</strong></p>
              <p className="mb-3">We reserve the right to update these Terms and Conditions at any time. Continued use of the website after changes means acceptance of the revised terms.</p>

              <p><strong>9. Governing Law</strong></p>
              <p className="mb-3">These Terms and Conditions shall be governed by the laws of the Philippines. Any disputes shall be resolved through legal proceedings in the Philippines.</p>

              <p><strong>10. Contact Us</strong></p>
              <p className="mb-3">
                Email: abicrealtycorporation@gmail.com <br />
                Phone: (+63) 926 553 6964 <br />
                Address: Unit 202, Campos Rueda, Urban Ave., Makati City, Metro Manila, PH 1233
              </p>
            </div>

            <button
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitPropertyCard;