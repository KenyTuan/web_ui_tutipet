import { useCallback, useEffect, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from "next/navigation";

const useSearchParams = () => {
  const searchParams = useNextSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getSearchParams = useCallback(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const [params, setParams] = useState(getSearchParams());

  useEffect(() => {
    setParams(getSearchParams());
  }, [getSearchParams, searchParams]);

  const updateSearchParams = (newParams) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    Object.keys(newParams).forEach((key) => {
      urlParams.set(key, newParams[key]);
    });
    router.push(`${pathname}?${urlParams.toString()}`);
  };

  return [params, updateSearchParams];
};

export default useSearchParams;
