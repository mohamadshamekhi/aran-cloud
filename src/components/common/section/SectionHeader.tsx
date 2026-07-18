import SectionContent from "./SectionContent";

interface ToastProps {
  title: string;
  description: string;
}

const SectionHeader = ({ title, description }: ToastProps) => {
  return (
    // <section className="min-h-[92px]">
    <SectionContent>
      <div className="flex flex-col  justify-center">
        <h3 className="text-title-3 text-neutral-fg1-default">{title}</h3>
        {description && (
          <p className="text-body-2  mt-2 text-neutral-fg2-default">
            {description}
          </p>
        )}
      </div>
    </SectionContent>
    // </section>
  );
};

export default SectionHeader;
