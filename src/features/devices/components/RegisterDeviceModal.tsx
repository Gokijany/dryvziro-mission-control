"use client";

import { useState } from "react";
import { useRegisterDevice } from "../hooks/useDevices";
import { X, ShieldCheck, Loader2 } from "lucide-react";

interface Props {
  onClose: () => void;
}

export function RegisterDeviceModal({ onClose }: Props) {
  const registerMutation = useRegisterDevice();

  const [orgId, setOrgId] = useState("");
  const [deviceSerial, setDeviceSerial] = useState("");
  const [firmwareVersion, setFirmwareVersion] = useState("v1.0.0");
  const [certSerial, setCertSerial] = useState("");
  const [certFingerprint, setCertFingerprint] = useState("");
  const [certPem, setCertPem] = useState("");
  const [certExpiresAt, setCertExpiresAt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(
      {
        organization_id: orgId,
        device_serial: deviceSerial,
        firmware_version: firmwareVersion || undefined,
        certificate: {
          cert_serial: certSerial,
          cert_fingerprint: certFingerprint,
          cert_pem: certPem,
          cert_expires_at: new Date(certExpiresAt).toISOString(),
        },
      },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-xl border border-border/80 bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" /> Provision New Hardware Device
          </h3>
          <button onClick={onClose} className="text-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold tracking-wider text-foreground uppercase">
                Organization UUID
              </label>
              <input
                type="text"
                required
                placeholder="Org UUID"
                value={orgId}
                onChange={(e) => setOrgId(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-foreground placeholder:text-foreground focus:outline-none focus:border-primary shadow-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-wider text-foreground uppercase">
                Device Serial
              </label>
              <input
                type="text"
                required
                placeholder="e.g. DVIU-00129"
                value={deviceSerial}
                onChange={(e) => setDeviceSerial(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-foreground placeholder:text-foreground focus:outline-none focus:border-primary shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-wider text-foreground uppercase">
              Firmware Version
            </label>
            <input
              type="text"
              placeholder="e.g. v1.2.0"
              value={firmwareVersion}
              onChange={(e) => setFirmwareVersion(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-foreground placeholder:text-foreground focus:outline-none focus:border-primary shadow-sm"
            />
          </div>

          <div className="border-t border-border/40 pt-3">
            <span className="text-xs font-bold text-primary">
              Certificate Identity (Public Only)
            </span>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label className="text-[10px] font-bold tracking-wider text-foreground uppercase">
                  Cert Serial
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cert serial"
                  value={certSerial}
                  onChange={(e) => setCertSerial(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary shadow-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-wider text-foreground uppercase">
                  Expiration Date
                </label>
                <input
                  type="date"
                  required
                  value={certExpiresAt}
                  onChange={(e) => setCertExpiresAt(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary shadow-sm"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-[10px] font-bold tracking-wider text-foreground uppercase">
                Cert SHA-256 Fingerprint
              </label>
              <input
                type="text"
                required
                placeholder="SHA-256 Hex Fingerprint"
                value={certFingerprint}
                onChange={(e) => setCertFingerprint(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary shadow-sm"
              />
            </div>

            <div className="mt-3">
              <label className="text-[10px] font-bold tracking-wider text-foreground uppercase">
                Public Cert PEM
              </label>
              <textarea
                required
                rows={3}
                placeholder="-----BEGIN CERTIFICATE-----..."
                value={certPem}
                onChange={(e) => setCertPem(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border/80 bg-background p-3 text-xs font-mono text-foreground focus:outline-none focus:border-primary shadow-sm"
              />
            </div>
          </div>

          {registerMutation.isError && (
            <p className="text-xs font-semibold text-rose-400">
              {(registerMutation.error as Error).message}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border/80 bg-background px-4 py-2 text-xs font-semibold text-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-xs font-bold text-foreground hover:opacity-90 disabled:opacity-50"
            >
              {registerMutation.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}{" "}
              Provision Hardware
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
