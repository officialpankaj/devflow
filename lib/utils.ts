import { techMap } from "@/constants/techMap";

export { cn } from "cn";

export const getDevIconClassName = (techName: string) => {
  const normalizedName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normalizedName] ? `${techMap[normalizedName]} colored` : "devicon-devicon-plain";
};
