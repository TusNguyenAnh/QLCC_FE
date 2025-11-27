import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-2xl border-none shadow-2xl">
        <CardContent className="p-8 md:p-12">
          {/* Animated 404 */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <h1 className="text-[150px] md:text-[200px] font-bold bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-none animate-pulse">
                404
              </h1>
              <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8">
                <div className="relative">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center">
                    <span className="text-3xl md:text-5xl">🤔</span>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full bg-yellow-300 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Oops! Trang không tồn tại
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-md mx-auto">
              Có vẻ như trang bạn đang tìm kiếm đã bị di chuyển, xóa hoặc chưa
              từng tồn tại. Đừng lo, chúng tôi sẽ giúp bạn tìm đường về! 🏠
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Một vài gợi ý cho bạn:
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Kiểm tra lại URL bạn vừa nhập</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Sử dụng thanh tìm kiếm để tìm nội dung bạn cần</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">•</span>
                <span>Quay lại trang chủ và bắt đầu lại</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="group"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Quay lại
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Về trang chủ
            </Button>
          </div>

          {/* Footer decoration */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              Cần hỗ trợ? Liên hệ với chúng tôi qua{" "}
              <a
                href="mailto:support@tcomplexos.com"
                className="text-blue-600 hover:underline font-medium"
              >
                support@tcomplexos.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Floating elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-blob"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
      <div className="fixed top-1/2 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-blob animation-delay-4000"></div>
    </div>
  );
}
