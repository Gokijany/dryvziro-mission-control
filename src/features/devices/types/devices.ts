export type DeviceStatus =
  | "PROVISIONED"
  | "PAIRED"
  | "ACTIVE"
  | "OFFLINE"
  | "DECOMMISSIONED";

export interface DeviceCertificateInput {
  cert_serial: string;
  cert_fingerprint: string;
  cert_pem: string;
  cert_expires_at: string;
}

export interface DeviceCreateRequest {
  organization_id: string;
  device_serial: string;
  firmware_version?: string;
  certificate: DeviceCertificateInput;
}

export interface DeviceAssignmentRequest {
  vehicle_id: string | null;
  reason?: string;
}

export interface DeviceResponse {
  id: string;
  organization_id: string;
  vehicle_id: string | null;
  device_serial: string;
  firmware_version: string | null;
  status: DeviceStatus;
  last_seen_at: string | null;

  cert_serial: string | null;
  cert_fingerprint: string | null;
  cert_issued_at: string | null;
  cert_expires_at: string | null;
  cert_revoked_at: string | null;

  // optional future expansion
  vehicle?: {
    id: string;
    license_plate: string;
    make?: string;
    model?: string;
  } | null;

  organization?: {
    id: string;
    name: string;
  };
}


export interface DeviceAssignmentResponse {
  device_id: string;
  vehicle_id: string | null;
  status: DeviceStatus;
  assigned_at: string | null;
  unassigned_at: string | null;
  reason: string | null;
}