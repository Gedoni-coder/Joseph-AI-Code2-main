import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CreateLeadFormProps {
  onSubmit: (data: CreateLeadFormData) => void;
  onCancel: () => void;
}

export interface CreateLeadFormData {
  companyName: string;
  dealDescription: string;
  openingDate: string;
  expectedClose: string;
  pipelineStage: string;
}

const PIPELINE_STAGES = [
  "Outreach Attempted",
  "Lead Contacted",
  "Initial Qualification",
  "Product Demo Booked",
  "Proposal Sent",
  "Negotiation",
  "Decision Pending",
  "Won",
];

export default function CreateLeadForm({
  onSubmit,
  onCancel,
}: CreateLeadFormProps) {
  const [formData, setFormData] = useState<CreateLeadFormData>({
    companyName: "",
    dealDescription: "",
    openingDate: "",
    expectedClose: "",
    pipelineStage: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!formData.dealDescription.trim()) {
      newErrors.dealDescription = "Deal description is required";
    }
    if (!formData.openingDate) {
      newErrors.openingDate = "Opening date is required";
    }
    if (!formData.expectedClose) {
      newErrors.expectedClose = "Expected close date is required";
    }
    if (!formData.pipelineStage) {
      newErrors.pipelineStage = "Pipeline stage is required";
    }

    // Validate that expected close is after opening date
    if (formData.openingDate && formData.expectedClose) {
      const opening = new Date(formData.openingDate);
      const closing = new Date(formData.expectedClose);
      if (closing <= opening) {
        newErrors.expectedClose =
          "Expected close date must be after opening date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          placeholder="Enter company name"
          value={formData.companyName}
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
          className={errors.companyName ? "border-red-500" : ""}
        />
        {errors.companyName && (
          <p className="text-xs text-red-500">{errors.companyName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dealDescription">Deal Description</Label>
        <Textarea
          id="dealDescription"
          placeholder="Describe the deal or service"
          value={formData.dealDescription}
          onChange={(e) =>
            setFormData({ ...formData, dealDescription: e.target.value })
          }
          className={errors.dealDescription ? "border-red-500" : ""}
          rows={3}
        />
        {errors.dealDescription && (
          <p className="text-xs text-red-500">{errors.dealDescription}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="openingDate">Opening Date</Label>
          <Input
            id="openingDate"
            type="date"
            value={formData.openingDate}
            onChange={(e) =>
              setFormData({ ...formData, openingDate: e.target.value })
            }
            className={errors.openingDate ? "border-red-500" : ""}
          />
          {errors.openingDate && (
            <p className="text-xs text-red-500">{errors.openingDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedClose">Expected Close</Label>
          <Input
            id="expectedClose"
            type="date"
            value={formData.expectedClose}
            onChange={(e) =>
              setFormData({ ...formData, expectedClose: e.target.value })
            }
            className={errors.expectedClose ? "border-red-500" : ""}
          />
          {errors.expectedClose && (
            <p className="text-xs text-red-500">{errors.expectedClose}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pipelineStage">Pipeline Stage</Label>
        <Select
          value={formData.pipelineStage}
          onValueChange={(value) =>
            setFormData({ ...formData, pipelineStage: value })
          }
        >
          <SelectTrigger
            id="pipelineStage"
            className={errors.pipelineStage ? "border-red-500" : ""}
          >
            <SelectValue placeholder="Select a pipeline stage" />
          </SelectTrigger>
          <SelectContent>
            {PIPELINE_STAGES.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {stage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.pipelineStage && (
          <p className="text-xs text-red-500">{errors.pipelineStage}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Back
        </Button>
        <Button type="submit" className="flex-1">
          Create Lead
        </Button>
      </div>
    </form>
  );
}
