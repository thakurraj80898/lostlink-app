import ProtectedRoute from "@/components/ProtectedRoute";

export default function ReportLostLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
