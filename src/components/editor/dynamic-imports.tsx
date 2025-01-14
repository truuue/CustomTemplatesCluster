import dynamic from "next/dynamic";

export const SelectWrapper = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2">
        Chargement...
      </div>
    ),
  }
);

export const DraggableSectionListWrapper = dynamic(
  () =>
    import("./DraggableSectionList").then((mod) => mod.DraggableSectionList),
  {
    ssr: false,
    loading: () => <div className="h-20 animate-pulse rounded-md bg-muted" />,
  }
);
