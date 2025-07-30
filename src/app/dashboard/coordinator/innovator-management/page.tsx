"use client";

import * as React from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MOCK_INNOVATORS,
  MOCK_TTCS,
  MOCK_COLLEGES,
  STATUS_COLORS,
  MOCK_CREDIT_REQUESTS,
} from "@/lib/mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
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
import axios from "axios";
import { useInnovators } from "@/hooks/useInnovators";
import { useCreditRequests } from "@/hooks/useCreditRequests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function InnovatorManagementPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("token");

  interface Innovator {
    _id: string;
    email: string;
    password: string; // or Buffer/BSON.Binary if you handle binary
    role: "innovator";
    name: string;
    collegeId: string;
    ttcCoordinatorId: string;
    createdAt: string; // ISO date string
    createdBy: string;
    isActive: boolean;
    isDeleted: boolean;
    creditQuota: number;
  }

  interface CreditRequest {
    _id: string;
    amount: number;
    createdAt: string; // ISO date string
    createdBy: string;
    reason: string;
    from: string;
    innovatorEmail: string;
    innovatorName: string;
    status: string;
  }

  const { data: innovators = [], isLoading: loadingInnovators } =
    useInnovators();
  const { data: requests = [], isLoading: loadingRequests } =
    useCreditRequests();
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const userTTC = MOCK_TTCS[0];
  const college = MOCK_COLLEGES.find((c) => c.id === userTTC.collegeId);

  // const [innovators, setInnovators] = React.useState<Innovator[]>([]);
  // const [requests, setRequests] = React.useState<CreditRequest[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"add" | "assign">("add");
  const [currentInnovator, setCurrentInnovator] = React.useState<
    (typeof innovators)[0] | null
  >(null);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = React.useState(false);

  const collegeInnovators = innovators.filter(
    (inv) => inv.collegeId === userTTC.collegeId
  );
  const pendingInnovatorRequests = requests.filter(
    (req) => req.status.toLowerCase() === "pending"
  );

  const handleOpenModal = (
    type: "add" | "assign",
    innovator?: (typeof innovators)[0]
  ) => {
    setModalType(type);
    setCurrentInnovator(innovator || null);
    setIsModalOpen(true);
  };

  const addInnovatorMutation = useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      const { data } = await axios.post(
        `${apiUrl}/api/coordinator/create-innovator`,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["innovators"] });
    },
  });

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;

    if (modalType !== "add") return; // TODO: handle "assign" later

    try {
      await addInnovatorMutation.mutateAsync({ name, email });
      toast({
        title: "Innovator Added",
        description: `${name} has been added.`,
      });
      setIsModalOpen(false);
    } catch (err: any) {
      toast({
        title: "Server Error",
        description: err?.response?.data?.error || "Please try again later.",
      });
    }
  };

  //   const handleToggleStatus = (id: string) => {
  //     setInnovators((prev) =>
  //       prev.map((inv) =>
  //         inv.id === id
  //           ? { ...inv, status: inv.status === "Active" ? "Inactive" : "Active" }
  //           : inv
  //       )
  //     );
  //     toast({
  //       title: "Status Updated",
  //       description: "Innovator status has been toggled.",
  //     });
  //   };

  // const [pendingInnovatorRequests, setPendingInnovatorRequests] =
  //   React.useState<CreditRequest[]>([]);

  const decideRequestMutation = useMutation({
    mutationFn: async ({
      requestId,
      action,
    }: {
      requestId: string;
      action: "approved" | "rejected";
    }) =>
      axios.put(
        `${apiUrl}/api/credits/ttc/incoming-requests/${requestId}/decide`,
        { decision: action },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ttc-credit-requests"] });
      queryClient.invalidateQueries({ queryKey: ["innovators"] });
    },
  });
  const handleRequestAction = async (
    requestId: string,
    action: "approved" | "rejected"
  ) => {
    try {
      await decideRequestMutation.mutateAsync({ requestId, action });
      toast({
        title: `Request ${action}`,
        description: `The credit request has been ${action.toLowerCase()}.`,
      });
    } catch (err: any) {
      toast({
        title: "Error Occured",
        description: err?.response?.data?.error || "Try after some time.",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Innovator Management</CardTitle>
            <CardDescription>
              Add, edit, and manage innovators for {college?.name}.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsRequestsModalOpen(true)}
              disabled={pendingInnovatorRequests.length === 0}
            >
              Pending Requests{" "}
              <Badge className="ml-2">{pendingInnovatorRequests.length}</Badge>
            </Button>
            <Button onClick={() => handleOpenModal("add")}>
              Add Innovator
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {innovators.map((innovator) => (
                <TableRow key={innovator._id}>
                  <TableCell>{innovator._id}</TableCell>
                  <TableCell className="font-medium">
                    {innovator.name}
                  </TableCell>
                  <TableCell>{innovator.email}</TableCell>
                  <TableCell>{innovator.creditQuota}</TableCell>
                  <TableCell>
                    <Badge
                      variant={innovator?.isActive ? "default" : "destructive"}
                    >
                      {innovator?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      //   onClick={() => handleOpenModal("assign", innovator)}
                    >
                      Assign Credits
                    </Button>
                    <Button
                      variant={innovator.isActive ? "destructive" : "default"}
                      size="sm"
                      //   onClick={() => handleToggleStatus(innovator?._id)}
                    >
                      {innovator?.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalType === "add"
                ? "Add New Innovator"
                : `Assign Credits to ${currentInnovator?.name}`}
            </DialogTitle>
            <DialogDescription>
              {modalType === "add"
                ? "Enter the details for the new innovator."
                : `College has ${college?.creditsAvailable} credits available.`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              {modalType === "add" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Innovator Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Innovator Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="credits">Credits to Assign</Label>
                  <Input
                    id="credits"
                    name="credits"
                    type="number"
                    min="1"
                    max={college?.creditsAvailable}
                    required
                  />
                </div>
              )}
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

      <Dialog open={isRequestsModalOpen} onOpenChange={setIsRequestsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Pending Innovator Credit Requests</DialogTitle>
            <DialogDescription>
              Approve or reject credit requests from your innovators.
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
              {pendingInnovatorRequests.map((req) => (
                <TableRow key={req._id}>
                  <TableCell>{req.innovatorName}</TableCell>
                  <TableCell>{req.amount}</TableCell>
                  <TableCell>{req.createdAt}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {req.reason}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm">Approve</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Approve Request?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to approve this request for{" "}
                              {req.amount} credits?
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
                              Are you sure you want to reject this request? This
                              action cannot be undone.
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
