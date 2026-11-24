// Quote requests store for MA GROUP.
// Completely local and independent — zero external backend dependencies.

export type QuoteStatus = "pending" | "sent" | "won" | "lost";

export type QuoteRequestRow = {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  country: string;
  product: string;
  quantity: string;
  status: QuoteStatus;
  date: string;
};

const DEFAULT_REQUESTS: QuoteRequestRow[] = [
  { id: "q1", company: "EuroFresh GmbH", contactPerson: "Hans Müller", email: "hans@eurofresh.de", country: "Germany", product: "Oranges", quantity: "20 tons", status: "pending", date: "2026-07-25" },
  { id: "q2", company: "Gulf Fruits Co", contactPerson: "Salem Al-Otaibi", email: "salem@gulffruits.sa", country: "Saudi Arabia", product: "Potatoes", quantity: "50 tons", status: "sent", date: "2026-07-23" },
  { id: "q3", company: "Nordic Produce AB", contactPerson: "Erik Larsson", email: "erik@nordic.se", country: "Sweden", product: "Pomegranates", quantity: "10 tons", status: "won", date: "2026-07-21" },
];

const STORAGE_KEY = "magroup_quote_requests_v1";

function getStored(): QuoteRequestRow[] {
  if (typeof window === "undefined") return DEFAULT_REQUESTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_REQUESTS;
  } catch {
    return DEFAULT_REQUESTS;
  }
}

function saveStored(list: QuoteRequestRow[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Ignore quota errors
  }
}

export async function fetchQuoteRequests(): Promise<QuoteRequestRow[]> {
  return getStored();
}

export async function deleteQuoteRequest(id: string): Promise<void> {
  const list = getStored().filter((r) => r.id !== id);
  saveStored(list);
}

export async function saveQuoteRequest(req: Omit<QuoteRequestRow, "id" | "date">): Promise<void> {
  const list = getStored();
  const next: QuoteRequestRow = {
    ...req,
    id: `qr-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
  };
  list.unshift(next);
  saveStored(list);
}
