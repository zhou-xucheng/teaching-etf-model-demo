import ReactECharts from "echarts-for-react";
import { Calendar, TrendingUp, Database, FileText } from "lucide-react";

const fundList = [
  { code: "512480", name: "华夏国证半导体芯片ETF", category: "科技/芯片", count: 1380 },
  { code: "588090", name: "易方达科创板芯片ETF", category: "科技/芯片", count: 1250 },
  { code: "513050", name: "华夏恒生科技ETF", category: "港股/科技", count: 1420 },
  { code: "513130", name: "华泰柏瑞恒生科技ETF", category: "港股/科技", count: 1350 },
  { code: "161725", name: "招商中证白酒指数", category: "白酒消费", count: 1480 },
  { code: "159928", name: "鹏华中证酒ETF", category: "白酒消费", count: 1400 },
  { code: "513100", name: "国泰纳斯达克100ETF", category: "纳斯达克", count: 1450 },
  { code: "513500", name: "广发纳斯达克100ETF", category: "纳斯达克", count: 1380 },
  { code: "515700", name: "华夏新能源汽车ETF", category: "新能源", count: 1320 },
  { code: "009548", name: "平安新能源精选混合", category: "新能源", count: 1280 },
  { code: "512120", name: "易方达沪深300医药卫生ETF", category: "医疗健康", count: 1410 },
  { code: "512290", name: "景顺长城中证医药卫生ETF", category: "医疗健康", count: 1360 },
];

const categoryColors: Record<string, string> = {
  "科技/芯片": "#f59e0b",
  "港股/科技": "#3b82f6",
  "白酒消费": "#8b5cf6",
  "纳斯达克": "#06b6d4",
  "新能源": "#10b981",
  "医疗健康": "#ef4444",
};

export default function DataOverview() {
  const yearData = [
    { year: "2020", count: 8500 },
    { year: "2021", count: 11200 },
    { year: "2022", count: 10800 },
    { year: "2023", count: 11500 },
    { year: "2024", count: 11000 },
    { year: "2025", count: 11132 },
  ];

  const lineOption = {
    tooltip: { trigger: "axis" },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "10%", containLabel: true },
    xAxis: { type: "category", data: yearData.map((d) => d.year), axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } } },
    yAxis: { type: "value", axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } }, splitLine: { lineStyle: { color: "#334155" } } },
    series: [{
      name: "数据量",
      type: "line",
      data: yearData.map((d) => d.count),
      smooth: true,
      itemStyle: { color: "#f59e0b" },
      lineStyle: { width: 3 },
      areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(245,158,11,0.3)" }, { offset: 1, color: "rgba(245,158,11,0)" }] } },
    }],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Database className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">总数据量</p>
              <p className="text-2xl font-bold text-white">54,132</p>
              <p className="text-slate-500 text-xs">条日频数据</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">有效样本</p>
              <p className="text-2xl font-bold text-white">47,510</p>
              <p className="text-slate-500 text-xs">条清洗后数据</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">时间范围</p>
              <p className="text-xl font-bold text-white">2020-2025</p>
              <p className="text-slate-500 text-xs">5年完整数据</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">年度数据量分布</h3>
        <div className="h-64">
          <ReactECharts option={lineOption} style={{ height: "100%" }} />
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">基金列表（部分）</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">基金代码</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">基金名称</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">分类</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">数据量</th>
              </tr>
            </thead>
            <tbody>
              {fundList.map((fund, index) => (
                <tr key={fund.code} className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${index % 2 === 0 ? "bg-slate-700/10" : ""}`}>
                  <td className="py-3 px-4 text-white font-mono">{fund.code}</td>
                  <td className="py-3 px-4 text-slate-300">{fund.name}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${categoryColors[fund.category]}20`, color: categoryColors[fund.category] }}>
                      {fund.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-300">{fund.count.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-slate-500 text-sm mt-4">共44只基金，以上为部分展示</p>
      </div>
    </div>
  );
}
