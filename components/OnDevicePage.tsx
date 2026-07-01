import { ProjectPage } from "@/components/ProjectPage";
import { ondeviceContent } from "@/content/ondevice";

export function OnDevicePage() {
  return (
    <ProjectPage
      {...ondeviceContent}
      pageLabel="About OnDevice"
    />
  );
}
