"use client";

import { useSearchParams } from "next/navigation";
import Contact from "./Contact";

export default function ContactFromQuery() {
    const params = useSearchParams();
    const service = params.get("service") || "";
    return <Contact key={service} initialService={service} />;
}
