import { useState } from "react";
import { LayoutDashboard, Database, BarChart3, Layers, LineChart, Zap, Menu, X, Activity, TrendingUp, Sparkles, GraduationCap, FileText, BookOpen } from "lucide-react";
import Dashboard from "@/pages/Dashboard";
import DataOverview from "@/pages/DataOverview";
import ModelEvaluation from "@/pages/ModelEvaluation";
import FeatureAnalysis from "@/pages/FeatureAnalysis";
import PredictionVisualization from "@/pages/PredictionVisualization";
import LivePrediction from "@/pages/LivePrediction";
import ProjectIntro from "@/pages/ProjectIntro";
import TeachingDemo from "@/pages/TeachingDemo";

const navItems = [
  { id: "intro", label: "项目说明", icon: GraduationCap, desc: "教学意义与局限性", highlight: true },
  { id: "teaching", label: "教学演示", icon: BookOpen, desc: "完整流程演示", highlight: false },
  { id: "dashboard", label: "仪表盘", icon: LayoutDashboard, desc: "项目概览" },
  { id: "data", label: "数据概览", icon: Database, desc: "数据统计" },
  { id: "model", label: "模型评估", icon: BarChart3, desc: "性能对比" },
  { id: "feature", label: "特征分析", icon: Layers, desc: "因子重要性" },
  { id: "prediction", label: "预测可视化", icon: LineChart, desc: "效果展示" },
  { id: "live", label: "实时预测", icon: Zap, desc: "明日预测" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("intro");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "intro":
        return <ProjectIntro />;
      case "teaching":
        return <TeachingDemo />;
      case "dashboard":
        return <Dashboard />;
      case "data":
        return <DataOverview />;
      case "model":
        return <ModelEvaluation />;
      case "feature":
        return <FeatureAnalysis />;
      case "prediction":
        return <PredictionVisualization />;
      case "live":
        return <LivePrediction />;
      default:
        return <ProjectIntro />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
      <aside
        className={`${sidebarOpen ? "w-64" : "w-16"} bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300`}
      >
        <div className="p-4 border-b border-slate-700">
          <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center"}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-white">ETF预测系统</h1>
                <p className="text-xs text-slate-400">金融大数据分析</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? item.highlight
                      ? "bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-400 border border-amber-500/50 shadow-lg shadow-amber-500/10"
                      : "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30"
                    : item.highlight
                      ? "text-amber-400/80 hover:text-amber-400 hover:bg-amber-500/10"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${item.highlight && !isActive ? "text-amber-400" : ""}`} />
                {sidebarOpen && (
                  <div className="flex-1 text-left">
                    <span className="font-medium">{item.label}</span>
                    {item.desc && <p className="text-xs text-slate-500">{item.desc}</p>}
                  </div>
                )}
                {item.highlight && <Sparkles className="w-4 h-4 text-amber-400/60" />}
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 border-t border-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </aside>

      <main className="flex-1 overflow-auto bg-slate-900">
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                {navItems.find((item) => item.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-slate-400">基于多源特征的ETF收益率预测与模型对比分析</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-500">项目状态</p>
                <p className="text-sm font-medium text-green-400">运行正常</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
}
