import { Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#2A2A2A] pt-16 pb-10 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <a href="#" className="text-2xl font-bold inline-block mb-6">
              <span className="text-primary">Tum</span><span className="text-[#F9C846]">ia</span>
            </a>
            <p className="text-white/80 mb-6 max-w-md">
              AI-powered financial empowerment for African startups. Building strong financial habits, achieving growth goals, and becoming scalable, investment-ready businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="text-white" size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="text-white" size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
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
            <a href="mailto:info@tumia.io" className="hover:text-white transition-colors">info@tumia.io</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
