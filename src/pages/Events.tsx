import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      name: "EdTech Innovation Summit",
      date: "March 15, 2025",
      location: "Magdeburg",
      description:
        "Join leading educators and innovators to explore the latest trends in educational technology. Network with industry leaders and discover groundbreaking solutions.",
    },
    {
      id: 2,
      name: "Digital Learning Conference",
      date: "April 22, 2025",
      location: "Erfurt",
      description:
        "A comprehensive conference focused on implementing digital solutions in educational institutions. Learn from case studies and best practices.",
    },
    {
      id: 3,
      name: "Future of Education Forum",
      date: "May 10, 2025",
      location: "Berlin",
      description:
        "An interactive forum bringing together policy-makers, educators, and technology providers to discuss the future landscape of education in Germany.",
    },
    {
      id: 4,
      name: "AI in Education Workshop",
      date: "June 5, 2025",
      location: "Hamburg",
      description:
        "Hands-on workshop exploring practical applications of artificial intelligence in teaching and learning. Suitable for educators and tech enthusiasts.",
    },
    {
      id: 5,
      name: "VR Learning Experience Day",
      date: "July 18, 2025",
      location: "Munich",
      description:
        "Experience the latest virtual reality learning environments firsthand. Try cutting-edge VR educational tools and discuss implementation strategies.",
    },
    {
      id: 6,
      name: "EdTech Startup Showcase",
      date: "August 25, 2025",
      location: "Frankfurt",
      description:
        "Watch innovative startups pitch their solutions to educators and investors. Discover emerging technologies and networking opportunities.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with innovators and educators at our upcoming events across Germany
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  name={event.name}
                  date={event.date}
                  location={event.location}
                  description={event.description}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
