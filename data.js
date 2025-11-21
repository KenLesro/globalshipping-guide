// 这里放可编辑数据：国家、门槛、敏感禁运、渠道建议与避坑提示
// ✅ 强烈建议：上线前用官方口径更新这些值。此处为演示占位数据。
window.GSG_DATA = {
  meta: {
    updated: '2025-11-22',
    disclaimer: '演示数据，仅供参考；以各国海关与承运商官网为准。'
  },
  // 统一的类别枚举（便于全局一致）
  categories: ['电子产品', '食品', '药品'],
  countries: [
    {
      code: 'US',
      name: '美国',
      currency: 'USD',
      threshold: {
        amount: 800,
        note: 'De minimis $800（常见快递渠道）；酒/烟/化妆品等可能例外'
      },
      general: {
        prohibited: [
          '枪支弹药及零部件',
          '象牙与濒危动植物制品',
          '假冒伪劣商品',
          '活体植物与土壤',
          '大量含酒精液体'
        ],
        pitfall: '同一收件人频繁多票分拆易被合并估价补税并罚。商业数量要用正规报关。'
      },
      categories: {
        '电子产品': {
          sensitive: ['锂电池 >100Wh', '无人机', '无线发射设备（未认证）'],
          prohibited: ['超强磁铁未申报'],
          channels: ['DHL', 'FedEx'],
          pitfall: '锂电池务必如实申报并遵循 IATA/UN38.3 文件要求。'
        },
        '食品': {
          sensitive: ['肉类及其制品', '乳制品', '散装坚果', '含肉调味料'],
          prohibited: ['新鲜水果/蔬菜'],
          channels: ['EMS', 'DHL'],
          pitfall: '含肉/蛋/奶常被 FDA/USDA 拦截；无证不要寄。'
        },
        '药品': {
          sensitive: ['处方药', '含激素/麻黄碱制剂', '保健品大数量'],
          prohibited: ['含违禁成分药物'],
          channels: ['DHL', 'FedEx'],
          pitfall: '处方药需医生处方及许可，限个人自用数量。'
        }
      }
    },
    {
      code: 'JP',
      name: '日本',
      currency: 'JPY',
      threshold: {
        amount: 10000,
        note: '免税门槛约 ¥10,000（按完税价格）；烟酒香水等例外'
      },
      general: {
        prohibited: [
          '危险刀具等危禁品',
          '假冒商品',
          '未检疫动植物及其产品',
          '现金与有价证券'
        ],
        pitfall: '发票不清晰或 HS 编码错误会导致重估与延误。'
      },
      categories: {
        '电子产品': {
          sensitive: ['电波法未认证无线设备', '锂电池（内置/配套）'],
          prohibited: [],
          channels: ['DHL', 'FedEx'],
          pitfall: '无线设备需技适标识（技適マーク）；不合规易退运。'
        },
        '食品': {
          sensitive: ['肉类制品', '乳制品', '豆类与种子'],
          prohibited: ['生鲜果蔬'],
          channels: ['EMS', 'Yamato(本地)'],
          pitfall: '需标注原产地与成分；超自用量可能要求申报。'
        },
        '药品': {
          sensitive: ['处方药', '医药品/医药部外品'],
          prohibited: [],
          channels: ['DHL'],
          pitfall: '超过一定数量需向厚生劳动省预先确认。'
        }
      }
    },
    {
      code: 'TH',
      name: '泰国',
      currency: 'THB',
      threshold: {
        amount: 1500,
        note: '常见免税门槛约 ฿1,500；不同渠道/时段政策可能调整'
      },
      general: {
        prohibited: [
          '电子烟及烟油',
          '色情制品',
          '假冒商品',
          '古董与佛像（需许可）'
        ],
        pitfall: '商业数量易被认定为进口贸易，需正式报关补税。'
      },
      categories: {
        '电子产品': {
          sensitive: ['无人机', '大功率对讲机', '锂电池'],
          prohibited: [],
          channels: ['DHL', 'FedEx'],
          pitfall: '无人机可能需 NBTC 登记；附序列号与规格更顺畅。'
        },
        '食品': {
          sensitive: ['肉制品', '草药粉末', '香料大数量'],
          prohibited: [],
          channels: ['EMS'],
          pitfall: '含肉或草药类可能需 FDA 许可；裸装粉末易查验。'
        },
        '药品': {
          sensitive: ['处方药', '草药提取物'],
          prohibited: ['含麻黄碱/西地那非等未许可药物'],
          channels: ['DHL'],
          pitfall: '仅限个人自用且数量有限，可能需处方或许可。'
        }
      }
    }
  ]
};
