"use client";

import { use, useState } from "react";
import { Save, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";

// ─── Schema ───────────────────────────────────────────────────────────────────

const editEmployeeSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  personalEmail: z.string().email("Enter a valid email"),
  mobile: z.string().min(10, "Enter a valid mobile number"),
  dob: z.string().min(1, "Date of birth is required"),
  designation: z.string().min(1, "Designation is required"),
  department: z.string().min(1, "Department is required"),
  reportingManager: z.string().min(1, "Reporting manager is required"),
  location: z.string().min(1, "Location is required"),
});

type EditEmployeeValues = z.infer<typeof editEmployeeSchema>;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EditEmployee({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [saved, setSaved] = useState(false);

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<EditEmployeeValues>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      fullName: "Rahul Kumar Sharma",
      personalEmail: "rahul.sharma@gmail.com",
      mobile: "+91 98765 43210",
      dob: "1996-03-15",
      designation: "Senior Software Engineer",
      department: "Engineering",
      reportingManager: "Kavya Reddy",
      location: "Pune",
    },
  });

  const onSubmit = async (_data: EditEmployeeValues) => {
    // TODO: replace with real mutation
    await new Promise((r) => setTimeout(r, 1200));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Page
      title="Edit Employee — Rahul Sharma"
      subtitle="Last edited by Priya Mehta on 12/11/2024"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${resolvedParams.id}` },
        { label: "Edit" },
      ]}
      maxWidth="800px"
      actions={
        <>
          <Button
            variant="outline"
            onClick={() => history.back()}
          >
            Cancel
          </Button>
          <Button
            variant={saved ? "secondary" : "primary"}
            icon={<Save size={16} aria-hidden="true" />}
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          >
            {saved ? "✅ Changes Saved" : "Save Changes"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Warning banner */}
        <div className="flex items-start gap-3 rounded-xl border border-[rgba(255,184,0,0.2)] bg-[rgba(255,184,0,0.05)] p-4">
          <AlertTriangle
            size={18}
            className="mt-0.5 shrink-0 text-[#FFB800]"
            aria-hidden="true"
          />
          <div>
            <div className="mb-1 text-sm font-semibold text-[#FFB800]">
              Note on editing structural fields
            </div>
            <div className="text-[13px] leading-relaxed text-[#8899AA]">
              Changes to Designation, Grade, or Department will trigger an approval workflow and a
              new entry in the employee&apos;s timeline. Salary changes must be done via the Salary
              Revision module.
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <Card padding="md">
          <h3 className="mb-5 text-base font-semibold text-white">Personal Information</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField control={control} name="fullName" label="Full Name *" />
            <FormField control={control} name="personalEmail" label="Personal Email *" inputProps={{ type: "email" }} />
            <FormField control={control} name="mobile" label="Mobile *" inputProps={{ type: "tel" }} />
            <FormField control={control} name="dob" label="Date of Birth" inputProps={{ type: "date" }} />
          </div>
        </Card>

        {/* Job Details */}
        <Card padding="md">
          <h3 className="mb-5 text-base font-semibold text-white">
            Job &amp; Organizational Details
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="border-l-2 border-[#FFB800] pl-3">
              <FormField
                control={control}
                name="designation"
                label="Designation"
                hint="Approval required for title changes"
              />
            </div>
            <FormField control={control} name="department" label="Department" />
            <FormField control={control} name="reportingManager" label="Reporting Manager" />
            <FormField control={control} name="location" label="Location" />
          </div>
        </Card>
      </form>
    </Page>
  );
}
