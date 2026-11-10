"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
        <Image
          src="/icons/sun.svg"
          alt="light"
          width={15}
          height={15}
          className={cn("block scale-100 transition-all dark:hidden dark:scale-0", {
            "active-theme": theme === "light",
          })}
        />

        <Image
          src="/icons/moon.svg"
          alt="dark"
          width={15}
          height={15}
          className={cn("hidden scale-0 transition-all dark:block dark:scale-100", {
            "active-theme": theme === "dark",
          })}
        />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn("flex gap-3 px-3 py-2", { "text-primary-500": theme === "light" })}
        >
          <Image
            src="/icons/sun.svg"
            alt="light"
            width={15}
            height={15}
            className={cn({ "active-theme": theme === "light" })}
          />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn("flex gap-3 px-3 py-2", { "text-primary-500": theme === "dark" })}
        >
          <Image
            src="/icons/moon.svg"
            alt="dark"
            width={15}
            height={15}
            className={cn({ "active-theme": theme === "dark" })}
          />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn("flex gap-3 px-3 py-2", { "text-primary-500": theme === "system" })}
        >
          <Image
            src="/icons/computer.svg"
            alt="system"
            width={15}
            height={15}
            className={cn({ "active-theme": theme === "system" })}
          />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
