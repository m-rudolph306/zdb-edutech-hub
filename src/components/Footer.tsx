import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#1A202C] text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About ZDB Innovation Area</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/innovations" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t("nav.innovations")}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t("nav.events")}
                </Link>
              </li>
              <li>
                <Link to="/apply" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t("nav.howToApply")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contact")}</h3>
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

        {/* Sponsors Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <p className="text-sm text-gray-400 text-center mb-6">
            Innovation Area 2026 is made possible by our sponsors
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {/* Cancom - Main Sponsor */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 rounded-lg px-8 py-4 flex items-center justify-center min-w-[160px]">
                <span className="text-white font-bold text-lg">CANCOM</span>
              </div>
              <span className="text-xs text-gray-500 mt-2">Main Sponsor</span>
            </div>
            {/* Inventorio - Sponsor */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 rounded-lg px-6 py-3 flex items-center justify-center min-w-[140px]">
                <span className="text-white font-semibold">Inventorio</span>
              </div>
              <span className="text-xs text-gray-500 mt-2">Sponsor</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ZDB Innovation Area. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
