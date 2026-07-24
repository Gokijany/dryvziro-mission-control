import { VehicleDetailView } from "@/features/vehicles/components/VehicleDetailView";

interface VehicleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { id } = await params;
  return <VehicleDetailView vehicleId={id} />;
}