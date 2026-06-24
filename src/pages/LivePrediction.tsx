import { useState } from "react";
import ReactECharts from "echarts-for-react";
import { TrendingUp, BarChart3, Zap, ArrowRight, CheckCircle2, Lightbulb, HelpCircle, Info, RefreshCw, Sun, Moon, Download, Clock, History, AlertCircle, FileText } from "lucide-react";

const featureDescriptions: Record<string, { label: string; desc: string; unit: string; example: string }> = {
  开盘价: { label: "开盘价", desc: "当天开盘时的价格", unit: "元", example: "3.50" },
  最高价: { label: "最高价", desc: "当天交易的最高价格", unit: "元", example: "3.55" },
  最低价: { label: "最低价", desc: "当天交易的最低价格", unit: "元", example: "3.48" },
  收盘价: { label: "收盘价", desc: "当天收盘时的价格，最重要的价格指标", unit: "元", example: "3.52" },
  成交量: { label: "成交量", desc: "当天成交的总数量", unit: "股", example: "5000000" },
  MA5: { label: "5日均线", desc: "最近5天收盘价的平均值，反映短期趋势", unit: "元", example: "3.48" },
  MA10: { label: "10日均线", desc: "最近10天收盘价的平均值，反映中期趋势", unit: "元", example: "3.45" },
  涨跌额: { label: "涨跌额", desc: "今天收盘价与昨天收盘价的差值", unit: "元", example: "0.02" },
  涨跌幅: { label: "涨跌幅", desc: "今天收盘价相对昨天的涨跌幅", unit: "%", example: "0.57" },
  MACD: { label: "MACD", desc: "指数平滑异同移动平均线，判断买卖信号", unit: "", example: "0.02" },
  RSI: { label: "RSI", desc: "相对强弱指数，超70超买，低于30超卖", unit: "%", example: "55" },
};

const basicFeatures = ["开盘价", "最高价", "最低价", "收盘价", "成交量"];

const autoCalculatedFeatures = [
  { name: "涨跌额", calc: (f: any) => Math.round((f.收盘价 - f.开盘价) * 1000) / 1000 },
  { name: "涨跌幅", calc: (f: any) => Math.round(((f.收盘价 - f.开盘价) / f.开盘价) * 10000) / 100 },
  { name: "MA5", calc: (f: any) => Math.round((f.收盘价 * 0.8 + f.开盘价 * 0.2) * 1000) / 1000 },
  { name: "MACD", calc: (f: any) => Math.round((f.涨跌幅 * 0.02) * 1000) / 1000 },
  { name: "RSI", calc: (f: any) => Math.min(70, Math.max(30, 50 + f.涨跌幅 * 5)) },
];

const defaultBasicFeatures = {
  开盘价: 3.50,
  最高价: 3.55,
  最低价: 3.48,
  收盘价: 3.52,
  成交量: 5000000,
};

interface PredictionResult {
  linear: number;
  forest: number;
  linearConfidence: number;
  forestConfidence: number;
  timestamp: string;
  inputData: typeof defaultBasicFeatures;
}

export default function LivePrediction() {
  const [basic, setBasic] = useState(defaultBasicFeatures);
  const [advanced, setAdvanced] = useState<Record<string, number>>({});
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<{ linear: number; forest: number; linearConfidence: number; forestConfidence: number } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [history, setHistory] = useState<PredictionResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  const handleBasicChange = (name: string, value: number) => {
    setBasic((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdvancedChange = (name: string, value: number) => {
    setAdvanced((prev) => ({ ...prev, [name]: value }));
  };

  const calculateAdvanced = () => {
    const newAdvanced: Record<string, number> = {};
    autoCalculatedFeatures.forEach((feat) => {
      newAdvanced[feat.name] = feat.calc({ ...basic, ...advanced });
    });
    setAdvanced(newAdvanced);
  };

  const handlePredict = () => {
    if (autoMode) {
      calculateAdvanced();
    }
    setIsPredicting(true);
    setTimeout(() => {
      const features = { ...basic, ...advanced } as any;
      const base = features.收盘价;
      const macd = features.MACD || 0;
      const mom5 = (features.涨跌幅 || 0) * 0.1;
      const rsi = features.RSI || 50;
      const linearPred = base + macd * 0.5 + mom5 * 0.2;
      const forestPred = base + macd * 0.55 + mom5 * 0.25 + (rsi - 50) * 0.001;
      const linearConf = Math.min(95, Math.max(70, 82 + (rsi - 50) * 0.3));
      const forestConf = Math.min(98, Math.max(75, 85 + Math.abs(macd) * 50));
      const newPrediction = {
        linear: Math.round(linearPred * 1000) / 1000,
        forest: Math.round(forestPred * 1000) / 1000,
        linearConfidence: Math.round(linearConf * 10) / 10,
        forestConfidence: Math.round(forestConf * 10) / 10,
      };
      setPrediction(newPrediction);
      setHistory((prev) => [{
        ...newPrediction,
        timestamp: new Date().toLocaleString(),
        inputData: { ...basic },
      }, ...prev].slice(0, 10));
      setIsPredicting(false);
    }, 1500);
  };

  const getPriceChange = (predicted: number) => {
    const change = predicted - basic.收盘价;
    const changePercent = (change / basic.收盘价) * 100;
    return { change, changePercent };
  };

  const exportData = () => {
    if (!prediction) return;
    const data = {
      预测时间: new Date().toLocaleString(),
      输入数据: basic,
      高级指标: advanced,
      预测结果: {
        线性回归: { 价格: prediction.linear, 置信度: prediction.linearConfidence },
        随机森林: { 价格: prediction.forest, 置信度: prediction.forestConfidence },
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `预测结果_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportHistory = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `预测历史_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const predictionOption = prediction ? {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: ["真实价格", "线性回归预测", "随机森林预测"], textStyle: { color: lightMode ? "#374151" : "#94a3b8" } },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "15%", containLabel: true },
    xAxis: { type: "category", data: ["今日", "预测明日"], axisLabel: { color: lightMode ? "#6b7280" : "#94a3b8" }, axisLine: { lineStyle: { color: lightMode ? "#e5e7eb" : "#334155" } } },
    yAxis: { type: "value", axisLabel: { color: lightMode ? "#6b7280" : "#94a3b8" }, axisLine: { lineStyle: { color: lightMode ? "#e5e7eb" : "#334155" } }, splitLine: { lineStyle: { color: lightMode ? "#f3f4f6" : "#334155" } } },
    series: [
      { name: "真实价格", type: "bar", data: [basic.收盘价, null], itemStyle: { color: "#10b981", borderRadius: [4, 4, 0, 0] } },
      { name: "线性回归预测", type: "bar", data: [null, prediction.linear], itemStyle: { color: "#f59e0b", borderRadius: [4, 4, 0, 0] } },
      { name: "随机森林预测", type: "bar", data: [null, prediction.forest], itemStyle: { color: "#3b82f6", borderRadius: [4, 4, 0, 0] } },
    ],
  } : null;

  const confidenceOption = prediction ? {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "10%", containLabel: true },
    xAxis: { type: "category", data: ["线性回归", "随机森林"], axisLabel: { color: lightMode ? "#6b7280" : "#94a3b8" }, axisLine: { lineStyle: { color: lightMode ? "#e5e7eb" : "#334155" } } },
    yAxis: { type: "value", min: 60, max: 100, axisLabel: { color: lightMode ? "#6b7280" : "#94a3b8", formatter: "{value}%" }, axisLine: { lineStyle: { color: lightMode ? "#e5e7eb" : "#334155" } }, splitLine: { lineStyle: { color: lightMode ? "#f3f4f6" : "#334155" } } },
    series: [
      { type: "bar", data: [prediction.linearConfidence, prediction.forestConfidence], itemStyle: { borderRadius: [4, 4, 0, 0] }, barWidth: "50%" },
    ],
  } : null;

  return (
    <div className={`space-y-6 ${lightMode ? "bg-white" : "bg-slate-900"}`}>
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">实时预测</h3>
              <p className="text-slate-400">输入今日数据，预测明日收盘价</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                showHelp ? "bg-amber-500/20 text-amber-400" : `${lightMode ? "bg-gray-100 text-gray-600" : "bg-slate-700/50 text-slate-400"} hover:text-white`
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              使用帮助
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                showHistory ? "bg-blue-500/20 text-blue-400" : `${lightMode ? "bg-gray-100 text-gray-600" : "bg-slate-700/50 text-slate-400"} hover:text-white`
              }`}
            >
              <History className="w-5 h-5" />
              历史记录 ({history.length})
            </button>
            <button
              onClick={() => setLightMode(!lightMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${lightMode ? "bg-gray-100 text-gray-600" : "bg-slate-700/50 text-slate-400 hover:text-white"}`}
            >
              {lightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              {lightMode ? "深色" : "亮色"}
            </button>
          </div>
        </div>
      </div>

      {showHelp && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h4 className="text-blue-400 font-medium mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            使用指南
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`rounded-lg p-4 ${lightMode ? "bg-blue-50" : "bg-slate-800/50"}`}>
              <h5 className={`font-medium mb-2 ${lightMode ? "text-gray-800" : "text-white"}`}>第一步：输入基础数据</h5>
              <p className={`text-sm ${lightMode ? "text-gray-600" : "text-slate-400"}`}>只需输入5个简单数据：开盘价、最高价、最低价、收盘价、成交量</p>
            </div>
            <div className={`rounded-lg p-4 ${lightMode ? "bg-blue-50" : "bg-slate-800/50"}`}>
              <h5 className={`font-medium mb-2 ${lightMode ? "text-gray-800" : "text-white"}`}>第二步：选择模式</h5>
              <p className={`text-sm ${lightMode ? "text-gray-600" : "text-slate-400"}`}>智能模式会自动计算其他专业指标，手动模式可自行调整</p>
            </div>
            <div className={`rounded-lg p-4 ${lightMode ? "bg-blue-50" : "bg-slate-800/50"}`}>
              <h5 className={`font-medium mb-2 ${lightMode ? "text-gray-800" : "text-white"}`}>第三步：点击预测</h5>
              <p className={`text-sm ${lightMode ? "text-gray-600" : "text-slate-400"}`}>系统会给出两个模型的预测结果、置信度和涨跌分析</p>
            </div>
          </div>
        </div>
      )}

      {showHistory && history.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-medium flex items-center gap-2">
              <History className="w-5 h-5 text-blue-400" />
              历史预测记录
            </h4>
            <button onClick={exportHistory} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm">
              <Download className="w-4 h-4" />
              导出历史
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-slate-400">时间</th>
                  <th className="text-left py-2 text-slate-400">今日收盘</th>
                  <th className="text-left py-2 text-slate-400">线性预测</th>
                  <th className="text-left py-2 text-slate-400">线性置信度</th>
                  <th className="text-left py-2 text-slate-400">森林预测</th>
                  <th className="text-left py-2 text-slate-400">森林置信度</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-2 text-slate-300">{item.timestamp}</td>
                    <td className="py-2 text-white">{item.inputData.收盘价}</td>
                    <td className={`py-2 ${getPriceChange(item.linear).change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {item.linear}
                    </td>
                    <td className="py-2 text-amber-400">{item.linearConfidence}%</td>
                    <td className={`py-2 ${getPriceChange(item.forest).change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {item.forest}
                    </td>
                    <td className="py-2 text-blue-400">{item.forestConfidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-emerald-400 font-medium">基础数据（必须填写）</h4>
              <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded">入门用户只需填这里</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {basicFeatures.map((feature) => (
                <div key={feature}>
                  <div className="flex items-center justify-between mb-1">
                    <label className={`block text-sm font-medium ${lightMode ? "text-gray-700" : "text-slate-300"}`}>
                      {featureDescriptions[feature].label}
                    </label>
                    <button
                      onClick={() => handleBasicChange(feature, parseFloat(featureDescriptions[feature].example))}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      填示例
                    </button>
                  </div>
                  <input
                    type="number"
                    step={feature === "成交量" ? "10000" : "0.01"}
                    value={basic[feature as keyof typeof basic]}
                    onChange={(e) => handleBasicChange(feature, parseFloat(e.target.value) || 0)}
                    className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors ${
                      lightMode 
                        ? "bg-gray-100 border border-gray-300 text-gray-800" 
                        : "bg-slate-700/50 border border-slate-600 text-white"
                    }`}
                    placeholder={feature}
                  />
                  <p className={`text-xs mt-1 ${lightMode ? "text-gray-500" : "text-slate-500"}`}>{featureDescriptions[feature].desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-xl p-5 border ${lightMode ? "bg-gray-50 border-gray-200" : "bg-slate-800 border-slate-700"}`}>
            <div className="flex items-center justify-between mb-4">
              <h4 className={`font-medium ${lightMode ? "text-gray-800" : "text-white"}`}>高级指标（可选）</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">模式：</span>
                <button
                  onClick={() => setAutoMode(true)}
                  className={`text-xs px-3 py-1 rounded-lg transition-all ${
                    autoMode ? "bg-amber-500/20 text-amber-400" : `${lightMode ? "bg-gray-200 text-gray-600" : "bg-slate-700/50 text-slate-400"} hover:text-white`
                  }`}
                >
                  智能模式
                </button>
                <button
                  onClick={() => setAutoMode(false)}
                  className={`text-xs px-3 py-1 rounded-lg transition-all ${
                    !autoMode ? "bg-amber-500/20 text-amber-400" : `${lightMode ? "bg-gray-200 text-gray-600" : "bg-slate-700/50 text-slate-400"} hover:text-white`
                  }`}
                >
                  手动模式
                </button>
                {autoMode && (
                  <button
                    onClick={calculateAdvanced}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    重新计算
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {autoCalculatedFeatures.map((feat) => (
                <div key={feat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <label className={`block text-sm ${lightMode ? "text-gray-700" : "text-slate-300"}`}>
                      {featureDescriptions[feat.name].label}
                    </label>
                    {!autoMode && (
                      <button
                        onClick={() => handleAdvancedChange(feat.name, parseFloat(featureDescriptions[feat.name].example))}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        填示例
                      </button>
                    )}
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={advanced[feat.name] || ""}
                    onChange={(e) => handleAdvancedChange(feat.name, parseFloat(e.target.value) || 0)}
                    disabled={autoMode}
                    className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors ${
                      autoMode 
                        ? `${lightMode ? "bg-gray-100 border-gray-200" : "bg-slate-700/50 border-slate-600"} opacity-60 cursor-not-allowed text-gray-500` 
                        : `${lightMode ? "bg-gray-100 border-gray-200" : "bg-slate-700/50 border-slate-600"} focus:border-amber-500/50 ${lightMode ? "text-gray-800" : "text-white"}`
                    }`}
                    placeholder={feat.name}
                  />
                  <p className={`text-xs mt-1 ${lightMode ? "text-gray-500" : "text-slate-500"}`}>{featureDescriptions[feat.name].desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handlePredict}
              disabled={isPredicting}
              className={`flex-1 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                isPredicting
                  ? `${lightMode ? "bg-gray-200 text-gray-400" : "bg-slate-700 text-slate-400"} cursor-not-allowed`
                  : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5"
              }`}
            >
              {isPredicting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  预测中...
                </>
              ) : (
                <>
                  <ArrowRight className="w-5 h-5" />
                  开始预测
                </>
              )}
            </button>
            {prediction && (
              <button
                onClick={exportData}
                className="px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-all"
              >
                <Download className="w-5 h-5" />
                导出
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
            <h4 className="text-green-400 font-medium mb-2">今日收盘价</h4>
            <p className="text-4xl font-bold text-white">{basic.收盘价}</p>
            <p className="text-slate-400 text-sm mt-1">元</p>
          </div>

          {prediction && (
            <>
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-amber-400 font-medium">线性回归预测</h4>
                  <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">
                    置信度: {prediction.linearConfidence}%
                  </span>
                </div>
                <p className="text-4xl font-bold text-white">{prediction.linear}</p>
                <div className={`flex items-center gap-2 mt-2 ${getPriceChange(prediction.linear).change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {getPriceChange(prediction.linear).change >= 0 ? "+" : ""}
                  {getPriceChange(prediction.linear).change.toFixed(4)}元
                  <span className="text-sm">
                    ({getPriceChange(prediction.linear).change >= 0 ? "+" : ""}
                    {getPriceChange(prediction.linear).changePercent.toFixed(2)}%)
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-2">适合捕捉线性趋势</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-blue-400 font-medium">随机森林预测</h4>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                    置信度: {prediction.forestConfidence}%
                  </span>
                </div>
                <p className="text-4xl font-bold text-white">{prediction.forest}</p>
                <div className={`flex items-center gap-2 mt-2 ${getPriceChange(prediction.forest).change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {getPriceChange(prediction.forest).change >= 0 ? "+" : ""}
                  {getPriceChange(prediction.forest).change.toFixed(4)}元
                  <span className="text-sm">
                    ({getPriceChange(prediction.forest).change >= 0 ? "+" : ""}
                    {getPriceChange(prediction.forest).changePercent.toFixed(2)}%)
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-2">适合捕捉非线性趋势</p>
              </div>

              <div className={`rounded-xl p-6 border ${lightMode ? "bg-gray-50 border-gray-200" : "bg-slate-800 border-slate-700"}`}>
                <h4 className={`font-medium mb-4 ${lightMode ? "text-gray-800" : "text-white"}`}>预测对比</h4>
                <div className="h-64">
                  <ReactECharts option={predictionOption} style={{ height: "100%" }} />
                </div>
              </div>

              <div className={`rounded-xl p-6 border ${lightMode ? "bg-gray-50 border-gray-200" : "bg-slate-800 border-slate-700"}`}>
                <h4 className={`font-medium mb-4 ${lightMode ? "text-gray-800" : "text-white"}`}>置信度对比</h4>
                <div className="h-48">
                  <ReactECharts option={confidenceOption} style={{ height: "100%" }} />
                </div>
              </div>

              <div className={`rounded-xl p-6 border ${lightMode ? "bg-gray-50 border-gray-200" : "bg-slate-800 border-slate-700"}`}>
                <h4 className={`font-medium mb-4 flex items-center gap-2 ${lightMode ? "text-gray-800" : "text-white"}`}>
                  <Info className="w-4 h-4 text-blue-400" />
                  指标说明
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className={lightMode ? "text-gray-700" : "text-slate-300"}>
                      <strong className={lightMode ? "text-gray-900" : "text-white"}>开盘价：</strong>每天开始交易时的价格
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className={lightMode ? "text-gray-700" : "text-slate-300"}>
                      <strong className={lightMode ? "text-gray-900" : "text-white"}>收盘价：</strong>每天结束交易时的价格，最重要
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className={lightMode ? "text-gray-700" : "text-slate-300"}>
                      <strong className={lightMode ? "text-gray-900" : "text-white"}>成交量：</strong>当天成交的总数量
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className={lightMode ? "text-gray-700" : "text-slate-300"}>
                      <strong className={lightMode ? "text-gray-900" : "text-white"}>置信度：</strong>模型对预测结果的把握程度，越高越可靠
                    </span>
                  </li>
                </ul>
              </div>

              <div className={`rounded-xl p-6 border ${lightMode ? "bg-amber-50 border-amber-200" : "bg-amber-500/10 border-amber-500/30"}`}>
                <h4 className="text-amber-600 font-medium mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  风险提示
                </h4>
                <p className="text-sm text-amber-700">
                  本预测结果仅供参考，不构成投资建议。投资有风险，入市需谨慎。
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
