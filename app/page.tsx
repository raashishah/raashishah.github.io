import { SimpleHome } from "@/components/SimpleHome";
import { getHomeContent } from "@/lib/home-content";

export default function HomePage() {
  return <SimpleHome {...getHomeContent()} />;
}
