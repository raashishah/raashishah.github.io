import { DetailProvider } from "@/components/DetailProvider";
import { SimpleHome } from "@/components/SimpleHome";
import { getHomeContent } from "@/lib/home-content";

export default function HomePage() {
  return (
    <DetailProvider>
      <SimpleHome {...getHomeContent()} />
    </DetailProvider>
  );
}
