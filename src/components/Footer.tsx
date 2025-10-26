import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1A202C] text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About ZDB Innovation Area</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              The ZDB Innovation Area is a platform dedicated to showcasing and
              promoting cutting-edge educational technology solutions across Germany.
              We connect innovators with decision-makers to transform digital education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/innovations" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Innovations
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/how-to-apply" className="text-sm text-gray-300 hover:text-white transition-colors">
                  How to Apply
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm text-gray-300">
              Email:{" "}
              <a
                href="mailto:info@zdb-innovation.de"
                className="hover:text-white transition-colors"
              >
                info@zdb-innovation.de
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ZDB Innovation Area. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
