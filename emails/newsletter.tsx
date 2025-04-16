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

export const SubscriptionMail = ({ name, email }: any) => (
    <Html>
        <Head />
        <Preview>Thank You for Subscribing - ABIC Realty & Consultancy Corporation</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={box}>
                    <Img
                        alt="Abic Realty Corp"
                        height="80"
                        src="https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/ABIC+Realty.png"
                    />
                    <Hr style={hr} />
                    <Text style={paragraph}>Good Day Sir/Ma&apos;am,</Text>
                    <Text style={paragraph}>
                        Thank you for subscribing to ABIC Realty&apos;s newsletter! We&apos;re excited to keep you 
                        updated on the latest property listings, exclusive offers, and real estate insights.
                    </Text>
                    <Hr style={hr} />
                    <Text style={paragraph}>
                        Stay tuned for our upcoming newsletters, and feel free to reach out if you have 
                        any questions or specific property preferences.
                    </Text>
                    <Button
                        href="https://www.abicrealtyph.com"
                        style={button}
                    >
                        Visit Our Website
                    </Button>
                    <Hr style={hr} />
                    <Text style={paragraphs}>
                        If you ever wish to unsubscribe, you can do so by clicking{" "}
                        <Link href="https://www.abicrealtyph.com/unsubscribe" style={anchor}>
                            here
                        </Link>.
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>
                        Unit 202, Campos Rueda Building, 101 Urban Ave, Makati, 1206 Metro Manila
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

export default SubscriptionMail;

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 0px",
    marginBottom: "64px",
    border: "1px solid #e6ebf1",
    borderRadius: "8px",
    maxWidth: "600px",
    width: "100%",
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
