// import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        // <ProtectedRoute>
            <main>
                {children}
            </main>
        /* </ProtectedRoute> */
    )
}