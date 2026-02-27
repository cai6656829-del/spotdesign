import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-4 shadow-sm sm:rounded-2xl sm:px-10 text-center border border-stone-100">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-stone-900">提交成功！</h2>
          <p className="mt-4 text-stone-600">
            我们已收到您的定制需求。我们的设计团队将在24小时内通过您留下的联系方式与您沟通。
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
