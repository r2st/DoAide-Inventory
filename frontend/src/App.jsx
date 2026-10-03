import { Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Shell from "./components/Shell";
import { useAuth } from "./hooks/useAuth";
import AlertsPage from "./pages/AlertsPage";
import AuthPage from "./pages/AuthPage";
import BlogLayout, { BlogIndex } from "./pages/BlogLayout";
import CalculatorPage from "./pages/CalculatorPage";
import CategoriesPage from "./pages/CategoriesPage";
import CustomersPage from "./pages/CustomersPage";
import DashboardPage from "./pages/DashboardPage";
import EmbedPage from "./pages/EmbedPage";
import LandingPage from "./pages/LandingPage";
import PricingPage from "./pages/PricingPage";
import ProductsPage from "./pages/ProductsPage";
import PurchaseOrdersPage from "./pages/PurchaseOrdersPage";
import ReportsPage from "./pages/ReportsPage";
import SalesOrdersPage from "./pages/SalesOrdersPage";
import ScannerPage from "./pages/ScannerPage";
import SettingsPage from "./pages/SettingsPage";
import StockPage from "./pages/StockPage";
import SuppliersPage from "./pages/SuppliersPage";
import TemplatesPage from "./pages/TemplatesPage";
import BarcodeGuide from "./pages/blog/BarcodeGuide";
import InventoryMethodsGuide from "./pages/blog/InventoryMethodsGuide";
import ReorderPointGuide from "./pages/blog/ReorderPointGuide";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin w-8 h-8 border-4 border-accent-600 border-t-transparent rounded-full" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  return <Shell>{children}</Shell>;
}

function Home() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" replace /> : <LandingPage />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/scanner" element={<ScannerPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/embed" element={<EmbedPage />} />
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogIndex />} />
          <Route path="reorder-point-formula-explained" element={<ReorderPointGuide />} />
          <Route path="barcode-systems-small-business" element={<BarcodeGuide />} />
          <Route path="inventory-management-methods-compared" element={<InventoryMethodsGuide />} />
        </Route>
        <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
        <Route path="/products" element={<Protected><ProductsPage /></Protected>} />
        <Route path="/categories" element={<Protected><CategoriesPage /></Protected>} />
        <Route path="/stock" element={<Protected><StockPage /></Protected>} />
        <Route path="/purchase-orders" element={<Protected><PurchaseOrdersPage /></Protected>} />
        <Route path="/sales-orders" element={<Protected><SalesOrdersPage /></Protected>} />
        <Route path="/suppliers" element={<Protected><SuppliersPage /></Protected>} />
        <Route path="/customers" element={<Protected><CustomersPage /></Protected>} />
        <Route path="/reports" element={<Protected><ReportsPage /></Protected>} />
        <Route path="/alerts" element={<Protected><AlertsPage /></Protected>} />
        <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />
      </Routes>
    </ErrorBoundary>
  );
}
