/**
 * Global Logistics Engine - Core Logic
 */

(function () {
    // === 1. 计算引擎 (Calculation Engine) ===
    const METRIC = {
        calculateSampleCost(countryCode, category) {
            const data = LOGISTICS_DATA[countryCode];
            if (!data) return null;
            
            const sampleValueUSD = 100; // 默认演示金额
            const localRate = data.exchangeRateUSD;
            const rules = data.taxRules;
            
            let duty = 0;
            let details = "常规税率估算";
            const isTextile = category.includes("Textile");

            // 智能税率判断
            if (countryCode === "VN") {
                duty = sampleValueUSD * rules.dutyRateGeneral;
            } else if (countryCode === "MY") {
                duty = (sampleValueUSD * localRate > 500) ? sampleValueUSD * rules.dutyRateHigh : 0;
            } else if (countryCode === "ID") {
                if (isTextile) { duty = sampleValueUSD * rules.dutyRateTextile; details = "包含保护性高关税 (Safeguard Duty)"; }
                else { duty = sampleValueUSD * rules.dutyRateGeneral; }
            } else if (countryCode === "US") {
                if (sampleValueUSD < 800) { duty = 0; details = "800美元内免税 (De Minimis)"; }
                else { duty = sampleValueUSD * rules.dutyRateGeneral; }
            } else {
                duty = sampleValueUSD * rules.dutyRateGeneral;
            }

            const vatBase = sampleValueUSD + duty;
            const vat = vatBase * rules.vatRate;
            const totalTax = duty + vat;

            return {
                sampleUSD: sampleValueUSD,
                estimatedTaxUSD: totalTax.toFixed(2),
                details: details
            };
        }
    };

    // === 2. UI 渲染与交互 (DOM & Events) ===
    const els = {
        country: document.getElementById('countrySelect'),
        category: document.getElementById('categorySelect'),
        threshold: document.getElementById('thresholdBody'),
        channels: document.getElementById('channelsBody'),
        pitfall: document.getElementById('pitfallBody'),
        prohibited: document.getElementById('prohibitedList'),
        resultSection: document.getElementById('resultSection'),
        copyBtn: document.getElementById('copyBtn')
    };

    // 初始化
    function init() {
        // 填充下拉框
        els.country.innerHTML = `<option value="">-- Select Country --</option>` + 
            Object.keys(LOGISTICS_DATA).map(key => `<option value="${key}">${LOGISTICS_DATA[key].name}</option>`).join('');
        
        els.category.innerHTML = CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('');

        // URL 参数自动跳转
        const params = new URLSearchParams(location.search);
        if (params.get('country') && LOGISTICS_DATA[params.get('country')]) {
            els.country.value = params.get('country');
            if (params.get('cat')) els.category.value = params.get('cat');
            renderAll();
        }
    }

    // 渲染主函数
    function renderAll() {
        const key = els.country.value;
        const cat = els.category.value;
        const data = LOGISTICS_DATA[key];

        if (!data) return;

        els.resultSection.style.opacity = '1';

        // 1. 门槛
        els.threshold.innerHTML = `
            <div class="text-xl font-bold text-blue-700">${data.customs.thresholdDesc}</div>
            <div class="text-xs text-slate-500 mt-1">${data.customs.note}</div>
        `;

        // 2. 渠道
        els.channels.innerHTML = data.channels.map(c => 
            `<span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold border border-blue-100">${c}</span>`
        ).join('');

        // 3. 避坑 & 计算
        let pitfallHTML = `
            <div class="mb-3">
                <span class="font-bold text-gray-700">合规要求：</span> ${data.compliance}<br>
                <span class="text-xs text-gray-500">COD/风控：${data.codProfile}</span>
            </div>
        `;

        // >>> 赚钱逻辑 <<<
        if (key === "US") {
            pitfallHTML += `
                <div class="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                    <i class="fas fa-lightbulb text-yellow-500"></i> 
                    <strong>省钱建议：</strong> 美国路途遥远，纸箱易破损。建议使用 
                    <a href="https://www.amazon.com/s?k=shipping+tape" target="_blank" class="money-link">3M工业级加厚胶带</a> 
                    进行加固。
                </div>
            `;
        }
        if (key === "TH" && cat.includes("General")) {
             pitfallHTML += `
                <div class="mb-3 p-3 bg-orange-50 border border-orange-200 rounded text-sm text-orange-800">
                    <i class="fas fa-pray text-orange-500"></i>
                    <strong>佛牌物流：</strong> 高价值佛牌建议走 <a href="#" class="money-link">专属文玩通道</a> (需报备)。
                </div>
            `;
        }

        // 计算器输出
        const calc = METRIC.calculateSampleCost(key, cat);
        if (calc) {
            pitfallHTML += `
                <div class="pt-3 border-t border-slate-200">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold">Cost Simulator</span>
                        <span class="text-xs text-gray-400">Sample Value: $100</span>
                    </div>
                    <div class="text-sm">
                        预计税费 (Est. Tax): <span class="font-bold text-rose-600 text-lg">$${calc.estimatedTaxUSD}</span>
                    </div>
                    <div class="text-[10px] text-slate-400">逻辑: ${calc.details}</div>
                </div>
            `;
        }
        els.pitfall.innerHTML = pitfallHTML;

        // 4. 违禁品
        let prohibitedItems = [...data.prohibited];
        if (cat.includes("Electronics")) prohibitedItems.unshift("Lithium Batteries (需UN3481标签)");
        if (cat.includes("Textile") && key === "ID") prohibitedItems.unshift("⚠️ High Safeguard Duty (高关税预警)");
        
        els.prohibited.innerHTML = prohibitedItems.map(i => `<li>${i}</li>`).join('');
    }

    // 复制功能
    els.copyBtn.addEventListener('click', function() {
        const key = els.country.value;
        if (!key) return;
        const data = LOGISTICS_DATA[key];
        const text = `【FedEx 查询结果】\n📍 目的国：${data.name}\n💰 免税额：${data.customs.thresholdDesc}\n⚠️ 避坑：${data.compliance}\n🚀 渠道：${data.channels.join(', ')}`;
        
        navigator.clipboard.writeText(text).then(() => alert("✅ 已复制！")).catch(() => alert("❌ 复制失败"));
    });

    // 事件监听
    els.country.addEventListener('change', renderAll);
    els.category.addEventListener('change', renderAll);

    // 启动
    init();

})();
