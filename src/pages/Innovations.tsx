import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InnovationCard from "@/components/InnovationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { innovations } from "@/data/innovations";

const Innovations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [technologyFilter, setTechnologyFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredInnovations = innovations.filter((innovation) => {
    const matchesSearch =
      innovation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      innovation.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || innovation.categories.includes(categoryFilter);

    const matchesRegion =
      regionFilter === "All" || innovation.region === regionFilter;

    const matchesTechnology =
      technologyFilter === "All" || innovation.technology === technologyFilter;

    return matchesSearch && matchesCategory && matchesRegion && matchesTechnology;
  });

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
    setRegionFilter("All");
    setTechnologyFilter("All");
  };

  const handleInnovationClick = (id: number) => {
    console.log("Innovation clicked:", id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Education Innovations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse curated solutions from leading EdTech companies
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="bg-background py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search innovations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="AI">AI</SelectItem>
                    <SelectItem value="VR">VR</SelectItem>
                    <SelectItem value="Assessment">Assessment</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Content Creation">Content Creation</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Regions</SelectItem>
                    <SelectItem value="National">National</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={technologyFilter} onValueChange={setTechnologyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Technology" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Technologies</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Hardware">Hardware</SelectItem>
                    <SelectItem value="Platform">Platform</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Cards Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Results Count */}
            {!isLoading && (
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredInnovations.length} innovation{filteredInnovations.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-card rounded-lg shadow-md overflow-hidden">
                    <Skeleton className="w-full h-48" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <div className="flex gap-2 mb-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredInnovations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground mb-4">
                  No innovations found. Try adjusting your filters.
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredInnovations.map((innovation) => (
                    <InnovationCard
                      key={innovation.id}
                      name={innovation.name}
                      description={innovation.description}
                      categories={innovation.categories}
                      event={innovation.event}
                      onClick={() => handleInnovationClick(innovation.id)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="default" size="sm">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Innovations;
