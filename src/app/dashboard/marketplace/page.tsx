"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { ShoppingBag, Plus, Search, X } from "lucide-react";

const CATEGORIES = ["all", "books", "electronics", "clothing", "other"];

export default function MarketplacePage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", price: "",
    category: "other", contact_info: "",
  });

  const { data: listings, isLoading } = useQuery({
    queryKey: ["listings", category, search],
    queryFn: () =>
      api.get("/marketplace/listings", {
        params: {
          ...(category !== "all" && { category }),
          ...(search && { search }),
        },
      }).then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: () =>
      api.post("/marketplace/listings", {
        ...form,
        price: form.price ? parseFloat(form.price) : null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      toast.success("Listing created!");
      setShowCreate(false);
      setForm({ title: "", description: "", price: "", category: "other", contact_info: "" });
    },
    onError: () => toast.error("Failed to create listing"),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Marketplace</h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Buy and sell within your campus
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="btn-primary flex items-center gap-2 px-4 h-9"
        >
          <Plus size={16} /> New listing
        </button>
      </div>

      {/* Search + filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-hint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search listings…"
            className="input-field w-full pl-9"
          />
        </div>
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 h-9 rounded-xl text-xs font-medium capitalize transition-colors ${
                category === cat
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-text-secondary hover:bg-surface"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-modal">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-text-primary text-lg">New listing</h2>
              <button onClick={() => setShowCreate(false)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center">
                <X size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { key: "title", label: "Title", placeholder: "e.g. Calculus Textbook" },
                { key: "description", label: "Description", placeholder: "Condition, edition, etc." },
                { key: "price", label: "Price (TZS)", placeholder: "e.g. 25000" },
                { key: "contact_info", label: "Contact info", placeholder: "How should buyers reach you?" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
                    {label}
                  </label>
                  <input
                    value={(form as any)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="input-field w-full"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="input-field w-full"
                >
                  <option value="books">Books</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                onClick={() => createMutation.mutate()}
                disabled={!form.title || createMutation.isPending}
                className="btn-primary w-full h-11 mt-2"
              >
                {createMutation.isPending ? "Creating…" : "Post listing"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Listings grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="h-36 bg-surface" />
              <div className="p-3 space-y-2">
                <div className="h-3.5 bg-surface rounded w-3/4" />
                <div className="h-3 bg-surface rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : listings?.length === 0 ? (
        <div className="card p-12 text-center">
          <ShoppingBag size={32} className="mx-auto text-text-hint mb-3" />
          <p className="text-text-secondary">No listings found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {listings?.map((listing: any) => (
            <div key={listing.id} className="card overflow-hidden hover:border-primary-border transition-colors">
              <div className="h-36 bg-surface flex items-center justify-center">
                {listing.images?.[0] ? (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ShoppingBag size={28} className="text-text-hint" />
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-text-primary truncate">
                  {listing.title}
                </p>
                <p className="text-xs font-bold text-text-primary mt-1">
                  TZS {listing.price?.toLocaleString() ?? "Free"}
                </p>
                <p className="text-xs text-text-hint mt-0.5 capitalize">
                  {listing.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}