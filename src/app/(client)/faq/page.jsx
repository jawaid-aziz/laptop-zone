// app/faq/page.jsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="q1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            You can return any product within 7 days of purchase. Items must be unused and in original packaging.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q2">
          <AccordionTrigger>Do you offer free shipping?</AccordionTrigger>
          <AccordionContent>
            Yes, we offer free shipping on all orders above Rs. 5000 across Pakistan.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q3">
          <AccordionTrigger>How can I track my order?</AccordionTrigger>
          <AccordionContent>
            Once your order is shipped, you’ll receive an email with the tracking number and courier details.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q4">
          <AccordionTrigger>Do you have physical stores?</AccordionTrigger>
          <AccordionContent>
            Yes, you can visit our offline stores. Check the <a href="/store-locator" className="underline">Store Locator</a> page for details.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
