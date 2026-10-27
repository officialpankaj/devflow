import { techMap } from "@/constants/techMap";
import { techDescriptionMap } from "@/constants/techDescriptionMap";

export { cn } from "cn";

export const getDevIconClassName = (techName: string) => {
  const normalizedName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normalizedName] ? `${techMap[normalizedName]} colored` : "devicon-devicon-plain";
};

export function getTechDescription(techName: string): string {
  const normalizedTech = techName.replace(/[ .]/g, "").toLowerCase();

  return (
    techDescriptionMap[normalizedTech] ||
    `${techName} is a technology or tool widely used in software development, providing valuable features and capabilities.`
  );
}

export const getTimeStamp = (datetime: Date) => {
  const date = new Date(datetime);

  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}`;
    }
  }

  return "just now";
};

export const formatNumber = (number: number) => {
  if (number >= 100000) {
    return (number / 100000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};
