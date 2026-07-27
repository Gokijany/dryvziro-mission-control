"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2 } from "lucide-react";

import { Modal } from "@/components/shared/Modal";
import { FormErrorBanner } from "@/components/shared/FormErrorBanner";

import {
  createOrganizationSchema,
  type CreateOrganizationFormValues,
} from "@/features/organizations/schemas/createOrganization.schema";

import { useCreateOrganization } from "@/features/organizations/hooks/useOrganizations";


interface CreateOrganizationModalProps {
  open: boolean;
  onClose: () => void;
}


const ORGANIZATION_TYPES = [
  {
    value: "sacco",
    label: "SACCO",
  },
  {
    value: "napta",
    label: "NAPTA",
  },
  {
    value: "government",
    label: "Government",
  },
];



export function CreateOrganizationModal({
  open,
  onClose,
}: CreateOrganizationModalProps) {


  const createOrganization = useCreateOrganization();


  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<CreateOrganizationFormValues>({

    resolver: zodResolver(createOrganizationSchema),

    defaultValues: {
      name: "",
      registration_number: "",
      org_type: "sacco",
    },

  });



  const onSubmit = (
    values: CreateOrganizationFormValues,
  ) => {

    createOrganization.mutate(
      values,
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      },
    );

  };



  const handleClose = () => {

    reset();

    createOrganization.reset();

    onClose();

  };



  return (

    <Modal
      open={open}
      onClose={handleClose}
      title="Create Organization"
      description="Register a new organization in the platform."
    >


      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >


        {createOrganization.isError && (

          <FormErrorBanner>

            <div className="flex items-center gap-2">

              <AlertTriangle className="h-4 w-4" />

              <span>
                Failed to create organization. Please try again.
              </span>

            </div>

          </FormErrorBanner>

        )}



        <div>

          <label
            htmlFor="name"
            className="text-[12px] font-medium text-foreground"
          >
            Organization Name
          </label>


          <input

            id="name"

            {...register("name")}

            placeholder="Example SACCO"

            className="
              mt-1.5
              w-full
              rounded-lg
              border
              border-input
              bg-background
              px-3
              py-2
              text-[13px]
              text-foreground
              outline-none
              focus:border-primary/50
            "

          />


          {errors.name && (

            <p className="mt-1 text-[11px] text-destructive">

              {errors.name.message}

            </p>

          )}

        </div>




        <div>

          <label
            htmlFor="registration_number"
            className="text-[12px] font-medium text-foreground"
          >
            Registration Number
          </label>


          <input

            id="registration_number"

            {...register("registration_number")}

            placeholder="REG-001"

            className="
              mt-1.5
              w-full
              rounded-lg
              border
              border-input
              bg-background
              px-3
              py-2
              text-[13px]
              text-foreground
              outline-none
              focus:border-primary/50
            "

          />


          {errors.registration_number && (

            <p className="mt-1 text-[11px] text-destructive">

              {errors.registration_number.message}

            </p>

          )}

        </div>




        <div>

          <label
            htmlFor="org_type"
            className="text-[12px] font-medium text-foreground"
          >
            Organization Type
          </label>


          <select

            id="org_type"

            {...register("org_type")}

            className="
              mt-1.5
              w-full
              rounded-lg
              border
              border-input
              bg-background
              px-3
              py-2
              text-[13px]
              text-foreground
              outline-none
              focus:border-primary/50
            "

          >

            {ORGANIZATION_TYPES.map((type) => (

              <option
                key={type.value}
                value={type.value}
              >

                {type.label}

              </option>

            ))}


          </select>


          {errors.org_type && (

            <p className="mt-1 text-[11px] text-destructive">

              {errors.org_type.message}

            </p>

          )}

        </div>




        <div className="flex items-center justify-end gap-2 pt-2">


          <button

            type="button"

            onClick={handleClose}

            disabled={createOrganization.isPending}

            className="
              rounded-lg
              px-3.5
              py-2
              text-[13px]
              font-medium
              text-muted-foreground
              hover:text-foreground
              disabled:opacity-50
            "

          >

            Cancel

          </button>




          <button

            type="submit"

            disabled={createOrganization.isPending}

            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-primary
              px-4
              py-2
              text-[13px]
              font-semibold
              text-primary-foreground
              hover:opacity-90
              disabled:opacity-60
            "

          >

            {createOrganization.isPending && (

              <Loader2 className="h-4 w-4 animate-spin" />

            )}


            {createOrganization.isPending
              ? "Creating..."
              : "Create Organization"
            }


          </button>


        </div>


      </form>


    </Modal>

  );

}



export default CreateOrganizationModal;