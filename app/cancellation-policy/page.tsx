"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

export default function CancellationPolicyPage() {
  return (
    <>
      <Navbar />

      <PageHero
        title="Cancellation Policy"
        description="Last updated: February 20, 2026"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                1. Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This Cancellation Policy outlines the terms and conditions under
                which you may cancel your subscription, booking, or purchase of
                services from Aspiring Engineers. We understand that
                circumstances change, and we aim to provide a fair and
                transparent cancellation process.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                All products offered by Aspiring Engineers are digital
                educational services delivered instantly after purchase.
                Therefore cancellation after activation is limited.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                By using our services, you agree to the terms of this
                Cancellation Policy.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                2. Cancellation of Test Series Subscriptions
              </h2>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                2.1 Before Activation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you wish to cancel your test series subscription before it
                has been activated (i.e., before accessing any content):
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                <li>
                  Cancellation may be requested within <strong>24 hours</strong>{" "}
                  only if no content has been accessed and no test attempt has
                  been started
                </li>
                <li>
                  You will receive a <strong>100% refund</strong> of the
                  purchase amount
                </li>
                <li>
                  Cancellation can be requested via email at
                  aspiringengineersofficial@gmail.com
                </li>
              </ul>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                2.2 After Activation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Once you have accessed any content from the test series:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>
                  Once any test attempt is submitted or more than 10% of the
                  content is accessed, the service is considered consumed and
                  cancellation with refund will not be available
                </li>
                <li>
                  Access to the purchased content will continue until the
                  subscription period ends
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                3. Cancellation of Counselling Sessions
              </h2>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                3.1 Individual Sessions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                For one-on-one counselling sessions:
              </p>
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-gray-600">
                    <th className="text-left py-2 text-gray-800 dark:text-gray-200">
                      Cancellation Time
                    </th>
                    <th className="text-left py-2 text-gray-800 dark:text-gray-200">
                      Refund/Credit
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-2">More than 48 hours before session</td>
                    <td className="py-2">100% refund or rescheduling</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-2">24-48 hours before session</td>
                    <td className="py-2">50% refund or full rescheduling</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-2">Less than 24 hours before session</td>
                    <td className="py-2">
                      No refund, rescheduling at discretion
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">No-show</td>
                    <td className="py-2">No refund, no rescheduling</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Once a counselling session has been attended or guidance
                delivered, the service is considered completed and
                non-cancellable.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                3.2 Package Sessions
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                For counselling packages with multiple sessions, the same
                cancellation rules apply per session. Unused sessions in a
                package may be rescheduled within the validity period of the
                package.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                4. How to Cancel
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                To cancel your subscription or booking, please follow these
                steps:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                <li>Log in to your account at www.aspiringengineers.com</li>
                <li>
                  Navigate to &quot;My Profile&quot; → &quot;My Purchases&quot;
                </li>
                <li>Select the subscription or booking you wish to cancel</li>
                <li>
                  Click on &quot;Request Cancellation&quot; and follow the
                  prompts
                </li>
                <li>
                  Alternatively, email us at aspiringengineersofficial@gmail.com
                  with:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Your registered email address</li>
                    <li>Order ID or booking reference</li>
                    <li>Reason for cancellation</li>
                  </ul>
                </li>
              </ol>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                5. Cancellation by Aspiring Engineers
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We reserve the right to cancel your subscription or booking
                under the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                <li>Violation of our Terms of Service</li>
                <li>Fraudulent activity or misuse of the platform</li>
                <li>Non-payment or payment disputes</li>
                <li>Technical or operational reasons beyond our control</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400">
                In the event of cancellation by Aspiring Engineers (except in
                cases of Terms of Service violations), you will be entitled to a
                pro-rated refund for any unused portion of your subscription.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                6. Rescheduling Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                As an alternative to cancellation, we offer rescheduling
                options:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>
                  <strong>Counselling Sessions:</strong> Can be rescheduled up
                  to 2 times per booking, subject to availability
                </li>
                <li>
                  <strong>Test Series:</strong> Access extension may be granted
                  in cases of genuine hardship (medical emergency, etc.) upon
                  request with supporting documentation
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Rescheduling requests should be made at least 24 hours before
                the scheduled time.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                7. Payment Disputes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Users must contact support before raising any payment dispute or
                chargeback. Unauthorized chargebacks after successful service
                delivery may lead to permanent account suspension.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                8. Force Majeure
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                In the event of circumstances beyond our reasonable control,
                including but not limited to natural disasters, pandemics,
                government actions, or technical failures affecting our ability
                to deliver services, we may cancel or reschedule sessions or
                extend subscription periods as appropriate. In such cases, we
                will work with affected users to find suitable alternatives or
                provide appropriate refunds.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                9. Effect of Cancellation
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Upon successful cancellation:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>
                  Access to the cancelled service will be terminated immediately
                  (for refund requests) or at the end of the billing period (for
                  non-refund cancellations)
                </li>
                <li>
                  Any progress, test history, or performance data may be
                  retained in your account for future reference
                </li>
                <li>
                  You will receive a confirmation email within 24-48 hours of
                  the cancellation request
                </li>
                <li>
                  Applicable refunds will be processed according to our Refund
                  Policy
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                10. Changes to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We reserve the right to modify this Cancellation Policy at any
                time. Changes will be effective upon posting to our website. The
                policy in effect at the time of your purchase will govern that
                particular transaction.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                11. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                For any questions about cancellations or this policy, please
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
