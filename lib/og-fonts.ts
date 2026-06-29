const INTER_REGULAR_URL =
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf";
const INTER_MEDIUM_URL =
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf";

export async function getOgInterFonts() {
  const [regular, medium] = await Promise.all([
    fetch(INTER_REGULAR_URL).then((response) => response.arrayBuffer()),
    fetch(INTER_MEDIUM_URL).then((response) => response.arrayBuffer()),
  ]);

  return [
    { name: "Inter", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "Inter", data: medium, style: "normal" as const, weight: 500 as const },
  ];
}
