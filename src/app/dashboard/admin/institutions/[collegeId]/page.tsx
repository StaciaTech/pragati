
'use client';

import * as React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MOCK_COLLEGES, MOCK_INNOVATORS, MOCK_TTCS, MOCK_IDEAS } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { ROLES } from '@/lib/constants';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';

type Ttc = (typeof MOCK_TTCS)[0];

const getInitials = (name: string) => {
    return name?.split(' ').map((n) => n[0]).join('') || '';
};

export default function InstitutionDetailsPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const collegeId = params.collegeId as string;
    const role = searchParams.get('role') || ROLES.SUPER_ADMIN;

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedTtc, setSelectedTtc] = React.useState<Ttc | null>(null);

    const college = MOCK_COLLEGES.find(c => c.id === collegeId);
    const ttcsInCollege = MOCK_TTCS.filter(ttc => ttc.collegeId === collegeId);
    const innovatorsInCollege = MOCK_INNOVATORS.filter(inv => inv.collegeId === collegeId);

    if (!college) {
        return <p>College not found.</p>;
    }
    
    // Group innovators by TTC.
    // For this mock data, let's distribute innovators evenly among TTCs for demonstration.
    const innovatorsByTtc = ttcsInCollege.reduce((acc, ttc, index) => {
        acc[ttc.id] = innovatorsInCollege.filter((_, invIndex) => invIndex % ttcsInCollege.length === index);
        return acc;
    }, {} as Record<string, typeof innovatorsInCollege>);

    const handleTtcClick = (ttc: Ttc) => {
        setSelectedTtc(ttc);
        setIsModalOpen(true);
    };

    const getIdeaCountForInnovator = (innovatorEmail: string) => {
        return MOCK_IDEAS.filter(idea => idea.innovatorEmail === innovatorEmail).length;
    }

    return (
        <>
            <div className="space-y-6">
                <Button variant="outline" asChild>
                    <Link href={`/dashboard/admin/institutions?role=${role}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Institutions
                    </Link>
                </Button>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{college.name}</CardTitle>
                        <CardDescription>
                            A detailed view of the Technology Transfer Cells (TTCs) and Innovators. Click on a TTC to view their innovators.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {ttcsInCollege.map(ttc => (
                        <Card key={ttc.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTtcClick(ttc)}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={`https://avatar.vercel.sh/${ttc.name}.png`} alt={ttc.name} />
                                    <AvatarFallback>{getInitials(ttc.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{ttc.name}</CardTitle>
                                    <CardDescription>{ttc.email}</CardDescription>
                                    <div className="flex gap-1 mt-1">
                                        {ttc.expertise.map(e => <Badge key={e} variant="secondary">{e}</Badge>)}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Assigned Innovators: <span className="font-bold text-foreground">{innovatorsByTtc[ttc.id]?.length || 0}</span>
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                    {ttcsInCollege.length === 0 && (
                        <p className="text-muted-foreground text-center col-span-full">No TTCs found for this college.</p>
                    )}
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Innovators under {selectedTtc?.name}</DialogTitle>
                         <DialogDescription>
                            List of innovators managed by this TTC.
                        </DialogDescription>
                    </DialogHeader>
                    {innovatorsByTtc[selectedTtc?.id || '']?.length > 0 ? (
                        <ul className="space-y-2 py-4">
                            {innovatorsByTtc[selectedTtc?.id || ''].map(innovator => (
                                <li key={innovator.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6 text-xs">
                                            <AvatarImage src={`https://avatar.vercel.sh/${innovator.name}.png`} alt={innovator.name} />
                                            <AvatarFallback>{getInitials(innovator.name)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{innovator.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="secondary" className="flex items-center gap-1">
                                            <Lightbulb className="h-3 w-3" />
                                            {getIdeaCountForInnovator(innovator.email)}
                                        </Badge>
                                        <Badge variant={innovator.status === 'Active' ? 'default' : 'destructive'}>{innovator.status}</Badge>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-8">No innovators assigned to this TTC.</p>
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
