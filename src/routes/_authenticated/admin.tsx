import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, LogOut, Mail, Phone, RotateCcw, Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminDashboard,
});

type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  product_interest: string | null;
  message: string;
  status: string;
  contacted_at: string | null;
  created_at: string;
};

function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");

  const { data: isAdmin, isLoading: roleLoading } = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return false;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return Boolean(data);
    },
  });

  const { data: inquiries = [], isLoading } = useQuery({
    queryKey: ["inquiries"],
    enabled: isAdmin === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Inquiry[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("inquiries")
        .update({
          status,
          contacted_at: status === "contacted" ? new Date().toISOString() : null,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      toast.success(
        vars.status === "contacted" ? "Marked as contacted" : "Moved back to new",
      );
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const products = useMemo(
    () =>
      Array.from(
        new Set(inquiries.map((i) => i.product_interest).filter(Boolean) as string[]),
      ),
    [inquiries],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inquiries.filter((i) => {
      if (statusFilter !== "all" && i.status !== statusFilter) return false;
      if (productFilter !== "all" && i.product_interest !== productFilter) return false;
      if (!q) return true;
      return [i.name, i.phone, i.email ?? "", i.message]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [inquiries, search, statusFilter, productFilter]);

  const newCount = inquiries.filter((i) => i.status === "new").length;

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (roleLoading) {
    return <p className="px-4 py-16 text-center text-muted-foreground">Loading…</p>;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="font-serif text-2xl">Not authorised</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This account does not have admin access to the enquiry dashboard.
        </p>
        <Button variant="outline" className="mt-6" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Enquiry dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {inquiries.length} total · {newCount} awaiting follow-up
          </p>
        </div>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search name, phone, email or message"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
          </SelectContent>
        </Select>
        <Select value={productFilter} onValueChange={setProductFilter}>
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="Product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All products</SelectItem>
            {products.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 space-y-4">
        {isLoading && <p className="text-sm text-muted-foreground">Loading enquiries…</p>}
        {!isLoading && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">No enquiries match these filters.</p>
        )}
        {filtered.map((inquiry) => (
          <Card key={inquiry.id}>
            <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 pb-3">
              <div>
                <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(inquiry.created_at).toLocaleString("en-IN")}
                  {inquiry.product_interest ? ` · ${inquiry.product_interest}` : ""}
                </p>
              </div>
              <Badge variant={inquiry.status === "contacted" ? "secondary" : "default"}>
                {inquiry.status === "contacted" ? "Contacted" : "New"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground/90">{inquiry.message}</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" asChild>
                  <a href={`tel:${inquiry.phone}`}>
                    <Phone className="mr-2 h-4 w-4" /> {inquiry.phone}
                  </a>
                </Button>
                {inquiry.email && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={`mailto:${inquiry.email}`}>
                      <Mail className="mr-2 h-4 w-4" /> {inquiry.email}
                    </a>
                  </Button>
                )}
                {inquiry.status === "contacted" ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={updateStatus.isPending}
                    onClick={() =>
                      updateStatus.mutate({ id: inquiry.id, status: "new" })
                    }
                  >
                    <RotateCcw className="mr-2 h-4 w-4" /> Mark as new
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    disabled={updateStatus.isPending}
                    onClick={() =>
                      updateStatus.mutate({ id: inquiry.id, status: "contacted" })
                    }
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as contacted
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
