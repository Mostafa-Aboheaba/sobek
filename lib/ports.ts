/**
 * Ports served by the company (POL/POD).
 * Used for admin schedule form and reservation form dropdowns.
 */
export type Port = { name: string; code: string };

export const COMPANY_PORTS: Port[] = [
  { name: "El Dekheila (EGDEK)", code: "EGDEK" },
  { name: "Novorossiysk (RUNVS)", code: "RUNVS" },
  { name: "Alexandria (EGALY)", code: "EGALY" },
];

export const getPortByCode = (code: string): Port | undefined =>
  COMPANY_PORTS.find((p) => p.code.toUpperCase() === code.toUpperCase());

export const getPortByName = (name: string): Port | undefined =>
  COMPANY_PORTS.find(
    (p) => p.name.toLowerCase().includes(name.toLowerCase()) || p.code.toLowerCase() === name.toLowerCase()
  );

/** Avoid duplicating code when pol/pod name already contains it (e.g. "El Dekheila (EGDEK)"). */
export const formatPortDisplay = (name: string, code: string): string =>
  !name ? code : name.includes(code) ? name : `${name} (${code})`;
