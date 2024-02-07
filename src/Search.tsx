import { ChangeEvent, useEffect, useState } from "react";
import { useLazySearchTitleQuery } from "./services";

export default function Search({ setSearchResult }: any) {
  const [search, setSearch] = useState<string>("");
  const [triggerSearchTitle, {}] = useLazySearchTitleQuery();

  useEffect(() => {
    const getdata = setTimeout(async () => {
      try {
        const response = await triggerSearchTitle({
          title: search,
        }).unwrap();
        setSearchResult(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }, 2000);
    return () => clearTimeout(getdata);
  }, [search]);

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  };

  return (
    <div className="flex w-full h-20 justify-center items-center">
      <label
        htmlFor="search"
        className="block text-sm font-medium leading-6 text-gray-900 mr-4"
      >
        Search
      </label>
      <input
        type="search"
        name="search"
        id="search"
        className="block w-1/2 max-w-screen-sm rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="search"
        value={search}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          handleSearch(evt);
        }}
      />
    </div>
  );
}
