import type {
  BadgeName,
  Choice,
  MetricKey,
  Metrics,
  ResultProfile,
} from "@/types/simulator";

export const metricLabels: Record<MetricKey, string> = {
  trust: "Güven",
  empathy: "Empati",
  ethics: "Etik Duruş",
  clinical: "Klinik Uygunluk",
};

const metricKeys: MetricKey[] = ["trust", "empathy", "ethics", "clinical"];

const strengthTexts: Record<MetricKey, string> = {
  trust: "Şeffaf, güven veren ve iş birliğine açık bir ilişki kurma eğilimin güçlü.",
  empathy: "Duygusal deneyimi küçümsemeden duyma ve doğrulama konusunda güçlü bir pusulan var.",
  ethics: "Mahremiyet, özerklik, sınırlar ve güvenlik arasında dikkatli düşünüyorsun.",
  clinical: "Tek bir açıklamaya atlamadan bağlamı ve işlevselliği birlikte değerlendirebiliyorsun.",
};

const developmentTexts: Record<MetricKey, string> = {
  trust: "Kararları kişiyle birlikte almak ve süreci şeffaf açıklamak güven alanını güçlendirebilir.",
  empathy: "Çözüme geçmeden önce duyguyu biraz daha duymak ve doğrulamak yararlı olabilir.",
  ethics: "Gizlilik sınırları, gelişimsel özerklik ve güvenlik istisnelerini birlikte düşünmeyi sürdürebilirsin.",
  clinical: "Belirtileri bağlam, süre, işlevsellik ve destek kaynaklarıyla birlikte ele almak yaklaşımını geliştirebilir.",
};

const learningByMetric: Record<MetricKey, string> = {
  trust: "Şeffaflık ve ortak karar alma, danışanla kurulan bağı güçlendirir.",
  empathy: "Duyguyu doğrulamak, hemen çözüm önermekten önce gelir.",
  ethics: "Mahremiyet önemlidir; güvenlik riski olduğunda destek ağı şeffafça devreye alınır.",
  clinical: "Tek bir belirti yerine bağlam, süre ve günlük yaşama etki birlikte değerlendirilir.",
};

export function calculateScore(metrics: Metrics) {
  return Math.round(Object.values(metrics).reduce((sum, value) => sum + value, 0) / 4);
}

export function getBadge(metrics: Metrics): BadgeName {
  const sorted = [...metricKeys].sort((a, b) => metrics[b] - metrics[a]);
  const spread = metrics[sorted[0]] - metrics[sorted[sorted.length - 1]];

  if (spread <= 4) return "Denge Arayan";
  const badgeByMetric: Record<MetricKey, BadgeName> = {
    ethics: "Etik Pusula",
    empathy: "Empati Ustası",
    clinical: "Klinik Düşünür",
    trust: "Güven İnşa Eden",
  };
  return badgeByMetric[sorted[0]];
}

function getStyle(metrics: Metrics, strongest: MetricKey) {
  const score = calculateScore(metrics);
  if (score >= 82) {
    return "İş birliğini, güvenliği ve bağlamı birlikte tutan dengeli bir kolaylaştırıcı yaklaşım sergiledin.";
  }
  if (score >= 65) {
    return `${metricLabels[strongest]} odağın belirgin; karar vermeden önce diğer pusulaları da aynı masada tutmaya çalışıyorsun.`;
  }
  return "Hızlı çözüm üretmeye yatkınsın; biraz yavaşlayıp duyguyu, sınırları ve bağlamı birlikte dinlemek yaklaşımını güçlendirebilir.";
}

export function getResultProfile(metrics: Metrics): ResultProfile {
  const sorted = [...metricKeys].sort((a, b) => metrics[b] - metrics[a]);
  const strongest = sorted[0];
  const developing = sorted[sorted.length - 1];
  const middle = sorted.find((key) => key !== strongest && key !== developing) ?? "ethics";

  return {
    score: calculateScore(metrics),
    badge: getBadge(metrics),
    strongest,
    developing,
    style: getStyle(metrics, strongest),
    strengthText: strengthTexts[strongest],
    developmentText: developmentTexts[developing],
    learnings: [
      learningByMetric[strongest],
      learningByMetric[developing],
      learningByMetric[middle],
    ],
  };
}

export function getConnectionUpdate(choice: Choice) {
  const relationalImpact = choice.impact.trust + choice.impact.empathy;
  if (relationalImpact >= 14) {
    return "Danışan biraz daha rahatlıyor; anlatısını açmak için aranızda güvenli bir alan oluşuyor.";
  }
  if (relationalImpact >= 5) {
    return "Danışan temkinli ama temasını sürdürüyor; kurduğun bağ güçlenmeye açık.";
  }
  if (relationalImpact >= 0) {
    return "Danışan yanıtını düşünüyor; acele etmeden merakını koruman bağ için önemli.";
  }
  return "Danışan bir adım geri çekiliyor; anlaşılmadan yönlendirilmiş hissetmiş olabilir.";
}

export function getBadgeDescription(badge: BadgeName) {
  const descriptions: Record<BadgeName, string> = {
    "Etik Pusula": "Sınırlar, güvenlik ve özerklik arasında dikkatli bir yön buldun.",
    "Empati Ustası": "Duyguyu duymaya ve deneyimi yargılamadan karşılamaya öncelik verdin.",
    "Klinik Düşünür": "Belirtilerin ardındaki bağlamı ve işlevselliği merak ettin.",
    "Güven İnşa Eden": "Şeffaflık ve iş birliğiyle güvenli bir ilişki alanı kurdun.",
    "Denge Arayan": "Dört pusulayı birbirine yakın tutan dengeli seçimler yaptın.",
  };
  return descriptions[badge];
}
