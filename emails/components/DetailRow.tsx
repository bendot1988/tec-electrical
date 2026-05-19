import { Section, Text } from "@react-email/components";

interface DetailRowProps {
  label: string;
  value: string;
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <Section className="mb-4 border border-solid border-slate-200 bg-slate-50 px-4 py-3">
      <Text className="m-0 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </Text>
      <Text className="m-0 mt-1 text-sm leading-6 text-slate-900">{value}</Text>
    </Section>
  );
}
