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
import { MOCK_COLLEGES } from "@/lib/mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import axios from "axios";
import { useColleges } from "@/hooks/useColleges";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "@/hooks/useUpdateUser";

type CreatePrincipalPayload = {
  collegeName: string;
  email: string;
  ttcCoordinatorLimit: number;
  creditQuota: number;
};

export default function InstitutionManagementPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("token");

  const { toast } = useToast();
  const [colleges, setColleges] = React.useState(MOCK_COLLEGES);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"add" | "edit">("add");
  const [currentCollege, setCurrentCollege] = React.useState<
    (typeof MOCK_COLLEGES)[0] | null
  >(null);

  const handleOpenModal = (
    type: "add" | "edit",
    college?: typeof currentCollege
  ) => {
    setModalType(type);
    setCurrentCollege(college || null);
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();

  const createPrincipal = useMutation({
    mutationFn: async (data: CreatePrincipalPayload) => {
      const { data: res } = await axios.post(
        `${apiUrl}/api/admin/create-principal`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res;
    },
    onSuccess: (res) => {
      toast({
        title: "Institution Added",
        description: `${res.collegeName} has been successfully saved.`,
      });
      queryClient.invalidateQueries({ queryKey: ["all-colleges"] });
      setIsModalOpen(false);
    },
    onError: () => {
      toast({ title: "Server Error", description: "Please try again later." });
    },
  });

  const updateUser = useUpdateUser();

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);

    const payload: CreatePrincipalPayload = {
      collegeName: fd.get("name") as string,
      email: fd.get("principalEmail") as string,
      ttcCoordinatorLimit: Number(fd.get("ttcLimit")),
      creditQuota: Number(fd.get("creditsAvailable")),
    };

    if (modalType === "edit" && currentCollege?._id) {
      // Invalidate the 'all-colleges' query key dynamically
      updateUser.mutate({
        uid: currentCollege._id,
        data: payload,
        queryKey: ["all-colleges"],
      });
      setIsModalOpen(false);
    } else {
      createPrincipal.mutate(payload);
    }
  };

  /* ---- TOGGLE STATUS ---- */
  const toggleStatusMutation = useMutation({
    mutationFn: async (id: string) => {
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
      queryClient.invalidateQueries({ queryKey: ["all-colleges"] });
    },
    onError: () => toast({ title: "Failed to toggle status" }),
  });

  const handleToggleStatus = (id: string) => toggleStatusMutation.mutate(id);

  const {
    data: collegeData,
    isLoading: collegeLoading,
    error: collegeErroe,
  } = useColleges();

  console.log(collegeData);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Institution Management</CardTitle>
            <CardDescription>
              Add, edit, and manage colleges and their settings.
            </CardDescription>
          </div>
          <Button onClick={() => handleOpenModal("add")}>
            Add New College
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Principal Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collegeData?.map((college) => (
                  <TableRow key={college._id}>
                    <TableCell>{college._id}</TableCell>
                    <TableCell className="font-medium">
                      <Link
                        href={`/dashboard/admin/institutions/${college._id}?role=Super Admin`}
                        className="hover:underline text-primary"
                      >
                        {college.collegeName}
                      </Link>
                    </TableCell>
                    <TableCell>{college.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={college.isActive ? "default" : "destructive"}
                      >
                        {college.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{college.creditQuota}</TableCell>
                    <TableCell className="text-right space-x-2 whitespace-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal("edit", college)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant={
                          college.status === "Active"
                            ? "destructive"
                            : "default"
                        }
                        size="sm"
                        onClick={() => handleToggleStatus(college._id)}
                      >
                        {college.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Add/edit College Modle */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalType === "add" ? "Add New College" : "Edit College"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">College Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={currentCollege?.collegeName}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="principalEmail">Principal Email</Label>
                <Input
                  id="principalEmail"
                  name="principalEmail"
                  type="email"
                  defaultValue={currentCollege?.email}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ttcLimit">TTC Limit</Label>
                  <Input
                    id="ttcLimit"
                    name="ttcLimit"
                    type="number"
                    defaultValue={currentCollege?.ttcCoordinatorLimit}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditsAvailable">Credits Available</Label>
                  <Input
                    id="creditsAvailable"
                    name="creditsAvailable"
                    type="number"
                    defaultValue={currentCollege?.creditQuota}
                    required
                  />
                </div>
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
    </>
  );
}
