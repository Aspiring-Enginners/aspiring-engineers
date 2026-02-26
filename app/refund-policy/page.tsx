"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />

      <PageHero
        title="Refund Policy"
        description="Last updated: February 20, 2026"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                1. Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                At Aspiring Engineers, we strive to ensure complete satisfaction
                with our educational services. This Refund Policy outlines the
                terms and conditions under which refunds may be requested and
                processed for purchases made on our platform.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                By purchasing any of our products or services, you acknowledge
                that you have read, understood, and agree to be bound by this
                Refund Policy.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                2. Eligibility for Refunds
              </h2>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                2.1 Test Series and Course Packages
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Refund requests for test series and course packages are eligible
                under the following conditions:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                <li>
                  Request is made within <strong>7 days</strong> of the purchase
                  date
                </li>
                <li>
                  No more than <strong>20%</strong> of the content has been
                  accessed or attempted
                </li>
                <li>
                  The user has not downloaded or printed any study materials
                </li>
                <li>No test attempts have been submitted for evaluation</li>
              </ul>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                2.2 Counselling Services
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                For counselling services, refunds are available if:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>
                  Request is made at least <strong>48 hours</strong> before the
                  scheduled session
                </li>
                <li>The counselling session has not yet commenced</li>
                <li>No materials or documents have been shared or accessed</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                3. Non-Refundable Items
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The following purchases are <strong>NOT eligible</strong> for
                refunds:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>Purchases made more than 7 days ago</li>
                <li>
                  Courses or test series where more than 20% of content has been
                  accessed
                </li>
                <li>Completed test attempts or submitted assessments</li>
                <li>Downloaded study materials or resources</li>
                <li>Counselling sessions that have already occurred</li>
                <li>
                  Special promotional or discounted purchases (unless otherwise
                  stated)
                </li>
                <li>Gift purchases or transferred subscriptions</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                4. How to Request a Refund
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                To request a refund, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                <li>
                  Send an email to{" "}
                  <strong>aspiringengineersofficial@gmail.com</strong> with the
                  subject line &quot;Refund Request - [Order ID]&quot;
                </li>
                <li>
                  Include the following information in your email:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Your full name</li>
                    <li>Registered email address</li>
                    <li>Order ID or transaction reference number</li>
                    <li>Date of purchase</li>
                    <li>Reason for refund request</li>
                  </ul>
                </li>
                <li>
                  Our team will review your request and respond within{" "}
                  <strong>3-5 business days</strong>
                </li>
              </ol>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                5. Refund Processing
              </h2>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                5.1 Approval Process
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Once your refund request is received, we will:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                <li>Verify your purchase details and eligibility</li>
                <li>
                  Review your account activity to confirm compliance with refund
                  criteria
                </li>
                <li>
                  Notify you of the approval or rejection of your refund via
                  email
                </li>
              </ul>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                5.2 Refund Timeline
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If approved, refunds will be processed as follows:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>
                  <strong>Credit/Debit Card:</strong> 5-7 business days
                </li>
                <li>
                  <strong>UPI:</strong> 3-5 business days
                </li>
                <li>
                  <strong>Net Banking:</strong> 5-7 business days
                </li>
                <li>
                  <strong>Digital Wallets:</strong> 2-3 business days
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Please note that the actual time for the refund to reflect in
                your account may vary depending on your bank or payment
                provider.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                6. Partial Refunds
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                In certain circumstances, we may offer partial refunds at our
                discretion. These may include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>
                  Technical issues that prevented access to a significant
                  portion of content
                </li>
                <li>
                  Service outages lasting more than 24 hours during the
                  subscription period
                </li>
                <li>
                  Content not matching the advertised description (subject to
                  verification)
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                The partial refund amount will be calculated based on the unused
                portion of the service or content.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                7. Technical Issues
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you experience technical difficulties accessing our content
                or services, please contact our support team before requesting a
                refund. Many issues can be resolved quickly, and we offer:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>
                  Technical support available via email at
                  aspiringengineersofficial@gmail.com
                </li>
                <li>Extended access time to compensate for downtime</li>
                <li>Alternative access methods when available</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                8. Fraudulent Refund Requests
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We reserve the right to deny refund requests that we determine
                to be fraudulent, abusive, or in violation of our Terms of
                Service. Accounts engaging in such activities may be suspended
                or terminated, and we reserve the right to pursue appropriate
                legal action if necessary.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                9. Changes to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We reserve the right to modify this Refund Policy at any time.
                Changes will be effective immediately upon posting to our
                website. The refund policy applicable to your purchase is the
                one in effect at the time of your purchase.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                10. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                For any questions regarding refunds or this policy, please
                contact us:
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                <li>
                  <strong>Email:</strong> aspiringengineersofficial@gmail.com
                </li>
                <li>
                  <strong>Phone:</strong> +91 9002912888
                </li>
                <li>
                  <strong>Address:</strong> Hemanti Block, Kshudiram Nagar,
                  Haldia, West Bengal - 721657, P.O: Hatiberia BO, P.S: Haldia,
                  Dist: Purba Medinipur, Ward No. 24
                </li>
                <li>
                  <strong>Legal Entity Name:</strong> Sourav Suman (Proprietor –
                  Aspiring Engineers)
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Processing fee charged by payment gateways (if any) may be
                deducted from refundable amount.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Refunds are processed only to the original payment source.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                For any payment related concern, users must contact support
                before initiating a dispute with the bank or payment provider.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
