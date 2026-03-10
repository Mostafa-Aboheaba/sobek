"use client";

import { useState, useEffect, useCallback } from "react";
import { COMPANY_PORTS } from "@/lib/ports";

export type Port = { _id?: string; name: string; code: string; displayOrder?: number };

export const useCompanyPorts = (): { ports: Port[]; loading: boolean; refetch: () => Promise<void> } => {
  const [ports, setPorts] = useState<Port[]>(COMPANY_PORTS);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ports/");
      const data = await res.json();
      if (res.ok && Array.isArray(data.ports) && data.ports.length > 0) {
        setPorts(data.ports.map((p: { _id: string; name: string; code: string; displayOrder?: number }) => ({
          _id: p._id,
          name: p.name,
          code: p.code,
          displayOrder: p.displayOrder,
        })));
      }
    } catch {
      setPorts(COMPANY_PORTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ports, loading, refetch };
};
