"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { productApi } from "@/lib/endpoints";

export default function UnitRedirect() {
  const router = useRouter();
  useEffect(() => {
    productApi.getAll({ limit: 1 }).then((data) => {
      const first = data.products?.[0];
      if (first) router.replace(`/unit/${first.slug}`);
      else router.replace("/wardrobe");
    }).catch(() => router.replace("/wardrobe"));
  }, [router]);
  return null;
}
