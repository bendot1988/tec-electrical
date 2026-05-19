import { Heading, Text } from "@react-email/components";
import { DetailRow } from "./components/DetailRow";
import { EmailLayout } from "./components/EmailLayout";

export interface ContactConfirmationProps {
  name: string;
  service?: string;
  message: string;
}

export default function ContactConfirmation({ name, service, message }: ContactConfirmationProps) {
  const firstName = name.trim().split(/\s+/)[0] || name;

  return (
    <EmailLayout preview="Thanks for contacting Tec Electrical">
      <Text className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-amber-600">
        Enquiry received
      </Text>
      <Heading className="m-0 mt-3 text-2xl font-black uppercase leading-tight text-slate-900">
        Thanks, {firstName}
      </Heading>
      <Text className="m-0 mt-4 text-sm leading-6 text-slate-600">
        We have received your message and will review it shortly. A member of the Tec Electrical
        team will get back to you, usually within one working day.
      </Text>
      <Text className="m-0 mt-4 text-sm leading-6 text-slate-600">
        If your enquiry is urgent, call us and mention your website submission.
      </Text>

      <Text className="m-0 mb-2 mt-8 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        Your submission
      </Text>
      {service ? <DetailRow label="Service" value={service} /> : null}
      <DetailRow label="Message" value={message} />

      <Text className="m-0 mt-6 text-sm leading-6 text-slate-600">
        Tec Electrical · Leicester and surrounding areas
      </Text>
    </EmailLayout>
  );
}

ContactConfirmation.PreviewProps = {
  name: "Alex Morgan",
  service: "Fault finding",
  message:
    "We have intermittent power loss in the kitchen circuit. Looking for diagnosis and repair this week if possible.",
} satisfies ContactConfirmationProps;
