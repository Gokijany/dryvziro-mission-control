import type { Organization } from "@/features/organizations/types/organization";


interface OrganizationTableProps {
  organizations: Organization[];
}


function formatOrganizationType(type: Organization["org_type"]) {
  switch (type) {
    case "sacco":
      return "SACCO";

    case "napta":
      return "NAPTA";

    case "government":
      return "Government";

    default:
      return type;
  }
}


export function OrganizationTable({
  organizations,
}: OrganizationTableProps) {
  return (
    <div className="overflow-x-auto">

      <table className="w-full text-left">

        <thead>
          <tr className="border-b border-border text-[12px] text-muted-foreground">

            <th className="px-4 py-3 font-medium sm:px-6">
              Organization Name
            </th>

            <th className="px-4 py-3 font-medium sm:px-6">
              Registration Number
            </th>

            <th className="px-4 py-3 font-medium sm:px-6">
              Type
            </th>

            <th className="px-4 py-3 font-medium sm:px-6">
              Actions
            </th>

          </tr>
        </thead>


        <tbody>

          {organizations.map((organization) => (

            <tr
              key={organization.id}
              className="
                border-b
                border-border
                transition-colors
                hover:bg-muted/30
              "
            >

              <td className="px-4 py-4 sm:px-6">

                <p className="text-sm font-medium text-foreground">
                  {organization.name}
                </p>

              </td>


              <td className="px-4 py-4 text-sm text-muted-foreground sm:px-6">

                {organization.registration_number || "—"}

              </td>


              <td className="px-4 py-4 sm:px-6">

                <span
                  className="
                    rounded-full
                    bg-primary/10
                    px-2.5
                    py-1
                    text-[11px]
                    font-medium
                    text-primary
                  "
                >
                  {formatOrganizationType(
                    organization.org_type
                  )}
                </span>

              </td>


              <td className="px-4 py-4 sm:px-6">

                <button
                  className="
                    text-[13px]
                    font-medium
                    text-primary
                    transition-opacity
                    hover:opacity-80
                  "
                >
                  View
                </button>

              </td>

            </tr>

          ))}


          {organizations.length === 0 && (

            <tr>

              <td
                colSpan={4}
                className="
                  p-12
                  text-center
                  text-sm
                  text-muted-foreground
                "
              >
                No organizations found.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}


export default OrganizationTable;