"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";

const Themeprovider = ({ children, ...props }: ThemeProviderProps) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};
export default Themeprovider;
