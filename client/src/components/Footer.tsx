import { Twitter, Linkedin, Instagram } from "lucide-react";
import logoImage from "../assets/logo.png";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#2A2A2A] pt-16 pb-10 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <a href="#" className="inline-block mb-6">
              <img src={logoImage} alt="Tumia" className="h-10 filter brightness-0 invert" />
            </a>
            <p className="text-white/80 mb-6 max-w-md">
              Connecting Funding to Impact - The Financial Accountability Platform for Africa's Innovation Ecosystem.
              Build strong financial habits, achieve meaningful outcomes, and demonstrate the real-world impact of your funding.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/usetumia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="text-white" size={18} />
              </a>
              <a href="https://www.linkedin.com/company/106854509/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="text-white" size={18} />
              </a>
              <a href="https://www.instagram.com/usetumia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="text-white" size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/20 text-center md:text-left md:flex md:justify-between md:items-center">
          <div className="text-white/60 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tumia. All rights reserved.
          </div>
          <div className="text-white/60">
            <a href="mailto:team@tumia.app" className="hover:text-white transition-colors">team@tumia.app</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
