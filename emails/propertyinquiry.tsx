import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const PropertyInquiryEmail = ({
  name,
  email,
  phone,
  properties,
  message,
}: any) => (
  <Html>
    <Head />
    <Preview>
      New Inquiry Received - Abic Realty & Consultancy Corporation
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            alt="Abic Realty Corp"
            height="80"
            src="https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/ABIC+Realty.png"
          />
          <Hr style={hr} />
          <Text style={paragraph}>Dear Abic Realty Team,</Text>
          <Text style={paragraph}>
            A new inquiry has been submitted through your website. Below are the
            details:
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            <strong>Inquiry Type:</strong> Property Inquiry
          </Text>
          <Text style={paragraph}>
            <strong>Property:</strong> {properties}
          </Text>
          <Text style={paragraph}>
            <strong>Name:</strong> {name}
          </Text>
          <Text style={paragraph}>
            <strong>Email:</strong> {email}
          </Text>
          <Text style={paragraph}>
            <strong>Phone:</strong> {phone}
          </Text>
          <Text style={paragraph}>
            <strong>Message:</strong>
          </Text>
          <Text style={paragraph}>{message}</Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            Please follow up with the client promptly to address their inquiry.
            If you have any questions, feel free to reach out to the support
            team.
          </Text>
          <Button
            href="https://abic-admin.vercel.app/admin-login"
            style={button}
          >
            View Dashboard
          </Button>
          <Hr style={hr} />
          <Text style={paragraphs}>
            For assistance, please visit our{" "}
            <Link href="https://support.abicrealty.com" style={anchor}>
              support page
            </Link>
            .
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Unit 202, Campos Rueda Building, 101 Urban Ave, Makati, 1206 Metro
            Manila
            <br />
            LandLine: 02-8646-6136 | Mobile: +63 965 198 3796
            <br />
            Email: abicrealtycorporation@gmail.com | Website:{" "}
            <Link href="https://www.abicrealtyph.com" style={anchor}>
              www.abicrealty.com
            </Link>
            <br />
            Office Hours: Monday to Friday, 8:00 AM - 5:00 PM
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PropertyInquiryEmail;

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 0px",
  marginBottom: "64px",
  border: "1px solid #e6ebf1", // Added border
  borderRadius: "8px", // Rounded corners
  maxWidth: "600px", // Restrict width for larger screens
  width: "100%", // Full width for smaller screens
};

const box = {
  padding: "24px",
};

const main = {
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const paragraphs = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  margin: "20px auto",
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "50%",
  padding: "10px",
  margin: "20px auto",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "20px auto",
  textAlign: "center" as const,
};
