"use client";
import { Button } from "@/components/ui/button";
import { Loader, Send } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SectionHeader from "./SectionHeader";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactusSection() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<any>();

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setIsCreating(true);
  };

  const handleContactClick = (contact: any) => {
    switch (contact.type) {
      case "email":
        window.location.href = `mailto:${contact.contact}`;
        break;
      case "phone":
        window.location.href = `tel:${contact.contact}`;
        break;
      case "address":
        // Open Google Maps with the specified address
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.contact)}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="    space-y-20">
      <SectionHeader title="Let us help you go online" />
      <div className=" grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="max-w-lg space-y-3">
          <p className="  leading-relaxed tracking-wider">We’re here to help and answer any question you might have, We look forward to hearing from you! Please fill out the form, or us the contact information below .</p>
          <div>
            <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
              {contactMethods.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-x-3">
                  <div className="flex-none ">{item.icon}</div>
                  <p
                    className=" hover: cursor-pointer transition-all duration-300 ease-in-out "
                    onClick={() => handleContactClick(item)}>
                    {item.contact}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Leave youre message here </CardTitle>
            </CardHeader>
            <CardContent className=" space-y-5">
              <div>
                <Input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && <span className=" text-xs text-destructive">This field is required</span>}
              </div>
              <div>
                <Input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  {...register("email", { required: true })}
                />
                {errors.email && <span className=" text-xs text-destructive">This field is required </span>}
              </div>
              <div>
                <Input
                  type="number"
                  required
                  placeholder="Your Phone Number"
                  {...register("phone", { required: true, minLength: 10, maxLength: 10 })}
                />
                {errors.phone && <span className=" text-xs text-destructive">This field is required (Phone should be 10 character long).</span>}
              </div>
              <div>
                <Textarea
                  placeholder="Message..."
                  required
                  {...register("message", { required: true })}
                  className="h-36 w-full px-3 py-2"></Textarea>
                {errors.message && <span className=" text-xs text-destructive">This field is required</span>}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={isCreating}
                className="flex w-full items-center  gap-1">
                {isCreating ? (
                  <Loader
                    className=" animate-spin"
                    size={16}
                  />
                ) : (
                  <Send size={16} />
                )}
                Send Message
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}

const contactMethods = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
    contact: "info@meroecommerce.com",
    type: "email",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
    contact: "+977 9769329984",
    type: "phone",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
    contact: "+977 9769329983",
    type: "phone",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
    contact: "+977 9769323084",
    type: "phone",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
    contact: "Kageshwori Manahara-9, Kathmandu, Nepal",
    type: "address",
  },
];
