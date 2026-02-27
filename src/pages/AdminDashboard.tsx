import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Loader2, Search, Filter, MoreVertical, LayoutDashboard, Users, Settings, LogOut } from "lucide-react";

type Order = {
  id: number;
  email: string;
  phone: string;
  contactMethod: string;
  contactId: string;
  designStyle: string;
  dimensions: string;
  material: string;
  quantity: number;
  status: string;
  createdAt: string;
};

const STATUSES = [
  { value: "pending", label: "待沟通", color: "bg-yellow-100 text-yellow-800" },
  { value: "designing", label: "方案设计中", color: "bg-blue-100 text-blue-800" },
  { value: "proofing", label: "打样确认中", color: "bg-purple-100 text-purple-800" },
  { value: "producing", label: "工厂制作中", color: "bg-orange-100 text-orange-800" },
  { value: "shipping", label: "质检发货中", color: "bg-indigo-100 text-indigo-800" },
  { value: "completed", label: "已完成", color: "bg-emerald-100 text-emerald-800" },
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = filterStatus === "all" ? orders : orders.filter(o => o.status === filterStatus);

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-stone-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight">定制管理系统</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="flex items-center px-4 py-3 bg-stone-800 rounded-xl text-stone-100 transition-colors">
            <LayoutDashboard className="mr-3 h-5 w-5" />
            订单管理
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-stone-400 hover:bg-stone-800 hover:text-stone-100 rounded-xl transition-colors">
            <Users className="mr-3 h-5 w-5" />
            客户列表
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-stone-400 hover:bg-stone-800 hover:text-stone-100 rounded-xl transition-colors">
            <Settings className="mr-3 h-5 w-5" />
            系统设置
          </a>
        </nav>
        <div className="p-4 border-t border-stone-800">
          <button className="flex items-center w-full px-4 py-3 text-stone-400 hover:text-stone-100 transition-colors">
            <LogOut className="mr-3 h-5 w-5" />
            退出登录
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-stone-200 px-8 py-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-stone-800">所有订单</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="搜索订单/手机号..."
                className="pl-10 pr-4 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 w-64"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <div className="mb-6 flex items-center space-x-2">
            <Filter className="h-4 w-4 text-stone-500" />
            <span className="text-sm text-stone-500 font-medium">状态筛选：</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm border-stone-200 rounded-lg py-1.5 pl-3 pr-8 focus:ring-stone-900 focus:border-stone-900"
            >
              <option value="all">全部订单</option>
              {STATUSES.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
              </div>
            ) : (
              <table className="min-w-full divide-y divide-stone-200">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">订单信息</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">联系方式</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">需求详情</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-stone-200">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                        暂无订单数据
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-stone-900">#{order.id.toString().padStart(4, '0')}</div>
                          <div className="text-sm text-stone-500">{format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-stone-900">{order.email}</div>
                          <div className="text-sm text-stone-500">{order.phone}</div>
                          {order.contactId && (
                            <div className="text-xs text-stone-400 mt-1">
                              {order.contactMethod}: {order.contactId}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-stone-900 max-w-xs truncate" title={order.designStyle}>
                            {order.designStyle}
                          </div>
                          <div className="text-xs text-stone-500 mt-1 flex space-x-2">
                            {order.dimensions && <span>尺寸: {order.dimensions}</span>}
                            {order.material && <span>材质: {order.material}</span>}
                            <span className="font-medium text-stone-700">数量: {order.quantity}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            className={`text-xs font-medium rounded-full px-3 py-1 border-0 cursor-pointer focus:ring-2 focus:ring-offset-1 focus:ring-stone-500 ${STATUSES.find(s => s.value === order.status)?.color}`}
                          >
                            {STATUSES.map(s => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-stone-400 hover:text-stone-900 transition-colors">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
