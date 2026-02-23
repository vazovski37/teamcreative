import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio Builder | TeamCreative",
    description:
        "Build and preview portfolio entries visually. Create project content blocks, configure metadata, and export JSON for developer handoff.",
    robots: {
        index: false,
        follow: false,
    },
    openGraph: {
        title: "Portfolio Builder | TeamCreative",
        description:
            "Internal tool for creating portfolio page entries with live preview and JSON export.",
        type: "website",
    },
};

export default function PortfolioBuilderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
