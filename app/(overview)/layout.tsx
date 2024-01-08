import Navbar from "@/components/navbar";

export default function OverviewLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className="container mt-10">
                {children}
            </div>
        </>
    )
}