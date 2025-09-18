// app/shipping/page.jsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Shipping Information</h1>

      <Card className="mb-8">
        <CardContent className="space-y-4 pt-3">
          <p>
            Welcome to <span className="font-semibold">Prime Traders</span>, your
            trusted destination for high-quality branded laptops delivered
            securely and swiftly to your doorstep.
          </p>
          <p>
            We understand that when you purchase a premium laptop, you want it to
            reach you in perfect condition and without delay. That’s why we take
            shipping seriously, ensuring that your prized possession arrives safe
            and sound within <span className="font-semibold">3 to 5 business
            days</span>. Plus, we offer a{" "}
            <span className="font-semibold">14-day money-back guarantee</span> to
            provide you with complete peace of mind.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Secure Packaging for Your Valuable Purchase</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-3">
          <p>
            At Prime Traders, we go above and beyond to safeguard your laptop
            during transit. We recognize the value and importance of your
            investment, and we take the utmost care in packaging to prevent any
            damage or mishandling during shipping.
          </p>
          <p className="mt-4">
            Our dedicated team meticulously packages each laptop in robust,
            protective materials and boxes, so it arrives in the same pristine
            condition as when it left our facility.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Fast and Reliable Delivery</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-3">
          <p>
            We understand the anticipation of receiving your new laptop, and we’re
            committed to delivering it to you as quickly as possible. Our shipping
            process is designed for efficiency, and we partner with trusted
            carriers to ensure your laptop reaches you within{" "}
            <span className="font-semibold">3 to 5 business days</span> from the
            date of your order.
          </p>
          <p className="mt-4">
            Rest assured that we keep you informed throughout the shipping
            journey, providing tracking information and updates so you can monitor
            the progress of your delivery.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>14-Day Money-Back Guarantee</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-3">
          <p>
            We want you to be completely satisfied with your purchase from Prime
            Traders. That’s why we offer a{" "}
            <span className="font-semibold">14-day money-back guarantee</span>.
          </p>
          <p className="mt-4">
            If, for any reason, you’re not fully satisfied with your laptop, you
            can return it within 14 days of delivery, no questions asked. We’ll
            refund your purchase price or assist you in selecting a suitable
            replacement – it’s your choice.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-3">
          <p>
            If you have any questions about our shipping process, packaging,
            delivery times, or our 14-day money-back guarantee, our friendly and
            knowledgeable customer support team is here to assist you.
          </p>
          <p className="mt-4">
            Please don’t hesitate to reach out via our{" "}
            <a href="/contact" className="font-semibold underline">
              Contact Us
            </a>{" "}
            page, and we’ll be delighted to address any inquiries or concerns you
            may have.
          </p>
        </CardContent>
      </Card>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Thank you for choosing <span className="font-semibold">Prime Traders</span>{" "}
        for your branded laptop needs. We look forward to providing you with a
        seamless shopping experience, secure packaging, and prompt delivery, all
        backed by our commitment to your satisfaction.
      </p>
    </div>
  );
}
