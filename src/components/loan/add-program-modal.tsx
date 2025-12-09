import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Star, Check } from "lucide-react";
import { type LoanUpdate } from "@/lib/loan-data";

interface AddProgramModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availablePrograms: LoanUpdate[];
  selectedPrograms: string[];
  onAddPrograms: (programs: string[]) => void;
}

export function AddProgramModal({
  open,
  onOpenChange,
  availablePrograms,
  selectedPrograms,
  onAddPrograms,
}: AddProgramModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNew, setSelectedNew] = useState<string[]>(selectedPrograms);

  // Extract unique program names from updates
  const uniquePrograms = Array.from(
    new Map(
      availablePrograms
        .flatMap((update) =>
          update.affectedPrograms.map((prog) => [
            prog,
            {
              name: prog,
              type: update.type,
              urgency: update.urgency,
              impact: update.impact,
            },
          ]),
        )
        .entries(),
    ).values(),
  );

  const filteredPrograms = uniquePrograms.filter((program) =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleToggle = (programName: string) => {
    setSelectedNew((prev) =>
      prev.includes(programName)
        ? prev.filter((p) => p !== programName)
        : [...prev, programName],
    );
  };

  const handleAdd = () => {
    onAddPrograms(selectedNew);
    onOpenChange(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "new-program":
        return "bg-green-100 text-green-800";
      case "rate-change":
        return "bg-blue-100 text-blue-800";
      case "deadline":
        return "bg-red-100 text-red-800";
      case "policy-update":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "new-program":
        return "New";
      case "rate-change":
        return "Rate Change";
      case "deadline":
        return "Deadline";
      case "policy-update":
        return "Policy";
      default:
        return type;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const newlyAdded = selectedNew.filter((p) => !selectedPrograms.includes(p));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Programs to Watchlist</DialogTitle>
          <DialogDescription>
            Select funding programs from recent updates to track and receive
            alerts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {uniquePrograms.length}
                </div>
                <div className="text-sm text-gray-600">Available Programs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedNew.length}
                </div>
                <div className="text-sm text-gray-600">Selected</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {newlyAdded.length}
                </div>
                <div className="text-sm text-gray-600">New Programs</div>
              </CardContent>
            </Card>
          </div>

          {/* Programs List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => {
                const isSelected = selectedNew.includes(program.name);
                const isNew = !selectedPrograms.includes(program.name);

                return (
                  <div
                    key={program.name}
                    onClick={() => handleToggle(program.name)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleToggle(program.name)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="font-semibold text-gray-900">
                              {program.name}
                            </p>
                            {isNew && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                New
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 flex-wrap">
                            <Badge
                              className={`text-xs ${getTypeColor(program.type)}`}
                            >
                              {getTypeLabel(program.type)}
                            </Badge>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(program.urgency)}`}
                            >
                              {program.urgency} priority
                            </span>
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="flex-shrink-0 ml-4">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No programs found matching "{searchTerm}"
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Try a different search term
                </p>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">💡 Tip:</span> Adding programs to
              your watchlist lets you track updates specific to those funding
              sources.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t">
          <Button
            onClick={() => {
              setSelectedNew(selectedPrograms);
              onOpenChange(false);
            }}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={selectedNew.length === 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            Add{" "}
            {newlyAdded.length > 0
              ? `${newlyAdded.length} Programs`
              : "Programs"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
