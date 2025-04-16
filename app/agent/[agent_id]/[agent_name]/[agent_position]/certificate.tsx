import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface CertificateData {
  id: string;
  name: string;
  image: string;
  date: string;
}

interface CertificateProps {
  cert: CertificateData[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Certificates: React.FC<CertificateProps> = ({ cert }) => {
  // Sort certificates by date (most recent first)
  const sortedCerts = cert.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <PhotoProvider>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 py-6">
        {sortedCerts.map((certificate) => {
          const imageUrl = `https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/certificates/${certificate.image}`;
          return (
            <Card key={certificate.id}>
              <CardBody className="overflow-visible p-1">
                <PhotoView src={imageUrl}>
                  <Image
                    alt={certificate.name}
                    className="object-cover object-center overflow-hidden"
                    shadow="md"
                    src={imageUrl}
                    width={1000}
                    height={250}
                  />
                </PhotoView>
              </CardBody>
              <CardFooter className="pb-0 py-2 px-4 flex-col items-start">
                <h1 className="text-large font-bold capitalize">
                  {certificate.name}
                </h1>
                <p className="text-small text-foreground/80 leading-4">
                  {formatDate(certificate.date)}
                </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </PhotoProvider>
  );
};

export default Certificates;
