import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  pixelBasedPreset,
} from "@react-email/components";
import type { ReactNode } from "react";

interface EmailLayoutProps {
  preview: string;
  children: ReactNode;
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                brand: {
                  navy: "#020617",
                  slate: "#0f172a",
                  blue: "#1d4ed8",
                  amber: "#fbbf24",
                  muted: "#64748b",
                  surface: "#f8fafc",
                },
              },
            },
          },
        }}
      >
        <Head />
        <Preview>{preview}</Preview>
        <Body className="m-0 bg-brand-surface font-sans">
          <Container className="mx-auto my-8 max-w-[600px] border border-solid border-slate-200 bg-white">
            <Section className="border-none border-b border-solid border-slate-800 bg-brand-navy px-8 py-7">
              <Text className="m-0 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                Tec Electrical
              </Text>
              <Text className="m-0 mt-2 text-2xl font-black uppercase leading-tight text-white">
                Precision electrical services
              </Text>
              <Text className="m-0 mt-3 text-sm text-slate-300">
                Leicester and surrounding areas
              </Text>
            </Section>
            <Section className="px-8 py-8">{children}</Section>
            <Hr className="mx-8 w-auto border-none border-t border-solid border-slate-200" />
            <Section className="px-8 pb-8 pt-4">
              <Text className="m-0 text-xs leading-5 text-brand-muted">
                Tec Electrical · Domestic and commercial electrical services
              </Text>
              <Text className="m-0 mt-2 text-xs leading-5 text-brand-muted">
                <a href="mailto:info@tecservicesltd.com" className="text-brand-blue no-underline">
                  info@tecservicesltd.com
                </a>
                {" · "}
                <a href="https://tec.dotwall.co.uk" className="text-brand-blue no-underline">
                  tec.dotwall.co.uk
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
