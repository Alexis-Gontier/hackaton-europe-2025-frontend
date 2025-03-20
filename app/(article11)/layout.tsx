import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ProtectedRoute>
                <Header />
                    <div className="px-8 pt-20 pb-20">{children}</div>
                <Navbar />
            </ProtectedRoute>
        </>
    )
}