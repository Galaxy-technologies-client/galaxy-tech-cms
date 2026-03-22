import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/ui/Reveal'

export const metadata = {
  title: 'Privacy Policy - Galaxy Technologies',
  description: 'Privacy Policy for Galaxy Technologies, Kochi.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full bg-lightGrey font-poppins text-text selection:bg-primarySurface selection:text-primaryDark overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col py-xxl px-s md:px-xxxl max-w-container mx-auto w-full">
        <Reveal>
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 lg:p-16 flex flex-col gap-8 w-full max-w-[900px] mx-auto">
            
            <div className="flex flex-col gap-4 border-b border-border pb-8">
              <h1 className="text-h3 md:text-h2 font-semibold text-primaryDarkAlt">
                Privacy Policy
              </h1>
              <p className="text-bodyMedium text-textAlt">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div className="flex flex-col gap-xl text-bodyMedium text-textAlt leading-relaxed">
              
              <section className="flex flex-col gap-4">
                <h2 className="text-h4 font-semibold text-primaryDark">1. Introduction</h2>
                <p>
                  Welcome to <strong>Galaxy Technologies</strong>. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at <strong>galaxyacmarketing@gmail.com</strong>.
                </p>
                <p>
                  When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-h4 font-semibold text-primaryDark">2. Information We Collect</h2>
                <p>
                  <strong>Personal information you disclose to us:</strong> We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, or otherwise contacting us.
                </p>
                <ul className="list-disc pl-6 flex flex-col gap-2">
                  <li><strong>Contact Data:</strong> We collect your name, phone numbers, email addresses, and home/office addresses for installation and servicing requirements.</li>
                  <li><strong>Service Data:</strong> We collect details about your air conditioning units, service history, and related warranty information.</li>
                </ul>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-h4 font-semibold text-primaryDark">3. How We Use Your Information</h2>
                <p>
                  We use personal information collected via our website for a variety of business purposes described below:
                </p>
                <ul className="list-disc pl-6 flex flex-col gap-2">
                  <li><strong>To fulfill and manage your orders:</strong> We may use your information to fulfill and manage your purchases, installations, and AMC servicing operations.</li>
                  <li><strong>To communicate with you:</strong> We use your information to send you updates regarding your service requests, installation delivery times, and responding to your inquiries.</li>
                  <li><strong>To enforce our terms, conditions, and policies:</strong> Ensuring adherence to the terms and warranties defined by manufacturers like Daikin.</li>
                </ul>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-h4 font-semibold text-primaryDark">4. Sharing Your Information</h2>
                <p>
                  We only share and disclose your information in the following situations:
                </p>
                <ul className="list-disc pl-6 flex flex-col gap-2">
                  <li><strong>Compliance with Laws:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                  <li><strong>Third-Party Service Providers:</strong> We may share your data with trusted third-party vendors (such as installation mechanics or manufacturers for warranty claims) who perform services for us or on our behalf.</li>
                </ul>
                <p>
                  We do not sell, rent, or trade your personal information with third parties for promotional purposes.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-h4 font-semibold text-primaryDark">5. Security of Your Information</h2>
                <p>
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our services is at your own risk.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-h4 font-semibold text-primaryDark">6. Changes to This Privacy Policy</h2>
                <p>
                  We may update this privacy policy from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-h4 font-semibold text-primaryDark">7. Contact Us</h2>
                <p>
                  If you have questions or comments about this policy, you may email us at <strong>galaxyacmarketing@gmail.com</strong> or by post to:
                </p>
                <address className="not-italic text-textAlt mt-2 p-4 bg-lightGrey rounded-lg inline-block">
                  <strong>Galaxy Technologies</strong><br />
                  53/2331-D, opp. CKC High School, Ponnurunni, Vyttila<br />
                  Ernakulam, Kerala 682019<br />
                  Phone: +91 9074025365
                </address>
              </section>

            </div>
          </div>
        </Reveal>
      </div>

      <Footer />
    </div>
  )
}
