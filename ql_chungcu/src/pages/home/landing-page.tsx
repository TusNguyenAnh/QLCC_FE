import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Users,
  FileText,
  BarChart3,
  Zap,
  CheckCircle2,
  ArrowRight,
  Home,
  ClipboardList,
  MessageSquare,
  DollarSign,
  Bell,
} from "lucide-react";
import Logo from "@/pages/home/Logo.tsx";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Building2 className="h-8 w-8 text-blue-600" />,
      title: "Quản lý Tòa nhà",
      description:
        "Quản lý thông tin tòa nhà, số tầng, số lượng căn hộ một cách dễ dàng và trực quan.",
    },
    {
      icon: <Home className="h-8 w-8 text-green-600" />,
      title: "Quản lý Căn hộ",
      description:
        "Theo dõi thông tin chi tiết từng căn hộ: diện tích, chủ sở hữu, tình trạng sử dụng.",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Quản lý Cư dân",
      description:
        "Lưu trữ hồ sơ cư dân, thông tin liên hệ, lịch sử cư trú một cách có tổ chức.",
    },
    {
      icon: <ClipboardList className="h-8 w-8 text-orange-600" />,
      title: "Quy trình Nghiệp vụ",
      description:
        "Tự động hóa các quy trình nghiệp vụ: phê duyệt, xử lý yêu cầu, workflow linh hoạt.",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-pink-600" />,
      title: "Phản hồi & Khiếu nại",
      description:
        "Tiếp nhận và xử lý phản hồi, khiếu nại từ cư dân nhanh chóng và hiệu quả.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-emerald-600" />,
      title: "Quản lý Tài chính",
      description:
        "Quản lý thu chi, sổ cái, công nợ căn hộ, báo cáo tài chính tự động và chính xác.",
    },
    {
      icon: <FileText className="h-8 w-8 text-indigo-600" />,
      title: "Quản lý Hợp đồng",
      description:
        "Lưu trữ và theo dõi hợp đồng dịch vụ, bảo trì, nhà thầu với đầy đủ tài liệu.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-cyan-600" />,
      title: "Báo cáo & Thống kê",
      description:
        "Dashboard trực quan với biểu đồ, báo cáo chi tiết hỗ trợ ra quyết định.",
    },
    {
      icon: <Bell className="h-8 w-8 text-yellow-600" />,
      title: "Thông báo Tự động",
      description:
        "Gửi thông báo, nhắc nhở đóng phí qua email/SMS tự động đến cư dân.",
    },
  ];

  const benefits = [
    "Tiết kiệm 70% thời gian quản lý so với phương pháp truyền thống",
    "Giảm thiểu sai sót trong thu chi và công nợ",
    "Tăng cường minh bạch trong hoạt động Ban Quản trị",
    "Cải thiện trải nghiệm và sự hài lòng của cư dân",
    "Dữ liệu được bảo mật và sao lưu tự động",
    "Truy cập mọi lúc mọi nơi trên mọi thiết bị",
  ];

  const pricingPlans = [
    {
      name: "Cơ bản",
      price: "2.000.000",
      period: "VNĐ/tháng",
      features: [
        "Quản lý tối đa 200 căn hộ",
        "Quản lý cư dân & căn hộ",
        "Phản hồi khiếu nại cơ bản",
        "Hỗ trợ email",
        "Lưu trữ 10GB",
      ],
      popular: false,
    },
    {
      name: "Chuyên nghiệp",
      price: "4.500.000",
      period: "VNĐ/tháng",
      features: [
        "Quản lý tối đa 500 căn hộ",
        "Tất cả tính năng cơ bản",
        "Quản lý tài chính đầy đủ",
        "Quy trình nghiệp vụ tự động",
        "Báo cáo & thống kê nâng cao",
        "Hỗ trợ 24/7",
        "Lưu trữ 50GB",
      ],
      popular: true,
    },
    {
      name: "Doanh nghiệp",
      price: "Liên hệ",
      period: "",
      features: [
        "Không giới hạn căn hộ",
        "Tất cả tính năng chuyên nghiệp",
        "Tùy chỉnh theo yêu cầu",
        "API Integration",
        "Đào tạo & triển khai",
        "Dedicated support",
        "Lưu trữ không giới hạn",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 scroll-smooth">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo
                size="sm"
                showText={true}
                className="[&_.text-gray-900]:text-white [&_.text-gray-500]:text-blue-200"
              />
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#giai-phap"
                className="text-white hover:text-cyan-400 font-medium transition-colors"
              >
                Giải pháp
              </a>
              <a
                href="#tinh-nang"
                className="text-white hover:text-cyan-400 font-medium transition-colors"
              >
                Tính năng
              </a>
              <a
                href="#bang-gia"
                className="text-white hover:text-cyan-400 font-medium transition-colors"
              >
                Bảng giá
              </a>
              <a
                href="#ve-chung-toi"
                className="text-white hover:text-cyan-400 font-medium transition-colors"
              >
                Về chúng tôi
              </a>
              <a
                href="#lien-he"
                className="text-white hover:text-cyan-400 font-medium transition-colors"
              >
                Liên hệ
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="hidden md:inline-flex text-white hover:text-cyan-400 hover:bg-white/10"
              >
                Đăng nhập
              </Button>
              <Button
                onClick={() => navigate("/page/register-service")}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold shadow-lg"
              >
                Dùng thử miễn phí
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 text-white pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-slate-600 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-600/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-400/50">
              <Zap className="h-4 w-4 mr-2" />
              <span className="text-sm font-semibold">
                Giải pháp quản lý chung cư hiện đại
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Hệ thống quản lý
              <br />
              <span className="text-blue-300">chung cư thông minh</span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Tối ưu hóa công tác quản lý cho Ban Quản trị với giải pháp toàn
              diện, từ cư dân, tài chính đến quy trình nghiệp vụ
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
                <span>Dùng thử 30 ngày miễn phí</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
                <span>Không cần thẻ tín dụng</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="giai-phap" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Giải pháp toàn diện
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hệ thống tích hợp 3 giải pháp chính để quản lý chung cư hiệu quả
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Solution 1 */}
            <Card className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Building2 className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  T-ComplexOS PMS
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Hệ thống quản lý vận hành toàn diện cho tòa nhà, căn hộ, cư
                  dân và tài chính
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Quản lý đa chi nhánh trên một hệ thống</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Tự động hóa quy trình nghiệp vụ</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Báo cáo tài chính chi tiết</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Solution 2 */}
            <Card className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Bespoke Solution
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Giải pháp tùy chỉnh riêng theo yêu cầu đặc thù của từng chung
                  cư
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Phát triển Web/App riêng biệt</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Tùy chỉnh tính năng theo nhu cầu</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Tích hợp hệ thống hiện có</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Solution 3 */}
            <Card className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500">
                  <Bell className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  On-Demand Services
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Nền tảng đặt dịch vụ tiện ích cho cư dân trong chung cư
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Marketplace dịch vụ tích hợp</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Đặt lịch bảo trì, sửa chữa</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Thanh toán online tự động</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="tinh-nang" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tính năng toàn diện
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Giải pháp tích hợp đầy đủ các chức năng cần thiết cho việc quản lý
              chung cư chuyên nghiệp
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-blue-300"
              >
                <CardContent className="p-6">
                  <div className="mb-4 bg-gradient-to-br from-gray-50 to-blue-50 w-16 h-16 rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="ve-chung-toi" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Tại sao chọn chúng tôi?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Hệ thống được thiết kế đặc biệt cho Ban Quản trị chung cư tại
                Việt Nam, đáp ứng mọi nhu cầu quản lý hiện đại và hiệu quả.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">Tổng căn hộ</span>
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      1,247
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        Cư dân đang ở
                      </span>
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      3,842
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        Tỷ lệ thu phí
                      </span>
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      98.5%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="bang-gia" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bảng giá linh hoạt
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Lựa chọn gói dịch vụ phù hợp với quy mô chung cư của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular
                    ? "border-4 border-blue-600 shadow-2xl scale-105"
                    : "border-2"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Phổ biến nhất
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "bg-gray-900 hover:bg-gray-800"
                    } text-white py-6 text-lg font-semibold`}
                    onClick={() => navigate("/page/register-service")}
                  >
                    {plan.price === "Liên hệ"
                      ? "Liên hệ tư vấn"
                      : "Bắt đầu dùng thử"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="lien-he"
        className="py-20 px-4 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sẵn sàng chuyển đổi số?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Tham gia cùng hơn 500+ chung cư đã tin dùng hệ thống của chúng tôi
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/page/register-service")}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-semibold shadow-2xl group"
          >
            Đăng ký dùng thử miễn phí
            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-blue-300 mt-4">
            Dùng thử 30 ngày • Không cần thẻ tín dụng • Hủy bất cứ lúc nào
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo
                size="sm"
                className="mb-4 [&_.text-gray-900]:text-white [&_.text-gray-500]:text-gray-400"
              />
              <p className="text-sm leading-relaxed">
                Giải pháp quản lý chung cư hàng đầu tại Việt Nam, giúp Ban Quản
                trị vận hành hiệu quả và chuyên nghiệp.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Sản phẩm</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tính năng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Bảng giá
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tích hợp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Hướng dẫn sử dụng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Pháp lý</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Điều khoản dịch vụ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Bảo mật dữ liệu
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 T-ComplexOS. All rights reserved.</p>
            <p className="text-gray-500 mt-2">
              Smart Building Management System
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
