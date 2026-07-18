import React, { ReactNode } from "react";
import SectionHeader from "./SectionHeader";
import SectionContent from "./SectionContent";

interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

const Section = ({ title, description, children }: SectionProps) => {
  return (
    <section
      className={`${
        title && "divide-y   divide-neutral-st3-default"
      } bg-neutral-bg1-default rounded-md`}
    >
      {title && <SectionHeader title={title} description={description ?? ""} />}
      <SectionContent>{children}</SectionContent>
    </section>
  );
};

export default Section;
