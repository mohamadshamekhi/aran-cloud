/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  EllipsisIcon,
  InfoIcon,
  WarningIcon,
} from "./icons/icons";

export type IconName =
  | "chevron-left"
  | "chevron-down"
  | "chevron-up"
  | "chevron-right"
  | "ellipsis"
  | "info"
  | "check-circle"
  | "warning";

const iconMap: Record<IconName, React.FC<any>> = {
  "chevron-left": ChevronLeftIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-up": ChevronUpIcon,
  "chevron-right": ChevronRightIcon,
  ellipsis: EllipsisIcon,
  info: InfoIcon,
  "check-circle": CheckCircleIcon,
  warning: WarningIcon,
};

interface IconProps {
  name: IconName;
  className?: string;
  size?: number | string;
}

const Icon = ({ name, className, size = 24 }: IconProps) => {
  const SelectedIcon = iconMap[name];

  if (!SelectedIcon) return null;

  return <SelectedIcon className={className} size={size} />;
};

export default Icon;
