import ReactECharts from "echarts-for-react";
import { TrendingUp, Database, BarChart3, Target, ArrowUpRight } from "lucide-react";

const statCards = [
  {
    title: "数据规模",
    value: "54,132",
    unit: "条",
    description: "有效样本47,510条",
    icon: Database,
    trend: "+500%",
    trendIcon: ArrowUpRight,
    trendColor: "text-green-400",
    bgGradient: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30",
  },
  {
    title: "基金数量",
    value: "44",
    unit: "只",
    description: "覆盖6大领域",
    icon: BarChart3,
    trend: "+4300%",
    trendIcon: ArrowUpRight,
    trendColor: "text-green-400",
    bgGradient: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/30",
  },
  {
    title: "特征数量",
    value: "30",
    unit: "个",
    description: "6大类技术指标",
    icon: Target,
    trend: "+200%",
    trendIcon: ArrowUpRight,
    trendColor: "text-green-400",
    bgGradient: "from-cyan-500/20 to-cyan-600/20",
    borderColor: "border-cyan-500/30",
  },
  {
    title: "模型准确率",
    value: "99.67%",
    unit: "",
    description: "R²决定系数",
    icon: TrendingUp,
    trend: "+18%",
    trendIcon: ArrowUpRight,
    trendColor: "text-green-400",
    bgGradient: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
  },
];

const fundCategories = [
  { name: "科技/芯片", value: 12, color: "#f59e0b" },
  { name: "港股/科技", value: 6, color: "#3b82f6" },
  { name: "白酒消费", value: 5, color: "#8b5cf6" },
  { name: "纳斯达克", value: 8, color: "#06b6d4" },
  { name: "新能源", value: 7, color: "#10b981" },
  { name: "医疗健康", value: 6, color: "#ef4444" },
];

export default function Dashboard() {
  const pieOption = {
    tooltip: { trigger: "item", formatter: "{b}: {c}只 ({d}%)" },
    legend: { orient: "vertical", right: "5%", top: "center", textStyle: { color: "#94a3b8" } },
    series: [{
      name: "基金分类",
      type: "pie",
      radius: ["40%", "70%"],
      center: ["35%", "50%"],
      itemStyle: { borderRadius: 8, borderColor: "#1e293b", borderWidth: 2 },
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 18, fontWeight: "bold", color: "#fff" } },
      labelLine: { show: false },
      data: fundCategories,
    }],
  };

  const barOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: ["MAE", "RMSE", "MAPE"], textStyle: { color: "#94a3b8" }, top: 0 },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "15%", containLabel: true },
    xAxis: { type: "category", data: ["线性回归", "随机森林"], axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } } },
    yAxis: { type: "value", axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } }, splitLine: { lineStyle: { color: "#334155" } } },
    series: [
      { name: "MAE", type: "bar", data: [0.0153, 0.0155], itemStyle: { color: "#f59e0b" }, barWidth: "30%" },
      { name: "RMSE", type: "bar", data: [0.0250, 0.0254], itemStyle: { color: "#3b82f6" }, barWidth: "30%" },
      { name: "MAPE(%)", type: "bar", data: [1.45, 1.44], itemStyle: { color: "#10b981" }, barWidth: "30%" },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const TrendIcon = card.trendIcon;
          return (
            <div key={card.title} className={`bg-gradient-to-br ${card.bgGradient} border ${card.borderColor} rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 ${card.trendColor}`}>
                  <TrendIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{card.trend}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-slate-400 text-sm">{card.title}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-white">{card.value}</span>
                  <span className="text-slate-400">{card.unit}</span>
                </div>
                <p className="text-slate-500 text-xs mt-1">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">基金分类分布</h3>
          <div className="h-64"><ReactECharts option={pieOption} style={{ height: "100%" }} /></div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">模型评估对比</h3>
          <div className="h-64"><ReactECharts option={barOption} style={{ height: "100%" }} /></div>
        </div>
      </div>
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">项目概览</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-slate-400 text-sm mb-3">数据采集</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 bg-green-500 rounded-full"></span><span className="text-slate-300">AKShare基金净值接口</span></li>
              <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 bg-green-500 rounded-full"></span><span className="text-slate-300">2020-2025年完整数据</span></li>
              <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 bg-green-500 rounded-full"></span><span className="text-slate-300">反爬机制保障采集成功率</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-400 text-sm mb-3">特征工程</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 bg-blue-500 rounded-full"></span><span className="text-slate-300">30个特征指标</span></li>
              <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 bg-blue-500 rounded-full"></span><span className="text-slate-300">MA、MACD、KDJ、RSI等</span></li>
              <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 bg-blue-500 rounded-full"></span><span className="text-slate-300">原创指标：MA120、成交量比率</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-400 text-sm mb-3">模型构建</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 bg-amber-500 rounded-full"></span><span className="text-slate-300">线性回归模型</span></li>
              <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 bg-amber-500 rounded-full"></span><span className="text-slate-300">随机森林模型</span></li>
              <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 bg-amber-500 rounded-full"></span><span className="text-slate-300">四维评估指标：MAE、RMSE、R²、MAPE</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
