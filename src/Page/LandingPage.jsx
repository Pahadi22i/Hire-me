import React from "react";
import logo from "../assets/logo.png";
import banner from "../assets/banner.jpeg"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import companies from "../data/companies.json"
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-titel text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Fing your Dream job{" "}
          <span className="flex items-center gap-2 sm:gap-6 lg:gap-8">
            and get{" "}
            <img src={logo} alt=" hire logo" className="h-14 sm:h-24 lg:h-32" />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousand of job listing or find the perfect candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        {/* button */}
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/job-post">
          <Button variant="destructive" size="xl">
            Post jobs
          </Button>
        </Link>
      </div>
      {/* carousel */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10 z-1"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center ">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* bannner */}
      <img src={banner} alt="" className="w-full" />
      {/* cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p> Search and apply jobs, track applications, and more.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Post jobs, manage applications, and find the best candidates</p>
          </CardContent>
        </Card>
      </section>
      {/* accordion */}
      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}

export default LandingPage;
