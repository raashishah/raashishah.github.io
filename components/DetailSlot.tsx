type DetailSlotProps = {
  path: "/expression" | "/ondevice";
};

/** Marker rendered in the @detail intercept slot; routing state comes from pathname. */
export function DetailSlot({ path }: DetailSlotProps) {
  return <span hidden aria-hidden="true" data-detail-slot={path} />;
}
