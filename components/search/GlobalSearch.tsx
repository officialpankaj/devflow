"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import GlobalResult from "@/components/GlobalResult";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

const GlobalSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("global");

  const [search, setSearch] = useState<string>(query || "");
  const [isOpen, setIsOpen] = useState<boolean>(!!query);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  // set when a result is clicked, so the debounce doesn't push the old page URL over the pending navigation
  const skipUrlCleanup = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        if (search === query) return;
        const newUrl = formUrlQuery({ params: searchParams.toString(), key: "global", value: search });

        router.push(newUrl, { scroll: false });
      } else {
        if (query && !skipUrlCleanup.current) {
          const newUrl = removeKeysFromUrlQuery({ params: searchParams.toString(), keysToRemove: ["global", "type"] });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, searchParams, router, query]);

  return (
    <div className="relative w-full max-w-150 max-lg:hidden" ref={searchContainerRef}>
      <div className="background-light800_dark300 relative flex min-h-14 grow items-center gap-1 rounded-xl px-4">
        <Image src="/icons/search.svg" alt="search" width={24} height={24} className="cursor-pointer" />

        <Input
          type="text"
          placeholder="Search anything globally..."
          value={search}
          onChange={(e) => {
            skipUrlCleanup.current = false;
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent! shadow-none outline-none"
        />
      </div>
      {isOpen && (
        <GlobalResult
          onClose={() => {
            skipUrlCleanup.current = true;
            setIsOpen(false);
            setSearch("");
          }}
        />
      )}
    </div>
  );
};
export default GlobalSearch;
