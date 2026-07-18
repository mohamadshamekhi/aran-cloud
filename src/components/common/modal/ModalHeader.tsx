import React from "react";
import SectionHeader from "../section/SectionHeader";

const ModalHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return <SectionHeader title={title} description={description} />;
};

export default ModalHeader;
