"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

// Define a type for the row items
interface Row {
  key: string;
  name: string;
  download: JSX.Element;
}

// Define the rows with the correct type
const rows: Row[] = [
  {
    key: "1",
    name: "Authorization Proof of Billing",
    download: (
      <Button
        as="a"
        href="https://drive.google.com/file/d/1SZvqOYEvPiWf64j3mw60zuD8Twgg3JWj/view?usp=sharing"
        size="sm"
        target="_blank"
      >
        Download
      </Button>
    ),
  },
  {
    key: "2",
    name: "Customer Acceptance Policy Form",
    download: (
      <Button
        as="a"
        href="https://drive.google.com/file/d/1OP8icv-SlH1-fUyg397AOUjh2J_SqUfF/view?usp=sharing"
        size="sm"
        target="_blank"
      >
        Download
      </Button>
    ),
  },
  {
    key: "3",
    name: "DMCI Process and Flow",
    download: (
      <Button
        as="a"
        href="https://drive.google.com/file/d/1ez60CDS5LlBqSDv_ECVAqkSYGdyTACJx/view?usp=sharing"
        size="sm"
        target="_blank"
      >
        Download
      </Button>
    ),
  },
  {
    key: "4",
    name: "PEP Questionnaire",
    download: (
      <Button
        as="a"
        href="https://drive.google.com/file/d/1LJncAw1akpt1OAu9GsS4sZVCjH30Ls6e/view?usp=sharing"
        size="sm"
        target="_blank"
      >
        Download
      </Button>
    ),
  },
];

// Define the columns
const columns = [
  {
    key: "name",
    label: "Document Name",
  },
  {
    key: "download",
    label: "Action",
  },
];

const DocumentTable = () => {
  return (
    <div>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.download}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentTable;
