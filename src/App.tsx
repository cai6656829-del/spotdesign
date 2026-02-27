import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientForm from './pages/ClientForm';
import AdminDashboard from './pages/AdminDashboard';
import OrderSuccess from './pages/OrderSuccess';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientForm />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
