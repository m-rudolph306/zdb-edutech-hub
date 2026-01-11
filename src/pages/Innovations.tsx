import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InnovationCard from "@/components/InnovationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { innovations, BUNDESLAENDER } from "@/data/innovations";
import { useLanguage } from "@/contexts/LanguageContext";

const Innovations = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTechnology, setSelectedTechnology] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredInnovations = innovations.filter((innovation) => {
    const matchesSearch =
      searchQuery === "" ||
      innovation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      innovation.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategory === "all" || innovation.categories.includes(selectedCategory);

    const matchesRegion = 
      selectedRegion === "all" || innovation.region === selectedRegion;

    const matchesTechnology = 
      selectedTechnology === "all" || innovation.technology === selectedTechnology;

    return matchesSearch && matchesCategory && matchesRegion && matchesTechnology;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedRegion("all");
    setSelectedTechnology("all");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-12 md:py-16 px-4 md:px-6 mt-[72px]">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-foreground animate-fade-in">
            {t("innovations.title")}
          </h1>

          {/* Search and Filters */}
          <div className="mb-6 md:mb-8 space-y-4">
            {/* Search Bar */}
            <Input
              type="text"
              placeholder={t("innovations.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              aria-label={t("innovations.search")}
            />

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder={t("innovations.allCategories")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("innovations.allCategories")}</SelectItem>
                  <SelectItem value="AI">AI</SelectItem>
                  <SelectItem value="VR">VR</SelectItem>
                  <SelectItem value="Assessment">Assessment</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Content Creation">Content Creation</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder={t("innovations.allRegions")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("innovations.allRegions")}</SelectItem>
                  {BUNDESLAENDER.map((bundesland) => (
                    <SelectItem key={bundesland} value={bundesland}>
                      {bundesland}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTechnology} onValueChange={setSelectedTechnology}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder={t("innovations.allTechnologies")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("innovations.allTechnologies")}</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Hardware">Hardware</SelectItem>
                  <SelectItem value="Platform">Platform</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full md:w-auto md:ml-auto hover:scale-105 transition-transform"
              >
                {t("innovations.clearFilters")}
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            {t("innovations.showing")} {filteredInnovations.length} {filteredInnovations.length !== 1 ? t("innovations.innovations") : t("innovations.innovation")}
          </p>

          {/* Innovation Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="h-[400px]">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredInnovations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredInnovations.map((innovation, index) => (
                <div 
                  key={innovation.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <InnovationCard
                    name={innovation.name}
                    description={innovation.description}
                    categories={innovation.categories}
                    event={innovation.event}
                    onClick={() => navigate(`/innovations/${innovation.id}`)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-muted-foreground text-lg mb-4">
                {t("innovations.noResults")}
              </p>
              <Button variant="outline" onClick={clearFilters} className="hover:scale-105 transition-transform">
                {t("innovations.clearFilters")}
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Innovations;
