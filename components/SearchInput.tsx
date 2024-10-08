"use client";

import qs from "query-string"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks";
import Input from "./ui/Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="What do you want to play?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="text-white bg-neutral-800/80"
    />
  )
}

export default SearchInput
