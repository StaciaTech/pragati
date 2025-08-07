// hooks/useUserProfile.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useUserProfile = () => {
  const queryClient = useQueryClient();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const uid =
    typeof window !== "undefined" ? localStorage.getItem("UserId") : null;

  const query = useQuery({
    queryKey: ["userProfile", uid],
    queryFn: async () => {
      if (!token || !uid) throw new Error("Missing token/uid");
      const { data } = await axios.get(`${apiUrl}/api/users/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!uid && !!token,
  });

  const updateUser = useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      if (!token || !uid) throw new Error("Missing token/uid");
      const { data } = await axios.put(`${apiUrl}/api/users/${uid}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", uid] });
    },
  });

  return { ...query, updateUser };
};
