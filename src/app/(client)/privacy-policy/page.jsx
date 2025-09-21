"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-muted-foreground mb-10 text-center">
        At Laptop Zone, we value your privacy and are committed to protecting your personal information. 
        This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you interact 
        with our website, purchase our products, or engage with our services.
      </p>

      {/* Info We Collect */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Information We Collect</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-3 pt-6">
          <p>
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">Personal Information:</span> 
              Your name, email, postal address, phone number, and payment details when you make a purchase.
            </li>
            <li>
              <span className="font-semibold">Device Information:</span> 
              IP address, browser type, operating system, and unique device identifiers.
            </li>
            <li>
              <span className="font-semibold">Usage Information:</span> 
              Pages you visit, products you view, and actions you take on our website.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* How We Use */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How We Use Your Information</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-3 pt-6">
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold">Providing Services:</span> Process orders, fulfill requests, and provide support.</li>
            <li><span className="font-semibold">Improving User Experience:</span> Personalize content and recommend products.</li>
            <li><span className="font-semibold">Communication:</span> Send order updates, offers, and product/service info.</li>
            <li><span className="font-semibold">Analytics:</span> Analyze site usage and marketing effectiveness.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Sharing */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sharing Your Information</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-3 pt-6">
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold">Service Providers:</span> Trusted partners who help us deliver products and services.</li>
            <li><span className="font-semibold">Legal Compliance:</span> When required by law or to protect rights, safety, and property.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Choices */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Choices</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-3 pt-6">
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold">Access and Update:</span> Manage your info through account settings or support.</li>
            <li><span className="font-semibold">Opt-Out:</span> Stop promotional emails via unsubscribe link or support request.</li>
            <li><span className="font-semibold">Cookies:</span> Adjust preferences via browser settings.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p>
            We take data security seriously and employ industry-standard measures to safeguard your information. 
            However, please note that no method of transmission over the internet is entirely secure.
          </p>
        </CardContent>
      </Card>

      {/* Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Updates to Privacy Policy</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p>
            We may update this Privacy Policy to reflect changes in our practices or for operational, legal, or regulatory reasons. 
            Any updates will be posted on our website with the revised effective date.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
