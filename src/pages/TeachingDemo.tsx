import { useState } from "react";
import ReactECharts from "echarts-for-react";
import { Database, Cpu, BarChart3, Eye, ArrowRight, Play, CheckCircle2, Lightbulb, BookOpen, GraduationCap, RefreshCw, Sparkles, Code, TrendingUp, LineChart, Activity, Zap, Shield, Target, Rocket, CircuitBoard } from "lucide-react";

interface TeachingStep {
  id: number;
  title: string;
  icon: any;
  description: string;
  color: string;
  glowColor: string;
  bgGradient: string;
  borderColor: string;
}

const teachingSteps: TeachingStep[] = [
  { id: 1, title: "数据采集", icon: Database, description: "DATA ACQUISITION", color: "cyan", glowColor: "rgba(6, 182, 212, 0.4)", bgGradient: "from-cyan-500/15 to-cyan-600/5", borderColor: "border-cyan-500/30" },
  { id: 2, title: "特征工程", icon: BarChart3, description: "FEATURE ENGINEERING", color: "purple", glowColor: "rgba(168, 85, 247, 0.4)", bgGradient: "from-purple-500/15 to-purple-600/5", borderColor: "border-purple-500/30" },
  { id: 3, title: "模型构建", icon: Cpu, description: "MODEL BUILDING", color: "blue", glowColor: "rgba(59, 130, 246, 0.4)", bgGradient: "from-blue-500/15 to-blue-600/5", borderColor: "border-blue-500/30" },
  { id: 4, title: "模型评估", icon: Eye, description: "MODEL EVALUATION", color: "green", glowColor: "rgba(16, 185, 129, 0.4)", bgGradient: "from-green-500/15 to-green-600/5", borderColor: "border-green-500/30" },
  { id: 5, title: "可视化展示", icon: Sparkles, description: "VISUALIZATION", color: "pink", glowColor: "rgba(236, 72, 153, 0.4)", bgGradient: "from-pink-500/15 to-pink-600/5", borderColor: "border-pink-500/30" },
];

const rawDataSample = [
  { date: "2025-01-06", open: 3.52, high: 3.55, low: 3.48, close: 3.52, volume: 5000000 },
  { date: "2025-01-07", open: 3.53, high: 3.58, low: 3.50, close: 3.56, volume: 6200000 },
  { date: "2025-01-08", open: 3.57, high: 3.60, low: 3.54, close: 3.58, volume: 5800000 },
  { date: "2025-01-09", open: 3.59, high: 3.62, low: 3.55, close: 3.61, volume: 7100000 },
  { date: "2025-01-10", open: 3.62, high: 3.65, low: 3.58, close: 3.64, volume: 8500000 },
];

const featuresSample = [
  { name: "开盘价", value: 3.62, importance: 0.15 },
  { name: "收盘价", value: 3.64, importance: 0.18 },
  { name: "最高价", value: 3.65, importance: 0.12 },
  { name: "最低价", value: 3.58, importance: 0.11 },
  { name: "成交量", value: 8500000, importance: 0.14 },
  { name: "MA5", value: 3.58, importance: 0.08 },
  { name: "MACD", value: 0.02, importance: 0.07 },
  { name: "RSI", value: 58, importance: 0.05 },
];

const predictionData = [
  { date: "2025-01-10", actual: 3.64, linear: 3.63, forest: 3.65 },
  { date: "2025-01-11", actual: 3.68, linear: 3.66, forest: 3.67 },
  { date: "2025-01-12", actual: 3.72, linear: 3.70, forest: 3.71 },
  { date: "2025-01-13", actual: 3.69, linear: 3.71, forest: 3.68 },
  { date: "2025-01-14", actual: 3.75, linear: 3.73, forest: 3.74 },
];

const getColorClass = (color: string) => {
  const colors: Record<string, string> = {
    cyan: "text-cyan-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    pink: "text-pink-400",
    green: "text-green-400",
    amber: "text-amber-400",
  };
  return colors[color] || "text-white";
};

export default function TeachingDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playStep = () => {
    if (currentStep >= teachingSteps.length) { setIsPlaying(false); return; }
    setIsPlaying(true);
    setTimeout(() => {
      setCompletedSteps((prev) => [...prev, currentStep]);
      setCurrentStep((prev) => prev + 1);
      playStep();
    }, 3000);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPlaying(false);
  };

  const priceChartOption = {
    backgroundColor: "transparent",
    tooltip: { trigger: "axis", axisPointer: { type: "cross" }, backgroundColor: "rgba(15, 23, 42, 0.95)", borderColor: "#06b6d4", borderWidth: 1, textStyle: { color: "#fff" } },
    legend: { data: ["真实价格", "线性回归", "随机森林"], top: "5%", left: "center", textStyle: { color: "#94a3b8", fontSize: 12 } },
    grid: { left: "3%", right: "4%", bottom: "10%", top: "18%", containLabel: true },
    xAxis: { type: "category", data: predictionData.map((d) => d.date), axisLabel: { color: "#64748b", rotate: 45, fontSize: 10 }, axisLine: { lineStyle: { color: "#1e293b" } }, axisTick: { show: false } },
    yAxis: { type: "value", axisLabel: { color: "#64748b", fontSize: 11 }, axisLine: { lineStyle: { color: "#1e293b" } }, splitLine: { lineStyle: { color: "#1e293b", type: "dashed" } } },
    series: [
      { name: "真实价格", type: "line", data: predictionData.map((d) => d.actual), smooth: true, lineStyle: { width: 3, color: "#10b981" }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(16, 185, 129, 0.3)" }, { offset: 1, color: "rgba(16, 185, 129, 0)" }] } }, symbol: "circle", symbolSize: 8 },
      { name: "线性回归", type: "line", data: predictionData.map((d) => d.linear), smooth: true, lineStyle: { width: 2, color: "#f59e0b", type: "dashed" }, symbol: "circle", symbolSize: 6 },
      { name: "随机森林", type: "line", data: predictionData.map((d) => d.forest), smooth: true, lineStyle: { width: 2, color: "#06b6d4", type: "dashed" }, symbol: "circle", symbolSize: 6 },
    ],
  };

  const featureOption = {
    backgroundColor: "transparent",
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, backgroundColor: "rgba(15, 23, 42, 0.95)", borderColor: "#a855f7", borderWidth: 1, textStyle: { color: "#fff" } },
    grid: { left: "15%", right: "8%", bottom: "5%", top: "5%", containLabel: true },
    xAxis: { type: "value", axisLabel: { color: "#64748b", formatter: "{value}%", fontSize: 11 }, axisLine: { lineStyle: { color: "#1e293b" } }, splitLine: { lineStyle: { color: "#1e293b", type: "dashed" } } },
    yAxis: { type: "category", data: featuresSample.map((f) => f.name).reverse(), axisLabel: { color: "#94a3b8", fontSize: 12 }, axisLine: { lineStyle: { color: "#1e293b" } }, axisTick: { show: false } },
    series: [{ type: "bar", data: featuresSample.map((f) => f.importance * 100).reverse(), itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#7c3aed" }, { offset: 1, color: "#a855f7" }] }, borderRadius: [0, 6, 6, 0] }, barWidth: "50%" }],
  };

  const metricOption = {
    backgroundColor: "transparent",
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, backgroundColor: "rgba(15, 23, 42, 0.95)", borderColor: "#10b981", borderWidth: 1, textStyle: { color: "#fff" } },
    legend: { data: ["线性回归", "随机森林"], top: 0, textStyle: { color: "#94a3b8", fontSize: 12 } },
    grid: { left: "3%", right: "4%", bottom: "5%", top: "18%", containLabel: true },
    xAxis: { type: "category", data: ["R²", "MAE", "RMSE", "MAPE"], axisLabel: { color: "#94a3b8", fontSize: 12 }, axisLine: { lineStyle: { color: "#1e293b" } }, axisTick: { show: false } },
    yAxis: { type: "value", axisLabel: { color: "#64748b", fontSize: 11 }, axisLine: { lineStyle: { color: "#1e293b" } }, splitLine: { lineStyle: { color: "#1e293b", type: "dashed" } } },
    series: [
      { name: "线性回归", type: "bar", data: [0.785, 0.085, 0.112, 2.45], itemStyle: { color: "#f59e0b", borderRadius: [6, 6, 0, 0] }, barWidth: "35%" },
      { name: "随机森林", type: "bar", data: [0.882, 0.062, 0.085, 1.82], itemStyle: { color: "#3b82f6", borderRadius: [6, 6, 0, 0] }, barWidth: "35%" },
    ],
  };

  const rawDataChartOption = {
    backgroundColor: "transparent",
    tooltip: { trigger: "axis", backgroundColor: "rgba(15, 23, 42, 0.95)", borderColor: "#06b6d4", borderWidth: 1, textStyle: { color: "#fff" } },
    grid: { left: "3%", right: "4%", bottom: "10%", top: "5%", containLabel: true },
    xAxis: { type: "category", data: rawDataSample.map((d) => d.date), axisLabel: { color: "#64748b", rotate: 45, fontSize: 10 }, axisLine: { lineStyle: { color: "#1e293b" } }, axisTick: { show: false } },
    yAxis: { type: "value", axisLabel: { color: "#64748b", fontSize: 11 }, axisLine: { lineStyle: { color: "#1e293b" } }, splitLine: { lineStyle: { color: "#1e293b", type: "dashed" } } },
    series: [
      { name: "开盘价", type: "line", data: rawDataSample.map((d) => d.open), smooth: true, lineStyle: { width: 2, color: "#60a5fa" }, symbol: "circle", symbolSize: 6 },
      { name: "收盘价", type: "line", data: rawDataSample.map((d) => d.close), smooth: true, lineStyle: { width: 2, color: "#10b981" }, symbol: "circle", symbolSize: 6 },
      { name: "最高价", type: "line", data: rawDataSample.map((d) => d.high), smooth: true, lineStyle: { width: 2, color: "#fbbf24", type: "dashed" }, symbol: "circle", symbolSize: 4 },
      { name: "最低价", type: "line", data: rawDataSample.map((d) => d.low), smooth: true, lineStyle: { width: 2, color: "#ef4444", type: "dashed" }, symbol: "circle", symbolSize: 4 },
    ],
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                    <Database className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">数据采集模块</h3>
                    <p className="text-cyan-400 text-xs tracking-wider">DATA ACQUISITION</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-4">使用Python的AKShare库获取沪深ETF历史交易数据，通过反爬机制保障数据采集的稳定性和成功率。</p>
                <div className="bg-slate-900/80 rounded-lg p-4 border border-cyan-500/20 font-mono mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-slate-500 text-xs ml-2">data_collector.py</span>
                  </div>
                  <pre className="text-cyan-400 text-xs overflow-x-auto"><code>import akshare as ak

def fetch_etf_data(symbol):
    data = ak.fund_etf_hist_em(
        symbol=symbol,
        period="daily",
        start_date="20200101",
        end_date="20251231"
    )
    return data</code></pre>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-500/20">
                    <p className="text-cyan-400 text-2xl font-bold">44</p>
                    <p className="text-slate-400 text-xs">只ETF基金</p>
                  </div>
                  <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-500/20">
                    <p className="text-cyan-400 text-2xl font-bold">54K</p>
                    <p className="text-slate-400 text-xs">条数据记录</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                    <LineChart className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">原始数据预览</h3>
                    <p className="text-cyan-400 text-xs tracking-wider">RAW DATA</p>
                  </div>
                </div>
                <div className="h-48 mb-4">
                  <ReactECharts option={rawDataChartOption} style={{ height: "100%" }} />
                </div>
                <div className="overflow-x-auto bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="text-left py-2 px-3 text-cyan-400 font-medium">日期</th>
                        <th className="text-right py-2 px-3 text-cyan-400 font-medium">开盘</th>
                        <th className="text-right py-2 px-3 text-cyan-400 font-medium">最高</th>
                        <th className="text-right py-2 px-3 text-cyan-400 font-medium">最低</th>
                        <th className="text-right py-2 px-3 text-cyan-400 font-medium">收盘</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rawDataSample.slice(0, 3).map((row, i) => (
                        <tr key={i} className="border-b border-slate-700/30">
                          <td className="py-2 px-3 text-slate-300 font-mono">{row.date}</td>
                          <td className="py-2 px-3 text-right text-white">{row.open}</td>
                          <td className="py-2 px-3 text-right text-green-400">{row.high}</td>
                          <td className="py-2 px-3 text-right text-red-400">{row.low}</td>
                          <td className="py-2 px-3 text-right text-white">{row.close}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">数据处理流程</h3>
              </div>
              <div className="flex items-center justify-center gap-8 py-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto border border-cyan-500/30">
                    <Database className="w-8 h-8 text-cyan-400" />
                  </div>
                  <p className="mt-3 text-white font-semibold">数据采集</p>
                  <p className="text-slate-500 text-xs">AKShare API</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-500" />
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto border border-green-500/30">
                    <Shield className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="mt-3 text-white font-semibold">数据清洗</p>
                  <p className="text-slate-500 text-xs">去噪 / 补缺</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-500" />
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto border border-blue-500/30">
                    <Cpu className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="mt-3 text-white font-semibold">数据存储</p>
                  <p className="text-slate-500 text-xs">CSV / DataFrame</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">特征分类</h3>
                    <p className="text-purple-400 text-xs tracking-wider">FEATURES</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[{ name: "价格类特征", count: 4 }, { name: "成交量类", count: 3 }, { name: "均线类特征", count: 6 }, { name: "动量类特征", count: 5 }, { name: "震荡类特征", count: 8 }, { name: "波动率类", count: 4 }].map((cat, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                      <span className="text-slate-300 text-sm">{cat.name}</span>
                      <span className="text-purple-400 font-bold">{cat.count}个</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">特征重要性分析</h3>
                    <p className="text-purple-400 text-xs tracking-wider">IMPORTANCE</p>
                  </div>
                </div>
                <div className="h-64">
                  <ReactECharts option={featureOption} style={{ height: "100%" }} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Target, title: "提升模型表现", desc: "好的特征能让模型更容易学习到数据规律" },
                { icon: Zap, title: "降低计算复杂度", desc: "筛选重要特征可以减少训练时间" },
                { icon: Eye, title: "增强可解释性", desc: "理解哪些特征影响预测结果" },
              ].map((item, i) => (
                <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center border border-amber-500/30 mb-4">
                    <item.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                    <LineChart className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">线性回归模型</h3>
                    <p className="text-amber-400 text-xs tracking-wider">LINEAR REGRESSION</p>
                  </div>
                </div>
                <div className="bg-slate-900/80 rounded-lg p-4 mb-4 border border-amber-500/20">
                  <p className="text-amber-300 text-center font-mono text-sm">ŷ = β₀ + Σ βᵢ × featureᵢ</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <p className="text-green-400 font-semibold text-xs mb-2">✓ 优势</p>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li>• 训练速度快</li>
                      <li>• 解释性强</li>
                      <li>• 计算简单</li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                    <p className="text-red-400 font-semibold text-xs mb-2">✗ 局限</p>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li>• 假设线性关系</li>
                      <li>• 对异常值敏感</li>
                      <li>• 表达力有限</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-700/50 font-mono">
                  <pre className="text-amber-400 text-xs"><code>from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)</code></pre>
                </div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Cpu className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">随机森林模型</h3>
                    <p className="text-blue-400 text-xs tracking-wider">RANDOM FOREST</p>
                  </div>
                </div>
                <div className="bg-slate-900/80 rounded-lg p-4 mb-4 border border-blue-500/20">
                  <p className="text-blue-300 text-center text-xs mb-3">集成学习：多棵决策树投票</p>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-8 h-8 rounded bg-green-500/30 flex items-center justify-center border border-green-500/50 text-green-400 text-xs font-bold">
                        T{i}
                      </div>
                    ))}
                    <ArrowRight className="w-4 h-4 text-blue-500 mx-2" />
                    <div className="w-12 h-10 rounded-lg bg-blue-500/30 flex items-center justify-center border border-blue-500/50 text-blue-400 text-xs font-bold">AVG</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <p className="text-green-400 font-semibold text-xs mb-2">✓ 优势</p>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li>• 非线性能力强</li>
                      <li>• 鲁棒性好</li>
                      <li>• 特征重要性</li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                    <p className="text-red-400 font-semibold text-xs mb-2">✗ 局限</p>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li>• 训练较慢</li>
                      <li>• 黑盒特性</li>
                      <li>• 易过拟合</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-700/50 font-mono">
                  <pre className="text-blue-400 text-xs"><code>from sklearn.ensemble import RandomForestRegressor

model = RandomForestRegressor(n_estimators=100)
model.fit(X_train, y_train)</code></pre>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">模型训练流水线</h3>
              </div>
              <div className="flex items-center justify-center gap-6 py-4">
                {[
                  { title: "数据分割", desc: "70/30划分", icon: Target },
                  { title: "特征缩放", desc: "标准化处理", icon: Activity },
                  { title: "模型训练", desc: "拟合参数", icon: Cpu },
                  { title: "模型验证", desc: "交叉验证", icon: Shield },
                  { title: "模型保存", desc: "pickle序列化", icon: Code },
                ].map((item, i, arr) => (
                  <div key={i} className="flex items-center">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto border border-blue-500/30">
                        <item.icon className="w-7 h-7 text-blue-400" />
                      </div>
                      <p className="mt-3 text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-slate-500 text-xs">{item.desc}</p>
                    </div>
                    {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-slate-500 mx-3" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <BookOpen className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">评估指标</h3>
                    <p className="text-green-400 text-xs tracking-wider">METRICS</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "R² 决定系数", desc: "拟合优度，越接近1越好", value: "0.882", colorClass: "text-cyan-400" },
                    { name: "MAE 平均绝对误差", desc: "误差绝对值的均值", value: "0.062", colorClass: "text-blue-400" },
                    { name: "RMSE 均方根误差", desc: "对大误差更敏感", value: "0.085", colorClass: "text-purple-400" },
                    { name: "MAPE 平均绝对百分比误差", desc: "百分比误差，更直观", value: "1.82%", colorClass: "text-pink-400" },
                  ].map((metric, i) => (
                    <div key={i} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-semibold text-sm">{metric.name}</span>
                        <span className={`${metric.colorClass} font-bold text-lg`}>{metric.value}</span>
                      </div>
                      <p className="text-slate-500 text-xs">{metric.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <BarChart3 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">模型对比分析</h3>
                    <p className="text-green-400 text-xs tracking-wider">COMPARISON</p>
                  </div>
                </div>
                <div className="h-56 mb-6">
                  <ReactECharts option={metricOption} style={{ height: "100%" }} />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "R²提升", value: "+12.4%", positive: true },
                    { label: "MAE降低", value: "-27.1%", positive: true },
                    { label: "RMSE降低", value: "-24.1%", positive: true },
                    { label: "MAPE降低", value: "-25.7%", positive: true },
                  ].map((item, i) => (
                    <div key={i} className="text-center p-3 bg-slate-900/50 rounded-lg border border-green-500/20">
                      <p className={`text-xl font-bold ${item.positive ? "text-green-400" : "text-red-400"}`}>{item.value}</p>
                      <p className="text-slate-500 text-xs mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/30">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">评估结论</h3>
                  <p className="text-slate-400">随机森林模型在所有评估指标上均优于线性回归模型，证明非线性模型更适合处理金融时间序列预测问题。随机森林的 R² 达到 0.882，比线性回归提升了 12.4%。</p>
                </div>
                <div className="px-6 py-3 bg-green-500/20 rounded-xl border border-green-500/30">
                  <p className="text-green-400 text-xs tracking-wider">WINNER</p>
                  <p className="text-white font-bold">随机森林</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
                    <LineChart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">预测效果可视化</h3>
                    <p className="text-pink-400 text-xs tracking-wider">VISUALIZATION</p>
                  </div>
                </div>
                <div className="h-64">
                  <ReactECharts option={priceChartOption} style={{ height: "100%" }} />
                </div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
                    <Eye className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">图表图例解析</h3>
                    <p className="text-pink-400 text-xs tracking-wider">LEGEND</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-green-400 font-semibold">真实价格曲线</p>
                      <p className="text-slate-400 text-xs">ETF实际收盘价，作为基准对比</p>
                    </div>
                    <span className="text-green-400 font-bold">100%</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
                    <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                    <div className="flex-1">
                      <p className="text-amber-400 font-semibold">线性回归预测</p>
                      <p className="text-slate-400 text-xs">基于线性假设的预测结果</p>
                    </div>
                    <span className="text-amber-400 font-bold">78.5%</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                    <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
                    <div className="flex-1">
                      <p className="text-cyan-400 font-semibold">随机森林预测</p>
                      <p className="text-slate-400 text-xs">基于非线性模型的预测结果</p>
                    </div>
                    <span className="text-cyan-400 font-bold">88.2%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-xl p-10 border border-cyan-500/30 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">教学演示完成</h3>
              <p className="text-slate-400 text-lg mb-8">恭喜你完成了完整的ETF收益率预测流程学习！从数据采集到可视化展示，你已经掌握了金融大数据分析的核心方法论。</p>
              <div className="flex justify-center gap-4">
                <button onClick={resetDemo} className="flex items-center gap-2 px-8 py-4 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-600 transition-colors">
                  <RefreshCw className="w-5 h-5" />
                  重新开始
                </button>
                <button onClick={() => setCurrentStep(0)} className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  <Play className="w-5 h-5" />
                  再次播放
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">教学演示模式</h2>
              <p className="text-slate-400 text-sm">完整的ETF收益率预测流程交互式学习</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={playStep} disabled={isPlaying || currentStep >= teachingSteps.length} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${isPlaying || currentStep >= teachingSteps.length ? "bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg"}`}>
              {isPlaying ? <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                播放中
              </> : currentStep >= teachingSteps.length ? "演示已完成" : <>
                <Play className="w-5 h-5" />
                自动播放
              </>}
            </button>
            <button onClick={resetDemo} className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-600 transition-colors">
              <RefreshCw className="w-5 h-5" />
              重置
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {teachingSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === index;
          const isCompleted = completedSteps.includes(index);
          return (
            <button key={step.id} onClick={() => !isPlaying && setCurrentStep(index)} disabled={isPlaying} className={`p-4 rounded-xl transition-all ${isActive ? `bg-gradient-to-br ${step.bgGradient} ${step.borderColor} border-2` : isCompleted ? "bg-slate-800/50 border border-slate-700/50" : "bg-slate-800/30 border border-slate-700/30 opacity-60"}`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${isActive || isCompleted ? "bg-white/10" : "bg-slate-700/50"}`}>
                {isCompleted ? <CheckCircle2 className="w-6 h-6 text-green-400" /> : <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-slate-500"}`} />}
              </div>
              <p className={`text-sm font-bold ${isActive || isCompleted ? "text-white" : "text-slate-500"}`}>{step.title}</p>
            </button>
          );
        })}
      </div>

      {renderStepContent()}

      <div className="flex justify-between items-center py-4 px-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
        <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0 || isPlaying} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${currentStep === 0 || isPlaying ? "bg-slate-700/50 text-slate-600 cursor-not-allowed" : "bg-slate-700 text-white hover:bg-slate-600"}`}>
          <ArrowRight className="w-4 h-4 rotate-180" />
          上一步
        </button>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">进度</span>
          <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all" style={{ width: `${((currentStep + 1) / teachingSteps.length) * 100}%` }}></div>
          </div>
          <span className="text-slate-400 font-mono">{currentStep + 1}/{teachingSteps.length}</span>
        </div>
        <button onClick={() => setCurrentStep(Math.min(teachingSteps.length - 1, currentStep + 1))} disabled={currentStep >= teachingSteps.length - 1 || isPlaying} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${currentStep >= teachingSteps.length - 1 || isPlaying ? "bg-slate-700/50 text-slate-600 cursor-not-allowed" : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg"}`}>
          下一步
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
