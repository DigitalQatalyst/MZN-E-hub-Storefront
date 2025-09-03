"use client";
import DropdownSection from "@component/firmprofile/DropDownSection";

export default function GovernanceCompliance({
  items, expanded, onToggle,
}: {
  items: Array<{ id: number | string; title: string; content: React.ReactNode }>;
  expanded: Record<string | number, boolean>;
  onToggle: (id: number | string) => void;
}) {
  return (
    <>
      {items.map((item) => (
        <DropdownSection
          key={item.id}
          id={item.id}
          title={item.title}
          expanded={!!expanded[item.id]}
          onToggle={onToggle}
        >
          {item.content}
        </DropdownSection>
      ))}
    </>
  );
}
