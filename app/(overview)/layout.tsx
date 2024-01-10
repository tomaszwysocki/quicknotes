import Navbar from "@/components/navbar";

export default function OverviewLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className="container my-8">
                {children}
            </div>
        </>
    )
}