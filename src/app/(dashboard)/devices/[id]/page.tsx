import { DeviceDetailView } from "@/features/devices/components/DeviceDetailView";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <DeviceDetailView deviceId={id} />;
}