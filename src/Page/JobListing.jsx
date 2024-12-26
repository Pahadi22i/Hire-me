import { getCompanies } from "@/Api/apiCompanies";
import { getJobs } from "@/Api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import {  useUser } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { State } from "country-state-city";
import JobCard from "@/components/JobCard";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocations] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: Jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  // companies api
  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);


  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [!isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setCompany_id("");
    setSearchQuery("");
    setLocations("");
  };

    if (!isLoaded) {
      return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
    }

  return (
    <>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        latest JOb
      </h1>

      {/* add filters here */}
      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full items-center gap-2 mb-3"
      >
        <Input
          placeholder="Search Jobs by Title"
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button variant="blue" type="submit" className="h-full sm:w-28">
          Search
        </Button>
      </form>
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocations(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Fiter by Locations" />
          </SelectTrigger>
          <SelectContent>
            {State.getStatesOfCountry("IN").map(({ name }) => {
              return (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          variant="destructive"
          className="sm:w-1/2"
          onClick={clearFilters}
        >
          Clear Filter
        </Button>
      </div>

         {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Jobs?.length ? (
            Jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              )
            })
          ) : (
            <div> No Jobs found</div>
          )}
        </div>
      )}
    </>
  );
}

export default JobListing;



