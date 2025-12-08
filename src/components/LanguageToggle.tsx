import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center border border-border rounded-md overflow-hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("de")}
        className={`px-3 py-1 h-8 rounded-none text-xs font-semibold transition-colors ${
          language === "de"
            ? "bg-primary text-primary-foreground hover:bg-primary"
            : "hover:bg-accent"
        }`}
      >
        DE
      </Button>
      <div className="w-px h-4 bg-border" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 h-8 rounded-none text-xs font-semibold transition-colors ${
          language === "en"
            ? "bg-primary text-primary-foreground hover:bg-primary"
            : "hover:bg-accent"
        }`}
      >
        EN
      </Button>
    </div>
  );
};

export default LanguageToggle;
