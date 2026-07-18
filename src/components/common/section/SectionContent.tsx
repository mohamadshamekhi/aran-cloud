import { ReactNode } from "react";

const SectionContent = ({ children }: { children: ReactNode }) => {
  return <section className="p-6">{children}</section>;
};

export default SectionContent;
