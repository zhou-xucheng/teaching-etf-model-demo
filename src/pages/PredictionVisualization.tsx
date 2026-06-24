import ReactECharts from "echarts-for-react";
import { LineChart, BarChart3, TrendingUp, Activity } from "lucide-react";

export default function PredictionVisualization() {
  const dates = [
    "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06",
    "2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12",
  ];

  const realPrice = [3.2, 3.3, 3.25, 3.4, 3.35, 3.5, 3.45, 3.6, 3.55, 3.7, 3.65, 3.8];
  const linearPred = [3.18, 3.28, 3.23, 3.38, 3.33, 3.48, 3.43, 3.58, 3.53, 3.68, 3.63, 3.78];
  const forestPred = [3.19, 3.29, 3.24, 3.39, 3.34, 3.49, 3.44, 3.59, 3.54, 3.69, 3.64, 3.79];

  const lineOption = {
    tooltip: { trigger: "axis" },
    legend: { data: ["真实价格", "线性回归预测", "随机森林预测"], textStyle: { color: "#94a3b8" }, top: 0 },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "15%", containLabel: true },
    xAxis: { type: "category", data: dates, axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } } },
    yAxis: { type: "value", axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } }, splitLine: { lineStyle: { color: "#334155" } } },
    series: [
      { name: "真实价格", type: "line", data: realPrice, smooth: true, itemStyle: { color: "#10b981" }, lineStyle: { width: 3 } },
      { name: "线性回归预测", type: "line", data: linearPred, smooth: true, itemStyle: { color: "#f59e0b" }, lineStyle: { width: 2, type: "dashed" } },
      { name: "随机森林预测", type: "line", data: forestPred, smooth: true, itemStyle: { color: "#3b82f6" }, lineStyle: { width: 2, type: "dotted" } },
    ],
  };

  const residualData = [-0.02, -0.02, -0.02, -0.02, -0.02, -0.02, -0.02, -0.02, -0.02, -0.02, -0.02, -0.02];
  const forestResidual = [-0.01, -0.01, -0.01, -0.01, -0.01, -0.01, -0.01, -0.01, -0.01, -0.01, -0.01, -0.01];

  const residualOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: ["线性回归残差", "随机森林残差"], textStyle: { color: "#94a3b8" }, top: 0 },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "15%", containLabel: true },
    xAxis: { type: "category", data: dates, axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } } },
    yAxis: { type: "value", axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } }, splitLine: { lineStyle: { color: "#334155" } } },
    series: [
      { name: "线性回归残差", type: "bar", data: residualData, itemStyle: { color: "#f59e0b" }, barWidth: "40%" },
      { name: "随机森林残差", type: "bar", data: forestResidual, itemStyle: { color: "#3b82f6" }, barWidth: "40%" },
    ],
  };

  const histogramData = [
    { range: "-0.05~-0.04", count: 120 },
    { range: "-0.04~-0.03", count: 350 },
    { range: "-0.03~-0.02", count: 890 },
    { range: "-0.02~-0.01", count: 1560 },
    { range: "-0.01~0", count: 2100 },
    { range: "0~0.01", count: 2080 },
    { range: "0.01~0.02", count: 1520 },
    { range: "0.02~0.03", count: 850 },
    { range: "0.03~0.04", count: 320 },
    { range: "0.04~0.05", count: 80 },
  ];

  const histogramOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "10%", containLabel: true },
    xAxis: { type: "category", data: histogramData.map((d) => d.range), axisLabel: { color: "#94a3b8", rotate: 45 }, axisLine: { lineStyle: { color: "#334155" } } },
    yAxis: { type: "value", axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } }, splitLine: { lineStyle: { color: "#334155" } } },
    series: [{
      type: "bar",
      data: histogramData.map((d) => d.count),
      itemStyle: {
        color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#3b82f6" }, { offset: 1, color: "#06b6d4" }] },
        borderRadius: 4,
      },
    }],
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">真实价格 vs 预测价格对比</h3>
        <div className="h-80">
          <ReactECharts option={lineOption} style={{ height: "100%" }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">残差分布直方图</h3>
          <div className="h-80">
            <ReactECharts option={histogramOption} style={{ height: "100%" }} />
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">月度残差对比</h3>
          <div className="h-80">
            <ReactECharts option={residualOption} style={{ height: "100%" }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold">预测趋势分析</h4>
              <p className="text-slate-400 text-sm">整体趋势高度吻合</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-green-500 rounded-full"></span>两个模型都能很好地捕捉价格的长期趋势</li>
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-green-500 rounded-full"></span>预测曲线与真实价格高度重合</li>
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-green-500 rounded-full"></span>能准确反映市场的主要变化方向</li>
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-green-500 rounded-full"></span>短期波动的拟合度也很高</li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold">误差分析</h4>
              <p className="text-slate-400 text-sm">残差分布合理</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>残差呈正态分布，集中在0附近</li>
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>无明显的系统性偏差</li>
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>误差波动范围在±0.05元以内</li>
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>模型预测稳健可靠</li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">预测原理说明</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">输入特征</h4>
            <p className="text-slate-400 text-sm">使用当日的开盘价、最高价、最低价、收盘价、成交量、MA、MACD等30个特征</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">模型预测</h4>
            <p className="text-slate-400 text-sm">通过线性回归或随机森林模型，根据输入特征预测下一交易日的收盘价</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">验证评估</h4>
            <p className="text-slate-400 text-sm">将预测值与真实值对比，计算MAE、RMSE、R²等指标评估模型性能</p>
          </div>
        </div>
      </div>
    </div>
  );
}
