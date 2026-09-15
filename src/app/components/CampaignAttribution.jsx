"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "../_lib/leadAttribution";

export default function CampaignAttribution() {
    const pathname = usePathname();
    useEffect(() => { captureAttribution(); }, [pathname]);
    return null;
}
