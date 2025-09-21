"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms and Conditions</h1>
      <p className="text-muted-foreground mb-10 text-center">
        These Terms and Conditions govern your use of the Laptop Zone website and
        the purchase of products from Prime Traders. Please read these terms carefully
        before using our website or making a purchase. By accessing or using our website
        or making a purchase, you agree to be bound by these Terms and Conditions.
      </p>

      {/* Eligibility */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Eligibility</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p>
            You must be at least 18 years old to use our website and purchase products
            from Prime Traders. By using our services, you represent and warrant that
            you are of legal age to enter into a binding contract.
          </p>
        </CardContent>
      </Card>

      {/* Product Info */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p>
            We make every effort to provide accurate and up-to-date information about our
            products, including descriptions, pricing, and availability. However, we do not
            guarantee the accuracy of such information and reserve the right to modify or
            update product information at any time.
          </p>
        </CardContent>
      </Card>

      {/* Orders & Payment */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Orders and Payment</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p>
            When you place an order through our website, you agree to provide accurate and
            complete information. All orders are subject to acceptance and availability.
            We reserve the right to refuse or cancel any order for any reason, including
            if the product is out of stock, contains inaccuracies, or if we suspect
            fraudulent activity.
          </p>
          <p className="mt-3">
            Payment for your order can be made using the payment methods specified on our
            website. By providing payment information, you represent and warrant that you
            have the legal right to use the payment method chosen.
          </p>
        </CardContent>
      </Card>

      {/* Shipping */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Shipping and Delivery</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p>
            Our shipping and delivery terms are outlined in our Shipping Policy, which is
            an integral part of these Terms and Conditions. Please review our Shipping Policy
            for detailed information on shipping methods, costs, and delivery times.
          </p>
        </CardContent>
      </Card>

      {/* Returns */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Returns and Refunds</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p>
            Our return and refund policy is outlined in our Return Policy, which is an
            integral part of these Terms and Conditions. Please review our Return Policy
            for detailed information on the process, eligibility, and conditions for
            returns and refunds.
          </p>
        </CardContent>
      </Card>

      {/* Intellectual Property */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Intellectual Property</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p>
            All content on our website, including text, images, logos, and trademarks,
            is the intellectual property of Prime Traders or its licensors and is protected
            by copyright and trademark laws. You may not use, reproduce, or distribute our
            content without our express written consent.
          </p>
        </CardContent>
      </Card>

      {/* Liability */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Limitation of Liability</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p>
            Prime Traders shall not be liable for any indirect, incidental, consequential,
            or punitive damages arising from your use of our website or the purchase of
            our products, even if we have been advised of the possibility of such damages.
            Our maximum liability to you shall be limited to the purchase price you paid
            for the product.
          </p>
        </CardContent>
      </Card>

      {/* Governing Law */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Governing Law</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p>
            These Terms and Conditions shall be governed by and construed in accordance
            with the laws of Pakistan. Any disputes arising from these terms
            shall be subject to the exclusive jurisdiction of the courts in
            Pakistan.
          </p>
        </CardContent>
      </Card>

      {/* Changes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Changes to Terms and Conditions</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p>
            Laptop Zone reserves the right to modify or update these Terms and Conditions
            at any time without prior notice. Changes will be effective upon posting on
            our website. It is your responsibility to review these terms periodically
            for updates.
          </p>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p>
            If you have any questions or concerns regarding these Terms and Conditions,
            please contact us at support@laptopzone.com.
          </p>
          <p className="mt-4 font-semibold">
            By using our website and purchasing products from Laptop Zone, you acknowledge
            that you have read and understood these Terms and Conditions and agree to comply
            with them.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
