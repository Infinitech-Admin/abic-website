"use client";
import { Card, CardBody, Link } from "@nextui-org/react";
import React from "react";
import { FaFacebook, FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";

const ContactInfoCard = () => {
  return (
    <div className="flex flex-col gap-2 py-6">
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-lg">
            <FaPhone className="text-violet-700" size={20} />
          </div>
          <Link href={"tel:09265536964"}>(+63) 926 553 6964</Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-lg">
            <MdMail className="text-violet-700" size={20} />
          </div>

          <Link href={"mailto:abicrealtycorporation@gmail.com"}>
            abicrealtycorporation@gmail.com
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-lg">
            <FaFacebook className="text-violet-700" size={20} />
          </div>

          <Link
            href={"https://www.facebook.com/share/15JSPKVF7E/?mibextid=wwXIfr"}
            target="_blank"
          >
            AbicRealty Corp
          </Link>
        </div>
      </div>
      <hr className="max-w-2xl mt-4" />

      <div className="py-4">
        <h1 className="font-semibold mb-4">For Other Concerns:</h1>
        <div className="md:ml-4 py-2 space-y-2">
          <p className="text-sm font-medium">
            Office: <Link
              href="https://www.google.com/maps/search/?api=1&query=Unit+202,+Campos+Rueda,+Urban+Ave.,+Makati+City+Metro+Manila,+PH+1233"
              target="_blank"
              rel="noopener noreferrer"
              className="break-words"
            >
               Unit 202, Campos Rueda, Urban Ave., Makati City, Metro Manila, PH 1233
            </Link>
          </p>
          <p className="text-sm font-medium">
            Sales: <Link href={"tel:+639651983796"}>(+63) 965 198 3796</Link>
          </p>
          <p className="text-sm font-medium">
            Leasings: <Link href={"tel:+639651983796"}>(+63) 965 198 3796</Link>
          </p>
          <p className="text-sm font-medium">
            Employment Inquiry: <Link href={"tel:+639455493651"}>(+63) 945 549 3651</Link>
          </p>
          <p className="text-sm font-medium">
            Customer Care (PHONE): <Link href={"tel:+639651983796"}>(+63) 965 198 3796</Link>
          </p>
          <p className="text-sm font-medium">
            Customer Care (LANDLINE): <Link href={"tel:+63286466136"}>02-8646-6136</Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default ContactInfoCard;
