import ReactECharts from "echarts-for-react";
import { Layers, TrendingUp, Activity, BarChart3 } from "lucide-react";

const featureImportance = [
  { name: "收盘价", importance: 84.5, category: "价格特征" },
  { name: "MACD_Hist", importance: 23.5, category: "动量指标" },
  { name: "MACD", importance: 18.7, category: "动量指标" },
  { name: "ATR", importance: 9.0, category: "波动指标" },
  { name: "MA5", importance: 8.1, category: "趋势指标" },
  { name: "MA10", importance: 5.2, category: "趋势指标" },
  { name: "开盘价", importance: 4.8, category: "价格特征" },
  { name: "最高价", importance: 3.5, category: "价格特征" },
  { name: "最低价", importance: 2.8, category: "价格特征" },
  { name: "MA20", importance: 2.1, category: "趋势指标" },
];

const featureCategories = [
  {
    name: "价格特征",
    icon: BarChart3,
    color: "#f59e0b",
    features: ["开盘价", "最高价", "最低价", "收盘价", "成交量"],
    desc: "直接反映市场交易情况的基础数据",
  },
  {
    name: "趋势指标",
    icon: TrendingUp,
    color: "#3b82f6",
    features: ["MA5", "MA10", "MA20", "MA60", "MA120"],
    desc: "捕捉价格走势方向的技术指标",
  },
  {
    name: "动量指标",
    icon: Activity,
    color: "#8b5cf6",
    features: ["MACD", "MACD_Signal", "MACD_Hist", "K", "D", "J", "RSI", "MOM5", "MOM10", "ROC"],
    desc: "衡量价格变化速度和方向的指标",
  },
  {
    name: "波动指标",
    icon: Layers,
    color: "#06b6d4",
    features: ["BB_upper", "BB_lower", "BB_width", "ATR"],
    desc: "评估市场风险水平和波动程度",
  },
  {
    name: "量能指标",
    icon: Activity,
    color: "#10b981",
    features: ["成交量_MA5", "成交量变化", "成交量比率"],
    desc: "反映市场活跃度和资金流向",
  },
];

export default function FeatureAnalysis() {
  const barOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: "15%", right: "4%", bottom: "3%", top: "10%", containLabel: true },
    xAxis: { type: "value", axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } }, splitLine: { lineStyle: { color: "#334155" } } },
    yAxis: {
      type: "category",
      data: featureImportance.map((f) => f.name).reverse(),
      axisLabel: { color: "#94a3b8" },
      axisLine: { lineStyle: { color: "#334155" } },
    },
    series: [{
      type: "bar",
      data: featureImportance.map((f) => f.importance).reverse(),
      itemStyle: {
        color: {
          type: "linear",
          x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [{ offset: 0, color: "#f59e0b" }, { offset: 1, color: "#f97316" }],
        },
        borderRadius: [0, 4, 4, 0],
      },
      barWidth: "60%",
    }],
  };

  const categoryColors: Record<string, string> = {
    "价格特征": "#f59e0b",
    "动量指标": "#8b5cf6",
    "趋势指标": "#3b82f6",
    "波动指标": "#06b6d4",
    "量能指标": "#10b981",
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">特征重要性排名（前10）</h3>
        <div className="h-80">
          <ReactECharts option={barOption} style={{ height: "100%" }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">特征分类详解</h3>
          <div className="space-y-4">
            {featureCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.name} className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}20` }}>
                      <Icon className="w-4 h-4" style={{ color: cat.color }} />
                    </div>
                    <span className="text-white font-medium">{cat.name}</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-2">{cat.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.features.map((feature) => (
                      <span key={feature} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">关键发现</h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="text-amber-400 font-medium mb-2">收盘价主导预测</h4>
              <p className="text-slate-400 text-sm">收盘价的重要性高达84.5%，是最核心的预测因子。这说明基金净值的连续性很强，今日收盘价对明日价格有决定性影响。</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-medium mb-2">MACD指标贡献显著</h4>
              <p className="text-slate-400 text-sm">MACD_Hist和MACD指标分别贡献23.5%和18.7%，说明动量指标对短期价格变化有很好的预测能力。</p>
            </div>
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="text-cyan-400 font-medium mb-2">波动率指标有一定价值</h4>
              <p className="text-slate-400 text-sm">ATR波动率指标贡献9.0%，说明市场波动程度对价格预测有辅助作用。</p>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-2">均线指标提供辅助信息</h4>
              <p className="text-slate-400 text-sm">MA5、MA10等均线指标虽然重要性相对较低，但仍能提供趋势方向的辅助信息。</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">原创指标说明</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">MA120（半年线）</h4>
            <p className="text-slate-400 text-sm">计算120日移动平均线，用于捕捉长期趋势方向。与短期均线相比，MA120能更准确地反映基金的中长期走势。</p>
            <p className="text-slate-500 text-xs mt-2">计算公式：MA120 = 最近120日收盘价的算术平均</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">成交量比率</h4>
            <p className="text-slate-400 text-sm">计算当日成交量与5日均量的比值，用于衡量市场活跃度。比值大于1表示放量，小于1表示缩量。</p>
            <p className="text-slate-500 text-xs mt-2">计算公式：成交量比率 = 当日成交量 / 5日平均成交量</p>
          </div>
        </div>
      </div>
    </div>
  );
}
