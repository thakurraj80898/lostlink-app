import ProtectedRoute from "@/components/ProtectedRoute";

export default function ReportFoundLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
