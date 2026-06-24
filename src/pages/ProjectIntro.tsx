import ReactECharts from "echarts-for-react";
import { GraduationCap, AlertTriangle, BookOpen, Lightbulb, Target, BarChart3, Code, Eye, XCircle, TrendingUp, Shield, FileText, ExternalLink, GitBranch } from "lucide-react";

export default function ProjectIntro() {
  const methodologyChart = {
    tooltip: { trigger: "item" },
    legend: { top: "5%", left: "center", textStyle: { color: "#94a3b8" } },
    series: [
      {
        name: "方法论",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: "#1e293b", borderWidth: 2 },
        label: { show: false, position: "center" },
        emphasis: { label: { show: true, fontSize: 20, fontWeight: "bold", color: "#fff" } },
        labelLine: { show: false },
        data: [
          { value: 25, name: "数据采集", itemStyle: { color: "#10b981" } },
          { value: 20, name: "特征工程", itemStyle: { color: "#3b82f6" } },
          { value: 25, name: "模型构建", itemStyle: { color: "#f59e0b" } },
          { value: 15, name: "模型评估", itemStyle: { color: "#8b5cf6" } },
          { value: 15, name: "可视化展示", itemStyle: { color: "#ec4899" } },
        ],
      },
    ],
  };

  const modelCompareChart = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: ["线性回归", "随机森林"], textStyle: { color: "#94a3b8" } },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "15%", containLabel: true },
    xAxis: { type: "category", data: ["R²", "MAE", "RMSE", "训练速度", "解释性"], axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } } },
    yAxis: { type: "value", axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } }, splitLine: { lineStyle: { color: "#334155" } } },
    series: [
      { name: "线性回归", type: "bar", data: [0.75, 0.85, 0.92, 95, 90], itemStyle: { color: "#f59e0b", borderRadius: [4, 4, 0, 0] } },
      { name: "随机森林", type: "bar", data: [0.88, 0.72, 0.78, 70, 60], itemStyle: { color: "#3b82f6", borderRadius: [4, 4, 0, 0] } },
    ],
  };

  return (
    <div className="space-y-8">
      {/* 项目标题 */}
      <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">项目说明</h3>
            <p className="text-slate-400 mt-1">教学意义与实际局限性分析</p>
          </div>
        </div>
      </div>

      {/* 教学意义部分 */}
      <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-6 h-6 text-emerald-400" />
          <h4 className="text-xl font-bold text-emerald-400">教学意义</h4>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">学术价值 ⭐⭐⭐⭐☆</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 方法论完整 */}
          <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <h5 className="text-lg font-medium text-white">方法论完整</h5>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              本项目展示了完整的金融数据分析流程，从数据采集到可视化展示，涵盖了金融大数据分析的核心方法论。
            </p>
            <div className="h-48">
              <ReactECharts option={methodologyChart} style={{ height: "100%" }} />
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300"><strong className="text-white">数据采集：</strong>使用AKShare采集44只ETF的54,132条日频数据</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300"><strong className="text-white">特征工程：</strong>计算MA、MACD、KDJ、RSI等30个技术指标</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300"><strong className="text-white">模型构建：</strong>线性回归与随机森林双模型对比</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300"><strong className="text-white">模型评估：</strong>MAE、RMSE、R²多维度评估指标</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300"><strong className="text-white">可视化展示：</strong>React + ECharts交互式可视化界面</span>
              </li>
            </ul>
          </div>

          {/* 模型对比分析 */}
          <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <h5 className="text-lg font-medium text-white">模型对比分析</h5>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              通过线性回归与随机森林的对比分析，展示了不同模型的特点和适用场景，是机器学习教学的典型案例。
            </p>
            <div className="h-48">
              <ReactECharts option={modelCompareChart} style={{ height: "100%" }} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <h6 className="text-amber-400 font-medium mb-2">线性回归</h6>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>✓ 训练速度快</li>
                  <li>✓ 解释性强</li>
                  <li>✓ 适合线性关系</li>
                  <li>✗ 非线性能力弱</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <h6 className="text-blue-400 font-medium mb-2">随机森林</h6>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>✓ 非线性能力强</li>
                  <li>✓ 预测精度高</li>
                  <li>✓ 特征重要性分析</li>
                  <li>✗ 解释性较弱</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 工程实践 */}
          <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-5 h-5 text-purple-400" />
              <h5 className="text-lg font-medium text-white">工程实践能力</h5>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              项目涵盖了从数据爬虫到前端可视化的完整技术栈，展示了扎实的工程实践能力。
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <h6 className="text-purple-400 font-medium text-sm mb-1">Python爬虫</h6>
                <p className="text-xs text-slate-400">AKShare数据采集 + 反爬机制</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <h6 className="text-purple-400 font-medium text-sm mb-1">特征工程</h6>
                <p className="text-xs text-slate-400">30个技术指标计算</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <h6 className="text-purple-400 font-medium text-sm mb-1">机器学习</h6>
                <p className="text-xs text-slate-400">sklearn模型构建与评估</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <h6 className="text-purple-400 font-medium text-sm mb-1">前端开发</h6>
                <p className="text-xs text-slate-400">React + TypeScript + ECharts</p>
              </div>
            </div>
            <div className="mt-4 bg-slate-700/50 rounded-lg p-3">
              <h6 className="text-slate-300 font-medium text-sm mb-2">反爬机制设计</h6>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• 随机延迟：1.5-3.5秒请求间隔</li>
                <li>• User-Agent轮换：模拟不同浏览器</li>
                <li>• 自动重试：最多3次重试机制</li>
                <li>• 异常处理：记录日志并跳过失败项</li>
              </ul>
            </div>
          </div>

          {/* 可视化能力 */}
          <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-pink-400" />
              <h5 className="text-lg font-medium text-white">可视化能力展示</h5>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              使用React + ECharts构建了6个可视化页面，展示了数据分析和模型评估结果。
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
                <div className="w-8 h-8 rounded bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">1</div>
                <div>
                  <h6 className="text-white font-medium text-sm">仪表盘</h6>
                  <p className="text-xs text-slate-400">关键指标卡片、基金分布饼图</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
                <div className="w-8 h-8 rounded bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">2</div>
                <div>
                  <h6 className="text-white font-medium text-sm">数据概览</h6>
                  <p className="text-xs text-slate-400">数据统计、年度趋势、基金列表</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
                <div className="w-8 h-8 rounded bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">3</div>
                <div>
                  <h6 className="text-white font-medium text-sm">模型评估</h6>
                  <p className="text-xs text-slate-400">雷达图、误差对比、评估指标</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
                <div className="w-8 h-8 rounded bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">4</div>
                <div>
                  <h6 className="text-white font-medium text-sm">特征分析</h6>
                  <p className="text-xs text-slate-400">特征重要性排名、指标详解</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
                <div className="w-8 h-8 rounded bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">5</div>
                <div>
                  <h6 className="text-white font-medium text-sm">预测可视化</h6>
                  <p className="text-xs text-slate-400">真实vs预测对比、残差分析</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
                <div className="w-8 h-8 rounded bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">6</div>
                <div>
                  <h6 className="text-white font-medium text-sm">实时预测</h6>
                  <p className="text-xs text-slate-400">输入数据、预测结果、置信度展示</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 为什么选择这些技术 */}
        <div className="mt-6 bg-slate-800/50 rounded-lg p-5 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h5 className="text-lg font-medium text-white">为什么选择这些技术？</h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h6 className="text-yellow-400 font-medium mb-2">Python + AKShare</h6>
              <p className="text-xs text-slate-400">AKShare是国内最流行的金融数据接口，免费、稳定、数据丰富，适合学术研究和教学演示。</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h6 className="text-yellow-400 font-medium mb-2">线性回归 + 随机森林</h6>
              <p className="text-xs text-slate-400">两个模型代表了传统机器学习的典型方法，对比分析能清晰展示不同模型的特点，适合教学演示。</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h6 className="text-yellow-400 font-medium mb-2">React + ECharts</h6>
              <p className="text-xs text-slate-400">React是主流前端框架，ECharts是国内最流行的可视化库，两者结合能快速构建交互式可视化界面。</p>
            </div>
          </div>
        </div>
      </div>

      {/* 实际局限性部分 */}
      <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <h4 className="text-xl font-bold text-red-400">实际局限性</h4>
          <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full">实战价值 ⭐⭐☆☆☆</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 模型局限 */}
          <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-5 h-5 text-red-400" />
              <h5 className="text-lg font-medium text-white">模型局限性</h5>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span className="text-slate-300"><strong className="text-white">模型简单：</strong>线性回归和随机森林无法捕捉市场的复杂非线性关系</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span className="text-slate-300"><strong className="text-white">特征不足：</strong>仅30个技术指标，缺少新闻情感、宏观经济数据等关键因子</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span className="text-slate-300"><strong className="text-white">数据量有限：</strong>54,132条数据对于金融预测来说样本量偏小</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span className="text-slate-300"><strong className="text-white">缺少时序模型：</strong>没有使用LSTM、Transformer等时序深度学习模型</span>
              </li>
            </ul>
          </div>

          {/* 市场复杂性 */}
          <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              <h5 className="text-lg font-medium text-white">金融市场复杂性</h5>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">⚠</span>
                <span className="text-slate-300"><strong className="text-white">政策变化：</strong>央行政策、监管政策、国际政策等，模型无法预测</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">⚠</span>
                <span className="text-slate-300"><strong className="text-white">突发事件：</strong>疫情、战争、自然灾害等黑天鹅事件</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">⚠</span>
                <span className="text-slate-300"><strong className="text-white">市场情绪：</strong>投资者恐慌、贪婪等心理因素</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">⚠</span>
                <span className="text-slate-300"><strong className="text-white">资金流向：</strong>大资金进出、机构操作等</span>
              </li>
            </ul>
          </div>

          {/* 实际效果 */}
          <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <h5 className="text-lg font-medium text-white">实际预测效果</h5>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <h6 className="text-amber-400 font-medium text-sm mb-1">趋势方向</h6>
                <p className="text-xs text-slate-400">可能有一定参考价值</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <h6 className="text-red-400 font-medium text-sm mb-1">价格精度</h6>
                <p className="text-xs text-slate-400">误差通常在1-3%或更高</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <h6 className="text-red-400 font-medium text-sm mb-1">置信度</h6>
                <p className="text-xs text-slate-400">显示值是模拟值，非真实统计</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <h6 className="text-red-400 font-medium text-sm mb-1">稳定性</h6>
                <p className="text-xs text-slate-400">不同市场环境表现差异大</p>
              </div>
            </div>
          </div>

          {/* 改进方向 */}
          <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              <h5 className="text-lg font-medium text-white">改进方向</h5>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">→</span>
                <span className="text-slate-300">引入新闻情感分析、社交媒体情绪数据</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">→</span>
                <span className="text-slate-300">使用LSTM、Transformer等时序深度学习模型</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">→</span>
                <span className="text-slate-300">增加宏观经济指标（利率、GDP、通胀率等）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">→</span>
                <span className="text-slate-300">扩大样本量，包含不同市场环境的数据</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 重要警告 */}
      <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <Shield className="w-8 h-8 text-red-400" />
          <h4 className="text-xl font-bold text-red-400">重要警告</h4>
        </div>
        <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
          <p className="text-red-300 text-lg font-medium mb-2">
            ⚠️ 本预测系统不能用于实际投资决策！
          </p>
          <ul className="text-red-400 text-sm space-y-2">
            <li>• 预测结果仅供参考，不构成任何投资建议</li>
            <li>• 金融市场受多种不可预测因素影响，历史数据不能完全反映未来走势</li>
            <li>• 投资有风险，入市需谨慎</li>
            <li>• 请咨询专业投资顾问，不要依赖本系统进行投资决策</li>
          </ul>
        </div>
      </div>

      {/* 项目总结 */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-5 h-5 text-slate-400" />
          <h4 className="text-lg font-medium text-white">项目总结</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-center">
            <h5 className="text-emerald-400 font-medium mb-2">学术价值</h5>
            <div className="text-3xl font-bold text-white mb-1">⭐⭐⭐⭐</div>
            <p className="text-xs text-slate-400">方法论完整，适合教学</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
            <h5 className="text-red-400 font-medium mb-2">实战价值</h5>
            <div className="text-3xl font-bold text-white mb-1">⭐⭐</div>
            <p className="text-xs text-slate-400">准确性有限，不可投资</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
            <h5 className="text-blue-400 font-medium mb-2">可视化价值</h5>
            <div className="text-3xl font-bold text-white mb-1">⭐⭐⭐⭐</div>
            <p className="text-xs text-slate-400">界面美观，交互友好</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
            <h5 className="text-purple-400 font-medium mb-2">工程价值</h5>
            <div className="text-3xl font-bold text-white mb-1">⭐⭐⭐</div>
            <p className="text-xs text-slate-400">技术栈合理，代码规范</p>
          </div>
        </div>
      </div>

      {/* Git仓库信息 */}
      <div className="bg-gradient-to-br from-gray-500/10 to-slate-500/10 border border-gray-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <GitBranch className="w-6 h-6 text-gray-400" />
          <h4 className="text-xl font-bold text-gray-400">Git仓库信息</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
            <h5 className="text-white font-medium mb-3">仓库配置</h5>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">仓库名称：</span>
                <code className="bg-slate-700 px-2 py-1 rounded text-blue-400">etf-predict-visualization</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">仓库描述：</span>
                <span className="text-white">基于多源特征的ETF收益率预测与可视化系统（教学演示版）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-400">简介：</span>
                <span className="text-slate-300">本项目展示了完整的金融数据分析流程，包括数据采集、特征工程、模型构建、模型评估和可视化展示。适合作为金融大数据课程设计的教学演示案例。请注意：本系统预测结果仅供参考，不能用于实际投资决策。</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
            <h5 className="text-white font-medium mb-3">上传文件清单</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <code className="text-slate-300">src/</code>
                <span className="text-slate-500">- 源代码目录</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <code className="text-slate-300">index.html</code>
                <span className="text-slate-500">- HTML模板</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <code className="text-slate-300">package.json</code>
                <span className="text-slate-500">- 依赖配置</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <code className="text-slate-300">vite.config.ts</code>
                <span className="text-slate-500">- Vite配置</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <code className="text-slate-300">tsconfig.json</code>
                <span className="text-slate-500">- TypeScript配置</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <code className="text-slate-300">.gitignore</code>
                <span className="text-slate-500">- Git忽略配置</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">✗</span>
                <code className="text-slate-300">node_modules/</code>
                <span className="text-slate-500">- 不上传</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">✗</span>
                <code className="text-slate-300">dist/</code>
                <span className="text-slate-500">- 不上传</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}