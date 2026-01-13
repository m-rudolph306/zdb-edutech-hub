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
import { Search, Eye, FileText, Check, X, Clock } from "lucide-react";

interface Application {
  id: string;
  event: string;
  innovationName: string;
  companyName: string;
  email: string;
  submittedAt: string;
  status: "submitted" | "under-review" | "selected" | "rejected";
  description?: string;
}

const AdminApplications = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchQuery, statusFilter, eventFilter]);

  const loadApplications = () => {
    const loadedApps: Application[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("application_IA-")) {
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        loadedApps.push({
          id: data.id || key.replace("application_", ""),
          event: data.event || "Unknown",
          innovationName: data.innovationName || "Unknown",
          companyName: data.companyName || "Unknown",
          email: data.email || "Unknown",
          submittedAt: data.submittedAt || new Date().toISOString(),
          status: data.status || "submitted",
          description: data.description,
        });
      }
    }
    loadedApps.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    setApplications(loadedApps);
  };

  const filterApplications = () => {
    let filtered = [...applications];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.innovationName.toLowerCase().includes(query) ||
          a.companyName.toLowerCase().includes(query) ||
          a.email.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    if (eventFilter !== "all") {
      filtered = filtered.filter((a) => a.event === eventFilter);
    }

    setFilteredApplications(filtered);
  };

  const updateApplicationStatus = (id: string, newStatus: Application["status"]) => {
    const key = `application_${id}`;
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    data.status = newStatus;
    localStorage.setItem(key, JSON.stringify(data));

    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );

    toast({
      title: t("admin.applications.statusUpdated"),
      description: t("admin.applications.statusUpdatedDescription"),
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "submitted":
        return <Badge variant="secondary">{t("admin.applications.status.submitted")}</Badge>;
      case "under-review":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{t("admin.applications.status.underReview")}</Badge>;
      case "selected":
        return <Badge className="bg-green-500 hover:bg-green-600">{t("admin.applications.status.selected")}</Badge>;
      case "rejected":
        return <Badge variant="destructive">{t("admin.applications.status.rejected")}</Badge>;
    }
  };

  const uniqueEvents = [...new Set(applications.map((a) => a.event))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("admin.applications.title")}</h1>
        <p className="text-muted-foreground">{t("admin.applications.subtitle")}</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("admin.applications.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("admin.applications.filterStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("admin.applications.allStatuses")}</SelectItem>
                <SelectItem value="submitted">{t("admin.applications.status.submitted")}</SelectItem>
                <SelectItem value="under-review">{t("admin.applications.status.underReview")}</SelectItem>
                <SelectItem value="selected">{t("admin.applications.status.selected")}</SelectItem>
                <SelectItem value="rejected">{t("admin.applications.status.rejected")}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={t("admin.applications.filterEvent")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("admin.applications.allEvents")}</SelectItem>
                {uniqueEvents.map((event) => (
                  <SelectItem key={event} value={event}>
                    {event}
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
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t("admin.applications.noApplications")}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.applications.table.innovation")}</TableHead>
                  <TableHead>{t("admin.applications.table.company")}</TableHead>
                  <TableHead>{t("admin.applications.table.event")}</TableHead>
                  <TableHead>{t("admin.applications.table.date")}</TableHead>
                  <TableHead>{t("admin.applications.table.status")}</TableHead>
                  <TableHead className="text-right">{t("admin.applications.table.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.innovationName}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{app.companyName}</p>
                        <p className="text-xs text-muted-foreground">{app.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{app.event}</TableCell>
                    <TableCell>{formatDate(app.submittedAt)}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedApp(app);
                            setDetailOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {app.status === "submitted" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                            onClick={() => updateApplicationStatus(app.id, "under-review")}
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        )}
                        {(app.status === "submitted" || app.status === "under-review") && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-700 hover:bg-green-100"
                              onClick={() => updateApplicationStatus(app.id, "selected")}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-100"
                              onClick={() => updateApplicationStatus(app.id, "rejected")}
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
            <DialogTitle>{t("admin.applications.detail.title")}</DialogTitle>
            <DialogDescription>{t("admin.applications.detail.subtitle")}</DialogDescription>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.applications.table.innovation")}</p>
                  <p className="font-medium">{selectedApp.innovationName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.applications.table.company")}</p>
                  <p className="font-medium">{selectedApp.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedApp.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.applications.table.event")}</p>
                  <p className="font-medium">{selectedApp.event}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.applications.table.status")}</p>
                  <div className="mt-1">{getStatusBadge(selectedApp.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.applications.table.date")}</p>
                  <p className="font-medium">{formatDate(selectedApp.submittedAt)}</p>
                </div>
              </div>
              {selectedApp.description && (
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.applications.detail.description")}</p>
                  <p className="mt-1">{selectedApp.description}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4 border-t">
                <Select
                  value={selectedApp.status}
                  onValueChange={(value) => {
                    updateApplicationStatus(selectedApp.id, value as Application["status"]);
                    setSelectedApp({ ...selectedApp, status: value as Application["status"] });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="submitted">{t("admin.applications.status.submitted")}</SelectItem>
                    <SelectItem value="under-review">{t("admin.applications.status.underReview")}</SelectItem>
                    <SelectItem value="selected">{t("admin.applications.status.selected")}</SelectItem>
                    <SelectItem value="rejected">{t("admin.applications.status.rejected")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminApplications;
