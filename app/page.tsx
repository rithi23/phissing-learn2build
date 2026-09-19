import { CommunityReviews } from "@/components/home/CommunityReviews";
import { Cta } from "@/components/home/Cta";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { Mission } from "@/components/home/Mission";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
      <FeaturedProjects />
      <CommunityReviews />
      <UpcomingEvents />
      <Cta />
    </>
  );
}
