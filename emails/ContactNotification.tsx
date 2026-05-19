import { Heading, Link, Text } from "@react-email/components";
import { DetailRow } from "./components/DetailRow";
import { EmailLayout } from "./components/EmailLayout";

export interface ContactNotificationProps {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  submittedAt: string;
}

export default function ContactNotification({
  name,
  email,
  phone,
  service,
  message,
  submittedAt,
}: ContactNotificationProps) {
  return (
    <EmailLayout preview={`New enquiry from ${name}`}>
      <Text className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
        New website enquiry
      </Text>
      <Heading className="m-0 mt-3 text-2xl font-black uppercase leading-tight text-slate-900">
        {name} requested a quote
      </Heading>
      <Text className="m-0 mt-3 text-sm leading-6 text-slate-600">
        Submitted {submittedAt}. Reply directly to this email to reach the customer at{" "}
        <Link href={`mailto:${email}`} className="text-blue-700 no-underline">
          {email}
        </Link>
        .
      </Text>

      <DetailRow label="Name" value={name} />
      <DetailRow label="Email" value={email} />
      {phone ? <DetailRow label="Phone" value={phone} /> : null}
      {service ? <DetailRow label="Service" value={service} /> : null}
      <DetailRow label="Message" value={message} />
    </EmailLayout>
  );
}

ContactNotification.PreviewProps = {
  name: "Alex Morgan",
  email: "alex@example.com",
  phone: "+44 7700 900123",
  service: "Fault finding",
  message:
    "We have intermittent power loss in the kitchen circuit. Looking for diagnosis and repair this week if possible.",
  submittedAt: "Tuesday 19 May 2026, 10:30",
} satisfies ContactNotificationProps;
