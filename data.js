/**
 * Global Logistics Database
 * Version: 6.0 Unified
 * Updated: 2025-11-22
 */

const LOGISTICS_DATA = {
    // --- 欧美澳 (基础数据) ---
    "US": {
        name: "🇺🇸 USA (美国)",
        currency: "USD",
        exchangeRateUSD: 1,
        customs: { thresholdDesc: "800 USD (高免税)", note: "全球最宽松，但严查仿牌。", deMinimisUSD: 800 },
        taxRules: { vatRate: 0, dutyRateGeneral: 0, dutyRateHigh: 0 },
        codProfile: "低风险。地址系统完善。",
        compliance: "食品需 FDA 申报；严查侵权 Logo。",
        prohibited: ["Fake Brands (仿牌)", "Meat Products (肉类)", "Kinder Surprise Eggs"],
        channels: ["FedEx IP (首选)", "UPS", "USPS"]
    },
    "GB": {
        name: "🇬🇧 UK (英国)",
        currency: "GBP",
        exchangeRateUSD: 0.79,
        customs: { thresholdDesc: "135 GBP (VAT起征)", note: "取消小额免税，必收 20% VAT。", deMinimisUSD: 0 },
        taxRules: { vatRate: 0.20, dutyRateGeneral: 0.02, dutyRateHigh: 0.10 },
        codProfile: "低风险。",
        compliance: "必须提供收件人税号 (EORI/VAT)。",
        prohibited: ["Knives (管制刀具)", "Dairy Products"],
        channels: ["FedEx IE", "Royal Mail"]
    },
    "EU": {
        name: "🇪🇺 EU (欧盟通用)",
        currency: "EUR",
        exchangeRateUSD: 0.95,
        customs: { thresholdDesc: "0 EUR (全额征税)", note: "必须提供 IOSS 编码，否则二次征税。", deMinimisUSD: 0 },
        taxRules: { vatRate: 0.21, dutyRateGeneral: 0.05, dutyRateHigh: 0.12 },
        codProfile: "中低风险。",
        compliance: "IOSS 是关键；CE 认证。",
        prohibited: ["Medicine (私人药品)", "Counterfeits"],
        channels: ["DHL", "FedEx", "DDP Lines"]
    },
    "CA": {
        name: "🇨🇦 Canada (加拿大)",
        currency: "CAD",
        exchangeRateUSD: 1.40,
        customs: { thresholdDesc: "20 CAD (极低)", note: "几乎每单必税，建议预缴。", deMinimisUSD: 15 },
        taxRules: { vatRate: 0.13, dutyRateGeneral: 0.05, dutyRateHigh: 0.18 },
        codProfile: "低风险。",
        compliance: "保健品限寄 90 天用量。",
        prohibited: ["Baby Walkers", "Mace (防狼喷雾)"],
        channels: ["UPS", "FedEx", "Canada Post"]
    },
    "AU": {
        name: "🇦🇺 Australia (澳洲)",
        currency: "AUD",
        exchangeRateUSD: 1.54,
        customs: { thresholdDesc: "1000 AUD", note: "1000澳元内免税 (GST除外)。", deMinimisUSD: 650 },
        taxRules: { vatRate: 0.10, dutyRateGeneral: 0.05, dutyRateHigh: 0.05 },
        codProfile: "低风险。",
        compliance: "生物安全世界第一严！木箱需熏蒸。",
        prohibited: ["Seeds/Soil (种子土壤)", "Straw Products"],
        channels: ["FedEx (快)", "AusPost"]
    },
    "JP": {
        name: "🇯🇵 Japan (日本)",
        currency: "JPY",
        exchangeRateUSD: 154,
        customs: { thresholdDesc: "10000 JPY", note: "折合 65 USD 左右免税。", deMinimisUSD: 65 },
        taxRules: { vatRate: 0.10, dutyRateGeneral: 0.0, dutyRateHigh: 0.10 },
        codProfile: "极低风险。但拒收率低。",
        compliance: "私人件限 24 个化妆品；严禁肉类。",
        prohibited: ["Meat", "Perfume (Flammable)"],
        channels: ["EMS (推荐)", "Sagawa", "FedEx"]
    },
    "TH": {
        name: "🇹🇭 Thailand (泰国)",
        currency: "THB",
        exchangeRateUSD: 34.5,
        customs: { thresholdDesc: "1500 THB", note: "电子烟绝对禁止。", deMinimisUSD: 43 },
        taxRules: { vatRate: 0.07, dutyRateGeneral: 0.10, dutyRateHigh: 0.30 },
        codProfile: "中等风险。",
        compliance: "佛牌/古董出口需艺术厅审批。",
        prohibited: ["E-Cigarettes (电子烟 - 严禁)", "Sex Toys", "Buddha Heads (without permit)"],
        channels: ["Special Line", "Kerry Express"]
    },

    // --- 东南亚 & 中东 (深度数据) ---
    "VN": {
        name: "🇻🇳 Vietnam (越南)",
        currency: "VND",
        exchangeRateUSD: 25450,
        customs: { thresholdDesc: "0 VND (2025新规)", note: "2025年2月起取消小额免税。", deMinimisUSD: 0 },
        taxRules: { vatRate: 0.10, dutyRateGeneral: 0.00, dutyRateSpecial: 0.25 },
        codProfile: "高拒收率 (15%)。建议提供“开箱验货”。",
        compliance: "旧衣服严禁进口。",
        prohibited: ["Used Goods (二手货)", "Cultural Products"],
        channels: ["Land Freight (陆运)", "J&T Express"]
    },
    "MY": {
        name: "🇲🇾 Malaysia (马来西亚)",
        currency: "MYR",
        exchangeRateUSD: 4.45,
        customs: { thresholdDesc: "500 MYR", note: "<500 MYR 收 10% LVG 税。", deMinimisUSD: 112 },
        taxRules: { vatRate: 0.10, dutyRateGeneral: 0.00, dutyRateHigh: 0.15 },
        codProfile: "东马时效慢。",
        compliance: "电子产品需 SIRIM。",
        prohibited: ["Religious Texts", "Daggers"],
        channels: ["J&T", "Shopee Xpress"]
    },
    "ID": {
        name: "🇮🇩 Indonesia (印尼)",
        currency: "IDR",
        exchangeRateUSD: 15850,
        customs: { thresholdDesc: "3 USD (极低)", note: ">3 USD 即收 11% VAT。", deMinimisUSD: 3 },
        taxRules: { vatRate: 0.11, dutyRateGeneral: 0.075, dutyRateTextile: 0.25 },
        codProfile: "极高风险。群岛派送难。",
        compliance: "必须有税号 (NPWP)；手机需注册 IMEI。",
        prohibited: ["Used Clothing (二手衣)", "Chinese Medicine"],
        channels: ["DDP Special Line (专线)"]
    },
    "SA": {
        name: "🇸🇦 Saudi Arabia (沙特)",
        currency: "SAR",
        exchangeRateUSD: 3.75,
        customs: { thresholdDesc: "1000 SAR", note: "15% VAT 无免征额。", deMinimisUSD: 266 },
        taxRules: { vatRate: 0.15, dutyRateGeneral: 0.05, dutyRateHigh: 0.20 },
        codProfile: "地址不清，依赖电话。",
        compliance: "SABER 认证；Made in China 刻印。",
        prohibited: ["Alcohol/Pork", "Laser Pointers"],
        channels: ["Aramex", "SMSA"]
    },
    "AE": {
        name: "🇦🇪 UAE (阿联酋)",
        currency: "AED",
        exchangeRateUSD: 3.67,
        customs: { thresholdDesc: "300 AED", note: "5% VAT 普遍征收。", deMinimisUSD: 81 },
        taxRules: { vatRate: 0.05, dutyRateGeneral: 0.05, dutyRateHigh: 0.05 },
        codProfile: "流动性大。",
        compliance: "电子产品需 ESMA。",
        prohibited: ["Poppy Seeds", "Gambling Tools"],
        channels: ["iMile", "Aramex"]
    }
};

const CATEGORIES = ["General Goods (普货)", "Textile/Fashion (纺织鞋包)", "Electronics (电子)", "Cosmetics (化妆品)"];
