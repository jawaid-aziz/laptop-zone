// app/contact/page.jsx
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left Side */}
      <div className="space-y-10">
        {/* Call Us */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-black" />
            <h2 className="text-xl font-bold">Call Us:</h2>
          </div>
          <p>We’re available from 10 am – 10 pm, 6 days a week.</p>
          <div>
            <p className="font-semibold">Customer Service:</p>
            <p>+92 322 2155628</p>
          </div>
        </div>

        <Separator />

        {/* Write to Us */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-black" />
            <h2 className="text-xl font-bold">Write to Us:</h2>
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <div>
            <p className="font-semibold">Customer Service:</p>
            <p>support@laptopzone.pk</p>
          </div>
          <div>
            <p className="font-semibold">Corporate:</p>
            <p>corporate@laptopzone.pk</p>
          </div>
        </div>

        <Separator />

        {/* Find Us */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-black" />
            <h2 className="text-xl font-bold">Find Us:</h2>
          </div>
          <p>Want to visit our Offline Stores?</p>
          <a href="/store-locator" className="font-semibold hover:underline">
            Go to Store Locator
          </a>
        </div>
      </div>

      {/* Right Side - Form */}
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-6">
          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Your name</label>
              <Input placeholder="Enter your name" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Your email</label>
              <Input type="email" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Subject</label>
              <Input placeholder="Subject" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Your message
              </label>
              <Textarea placeholder="Type your message..." />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
