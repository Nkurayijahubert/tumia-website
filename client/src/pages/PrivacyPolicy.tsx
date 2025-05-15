import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="font-sans text-neutral bg-white">
      <Header />
      <main className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold text-[#2A2A2A] mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6 text-[#4A4A4A]">Last Updated: May 15, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">1. Introduction</h2>
            <p className="mb-4 text-[#4A4A4A]">
              At Tumia, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, process, and share your information when you use our platform.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">2. Information We Collect</h2>
            <p className="mb-4 text-[#4A4A4A]">
              We collect information you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mb-6 text-[#4A4A4A]">
              <li>Create an account or fill out forms on our platform</li>
              <li>Subscribe to our newsletter or join our waitlist</li>
              <li>Communicate with our support team</li>
              <li>Use our services to manage your financial data</li>
            </ul>
            <p className="mb-4 text-[#4A4A4A]">
              This information may include your name, email address, phone number, organization name, and role.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">3. How We Use Your Information</h2>
            <p className="mb-4 text-[#4A4A4A]">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-[#4A4A4A]">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and manage your account</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">4. Data Sharing and Disclosure</h2>
            <p className="mb-4 text-[#4A4A4A]">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-6 text-[#4A4A4A]">
              <li>Service providers who perform services on our behalf</li>
              <li>Professional advisors, such as lawyers, auditors, and insurers</li>
              <li>Regulatory authorities, law enforcement agencies, and others as required by law</li>
            </ul>
            <p className="mb-4 text-[#4A4A4A]">
              We will never sell your personal information to third parties for marketing purposes.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">5. Data Security</h2>
            <p className="mb-4 text-[#4A4A4A]">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. We use bank-level encryption, multi-factor authentication, and regular security audits to ensure your data remains secure.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">6. International Transfers</h2>
            <p className="mb-4 text-[#4A4A4A]">
              Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country. We ensure that adequate safeguards are in place to protect your information when it is transferred internationally.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">7. Your Rights</h2>
            <p className="mb-4 text-[#4A4A4A]">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mb-6 text-[#4A4A4A]">
              <li>Access your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data</li>
              <li>Restrict or object to certain processing of your data</li>
              <li>Request a copy of your data in a structured, machine-readable format</li>
            </ul>
            <p className="mb-4 text-[#4A4A4A]">
              To exercise these rights, please contact us at team@tumia.app.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">8. Data Retention</h2>
            <p className="mb-4 text-[#4A4A4A]">
              We retain your personal data for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">9. Children's Privacy</h2>
            <p className="mb-4 text-[#4A4A4A]">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal data from children under 18. If we become aware that we have collected personal data from a child under 18, we will take steps to delete such information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">10. Changes to This Privacy Policy</h2>
            <p className="mb-4 text-[#4A4A4A]">
              We may update this privacy policy from time to time in response to changing legal, technical, or business developments. When we update our privacy policy, we will take appropriate measures to inform you, consistent with the significance of the changes we make.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">11. Contact Us</h2>
            <p className="mb-4 text-[#4A4A4A]">
              If you have any questions about this privacy policy or our data practices, please contact us at:
            </p>
            <p className="mb-4 text-[#4A4A4A]">
              Email: team@tumia.app<br />
              Address: Kigali, Rwanda
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}