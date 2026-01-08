// Logo data for homepage sections - easily expandable

export interface Logo {
  id: string;
  name: string;
  imageUrl?: string; // Optional - will show placeholder if not provided
  website?: string;
}

// German state education ministries + federal institutions
export const ministryLogos: Logo[] = [
  { id: "bw", name: "Baden-Württemberg" },
  { id: "by", name: "Bayern" },
  { id: "be", name: "Berlin" },
  { id: "bb", name: "Brandenburg" },
  { id: "hb", name: "Bremen" },
  { id: "hh", name: "Hamburg" },
  { id: "he", name: "Hessen" },
  { id: "mv", name: "Mecklenburg-Vorpommern" },
  { id: "ni", name: "Niedersachsen" },
  { id: "nw", name: "Nordrhein-Westfalen" },
  { id: "rp", name: "Rheinland-Pfalz" },
  { id: "sl", name: "Saarland" },
  { id: "sn", name: "Sachsen" },
  { id: "st", name: "Sachsen-Anhalt" },
  { id: "sh", name: "Schleswig-Holstein" },
  { id: "th", name: "Thüringen" },
  { id: "kmk", name: "Kultusministerkonferenz" },
  { id: "bmbf", name: "Bundesministerium für Bildung und Forschung" },
];

// Education associations and partners
export const partnerLogos: Logo[] = [
  { id: "didacta", name: "Didaktikerverband" },
  { id: "startup", name: "Startup Verband" },
  { id: "kmk", name: "Kultusministerkonferenz" },
  { id: "inventorio", name: "Inventorio" },
  { id: "bfb", name: "Bündnis für Bildung" },
  { id: "fbd", name: "Forum Bildung Digitalisierung" },
  // Add more partners as exploration talks progress
];
