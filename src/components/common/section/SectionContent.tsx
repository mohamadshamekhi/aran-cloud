import { ReactNode } from "react";

const SectionContent = ({ children }: { children: ReactNode }) => {
  return <section className="md:p-6 p-2">{children}</section>;
};

export default SectionContent;
