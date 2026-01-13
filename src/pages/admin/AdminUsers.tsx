import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Search, Check, X, Eye, Users } from "lucide-react";

interface SignupRequest {
  id: string;
  email: string;
  companyName: string;
  contactPerson: string;
  website: string;
  shortDescription: string;
  role: "innovator" | "politician" | "admin";
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

const AdminUsers = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [requests, setRequests] = useState<SignupRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<SignupRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<SignupRequest | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, searchQuery, statusFilter, roleFilter]);

  const loadRequests = () => {
    const data = JSON.parse(localStorage.getItem("signupRequests") || "[]");
    setRequests(data);
  };

  const filterRequests = () => {
    let filtered = [...requests];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.email.toLowerCase().includes(query) ||
          r.companyName.toLowerCase().includes(query) ||
          r.contactPerson.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((r) => r.role === roleFilter);
    }

    // Sort by date, newest first
    filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    setFilteredRequests(filtered);
  };

  const updateRequestStatus = (id: string, newStatus: "approved" | "rejected") => {
    const updatedRequests = requests.map((r) =>
      r.id === id ? { ...r, status: newStatus } : r
    );

    localStorage.setItem("signupRequests", JSON.stringify(updatedRequests));
    setRequests(updatedRequests);

    toast({
      title: newStatus === "approved" ? t("admin.users.approved") : t("admin.users.rejected"),
      description:
        newStatus === "approved"
          ? t("admin.users.approvedDescription")
          : t("admin.users.rejectedDescription"),
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: SignupRequest["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">{t("admin.users.status.pending")}</Badge>;
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">{t("admin.users.status.approved")}</Badge>;
      case "rejected":
        return <Badge variant="destructive">{t("admin.users.status.rejected")}</Badge>;
    }
  };

  const getRoleBadge = (role: SignupRequest["role"]) => {
    const colors: Record<string, string> = {
      innovator: "bg-secondary text-secondary-foreground",
      politician: "bg-amber-500 text-white",
      admin: "bg-primary text-primary-foreground",
    };
    const labels: Record<string, string> = {
      innovator: t("admin.users.role.innovator"),
      politician: t("admin.users.role.politician"),
      admin: t("admin.users.role.admin"),
    };
    return <Badge className={colors[role]}>{labels[role]}</Badge>;
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t("admin.users.title")}</h1>
          <p className="text-muted-foreground">{t("admin.users.subtitle")}</p>
        </div>
        {pendingCount > 0 && (
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {pendingCount} {t("admin.users.pendingReview")}
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
                placeholder={t("admin.users.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("admin.users.filterStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("admin.users.allStatuses")}</SelectItem>
                <SelectItem value="pending">{t("admin.users.status.pending")}</SelectItem>
                <SelectItem value="approved">{t("admin.users.status.approved")}</SelectItem>
                <SelectItem value="rejected">{t("admin.users.status.rejected")}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("admin.users.filterRole")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("admin.users.allRoles")}</SelectItem>
                <SelectItem value="innovator">{t("admin.users.role.innovator")}</SelectItem>
                <SelectItem value="politician">{t("admin.users.role.politician")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t("admin.users.noRequests")}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.users.table.company")}</TableHead>
                  <TableHead>{t("admin.users.table.contact")}</TableHead>
                  <TableHead>{t("admin.users.table.role")}</TableHead>
                  <TableHead>{t("admin.users.table.date")}</TableHead>
                  <TableHead>{t("admin.users.table.status")}</TableHead>
                  <TableHead className="text-right">{t("admin.users.table.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.companyName}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{request.contactPerson}</p>
                        <p className="text-xs text-muted-foreground">{request.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(request.role)}</TableCell>
                    <TableCell>{formatDate(request.submittedAt)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedRequest(request);
                            setDetailOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {request.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-700 hover:bg-green-100"
                              onClick={() => updateRequestStatus(request.id, "approved")}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-100"
                              onClick={() => updateRequestStatus(request.id, "rejected")}
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
            <DialogTitle>{t("admin.users.detail.title")}</DialogTitle>
            <DialogDescription>{t("admin.users.detail.subtitle")}</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.users.table.company")}</p>
                  <p className="font-medium">{selectedRequest.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.users.table.contact")}</p>
                  <p className="font-medium">{selectedRequest.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <p className="font-medium">{selectedRequest.website || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.users.table.role")}</p>
                  <div className="mt-1">{getRoleBadge(selectedRequest.role)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("admin.users.table.status")}</p>
                  <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("admin.users.detail.description")}</p>
                <p className="mt-1">{selectedRequest.shortDescription}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("admin.users.detail.submittedAt")}</p>
                <p className="font-medium">{formatDate(selectedRequest.submittedAt)}</p>
              </div>
              {selectedRequest.status === "pending" && (
                <div className="flex gap-4 pt-4 border-t">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      updateRequestStatus(selectedRequest.id, "approved");
                      setDetailOpen(false);
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {t("admin.users.approve")}
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      updateRequestStatus(selectedRequest.id, "rejected");
                      setDetailOpen(false);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    {t("admin.users.reject")}
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

export default AdminUsers;
