import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye, Lightbulb, Check, X } from "lucide-react";

interface Innovation {
  id: string;
  name: string;
  description: string;
  categories: string[];
  region: string;
  technology: string;
  website?: string;
  submittedBy: string;
  submittedByEmail: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const AdminInnovations = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [filteredInnovations, setFilteredInnovations] = useState<Innovation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedInnovation, setSelectedInnovation] = useState<Innovation | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    loadInnovations();
  }, []);

  useEffect(() => {
    filterInnovations();
  }, [innovations, searchQuery, statusFilter, categoryFilter]);

  const loadInnovations = () => {
    const loadedInnovations: Innovation[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("innovation_INV-")) {
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        loadedInnovations.push({
          id: data.id || key.replace("innovation_", ""),
          name: data.name || "Unknown",
          description: data.description || "",
          categories: data.categories || [],
          region: data.region || "",
          technology: data.technology || "",
          website: data.website,
          submittedBy: data.submittedBy || "",
          submittedByEmail: data.submittedByEmail || "",
          status: data.status || "pending",
          createdAt: data.createdAt || new Date().toISOString(),
        });
      }
    }
    loadedInnovations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setInnovations(loadedInnovations);
  };

  const filterInnovations = () => {
    let filtered = [...innovations];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.name.toLowerCase().includes(query) ||
          i.description.toLowerCase().includes(query) ||
          i.submittedByEmail.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((i) => i.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((i) => i.categories.includes(categoryFilter));
    }

    setFilteredInnovations(filtered);
  };

  const updateInnovationStatus = (id: string, newStatus: Innovation["status"]) => {
    const key = `innovation_${id}`;
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    data.status = newStatus;
    localStorage.setItem(key, JSON.stringify(data));

    setInnovations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );

    toast({
      title: newStatus === "approved" ? t("admin.innovations.approved") : t("admin.innovations.rejected"),
      description: t("admin.innovations.statusUpdatedDescription"),
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: Innovation["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">{t("admin.innovations.status.pending")}</Badge>;
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">{t("admin.innovations.status.approved")}</Badge>;
      case "rejected":
        return <Badge variant="destructive">{t("admin.innovations.status.rejected")}</Badge>;
    }
  };

  const allCategories = ["AI", "VR", "Assessment", "Management", "Content Creation"];
  const pendingCount = innovations.filter((i) => i.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t("admin.innovations.title")}</h1>
          <p className="text-muted-foreground">{t("admin.innovations.subtitle")}</p>
        </div>
        {pendingCount > 0 && (
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {pendingCount} {t("admin.innovations.pendingReview")}
          </Badge>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("admin.innovations.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("admin.innovations.filterStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("admin.innovations.allStatuses")}</SelectItem>
                <SelectItem value="pending">{t("admin.innovations.status.pending")}</SelectItem>
                <SelectItem value="approved">{t("admin.innovations.status.approved")}</SelectItem>
                <SelectItem value="rejected">{t("admin.innovations.status.rejected")}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("admin.innovations.filterCategory")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("admin.innovations.allCategories")}</SelectItem>
                {allCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          {filteredInnovations.length === 0 ? (
            <div className="text-center py-12">
              <Lightbulb className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t("admin.innovations.noInnovations")}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.innovations.table.name")}</TableHead>
                  <TableHead>{t("admin.innovations.table.categories")}</TableHead>
                  <TableHead>{t("admin.innovations.table.region")}</TableHead>
                  <TableHead>{t("admin.innovations.table.submittedBy")}</TableHead>
                  <TableHead>{t("admin.innovations.table.date")}</TableHead>
                  <TableHead>{t("admin.innovations.table.status")}</TableHead>
                  <TableHead className="text-right">{t("admin.innovations.table.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInnovations.map((innovation) => (
                  <TableRow key={innovation.id}>
                    <TableCell className="font-medium">{innovation.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {innovation.categories.slice(0, 2).map((cat) => (
                          <Badge key={cat} variant="outline" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                        {innovation.categories.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{innovation.categories.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{innovation.region}</TableCell>
                    <TableCell>
                      <p className="text-xs text-muted-foreground">{innovation.submittedByEmail}</p>
                    </TableCell>
                    <TableCell>{formatDate(innovation.createdAt)}</TableCell>
                    <TableCell>{getStatusBadge(innovation.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedInnovation(innovation);
                            setDetailOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {innovation.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-700 hover:bg-green-100"
                              onClick={() => updateInnovationStatus(innovation.id, "approved")}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-100"
                              onClick={() => updateInnovationStatus(innovation.id, "rejected")}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("admin.innovations.detail.title")}</DialogTitle>
            <DialogDescription>{t("admin.innovations.detail.subtitle")}</DialogDescription>
          </DialogHeader>
          {selectedInnovation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.innovations.table.name")}</p>
                  <p className="font-medium">{selectedInnovation.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.innovations.table.status")}</p>
                  <div className="mt-1">{getStatusBadge(selectedInnovation.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.innovations.table.region")}</p>
                  <p className="font-medium">{selectedInnovation.region}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.innovations.detail.technology")}</p>
                  <p className="font-medium">{selectedInnovation.technology}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">{t("admin.innovations.table.categories")}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedInnovation.categories.map((cat) => (
                      <Badge key={cat} variant="outline">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("admin.innovations.detail.description")}</p>
                <p className="mt-1">{selectedInnovation.description}</p>
              </div>
              {selectedInnovation.website && (
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <a
                    href={selectedInnovation.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {selectedInnovation.website}
                  </a>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">{t("admin.innovations.table.submittedBy")}</p>
                <p className="font-medium">{selectedInnovation.submittedByEmail}</p>
                <p className="text-xs text-muted-foreground">{formatDate(selectedInnovation.createdAt)}</p>
              </div>
              {selectedInnovation.status === "pending" && (
                <div className="flex gap-4 pt-4 border-t">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      updateInnovationStatus(selectedInnovation.id, "approved");
                      setSelectedInnovation({ ...selectedInnovation, status: "approved" });
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {t("admin.innovations.approve")}
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      updateInnovationStatus(selectedInnovation.id, "rejected");
                      setSelectedInnovation({ ...selectedInnovation, status: "rejected" });
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    {t("admin.innovations.reject")}
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInnovations;
