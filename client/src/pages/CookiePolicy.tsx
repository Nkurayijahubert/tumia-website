import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CookiePolicy() {
  return (
    <div className="font-sans text-neutral bg-white">
      <Header />
      <main className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold text-[#2A2A2A] mb-8">Cookie Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6 text-[#4A4A4A]">Last Updated: May 15, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">1. Introduction</h2>
            <p className="mb-4 text-[#4A4A4A]">
              This Cookie Policy explains how Tumia ("we," "us," or "our") uses cookies and similar technologies on our website and applications. This policy should be read alongside our Privacy Policy, which explains how we use personal information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">2. What Are Cookies?</h2>
            <p className="mb-4 text-[#4A4A4A]">
              Cookies are small text files that are stored on your browser or device by websites, apps, online media, and advertisements. They are used to remember your preferences, maintain your session, and provide us with analytics information about how our Services are used.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">3. Types of Cookies We Use</h2>
            <p className="mb-4 text-[#4A4A4A]">
              We use the following types of cookies:
            </p>
            <ul className="list-disc pl-6 mb-6 text-[#4A4A4A]">
              <li><strong>Essential Cookies:</strong> These cookies are necessary for the functionality of our website. They enable you to navigate our site and use its features, such as accessing secure areas. Without these cookies, our Services may not function properly.</li>
              <li><strong>Performance Cookies:</strong> These cookies collect information about how visitors use our website, such as which pages they visit most often and if they receive error messages. These cookies do not collect information that identifies a visitor—all information is anonymous. We use these cookies to improve how our website works.</li>
              <li><strong>Functionality Cookies:</strong> These cookies allow our website to remember choices you make (such as your user name, language, or region) and provide enhanced, more personal features. These cookies can also be used to remember changes you have made to text size, fonts, and other parts of web pages that you can customize.</li>
              <li><strong>Targeting/Advertising Cookies:</strong> These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and to help measure the effectiveness of advertising campaigns. They are usually placed by advertising networks with our permission.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">4. How We Use Cookies</h2>
            <p className="mb-4 text-[#4A4A4A]">
              We use cookies for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-[#4A4A4A]">
              <li>Authentication and security</li>
              <li>Remembering your preferences and settings</li>
              <li>Analytics to understand how our Services are used</li>
              <li>Improving our Services based on usage data</li>
              <li>Customizing content and advertisements</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">5. Third-Party Cookies</h2>
            <p className="mb-4 text-[#4A4A4A]">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Services, deliver advertisements, and so on. These cookies may track your activities on our website and other websites you visit.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">6. Your Cookie Choices</h2>
            <p className="mb-4 text-[#4A4A4A]">
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary">www.allaboutcookies.org</a>.
            </p>
            <p className="mb-4 text-[#4A4A4A]">
              You can manage your cookie preferences through your browser settings. Each browser works differently, so check your browser's "Help" menu to learn the correct way to modify your cookie settings.
            </p>
            <p className="mb-4 text-[#4A4A4A]">
              Please note that if you choose to disable cookies, some areas of our Services may not function properly.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">7. Do Not Track Signals</h2>
            <p className="mb-4 text-[#4A4A4A]">
              Some browsers may send "Do Not Track" signals to websites they visit. We currently do not respond to "Do Not Track" signals.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">8. Changes to This Cookie Policy</h2>
            <p className="mb-4 text-[#4A4A4A]">
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will become effective when we post the revised Cookie Policy on our website.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#2A2A2A]">9. Contact Us</h2>
            <p className="mb-4 text-[#4A4A4A]">
              If you have any questions about our use of cookies, please contact us at:
            </p>
            <p className="mb-4 text-[#4A4A4A]">
              Email: privacy@tumia.app<br />
              Address: Kigali, Rwanda
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}