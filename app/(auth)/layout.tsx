import AuthRoute from "@/components/auth/AuthRoute";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthRoute>
                <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
                    <div className="w-full max-w-sm md:max-w-3xl flex flex-col gap-4">
                        {children}
                        <div className="text-center text-xs text-muted-foreground">
                            En cliquant sur continuer, vous acceptez nos{" "}
                            <Link href="terms-of-service" className="underline underline-offset-4 hover:text-primary">
                            Conditions d&apos;utilisation
                            </Link>{" "}
                            et notre{" "}
                            <Link href="privacy-policy" className="underline underline-offset-4 hover:text-primary">
                            Politique de confidentialité
                            </Link>.
                        </div>
                    </div>
                </div>
            </AuthRoute>
        </>
    )
}