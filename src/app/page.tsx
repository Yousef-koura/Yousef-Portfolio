import { PortalArchive } from "@/components/home/PortalArchive";

/* No page-level metadata: the root layout's title.default already renders
   "Yousef Koura — Machine Learning Engineer" — an explicit title here would
   be run through the layout template and double-suffix the name. */
export default function Home() {
  return (
    <PortalArchive />
  );
}
