const MEASUREMENT_ID = /^G-[A-Z0-9]+$/;

export function getGaMeasurementId(
  value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
): string | undefined {
  const id = value?.trim();
  if (!id || !MEASUREMENT_ID.test(id)) return undefined;
  return id;
}
