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
import axios from "axios";

interface CollegeAdmin {
  _id: string;
  email: string;
  collegeName: string;
  ttcCoordinatorLimit: number;
  creditQuota: number; // ← match backend
  isActive: boolean;
}

export default function InstitutionManagementPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("token");
  const [collegeData, setCollegeData] = React.useState<CollegeAdmin[]>([]);

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

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const collegeName = formData.get("name") as string;
    const email = formData.get("principalEmail") as string;
    const ttcCoordinatorLimit = Number(formData.get("ttcLimit"));
    const creditQuota = Number(formData.get("creditsAvailable"));

    try {
      const res = await axios.post(
        `${apiUrl}/api/admin/create-principal`,
        { collegeName, email, ttcCoordinatorLimit, creditQuota },
        { headers: { Authorization: `Bearer ${token}` } } // <— include super-admin JWT
      );
      console.log(res.data);
      setCollegeData([
        ...collegeData,
        {
          _id: Date.now().toString(),
          collegeName,
          email,
          ttcCoordinatorLimit,
          creditQuota,
          isActive: true,
        },
      ]);
      toast({
        title: "Institution Added",
        description: `${collegeName} has been successfully saved.`,
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
      title: `Institution ${modalType === "add" ? "Added" : "Updated"}`,
      description: `${name} has been successfully saved.`,
    });
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.id === id
          ? ({
              ...college,
              status: college.status === "Active" ? "Inactive" : "Active",
            } as any)
          : college
      )
    );
    toast({
      title: "Status Updated",
      description: "College status has been toggled.",
    });
  };

  const fetchColleges = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/users?role=college_admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setCollegeData(res.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchColleges();
  }, [apiUrl, token]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
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
                <TableRow key={college?._id}>
                  <TableCell>{college?._id}</TableCell>
                  <TableCell className="font-medium">
                    {college?.collegeName}
                  </TableCell>
                  <TableCell>{college?.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={college?.isActive ? "default" : "destructive"}
                    >
                      {college?.isActive ? "Active" : "Disabled"}
                    </Badge>
                  </TableCell>
                  <TableCell>{college.creditQuota ?? 0}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      // onClick={() => handleOpenModal("edit", college)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant={college?.isActive ? "destructive" : "default"}
                      size="sm"
                      // onClick={() => handleToggleStatus(college.id)}
                    >
                      {college.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
                  defaultValue={currentCollege?.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="principalEmail">Principal Email</Label>
                <Input
                  id="principalEmail"
                  name="principalEmail"
                  type="email"
                  defaultValue={currentCollege?.principalEmail}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ttcLimit">TTC Limit</Label>
                  <Input
                    id="ttcLimit"
                    name="ttcLimit"
                    type="number"
                    defaultValue={currentCollege?.ttcLimit}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditsAvailable">Credits Available</Label>
                  <Input
                    id="creditsAvailable"
                    name="creditsAvailable"
                    type="number"
                    defaultValue={currentCollege?.creditsAvailable}
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
