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
import { Search, Eye, Truck, Calendar, MapPin, Building2 } from "lucide-react";

interface RoadshowInquiry {
  id: string;
  organizationType: string;
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  expectedAttendees: string;
  eventType: string;
  focusAreas: string[];
  specialRequirements: string;
  budgetRange: string;
  howDidYouHear: string;
  status: "new" | "in-discussion" | "confirmed" | "completed" | "declined";
  submittedAt: string;
}

const AdminRoadshow = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<RoadshowInquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<RoadshowInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<RoadshowInquiry | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    loadInquiries();
  }, []);

  useEffect(() => {
    filterInquiries();
  }, [inquiries, searchQuery, statusFilter]);

  const loadInquiries = () => {
    const loadedInquiries: RoadshowInquiry[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("roadshow_RW-")) {
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        loadedInquiries.push({
          id: data.id || key.replace("roadshow_", ""),
          organizationType: data.organizationType || "",
          organizationName: data.organizationName || "",
          contactName: data.contactName || "",
          email: data.email || "",
          phone: data.phone || "",
          eventName: data.eventName || "",
          eventDate: data.eventDate || "",
          eventLocation: data.eventLocation || "",
          expectedAttendees: data.expectedAttendees || "",
          eventType: data.eventType || "",
          focusAreas: data.focusAreas || [],
          specialRequirements: data.specialRequirements || "",
          budgetRange: data.budgetRange || "",
          howDidYouHear: data.howDidYouHear || "",
          status: data.status || "new",
          submittedAt: data.submittedAt || new Date().toISOString(),
        });
      }
    }
    loadedInquiries.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    setInquiries(loadedInquiries);
  };

  const filterInquiries = () => {
    let filtered = [...inquiries];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.organizationName.toLowerCase().includes(query) ||
          i.eventName.toLowerCase().includes(query) ||
          i.contactName.toLowerCase().includes(query) ||
          i.email.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((i) => i.status === statusFilter);
    }

    setFilteredInquiries(filtered);
  };

  const updateInquiryStatus = (id: string, newStatus: RoadshowInquiry["status"]) => {
    const key = `roadshow_${id}`;
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    data.status = newStatus;
    localStorage.setItem(key, JSON.stringify(data));

    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );

    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }

    toast({
      title: t("admin.roadshow.statusUpdated"),
      description: t("admin.roadshow.statusUpdatedDescription"),
    });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: RoadshowInquiry["status"]) => {
    switch (status) {
      case "new":
        return <Badge variant="secondary">{t("admin.roadshow.status.new")}</Badge>;
      case "in-discussion":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{t("admin.roadshow.status.inDiscussion")}</Badge>;
      case "confirmed":
        return <Badge className="bg-green-500 hover:bg-green-600">{t("admin.roadshow.status.confirmed")}</Badge>;
      case "completed":
        return <Badge className="bg-primary hover:bg-primary/90">{t("admin.roadshow.status.completed")}</Badge>;
      case "declined":
        return <Badge variant="destructive">{t("admin.roadshow.status.declined")}</Badge>;
    }
  };

  const newCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t("admin.roadshow.title")}</h1>
          <p className="text-muted-foreground">{t("admin.roadshow.subtitle")}</p>
        </div>
        {newCount > 0 && (
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {newCount} {t("admin.roadshow.newInquiries")}
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
                placeholder={t("admin.roadshow.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={t("admin.roadshow.filterStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("admin.roadshow.allStatuses")}</SelectItem>
                <SelectItem value="new">{t("admin.roadshow.status.new")}</SelectItem>
                <SelectItem value="in-discussion">{t("admin.roadshow.status.inDiscussion")}</SelectItem>
                <SelectItem value="confirmed">{t("admin.roadshow.status.confirmed")}</SelectItem>
                <SelectItem value="completed">{t("admin.roadshow.status.completed")}</SelectItem>
                <SelectItem value="declined">{t("admin.roadshow.status.declined")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-12">
              <Truck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t("admin.roadshow.noInquiries")}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.roadshow.table.event")}</TableHead>
                  <TableHead>{t("admin.roadshow.table.organization")}</TableHead>
                  <TableHead>{t("admin.roadshow.table.date")}</TableHead>
                  <TableHead>{t("admin.roadshow.table.location")}</TableHead>
                  <TableHead>{t("admin.roadshow.table.submitted")}</TableHead>
                  <TableHead>{t("admin.roadshow.table.status")}</TableHead>
                  <TableHead className="text-right">{t("admin.roadshow.table.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">{inquiry.eventName}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{inquiry.organizationName}</p>
                        <p className="text-xs text-muted-foreground">{inquiry.contactName}</p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(inquiry.eventDate)}</TableCell>
                    <TableCell>{inquiry.eventLocation}</TableCell>
                    <TableCell>{formatDate(inquiry.submittedAt)}</TableCell>
                    <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedInquiry(inquiry);
                          setDetailOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("admin.roadshow.detail.title")}</DialogTitle>
            <DialogDescription>{t("admin.roadshow.detail.subtitle")}</DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-6">
              {/* Status Update */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{t("admin.roadshow.currentStatus")}</p>
                  {getStatusBadge(selectedInquiry.status)}
                </div>
                <Select
                  value={selectedInquiry.status}
                  onValueChange={(value) => updateInquiryStatus(selectedInquiry.id, value as RoadshowInquiry["status"])}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">{t("admin.roadshow.status.new")}</SelectItem>
                    <SelectItem value="in-discussion">{t("admin.roadshow.status.inDiscussion")}</SelectItem>
                    <SelectItem value="confirmed">{t("admin.roadshow.status.confirmed")}</SelectItem>
                    <SelectItem value="completed">{t("admin.roadshow.status.completed")}</SelectItem>
                    <SelectItem value="declined">{t("admin.roadshow.status.declined")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Event Details */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t("admin.roadshow.detail.eventDetails")}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("admin.roadshow.table.event")}</p>
                    <p className="font-medium">{selectedInquiry.eventName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("admin.roadshow.table.date")}</p>
                    <p className="font-medium">{formatDate(selectedInquiry.eventDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("admin.roadshow.table.location")}</p>
                    <p className="font-medium">{selectedInquiry.eventLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("admin.roadshow.detail.eventType")}</p>
                    <p className="font-medium">{selectedInquiry.eventType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("admin.roadshow.detail.expectedAttendees")}</p>
                    <p className="font-medium">{selectedInquiry.expectedAttendees || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("admin.roadshow.detail.budget")}</p>
                    <p className="font-medium">{selectedInquiry.budgetRange || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Organization Details */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {t("admin.roadshow.detail.organizationDetails")}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("admin.roadshow.table.organization")}</p>
                    <p className="font-medium">{selectedInquiry.organizationName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("admin.roadshow.detail.orgType")}</p>
                    <p className="font-medium">{selectedInquiry.organizationType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("admin.roadshow.detail.contact")}</p>
                    <p className="font-medium">{selectedInquiry.contactName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedInquiry.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("admin.roadshow.detail.phone")}</p>
                    <p className="font-medium">{selectedInquiry.phone}</p>
                  </div>
                </div>
              </div>

              {/* Focus Areas */}
              {selectedInquiry.focusAreas.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">{t("admin.roadshow.detail.focusAreas")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInquiry.focusAreas.map((area) => (
                      <Badge key={area} variant="outline">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Requirements */}
              {selectedInquiry.specialRequirements && (
                <div>
                  <h3 className="font-semibold mb-2">{t("admin.roadshow.detail.specialRequirements")}</h3>
                  <p className="text-sm">{selectedInquiry.specialRequirements}</p>
                </div>
              )}

              {/* Metadata */}
              <div className="pt-4 border-t text-sm text-muted-foreground">
                <p>
                  <strong>ID:</strong> {selectedInquiry.id}
                </p>
                <p>
                  <strong>{t("admin.roadshow.table.submitted")}:</strong> {formatDate(selectedInquiry.submittedAt)}
                </p>
                {selectedInquiry.howDidYouHear && (
                  <p>
                    <strong>{t("admin.roadshow.detail.howHeard")}:</strong> {selectedInquiry.howDidYouHear}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRoadshow;
