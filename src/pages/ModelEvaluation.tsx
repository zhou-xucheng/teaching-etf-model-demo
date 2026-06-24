import ReactECharts from "echarts-for-react";
import { BarChart3, LineChart, TrendingUp, Target } from "lucide-react";

const modelMetrics = [
  { metric: "MAE", linear: 0.0153, forest: 0.0155, unit: "元", desc: "平均绝对误差" },
  { metric: "RMSE", linear: 0.0250, forest: 0.0254, unit: "元", desc: "均方根误差" },
  { metric: "R²", linear: 99.67, forest: 99.66, unit: "%", desc: "决定系数" },
  { metric: "MAPE", linear: 1.45, forest: 1.44, unit: "%", desc: "平均相对误差" },
];

export default function ModelEvaluation() {
  const radarOption = {
    tooltip: {},
    legend: { data: ["线性回归", "随机森林"], textStyle: { color: "#94a3b8" }, bottom: 0 },
    radar: {
      indicator: [
        { name: "MAE", max: 0.05 },
        { name: "RMSE", max: 0.05 },
        { name: "R²", max: 100 },
        { name: "MAPE", max: 5 },
      ],
      axisName: { color: "#94a3b8" },
      splitLine: { lineStyle: { color: "#334155" } },
      splitArea: { areaStyle: { color: ["rgba(245,158,11,0.05)", "rgba(59,130,246,0.05)"] } },
      axisLine: { lineStyle: { color: "#334155" } },
    },
    series: [{
      name: "模型评估对比",
      type: "radar",
      data: [
        { value: [0.0153, 0.0250, 99.67, 1.45], name: "线性回归", itemStyle: { color: "#f59e0b" } },
        { value: [0.0155, 0.0254, 99.66, 1.44], name: "随机森林", itemStyle: { color: "#3b82f6" } },
      ],
    }],
  };

  const barOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: ["线性回归", "随机森林"], textStyle: { color: "#94a3b8" }, top: 0 },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "15%", containLabel: true },
    xAxis: { type: "category", data: ["MAE", "RMSE", "MAPE"], axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } } },
    yAxis: { type: "value", axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } }, splitLine: { lineStyle: { color: "#334155" } } },
    series: [
      { name: "线性回归", type: "bar", data: [0.0153, 0.0250, 1.45], itemStyle: { color: "#f59e0b" }, barWidth: "40%" },
      { name: "随机森林", type: "bar", data: [0.0155, 0.0254, 1.44], itemStyle: { color: "#3b82f6" }, barWidth: "40%" },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">模型评估雷达图</h3>
          <div className="h-80">
            <ReactECharts option={radarOption} style={{ height: "100%" }} />
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">误差指标对比</h3>
          <div className="h-80">
            <ReactECharts option={barOption} style={{ height: "100%" }} />
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">评估指标详细对比</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">指标</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">描述</th>
                <th className="text-center py-3 px-4 text-amber-400 font-medium">线性回归</th>
                <th className="text-center py-3 px-4 text-blue-400 font-medium">随机森林</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">单位</th>
              </tr>
            </thead>
            <tbody>
              {modelMetrics.map((metric) => (
                <tr key={metric.metric} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{metric.metric}</td>
                  <td className="py-3 px-4 text-slate-400 text-sm">{metric.desc}</td>
                  <td className="py-3 px-4 text-center text-amber-400 font-mono">{metric.linear}</td>
                  <td className="py-3 px-4 text-center text-blue-400 font-mono">{metric.forest}</td>
                  <td className="py-3 px-4 text-center text-slate-500">{metric.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold">线性回归模型</h4>
              <p className="text-slate-400 text-sm">简单易懂，系数可解释</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-amber-500 rounded-full"></span>最小二乘法拟合线性关系</li>
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-amber-500 rounded-full"></span>训练速度极快，易于工程实现</li>
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-amber-500 rounded-full"></span>模型系数具有明确的数学含义</li>
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-amber-500 rounded-full"></span>适合作为基准模型</li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <LineChart className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold">随机森林模型</h4>
              <p className="text-slate-400 text-sm">捕捉非线性关系</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>基于Bagging的集成学习方法</li>
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>100棵决策树集成，降低过拟合风险</li>
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>对缺失值和异常值具有较强的鲁棒性</li>
            <li className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>适合处理复杂非线性数据</li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">评估结论</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">模型效果优秀</span>
            </div>
            <p className="text-slate-400 text-sm">两个模型的R²都超过99%，说明预测能力非常强</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-medium">线性回归略优</span>
            </div>
            <p className="text-slate-400 text-sm">线性回归的MAE和RMSE略低，说明基金收益率具有较强的线性特征</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">误差控制良好</span>
            </div>
            <p className="text-slate-400 text-sm">MAE仅0.015元，MAPE仅1.45%，预测误差非常小</p>
          </div>
        </div>
      </div>
    </div>
  );
}
