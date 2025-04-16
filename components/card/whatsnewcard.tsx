"use client";
import React, { useState } from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";

interface Data {
  id: number;
  title: string;
  image: string;
  date: string;
  content?: string | null;
}

interface DataProps {
  data: Data[];
}

const WhatsNewCard: React.FC<DataProps> = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<Data | null>(null);

  const handleCardClick = (item: Data) => {
    setSelectedItem(item);
    onOpen();
  };

  return (
    <>
      {data.map((item) => (
        <Link href={'#'} key={item.id} onClick={() => handleCardClick(item)} >
          <Card className="cursor-pointer w-full">
            <CardBody className="overflow-visible">
              {item.image ? (
                item.image.includes('mp4') ? (
                  <video
                    src={`https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/articles/${item.image}`}
                    className="w-full object-cover object-center rounded-xl h-[250px]"
                    controls
                  />
                ) : (
                  <Image
                    isBlurred
                    isZoomed
                    alt="Card background"
                    className="w-full object-cover object-center rounded-xl"
                    height={250}
                    src={`https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/articles/${item.image}`}
                    width={500}
                  />
                )
              ) : (
                <p>No media available</p>
              )}


              <div className="py-4">
                <h4 className="font-bold text-large line-clamp-1">
                  {item.title}
                </h4>
                {item.content && (
                  <p className="text-tiny uppercase text-default-500 font-bold line-clamp-2">
                    {item.content}
                  </p>
                )}

                <div className="mt-4">
                  <p className="text-tiny uppercase text-default-500 font-bold">
                    {item.date
                      ? new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                      : "No Date Available"}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Link>
      ))}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-6">
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">{selectedItem?.title}</h2>
                <p className="text-sm text-gray-500">{selectedItem?.date}</p>
              </ModalHeader>
              <ModalBody className="p-4 overflow-x-hidden">
                <div className="space-y-6">
                  {selectedItem?.image ? (
                    selectedItem.image.includes('mp4') ? (
                      <video
                        src={`https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/articles/${selectedItem?.image}`}
                        className="w-full object-cover object-center rounded-xl"
                        controls
                      />
                    ) : (
                      <Image
                        isBlurred
                        alt="Modal background"
                        className="w-full object-cover object-center rounded-xl"
                        height={400}
                        src={`https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/articles/${selectedItem?.image}`}
                        width={800}
                      />
                    )
                  ) : (
                    <p>No media available</p>
                  )}
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedItem?.content
                        ?.split(/(?<=[.!?])\s+/)
                        .reduce<React.ReactNode[]>((acc, sentence, index) => {
                          if (index % 2 === 0 && index !== 0) acc.push(<br key={`br-${index}`} />, <br key={`br2-${index}`} />);
                          acc.push(sentence + " ");
                          return acc;
                        }, [])}
                    </p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default WhatsNewCard;
