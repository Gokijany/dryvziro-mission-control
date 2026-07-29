"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

import { Header } from "@/components/shared/Header";
import { useOrganizations } from "@/features/organizations/hooks/useOrganizations";

import { OrganizationTable } from "@/features/organizations/components/OrganizationTable";
import { CreateOrganizationModal } from "@/features/organizations/components/CreateOrganizationModal";

export function OrganizationsView() {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useOrganizations();


  const organizations = (data ?? []).filter((organization) =>
    organization.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (
    <div className="flex flex-1 flex-col">

      <Header
        title="Organizations"
        searchPlaceholder="Search organizations..."
        onSearchChange={setSearch}
      />


      <div className="flex-1 space-y-5 p-4 sm:p-6">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Organization Directory
            </h1>

            <p className="text-sm text-muted-foreground">
              Manage organizations registered in the platform.
            </p>
          </div>


          <button
            onClick={() => setIsCreateOpen(true)}
            className="
              rounded-lg
              bg-primary
              px-4
              py-2
              text-[13px]
              font-semibold
              text-primary-foreground
              transition-opacity
              hover:opacity-90
            "
          >
            Create Organization
          </button>

        </div>


        <div className="rounded-xl border border-border bg-card">


          {isLoading && (
            <div className="flex items-center justify-center gap-2 p-12 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading organizations...
            </div>
          )}


          {isError && (
            <div className="flex flex-col items-center justify-center gap-2 p-12 text-sm text-destructive">
              <AlertTriangle className="h-5 w-5" />

              {error instanceof Error
                ? error.message
                : "Failed to load organizations."
              }
            </div>
          )}


          {!isLoading && !isError && (
            <OrganizationTable
              organizations={organizations}
            />
          )}

        </div>

      </div>


      <CreateOrganizationModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

    </div>
  );
}