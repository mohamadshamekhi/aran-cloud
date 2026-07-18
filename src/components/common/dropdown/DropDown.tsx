import { ReactNode, useState } from "react";
import Loading from "../loading/Loading";

interface DropDownItem {
  onClick: () => void;
  title: string;
  disable?: boolean;
}

interface DropDownProps {
  items: DropDownItem[];
  trigger: ReactNode;
  isLoading?: boolean;
}

const DropDown = ({ items, trigger, isLoading }: DropDownProps) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const item = items[focusedIndex];
      if (item && !item.disable) item.onClick();
    }
  };

  return (
    <div className="group relative">
      <div className="">{trigger}</div>
      <div className="hidden z-9999 group-hover:flex right-0 pt-2 absolute">
        <div
          className={
            "p-2   bg-neutral-bg1-default shadow-elevated-2 rounded-md"
          }
        >
          <ul className="min-w-[144px]" role="menu" onKeyDown={handleKeyDown}>
            {items.map((item, i) => (
              <li
                key={item.title}
                role="menuitem"
                tabIndex={i === focusedIndex ? 0 : -1}
                aria-disabled={item.disable}
                onClick={() => !item.disable && item.onClick()}
                onFocus={() => setFocusedIndex(i)}
                className="p-2 text-body-2 text-neutral-fg1-default rounded-lg cursor-pointer 
                       not-aria-disabled:hover:bg-neutral-bg1-hover not-aria-disabled:hover:text-neutral-fg1-hover 
                       not-aria-disabled:active:bg-neutral-bg1-press not-aria-disabled:active:text-neutral-fg1-press 
                       aria-disabled:cursor-not-allowed aria-disabled:text-neutral-fg1-disable"
              >
                {item.title}
              </li>
            ))}
            {isLoading && (
              <li className="p-2">
                <Loading />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
