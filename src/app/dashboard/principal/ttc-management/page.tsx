"use client";

import * as React from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_CREDIT_REQUESTS,
  MOCK_TTCS,
  MOCK_INNOVATORS,
  MOCK_IDEAS,
  STATUS_COLORS,
} from "@/lib/mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lightbulb } from "lucide-react";
import { useTtcRequests } from "@/hooks/useTtcRequests";
import { useInnovators } from "@/hooks/useInnovators";
import { useAllInnovators } from "@/hooks/useAllInnovators";
import { useTtcs } from "@/hooks/useTtcs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "@/hooks/useUpdateUser";

/* ----------  TYPES  ---------- */
interface Ttc {
  _id: string;
  name: string;
  email: string;
  expertise: string[];
  status: "Active" | "Inactive";
  collegeId: string;
  isActive: boolean;
}

interface Innovator {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  ttcId: string;
  isActive: boolean;
}

/* ----------  HELPERS  ---------- */
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => localStorage.getItem("token");
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

/* ----------  MAIN COMPONENT  ---------- */
export default function TTCManagementPage() {
  const { toast } = useToast();

  /* state */

  // const [requests, setRequests] = React.useState(MOCK_CREDIT_REQUESTS);
  const [modalType, setModalType] = React.useState<"add" | "edit">("add");
  const [currentTtc, setCurrentTtc] = React.useState<Ttc | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = React.useState(false);
  const [isInnovatorModalOpen, setIsInnovatorModalOpen] = React.useState(false);
  const [selectedTtcForInnovators, setSelectedTtcForInnovators] =
    React.useState<Ttc | null>(null);

  const { data: requests = [], isLoading: loadingTtcRequest } =
    useTtcRequests();

  const { data: innovators = [], isLoading: loadingInoovators } =
    useAllInnovators();

  const token = getToken();
  const collegeId = React.useMemo(() => {
    if (!token) return "";
    try {
      return JSON.parse(atob(token.split(".")[1])).uid;
    } catch {
      return "";
    }
  }, [token]);

  const { data: ttcs = [], isLoading: loadingTtcs } = useTtcs(collegeId);

  /* derived */
  const pendingTTCRequests = requests.filter(
    (r: any) => r.status === "pending"
  );

  const innovatorsByTtc = React.useMemo(() => {
    const map: Record<string, typeof innovators> = {};
    for (const innovator of innovators) {
      const key = innovator.createdBy;
      (map[key] ??= []).push(innovator);
    }
    return map;
  }, [innovators]);

  /* handlers */
  const handleOpenModal = (type: "add" | "edit", ttc?: Ttc) => {
    setModalType(type);
    setCurrentTtc(ttc || null);
    setIsModalOpen(true);
  };

  // const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const form = new FormData(e.currentTarget);
  //   const name = form.get("name") as string;
  //   const email = form.get("email") as string;
  //   const expertise = (form.get("expertise") as string)
  //     .split(",")
  //     .map((s) => s.trim());

  //   try {
  //     const token = getToken();
  //     if (!token) return;
  //     const { uid } = JSON.parse(atob(token.split(".")[1]));
  //     if (modalType === "add") {
  //       await axios.post(
  //         `${apiUrl}/api/principal/create-coordinator`,
  //         { name, email, expertise: expertise.join(",") },
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  //     } else if (currentTtc) {
  //       await axios.put(
  //         `${apiUrl}/api/users/${currentTtc._id}`,
  //         { name, email, expertise },
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  //     }
  //     toast({ title: `TTC ${modalType === "add" ? "Added" : "Updated"}` });
  //     setIsModalOpen(false);
  //   } catch (err: any) {
  //     toast({
  //       title: "Error",
  //       description: err?.response?.data?.error || "Unexpected error",
  //     });
  //   }
  // };

  // const handleToggleStatus = async (id: string) => {
  //   try {
  //     const token = getToken();
  //     if (!token) return;
  //     const ttc = ttcs.find((t) => t._id === id);
  //     if (!ttc) return;
  //     const newStatus = ttc.status === "Active" ? "Inactive" : "Active";
  //     await axios.put(
  //       `${apiUrl}/api/users/${id}/toggle-active`,
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     toast({ title: "Status Updated" });
  //   } catch (err) {
  //     toast({ title: "Failed to toggle status" });
  //   }
  // };

  const queryClient = useQueryClient();

  /* ---- ADD / EDIT TTC ---- */
  const saveTtcMutation = useMutation({
    mutationFn: async (payload: {
      id?: string; // undefined ⇒ “add”
      name: string;
      email: string;
      expertise: string[];
    }) => {
      const token = getToken();
      if (!token) throw new Error("No token");
      const body = {
        name: payload.name,
        email: payload.email,
        expertise: payload.expertise.join(","),
      };
      if (!payload.id) {
        // add
        return axios.post(`${apiUrl}/api/principal/create-coordinator`, body, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      // edit
      return axios.put(`${apiUrl}/api/users/${payload.id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    // inside saveTtcMutation & toggleStatusMutation
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-ttcs", collegeId] });
    },
    onError: (err: any) =>
      toast({
        title: "Error",
        description: err?.response?.data?.error || "Unexpected error",
      }),
  });
  const updateUser = useUpdateUser();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      expertise: (form.get("expertise") as string)
        .split(",")
        .map((s) => s.trim()),
    };

    if (modalType === "edit" && currentTtc?._id) {
      updateUser.mutate({
        uid: currentTtc._id,
        data: payload,
        queryKey: ["all-ttcs", collegeId],
      });
    } else {
      // This was missing
      saveTtcMutation.mutate(payload);
    }

    setIsModalOpen(false);
  };

  /* ---- TOGGLE STATUS ---- */
  const toggleStatusMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = getToken();
      if (!token) throw new Error("No token");
      return axios.put(
        `${apiUrl}/api/users/${id}/toggle-active`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    // inside saveTtcMutation & toggleStatusMutation
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-ttcs", collegeId] });
    },
    onError: () => toast({ title: "Failed to toggle status" }),
  });

  const handleToggleStatus = (id: string) => toggleStatusMutation.mutate(id);

  const decideRequestMutation = useMutation({
    mutationFn: async ({
      requestId,
      action,
    }: {
      requestId: string;
      action: "approved" | "rejected";
    }) => {
      const token = getToken();
      if (!token) throw new Error("No token");
      return axios.put(
        `${apiUrl}/api/credits/college/incoming-requests/${requestId}/decide`,
        { decision: action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast({ title: "Request updated" });
      // refresh the pending-requests list
      queryClient.invalidateQueries({ queryKey: ["ttc-credit-requests"] });
    },
    onError: (err: any) =>
      toast({
        title: "Error",
        description: err?.response?.data?.error || "Unexpected error",
      }),
  });

  const handleRequestAction = (
    requestId: string,
    action: "approved" | "rejected"
  ) => decideRequestMutation.mutate({ requestId, action });

  const handleTtcClick = (ttc: Ttc) => {
    setSelectedTtcForInnovators(ttc);
    setIsInnovatorModalOpen(true);
  };

  const getIdeasForInnovator = (email: string) =>
    MOCK_IDEAS.filter((idea) => idea.innovatorEmail === email);

  /* render */
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>TTC Management</CardTitle>
            <CardDescription>Add, edit, and manage TTCs.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsRequestsModalOpen(true)}
              disabled={pendingTTCRequests.length === 0}
            >
              Pending Requests{" "}
              <Badge className="ml-2">{pendingTTCRequests.length}</Badge>
            </Button>
            <Button onClick={() => handleOpenModal("add")}>Add New TTC</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Expertise</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ttcs.map((ttc) => (
                <TableRow key={ttc._id}>
                  <TableCell>{ttc._id}</TableCell>
                  <TableCell className="font-medium">{ttc.name}</TableCell>
                  <TableCell>{ttc.email}</TableCell>
                  <TableCell>{ttc.expertise.join(", ")}</TableCell>
                  <TableCell>
                    <Badge variant={ttc.isActive ? "default" : "destructive"}>
                      {ttc.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenModal("edit", ttc)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant={ttc.isActive ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleToggleStatus(ttc._id)}
                    >
                      {ttc.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button size="sm" onClick={() => handleTtcClick(ttc)}>
                      View Innovators
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add / Edit TTC */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalType === "add" ? "Add New TTC" : "Edit TTC"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={currentTtc?.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={currentTtc?.email}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expertise">Expertise (comma-separated)</Label>
                <Input
                  id="expertise"
                  name="expertise"
                  defaultValue={currentTtc?.expertise.join(", ")}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Pending Requests */}
      <Dialog open={isRequestsModalOpen} onOpenChange={setIsRequestsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Pending TTC Credit Requests</DialogTitle>
            <DialogDescription>
              Approve or reject credit requests from your TTCs.
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requester</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingTTCRequests.map((req) => (
                <TableRow key={req._id}>
                  <TableCell>{req._id}</TableCell>
                  <TableCell>{req.amount}</TableCell>
                  <TableCell>{req.createdAt}</TableCell>
                  <TableCell>{req.reason}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm">Approve</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Approve Request?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Approve this request for {req.amount} credits?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleRequestAction(req._id, "approved")
                            }
                          >
                            Yes, Approve
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Reject
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reject Request?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleRequestAction(req._id, "rejected")
                            }
                          >
                            Yes, Reject
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Innovators under selected TTC */}
      <Dialog
        open={isInnovatorModalOpen}
        onOpenChange={setIsInnovatorModalOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Innovators under {selectedTtcForInnovators?.name}
            </DialogTitle>
            <DialogDescription>
              List of innovators managed by this TTC.
            </DialogDescription>
          </DialogHeader>
          {innovatorsByTtc[selectedTtcForInnovators?._id || ""]?.length ? (
            <Accordion type="single" collapsible className="w-full">
              {innovatorsByTtc[selectedTtcForInnovators._id].map((inv) => {
                const ideas = getIdeasForInnovator(inv.email);
                return (
                  <AccordionItem value={inv._id} key={inv._id}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 text-xs">
                            <AvatarImage
                              src={`https://avatar.vercel.sh/${encodeURIComponent(
                                inv.name
                              )}.png`}
                            />
                            <AvatarFallback>
                              {getInitials(inv.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {inv.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Lightbulb className="h-3 w-3" />
                            {ideas.length}
                          </Badge>
                          <Badge
                            variant={inv.isActive ? "default" : "destructive"}
                          >
                            {inv.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {ideas.length ? (
                        <ul className="space-y-1 pl-8 pr-4">
                          {ideas.map((idea) => (
                            <li
                              key={idea.id}
                              className="text-xs flex justify-between items-center"
                            >
                              <span>- {idea.title}</span>
                              <Badge className={STATUS_COLORS[idea.status]}>
                                {idea.status}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-muted-foreground pl-8">
                          No ideas submitted.
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No innovators assigned to this TTC.
            </p>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
