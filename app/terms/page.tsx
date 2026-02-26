"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />

      <PageHero
        title="Terms of Service"
        description="Last updated: February 20, 2026"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Welcome to Aspiring Engineers. By accessing or using our
                website, mobile applications, and services (collectively, the
                &quot;Services&quot;), you agree to be bound by these Terms of
                Service (&quot;Terms&quot;). If you do not agree to these Terms,
                please do not use our Services.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                These Terms constitute a legally binding agreement between you
                and Aspiring Engineers. We reserve the right to modify these
                Terms at any time, and such modifications will be effective
                immediately upon posting.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Aspiring Engineers provides digital educational services
                delivered online via website and mobile application. No physical
                goods are shipped or delivered.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                2. Description of Services
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Aspiring Engineers provides educational services including but
                not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>
                  Online test series for JEE, NEET, WBJEE, and other competitive
                  examinations
                </li>
                <li>Previous year question papers with solutions</li>
                <li>Study materials and resources</li>
                <li>Educational counselling services</li>
                <li>Performance analytics and tracking</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                3. User Registration and Account
              </h2>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                3.1 Account Creation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                To access certain features of our Services, you must register
                for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                <li>
                  Provide accurate, current, and complete information during
                  registration
                </li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password confidential and secure</li>
                <li>
                  Notify us immediately of any unauthorized access to your
                  account
                </li>
              </ul>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                3.2 Account Responsibility
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You are solely responsible for all activities that occur under
                your account. We reserve the right to suspend or terminate
                accounts that violate these Terms.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                If the user is under 18 years of age, payment must be completed
                by a parent or legal guardian.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                4. Payment Terms
              </h2>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                4.1 Pricing
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                All prices for our Services are listed in Indian Rupees (INR)
                and are inclusive of applicable taxes unless stated otherwise.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                4.2 Payment Methods
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We accept various payment methods including credit/debit cards,
                UPI, net banking, and digital wallets through our payment
                partner Cashfree.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                4.3 Billing
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                By providing payment information, you authorize us to charge the
                applicable fees for the Services you purchase. Payments made for
                digital services are generally non-refundable once access has
                been granted. Refunds may only be issued in cases of duplicate
                payment, technical failure, or non-delivery of service as per
                our Refund Policy.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                4.4 Chargeback Protection
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Users agree not to initiate chargebacks or payment disputes
                without first contacting our support team. Fraudulent
                chargebacks after successful service delivery may result in
                suspension of account and legal action.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                5. Access Duration
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Each purchase provides access for the validity period mentioned
                on the product page. Access automatically expires after the
                validity period and may require renewal for continued use.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                6. Intellectual Property Rights
              </h2>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                6.1 Our Content
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                All content on our platform, including but not limited to text,
                graphics, logos, images, audio clips, video clips, data
                compilations, software, and the compilation thereof, is the
                property of Aspiring Engineers or its content suppliers and is
                protected by Indian and international copyright laws.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                6.2 Limited License
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We grant you a limited, non-exclusive, non-transferable license
                to access and use our Services for your personal, non-commercial
                educational purposes only.
              </p>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                6.3 Restrictions
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You may not reproduce, distribute, modify, create derivative
                works from, publicly display, publicly perform, republish,
                download, store, or transmit any of our content without our
                prior written consent.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                7. Prohibited Conduct
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>Use the Services for any unlawful purpose</li>
                <li>Share your account credentials with others</li>
                <li>
                  Copy, distribute, or share our test content, questions, or
                  solutions
                </li>
                <li>
                  Use automated systems or software to extract data from our
                  platform
                </li>
                <li>
                  Interfere with or disrupt the integrity or performance of the
                  Services
                </li>
                <li>
                  Attempt to gain unauthorized access to any portion of the
                  Services
                </li>
                <li>Engage in any activity that could harm minors</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                8. Disclaimer of Warranties
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
                AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                OR IMPLIED. WE DO NOT WARRANT THAT:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>
                  The Services will be uninterrupted, timely, secure, or
                  error-free
                </li>
                <li>
                  The results obtained from the Services will be accurate or
                  reliable
                </li>
                <li>
                  The quality of any products, services, information, or other
                  material obtained through the Services will meet your
                  expectations
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ASPIRING ENGINEERS SHALL
                NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO
                LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN
                CONNECTION WITH YOUR USE OF THE SERVICES.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Our total liability to you for all claims arising out of or
                relating to the use of the Services shall not exceed the amount
                paid by you to us during the twelve (12) months preceding the
                claim.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                10. Indemnification
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                You agree to indemnify, defend, and hold harmless Aspiring
                Engineers and its officers, directors, employees, agents, and
                affiliates from and against any claims, liabilities, damages,
                losses, and expenses arising out of or in any way connected with
                your access to or use of the Services, your violation of these
                Terms, or your violation of any rights of a third party.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                11. Governing Law and Dispute Resolution
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                These Terms shall be governed by and construed in accordance
                with the laws of India. Any dispute arising out of or relating
                to these Terms or the Services shall be subject to the exclusive
                jurisdiction of the courts located in Haldia, West Bengal,
                India.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Before initiating any legal proceedings, you agree to first
                attempt to resolve any dispute through good-faith negotiations
                by contacting us at aspiringengineersofficial@gmail.com.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                12. Termination
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We may terminate or suspend your account and access to the
                Services immediately, without prior notice or liability, for any
                reason, including if you breach these Terms.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Upon termination, your right to use the Services will cease
                immediately. All provisions of these Terms which should survive
                termination shall survive, including ownership provisions,
                warranty disclaimers, and limitations of liability.
              </p>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                13. Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                For any questions about these Terms of Service, please contact
                us:
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
                  <strong>Business Type:</strong> Sole Proprietorship
                </li>
                <li>
                  <strong>Legal Entity Name:</strong> Sourav Suman (Proprietor –
                  Aspiring Engineers)
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5">
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
