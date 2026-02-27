import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

type OrderForm = {
  email: string;
  phone: string;
  contactMethod: string;
  contactId: string;
  designStyle: string;
  dimensions: string;
  material: string;
  quantity: number;
};

export default function ClientForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<OrderForm>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: OrderForm) => {
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("提交失败，请重试");
      navigate("/success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="bg-stone-900 px-8 py-10 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight">定制需求提交</h2>
          <p className="mt-2 text-stone-300">请填写您的详细需求，我们的设计团队将尽快与您联系</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-10 space-y-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* 联系方式 */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-stone-900 border-b border-stone-100 pb-2">联系方式</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-stone-700">邮箱 <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  {...register("email", { required: "请输入邮箱" })}
                  className="mt-1 block w-full rounded-xl border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm px-4 py-3 bg-stone-50"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">电话 <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  {...register("phone", { required: "请输入电话" })}
                  className="mt-1 block w-full rounded-xl border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm px-4 py-3 bg-stone-50"
                  placeholder="+86 123 4567 8900"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">首选联系方式</label>
                <select
                  {...register("contactMethod")}
                  className="mt-1 block w-full rounded-xl border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm px-4 py-3 bg-stone-50"
                >
                  <option value="WeChat">微信 (WeChat)</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Messenger">Messenger</option>
                  <option value="Email">邮箱 (Email)</option>
                  <option value="Phone">电话 (Phone)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">联系账号 (如微信号/WhatsApp)</label>
                <input
                  type="text"
                  {...register("contactId")}
                  className="mt-1 block w-full rounded-xl border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm px-4 py-3 bg-stone-50"
                  placeholder="ID / Number"
                />
              </div>
            </div>
          </div>

          {/* 需求详情 */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-stone-900 border-b border-stone-100 pb-2">需求详情</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-stone-700">设计风格及要求 <span className="text-red-500">*</span></label>
                <textarea
                  {...register("designStyle", { required: "请描述您的设计需求" })}
                  rows={4}
                  className="mt-1 block w-full rounded-xl border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm px-4 py-3 bg-stone-50"
                  placeholder="请描述您想要的设计风格、颜色偏好、用途等..."
                />
                {errors.designStyle && <p className="mt-1 text-sm text-red-600">{errors.designStyle.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">尺寸规格</label>
                <input
                  type="text"
                  {...register("dimensions")}
                  className="mt-1 block w-full rounded-xl border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm px-4 py-3 bg-stone-50"
                  placeholder="如: 10x15cm, A4等"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">材质要求</label>
                <input
                  type="text"
                  {...register("material")}
                  className="mt-1 block w-full rounded-xl border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm px-4 py-3 bg-stone-50"
                  placeholder="如: 300g铜版纸、亚克力等"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-stone-700">制作数量 <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  {...register("quantity", { required: "请输入数量", min: { value: 1, message: "数量必须大于0" } })}
                  className="mt-1 block w-full rounded-xl border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm px-4 py-3 bg-stone-50"
                  placeholder="100"
                />
                {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> 提交中...</>
              ) : (
                "提交需求"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
