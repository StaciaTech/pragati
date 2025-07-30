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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_CREDIT_REQUESTS, MOCK_TTCS } from "@/lib/mock-data";
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
import axios from "axios";

export default function TTCManagementPage() {
  interface TtcCoordinator {
    _id: string;
    collegeId: string;
    createdAt: string;
    createdBy: string;
    creditQuota: number;
    email: string;
    expertise: string[];
    isActive: boolean;
    isDeleted: boolean;
    name: string;
    role: string;
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("token");
  const { toast } = useToast();
  const [ttcs, setTtcs] = React.useState<TtcCoordinator[]>([]);
  const [requests, setRequests] = React.useState(MOCK_CREDIT_REQUESTS);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"add" | "edit">("add");
  const [currentTtc, setCurrentTtc] = React.useState<(typeof ttcs)[0] | null>(
    null
  );

  const [isRequestsModalOpen, setIsRequestsModalOpen] = React.useState(false);
  const pendingTTCRequests = requests.filter(
    (req) => req.requesterType === "TTC" && req.status === "Pending"
  );

  const handleOpenModal = (type: "add" | "edit", ttc?: (typeof ttcs)[0]) => {
    setModalType(type);
    setCurrentTtc(ttc || null);
    setIsModalOpen(true);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const expertise = formData.get("expertise") as string;
    try {
      const res = await axios.post(
        `${apiUrl}/api/principal/create-coordinator`,
        { name, email, expertise },
        { headers: { Authorization: `Bearer ${token}` } } // <— include super-admin JWT
      );
      console.log(res.data);

      toast({
        title: "TTC coordinator Added",
        description: `${name} has been successfully saved.`,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Server Error",
        description: "Please try again later.",
      });
    }
    toast({
      title: `TTC ${modalType === "add" ? "Added" : "Updated"}`,
      description: `${name} has been successfully saved.`,
    });
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    setTtcs((prev) =>
      prev.map((ttc) =>
        ttc._id === id
          ? ({
              ...ttc,
              status: ttc.isActive ? "Inactive" : "Active",
            } as any)
          : ttc
      )
    );
    toast({
      title: "Status Updated",
      description: "TTC status has been toggled.",
    });
  };

  const handleRequestAction = (
    requestId: string,
    action: "Approved" | "Rejected"
  ) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: action } : req
      )
    );
    toast({
      title: `Request ${action}`,
      description: `The credit request has been ${action.toLowerCase()}.`,
    });
  };

  const fetchAllttcs = async () => {
    try {
      const { uid } = JSON.parse(atob(token.split(".")[1]));
      const res = await axios.get(`${apiUrl}/api/users?college_id=${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.docs);
      setTtcs(res.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchAllttcs();
  }, [token, apiUrl]);
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>TTC Management</CardTitle>
            <CardDescription>
              Add, edit, and manage TTCs for your college.
            </CardDescription>
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
                <TableRow key={ttc?._id}>
                  <TableCell>{ttc?._id}</TableCell>
                  <TableCell className="font-medium">{ttc?.name}</TableCell>
                  <TableCell>{ttc?.email}</TableCell>
                  <TableCell>
                    {ttc.expertise.map((e, i) => (
                      <span key={i}>{e}</span>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Badge variant={ttc?.isActive ? "default" : "destructive"}>
                      {ttc?.isActive ? "Active" : "Inactive"}
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
                      variant={ttc?.isActive ? "destructive" : "default"}
                      size="sm"
                      // onClick={() => handleToggleStatus(ttc._id)}
                    >
                      {ttc?.isActive ? "Deactivate" : "Activate"}
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
              {modalType === "add" ? "Add New TTC" : "Edit TTC"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">TTC Name</Label>
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
                <TableRow key={req.id}>
                  <TableCell>{req.requesterName}</TableCell>
                  <TableCell>{req.amount}</TableCell>
                  <TableCell>{req.date}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {req.purpose}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm">Approve</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Approve Request?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to approve this request for{" "}
                            {req.amount} credits?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleRequestAction(req.id, "Approved")
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
                              handleRequestAction(req.id, "Rejected")
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
