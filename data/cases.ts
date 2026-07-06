import type { CaseStudy } from "@/types/simulator";

type BaseCase = Omit<CaseStudy, "clinicalImpression" | "ethicalFocus">;
type CaseContext = Pick<CaseStudy, "clinicalImpression" | "ethicalFocus">;

const baseCases: BaseCase[] = [
  {
    id: 1,
    topic: "Sınav kaygısı",
    title: "Başlamadan Tükenmek",
    age: "17 yaş",
    narrative:
      "Deneme sınavından önce kalbim çok hızlı atıyor. Bildiklerimi de unutuyorum. Ailem benden yüksek bir derece bekliyor; ya onları hayal kırıklığına uğratırsam?",
    prompt: "İlk yaklaşımın ne olurdu?",
    choices: [
      {
        id: "1a",
        text: "Kaygısını küçümsemeden deneyimini anlamaya çalışır, bedensel belirtileri normalleştirir ve birlikte küçük baş etme adımları belirlerim.",
        impact: { trust: 7, empathy: 8, ethics: 5, clinical: 8 },
        result: "Danışan duyulduğunu hisseder ve kaygısını daha açık anlatmaya başlar.",
        explanation: "Duyguyu doğrulamak, kaygı döngüsünü anlamlandırmak ve uygulanabilir küçük adımlar seçmek iş birliğini destekler.",
      },
      {
        id: "1b",
        text: "Daha çok çalışırsa kaygısının kendiliğinden geçeceğini söylerim.",
        impact: { trust: -5, empathy: -7, ethics: -1, clinical: -5 },
        result: "Yaşadığı güçlük yalnızca çalışma eksikliği gibi ele alındığı için anlaşılmadığını hissedebilir.",
        explanation: "Sınav kaygısı sadece hazırlık miktarıyla açıklanamaz; düşünce, duygu, beden ve çevresel beklentiler birlikte ele alınmalıdır.",
      },
      {
        id: "1c",
        text: "Ailesine beklentilerini hemen düşürmeleri gerektiğini, onun adına ben söylerim.",
        impact: { trust: -2, empathy: 2, ethics: -6, clinical: -3 },
        result: "İyi niyetli olsa da danışanın söz hakkı ve sınırları geri planda kalır.",
        explanation: "Aileyle iletişim yararlı olabilir; ancak danışanın katılımı, onayı ve yaşına uygun özerkliği gözetilmelidir.",
      },
    ],
  },
  {
    id: 2,
    topic: "Aile baskısı",
    title: "Benim Seçimim Kimin?",
    age: "19 yaş",
    narrative:
      "Ailem mühendislik okumamı istiyor ama ben tasarımla ilgileniyorum. Karşı çıkarsam nankör olduğumu söylüyorlar. Artık ne istediğimden bile emin değilim.",
    prompt: "Nasıl karşılık verirsin?",
    choices: [
      {
        id: "2a",
        text: "Ailesinin tecrübesine güvenip onların seçimine uymasını öneririm.",
        impact: { trust: -5, empathy: -5, ethics: -5, clinical: -4 },
        result: "Kendi değerleri ve tercihleri için yeterli alan bulamayabilir.",
        explanation: "Genç yetişkinin özerk karar verme kapasitesini desteklemek, aile bağlarını yok saymadan kendi sesini duymasına alan açmak önemlidir.",
      },
      {
        id: "2b",
        text: "Kendi istekleriyle ailesinin beklentilerini ayırmasına yardım eder, seçenekleri ve olası iletişim yollarını birlikte keşfederim.",
        impact: { trust: 7, empathy: 7, ethics: 8, clinical: 7 },
        result: "Kendi değerlerini daha net görürken ailesiyle ilişkisini de düşünme fırsatı bulur.",
        explanation: "Kararı kişi adına vermek yerine değerleri, kaynakları ve sonuçları birlikte değerlendirmek özerkliği güçlendirir.",
      },
      {
        id: "2c",
        text: "Ailesiyle bağını azaltmasının en iyi yol olduğunu söylerim.",
        impact: { trust: -2, empathy: 0, ethics: -6, clinical: -6 },
        result: "Karmaşık aile ilişkisi tek bir keskin öneriye indirgenmiş olur.",
        explanation: "Güvenlik riski yoksa ilişki konusunda yönlendirici kararlar vermek yerine sınırlar ve iletişim seçenekleri araştırılır.",
      },
    ],
  },
  {
    id: 3,
    topic: "Ergenlerde öfke",
    title: "Kapıyı Çarpınca",
    age: "15 yaş",
    narrative:
      "Evde herkes üstüme geliyor. Sinirlenince kapıyı çarpıyorum, sonra da suçlu hissediyorum. Kimse neden öfkelendiğimi sormuyor.",
    prompt: "Öfkeye nasıl yaklaşırsın?",
    choices: [
      {
        id: "3a",
        text: "Öfkenin kabul edilebilir ama zarar veren davranışların sınırlandırılması gereken bir duygu olduğunu konuşur, tetikleyicileri araştırırım.",
        impact: { trust: 7, empathy: 8, ethics: 6, clinical: 8 },
        result: "Duygusu reddedilmeden davranışının sorumluluğunu değerlendirebilir.",
        explanation: "Duygu ile davranışı ayırmak, hem doğrulama hem de güvenli sınır koyma imkânı verir.",
      },
      {
        id: "3b",
        text: "Öfkesini kontrol etmeyi öğrenene kadar tartışmalardan tamamen kaçınmasını söylerim.",
        impact: { trust: -2, empathy: -2, ethics: 0, clinical: -5 },
        result: "Kısa süreli çatışma azalabilir ama öfkeyi tanıma ve ifade etme becerisi gelişmez.",
        explanation: "Kaçınma tek başına kalıcı bir beceri değildir; güvenli mola, duygu düzenleme ve onarıcı iletişim birlikte çalışılabilir.",
      },
      {
        id: "3c",
        text: "Ailesine daha sert kurallar koymalarını öneririm.",
        impact: { trust: -6, empathy: -7, ethics: -3, clinical: -5 },
        result: "Ergen kendini daha fazla kontrol altında ve anlaşılmamış hissedebilir.",
        explanation: "Sınırlar önemlidir; ancak yalnızca cezayı artırmak öfkenin işlevini ve aile içi etkileşimi anlamayı engeller.",
      },
    ],
  },
  {
    id: 4,
    topic: "Sosyal kaygı",
    title: "Söz Sırası Bana Gelirse",
    age: "20 yaş",
    narrative:
      "Sınıfta konuşacağım zaman yüzüm kızarıyor. Herkesin beni yetersiz bulacağını düşünüyorum. Sunum günleri okula gitmemek istiyorum.",
    prompt: "Hangi yaklaşımı seçersin?",
    choices: [
      {
        id: "4a",
        text: "Bir süre tüm sunumlardan muaf tutulması için doğrudan okuluna yazı yazarım.",
        impact: { trust: 0, empathy: 2, ethics: -6, clinical: -6 },
        result: "Anlık rahatlama sağlansa da kaçınma güçlenebilir ve süreç onun katılımı olmadan ilerler.",
        explanation: "Destek düzenlemeleri gerekebilir; fakat kararlar kişiyle birlikte alınmalı ve kaçınmayı kalıcılaştırmayan kademeli hedefler düşünülmelidir.",
      },
      {
        id: "4b",
        text: "Başkalarının ne düşündüğünü önemsememesini söylerim.",
        impact: { trust: -4, empathy: -6, ethics: 0, clinical: -4 },
        result: "Söylemesi kolay fakat uygulaması belirsiz bir öneri, deneyimini hafife alınmış hissettirebilir.",
        explanation: "Sosyal kaygıda otomatik düşünceleri merakla incelemek ve küçük, güvenli denemeler planlamak daha öğreticidir.",
      },
      {
        id: "4c",
        text: "Korktuğu sonuçları birlikte inceler, kendi hızında ilerleyen küçük sosyal denemeler ve baş etme yöntemleri planlarım.",
        impact: { trust: 7, empathy: 7, ethics: 5, clinical: 9 },
        result: "Kaygıyı yok etmeyi beklemeden, yönetilebilir adımlarla hareket edebileceğini görür.",
        explanation: "İş birliğine dayalı ve kademeli yaklaşım, kişinin baş etme kapasitesini destekler.",
      },
    ],
  },
  {
    id: 5,
    topic: "Telefon ve ekran kullanımı",
    title: "Ekranı Bırak Savaşı",
    age: "14 yaş",
    narrative:
      "Annem telefonu elimden alınca çok kavga ediyoruz. Arkadaşlarımla oradan konuşuyorum. Bazen geç saate kadar kaldığım için sabah kalkamıyorum.",
    prompt: "Konuyu nasıl ele alırsın?",
    choices: [
      {
        id: "5a",
        text: "Telefonun ergen için işlevini, uyku ve günlük yaşama etkisini merak eder; aileyle birlikte uygulanabilir ortak sınırlar geliştirmeyi konuşurum.",
        impact: { trust: 8, empathy: 7, ethics: 6, clinical: 8 },
        result: "Hem sosyal ihtiyacı hem de günlük işlevselliği konuşulabilir hâle gelir.",
        explanation: "Ekranı yalnızca sorun olarak görmek yerine işlevini anlamak ve ortak, tutarlı sınırlar kurmak çatışmayı azaltabilir.",
      },
      {
        id: "5b",
        text: "Ailesine telefonu süresiz kaldırmalarını söylerim.",
        impact: { trust: -7, empathy: -6, ethics: -3, clinical: -5 },
        result: "Güç mücadelesi artabilir ve ergenin çevrim içi sosyal bağları göz ardı edilir.",
        explanation: "Keskin yasaklar yerine gelişim düzeyi, uyku, güvenlik ve sorumlulukları gözeten ortak bir plan daha sürdürülebilirdir.",
      },
      {
        id: "5c",
        text: "Telefon kullanımının günümüzde tamamen normal olduğunu, müdahale gerekmediğini söylerim.",
        impact: { trust: 1, empathy: 2, ethics: -2, clinical: -6 },
        result: "Uyku ve günlük işlevlerdeki etkiler değerlendirilmeden kalır.",
        explanation: "Normalleştirme yararlı olabilir; yine de kullanımın süre, içerik, güvenlik ve işlevsellik boyutları değerlendirilmelidir.",
      },
    ],
  },
  {
    id: 6,
    topic: "Arkadaş ilişkilerinde dışlanma",
    title: "Grubun Dışında",
    age: "13 yaş",
    narrative:
      "Arkadaşlarım hafta sonu buluşmuş, bana söylemediler. Pazartesi de kendi aralarında güldüler. Artık kimseyle konuşmak istemiyorum.",
    prompt: "İlk yanıtın ne olur?",
    choices: [
      {
        id: "6a",
        text: "Bunların ergenlikte normal olduğunu ve fazla düşünmemesini söylerim.",
        impact: { trust: -6, empathy: -8, ethics: 0, clinical: -4 },
        result: "Dışlanmanın yarattığı incinme görünmez kalır.",
        explanation: "Bir deneyimin yaygın olması, etkisinin önemsiz olduğu anlamına gelmez. Önce duygusal etkiyi anlamak gerekir.",
      },
      {
        id: "6b",
        text: "Yaşadığı olayı ve duygularını dinler, bunun tekrarlayan bir örüntü olup olmadığını ve güvenli destek kaynaklarını araştırırım.",
        impact: { trust: 8, empathy: 9, ethics: 6, clinical: 7 },
        result: "Yalnızlık hissi azalır; durumun kapsamı ve destek ihtiyacı netleşir.",
        explanation: "Meraklı dinleme, dışlanma ile zorbalığı ayırt etmeye ve çocuğun destek ağını güçlendirmeye yardımcı olur.",
      },
      {
        id: "6c",
        text: "Hemen yeni arkadaşlar bulmasını öneririm.",
        impact: { trust: -2, empathy: -4, ethics: 1, clinical: -3 },
        result: "Çözüm aceleye gelirken kayıp ve incinme duygusu işlenmeden kalır.",
        explanation: "Yeni ilişkiler bir seçenek olabilir; önce yaşananı anlamak ve çocuğun hazır oluşunu gözetmek önemlidir.",
      },
    ],
  },
  {
    id: 7,
    topic: "Özgüven problemi",
    title: "Ben Zaten Yapamam",
    age: "16 yaş",
    narrative:
      "Bir şey denemeden önce başarısız olacağımı düşünüyorum. Arkadaşlarım benden daha yetenekli. Övüldüğümde bile inanmakta zorlanıyorum.",
    prompt: "Nasıl ilerlersin?",
    choices: [
      {
        id: "7a",
        text: "Çok yetenekli olduğunu sık sık söyleyerek onu ikna etmeye çalışırım.",
        impact: { trust: 0, empathy: 1, ethics: 1, clinical: -3 },
        result: "Olumlu niyet, kendi deneyimiyle uyuşmadığında inandırıcı gelmeyebilir.",
        explanation: "Genel övgü yerine somut çabayı fark etmek ve kişinin kendi kanıtlarını keşfetmesine alan açmak daha işlevseldir.",
      },
      {
        id: "7b",
        text: "Kendisiyle ilgili sert düşüncelerini merak eder, güçlü yanlarını somut örneklerle keşfetmesini ve küçük denemeler yapmasını desteklerim.",
        impact: { trust: 7, empathy: 7, ethics: 5, clinical: 8 },
        result: "Başarıyı yalnızca sonuçla değil, çaba ve öğrenmeyle de değerlendirmeye başlar.",
        explanation: "Kişinin kendi deneyiminden kanıt üretmesi, dışarıdan verilen güvenceden daha kalıcı bir öz yeterlik duygusu oluşturabilir.",
      },
      {
        id: "7c",
        text: "Kendisini daha başarısız kişilerle kıyaslamasını öneririm.",
        impact: { trust: -4, empathy: -5, ethics: -4, clinical: -5 },
        result: "Karşılaştırma döngüsü sürer ve değer duygusu başkalarına bağlanır.",
        explanation: "Öz değer, başkalarını aşağıda görmeye değil kişinin değerleri, çabası ve gerçekçi öz değerlendirmesine dayanmalıdır.",
      },
    ],
  },
  {
    id: 8,
    topic: "Beden algısı",
    title: "Aynadaki Eleştirmen",
    age: "18 yaş",
    narrative:
      "Sosyal medyada herkesi kusursuz görüyorum. Fotoğraf çektirmek istemiyorum ve bazen sırf görüntüm yüzünden buluşmaları iptal ediyorum.",
    prompt: "Neye odaklanırsın?",
    choices: [
      {
        id: "8a",
        text: "Görünüşüyle ilgili endişenin günlük yaşama etkisini, sosyal medya karşılaştırmalarını ve bedenine yönelik dilini yargılamadan araştırırım.",
        impact: { trust: 8, empathy: 8, ethics: 6, clinical: 8 },
        result: "Görünüşten öte, kaçınma ve karşılaştırma döngüsünü fark etmeye başlar.",
        explanation: "Beden algısını yalnızca görünüş üzerinden değil; düşünceler, duygular, davranışlar ve medya etkisiyle birlikte ele almak önemlidir.",
      },
      {
        id: "8b",
        text: "Aslında çok güzel göründüğünü söyleyip kaygılanmamasını isterim.",
        impact: { trust: -1, empathy: -2, ethics: 1, clinical: -4 },
        result: "Güvence kısa süreli rahatlatabilir; ancak temel karşılaştırma ve kaçınma döngüsü sürer.",
        explanation: "Görünüşe dair karşı güvence vermek yerine kişinin bedeniyle daha esnek ve şefkatli bir ilişki kurması desteklenebilir.",
      },
      {
        id: "8c",
        text: "Sosyal medya hesaplarını hemen tamamen kapatmasını söylerim.",
        impact: { trust: -3, empathy: -1, ethics: -3, clinical: -3 },
        result: "Medya etkisi azalabilir ama karar birlikte verilmediği için sürdürülebilir olmayabilir.",
        explanation: "Dijital sınırlar yararlı olabilir; en uygunu kullanım örüntüsünü değerlendirip gerçekçi seçenekleri kişiyle birlikte belirlemektir.",
      },
    ],
  },
  {
    id: 9,
    topic: "Mahremiyet ve sınırlar",
    title: "Günlüğümü Okudular",
    age: "15 yaş",
    narrative:
      "Annem odamı toplarken günlüğümü okumuş. Çok utandım ve öfkelendim. Şimdi bana güvenmediğini düşünüyorum, ben de ona güvenemiyorum.",
    prompt: "Bu durumda neyi gözetirsin?",
    choices: [
      {
        id: "9a",
        text: "Ebeveynin çocuğuyla ilgili her şeyi bilme hakkı olduğunu söylerim.",
        impact: { trust: -8, empathy: -7, ethics: -7, clinical: -4 },
        result: "Ergenin mahremiyet ihtiyacı ve kırılan güveni yok sayılır.",
        explanation: "Ergenlerin gelişimsel olarak mahremiyete ihtiyacı vardır. Güvenlik istisnaları dışında sınırlar açık ve karşılıklı konuşulmalıdır.",
      },
      {
        id: "9b",
        text: "Ailesinden bundan sonra her şeyi saklamasını öneririm.",
        impact: { trust: 0, empathy: 1, ethics: -5, clinical: -5 },
        result: "Kırılan güveni onarmak yerine gizlilik ve çatışma artabilir.",
        explanation: "Amaç taraf seçmek değil, güvenliği gözeterek mahremiyet sınırlarını ve onarım yollarını birlikte kurmaktır.",
      },
      {
        id: "9c",
        text: "İhlalin onda bıraktığı etkiyi dinler, güvenlik ve mahremiyet arasındaki sınırları açıklar, ailesiyle nasıl konuşmak istediğini birlikte planlarım.",
        impact: { trust: 9, empathy: 8, ethics: 9, clinical: 7 },
        result: "Hem duygusu anlaşılır hem de sınırlarını güvenli biçimde ifade etmek için alan bulur.",
        explanation: "Mahremiyeti tanımak ve olası güvenlik istisnalarını şeffafça açıklamak etik ilişkinin temelidir.",
      },
    ],
  },
  {
    id: 10,
    topic: "Okula gitmek istememe",
    title: "Pazartesi Sabahı",
    age: "11 yaş",
    narrative:
      "Pazar geceleri karnım ağrıyor. Sabah okula gitmek istemiyorum. Sınıfta bir şeyler oluyor ama anlatırsam daha kötü olabilir.",
    prompt: "İlk adımın ne olur?",
    choices: [
      {
        id: "10a",
        text: "Okula gitmenin zorunlu olduğunu vurgulayıp devamsızlığa izin verilmemesini söylerim.",
        impact: { trust: -7, empathy: -7, ethics: -2, clinical: -6 },
        result: "Davranışın ardındaki olası korku veya güvenlik sorunu araştırılmadan kalır.",
        explanation: "Okula devam önemli olsa da önce bedensel yakınmalar, kaygı, öğrenme güçlükleri ve akran güvenliği değerlendirilmelidir.",
      },
      {
        id: "10b",
        text: "Güvenli ve yaşına uygun sorularla okulda ne olduğunu anlamaya çalışır; aile ve okul desteğini çocuğun güvenliğini gözeterek planlarım.",
        impact: { trust: 8, empathy: 8, ethics: 8, clinical: 9 },
        result: "Çocuk baskı görmeden konuşma ve korunma ihtiyacını ifade etme fırsatı bulur.",
        explanation: "Okul reddinin ardında farklı etkenler olabilir. Kapsamlı değerlendirme ve paydaşlarla ölçülü iş birliği gerekir.",
      },
      {
        id: "10c",
        text: "Bir süre okula hiç gitmemesinin daha rahatlatıcı olacağını söylerim.",
        impact: { trust: 1, empathy: 2, ethics: -2, clinical: -7 },
        result: "Kısa süreli rahatlama sağlanabilir; ancak kaçınma güçlenebilir ve olası risk araştırılmaz.",
        explanation: "Güvenlik sorunu varsa gerekli önlemler alınır; bunun yanında sürdürülebilir ve kademeli bir okula dönüş planı değerlendirilir.",
      },
    ],
  },
  {
    id: 11,
    topic: "Dikkat güçlüğü",
    title: "Aklım Hep Başka Yerde",
    age: "12 yaş",
    narrative:
      "Derse başlıyorum ama birkaç dakika sonra başka şeylere dalıyorum. Öğretmenim dikkatsiz olduğumu söylüyor. Ben de tembel olduğumu düşünmeye başladım.",
    prompt: "Nasıl yaklaşmak uygun olur?",
    choices: [
      {
        id: "11a",
        text: "Daha disiplinli olması gerektiğini söyler, günlük çalışma süresini iki katına çıkarırım.",
        impact: { trust: -5, empathy: -6, ethics: -2, clinical: -6 },
        result: "Kendini suçlama artarken güçlüğün bağlamı anlaşılmaz.",
        explanation: "Dikkat güçlüğü isteksizlikle eş anlamlı değildir; uyku, kaygı, öğrenme ortamı, gelişim ve farklı etkenler değerlendirilmelidir.",
      },
      {
        id: "11b",
        text: "Hemen tek bir açıklamaya bağlar ve aileye bunu kesin bir durum gibi aktarırım.",
        impact: { trust: -2, empathy: 0, ethics: -8, clinical: -8 },
        result: "Yeterli değerlendirme yapılmadan etiketlenme riski doğar.",
        explanation: "Tek bir belirti bir sonuca varmak için yeterli değildir. Farklı ortamlar, süre, işlevsellik ve gelişim öyküsü uzmanlarca değerlendirilmelidir.",
      },
      {
        id: "11c",
        text: "Zorlandığı zamanları ve ortamları araştırır, küçük düzenlemeler dener ve gerekirse ailesiyle uygun bir uzman değerlendirmesini konuşurum.",
        impact: { trust: 8, empathy: 7, ethics: 8, clinical: 9 },
        result: "Tembellik yargısı yerine ihtiyaçlarını ve işe yarayan destekleri keşfetmeye başlar.",
        explanation: "Bağlamsal gözlem, işlevsellik ve çoklu bilgi kaynağı; dikkat güçlüğünü sorumlu biçimde anlamanın temelidir.",
      },
    ],
  },
  {
    id: 12,
    topic: "Yas ve kayıp",
    title: "Odası Hâlâ Aynı",
    age: "21 yaş",
    narrative:
      "Dedemi altı ay önce kaybettik. Bazen iyi hissediyorum, sonra bir şarkıyla her şey geri geliyor. Ailem artık toparlanmam gerektiğini düşünüyor.",
    prompt: "Yas deneyimine nasıl eşlik edersin?",
    choices: [
      {
        id: "12a",
        text: "Yasın kişiye özgü ve dalgalı olabileceğini anlatır, kaybın anlamını ve günlük yaşamına etkisini kendi hızında paylaşmasına alan açarım.",
        impact: { trust: 8, empathy: 9, ethics: 6, clinical: 8 },
        result: "Duygularının zamana karşı bir başarısızlık olmadığını hisseder.",
        explanation: "Yas doğrusal ilerlemez. Duyguları zorlamadan, işlevselliği ve destek kaynaklarını izleyerek eşlik etmek önemlidir.",
      },
      {
        id: "12b",
        text: "Hatırlatan eşyalardan ve şarkılardan uzak durmasını öneririm.",
        impact: { trust: -2, empathy: -3, ethics: 0, clinical: -5 },
        result: "Kısa süreli kaçınma sağlansa da kayıpla kurduğu bağa alan kalmaz.",
        explanation: "Hatırlatıcılara ilişkin seçim kişiye bırakılmalı; kaçınmanın yaşamı daraltıp daraltmadığı birlikte değerlendirilmelidir.",
      },
      {
        id: "12c",
        text: "Altı ay geçtiği için artık üzülmemesi gerektiğini söylerim.",
        impact: { trust: -8, empathy: -9, ethics: -3, clinical: -7 },
        result: "Yas deneyimi zaman çizelgesine sıkıştırılır ve kişi yalnızlaşabilir.",
        explanation: "Yas için herkese uyan bir süre yoktur. Süre kadar yoğunluk, işlevsellik, kültürel bağlam ve kişinin ihtiyaçları önemlidir.",
      },
    ],
  },
  {
    id: 13,
    topic: "Akran zorbalığı",
    title: "Şaka Deyip Geçiyorlar",
    age: "14 yaş",
    narrative:
      "Sınıftakiler çantamı saklıyor ve videomu çekip gruba atıyor. Öğretmene söylersem ispiyoncu derler diye korkuyorum. Onlar bunun şaka olduğunu söylüyor.",
    prompt: "En sorumlu yaklaşım hangisi?",
    choices: [
      {
        id: "13a",
        text: "Karşılık verirse zorbalığın biteceğini söylerim.",
        impact: { trust: -5, empathy: -5, ethics: -5, clinical: -6 },
        result: "Sorumluluk zorbalığa uğrayan çocuğa yüklenir ve risk artabilir.",
        explanation: "Zorbalığı durdurma sorumluluğu çocuğun tek başına taşıyacağı bir yük değildir; güvenli yetişkin ve okul desteği gerekir.",
      },
      {
        id: "13b",
        text: "Bunu görmezden gelirse yapanların sıkılacağını söylerim.",
        impact: { trust: -4, empathy: -6, ethics: -3, clinical: -6 },
        result: "Tekrarlayan zarar ve dijital yayılım riski yeterince ciddiye alınmaz.",
        explanation: "Görmezden gelme her durumda güvenli veya etkili değildir. Olayın kapsamı ve güvenlik ihtiyacı değerlendirilmelidir.",
      },
      {
        id: "13c",
        text: "Yaşananın sorumluluğunun onda olmadığını belirtir, güvenliği değerlendirir ve onun katılımıyla güvenilir yetişkinler ile okul desteğini devreye alırım.",
        impact: { trust: 9, empathy: 8, ethics: 9, clinical: 9 },
        result: "Suçluluk azalır ve zorbalığı tek başına taşımak zorunda olmadığını görür.",
        explanation: "Zorbalıkta güvenlik, kayıtların korunması, yetişkin desteği ve kurumun sorumluluk alması önemlidir; süreç çocukla şeffaf yürütülmelidir.",
      },
    ],
  },
  {
    id: 14,
    topic: "Ebeveyn ayrılığı",
    title: "İkisinin Arasında",
    age: "10 yaş",
    narrative:
      "Annemle babam ayrılıyor. İkisi de bana diğerini soruyor. Babamı özlediğimi söylersem annem üzülür diye korkuyorum. Belki benim yüzümdendir.",
    prompt: "Çocuğa nasıl alan açarsın?",
    choices: [
      {
        id: "14a",
        text: "Ayrılığın yetişkinlerin sorumluluğunda olduğunu, onun suçu olmadığını açıklar; iki ebeveynle ilgili duygularını taraf tutmadan dinlerim.",
        impact: { trust: 9, empathy: 9, ethics: 9, clinical: 8 },
        result: "Çocuk suçluluk yükünden uzaklaşır ve çelişkili duygularına izin verebilir.",
        explanation: "Çocuğu aracı veya sırdaş yapmamak, gelişimine uygun bilgi vermek ve her iki bağa dair duygularını güvenle ifade etmesini sağlamak önemlidir.",
      },
      {
        id: "14b",
        text: "Hangi ebeveynle kalmak istediğine hemen karar vermesini isterim.",
        impact: { trust: -7, empathy: -8, ethics: -8, clinical: -7 },
        result: "Gelişim düzeyini aşan bir karar yükü ve sadakat çatışması oluşabilir.",
        explanation: "Çocuğun görüşü yaşına uygun biçimde dinlenebilir; ancak yetişkin sorumlulukları onun omzuna bırakılmamalıdır.",
      },
      {
        id: "14c",
        text: "Üzülmemesi için ayrılığın kısa sürede geçeceğini söylerim.",
        impact: { trust: -4, empathy: -2, ethics: -5, clinical: -4 },
        result: "Gerçekçi olmayan güvence, ileride güveni zedeleyebilir.",
        explanation: "Çocuklara belirsizlik içinde tutulabilecek dürüst, sade ve yaşa uygun bilgiler verilmelidir.",
      },
    ],
  },
  {
    id: 15,
    topic: "Risk ve güvenlik",
    title: "Bunu Tek Başıma Taşıyamıyorum",
    age: "17 yaş",
    narrative:
      "Son günlerde kendime zarar verme düşünceleri aklıma geliyor. Şu an ne yapacağımı bilmiyorum ve bunu kimseye söylemedim. Lütfen aramızda kalsın.",
    prompt: "Güvenliği önceleyen yaklaşım hangisi?",
    risk: true,
    choices: [
      {
        id: "15a",
        text: "Gizlilik isteğine koşulsuz uyacağımı söyler ve konu değiştiririm.",
        impact: { trust: -3, empathy: -4, ethics: -10, clinical: -10 },
        result: "Ciddi bir güvenlik ihtiyacı değerlendirilmeden kişi yalnız bırakılmış olur.",
        explanation: "Kendine zarar düşünceleri ciddiye alınmalıdır. Güvenlik söz konusu olduğunda gizliliğin sınırları şeffafça açıklanır ve destek geciktirilmez.",
      },
      {
        id: "15b",
        text: "Sakin ve doğrudan biçimde mevcut riski değerlendirir, yalnız bırakmaz; güvenilir bir yetişkin ve ruh sağlığı profesyonelini sürece katar, acil tehlikede 112 veya en yakın acil servise yönlendiririm.",
        impact: { trust: 10, empathy: 9, ethics: 10, clinical: 10 },
        result: "Yaşadığı durum ciddiye alınır ve güvenlik sorumluluğu tek başına ona bırakılmaz.",
        explanation: "Açık ve sakin biçimde sormak güvenliği değerlendirmeye yardım eder. Yakın riskte kişi yalnız bırakılmamalı; güvenilir yetişkin, ruh sağlığı profesyoneli ve gerektiğinde 112 ya da en yakın acil servis gecikmeden devreye alınmalıdır.",
      },
      {
        id: "15c",
        text: "Böyle düşünmemesi gerektiğini ve dikkatini başka şeylere vermesini söylerim.",
        impact: { trust: -7, empathy: -8, ethics: -6, clinical: -9 },
        result: "Düşünceler küçümsenir ve yardım isteme ihtimali azalabilir.",
        explanation: "Sadece dikkat dağıtma önerisi güvenlik değerlendirmesinin yerini tutmaz. Risk ciddiye alınmalı ve uygun destek ağı kurulmalıdır.",
      },
    ],
  },
];

const caseContexts: Record<number, CaseContext> = {
  1: {
    clinicalImpression: "Kaygı; bedensel belirtiler, performans düşünceleri ve aile beklentileriyle birlikte ele alınmalı.",
    ethicalFocus: "Danışanın özerkliğini koruyarak aileyle iş birliği yapmak.",
  },
  2: {
    clinicalImpression: "Kendi değerleri ile aile beklentileri arasındaki çatışma karar verme gücünü zorluyor.",
    ethicalFocus: "Kişi adına karar vermeden özerk seçim alanını desteklemek.",
  },
  3: {
    clinicalImpression: "Öfkenin altında anlaşılmama, sınır ve iletişim ihtiyaçları olabilir.",
    ethicalFocus: "Duyguyu kabul ederken zarar veren davranışlara güvenli sınır koymak.",
  },
  4: {
    clinicalImpression: "Değerlendirilme korkusu ve kaçınma döngüsü günlük işlevselliği daraltıyor.",
    ethicalFocus: "Kişinin hızına ve onayına saygılı, kademeli adımlar planlamak.",
  },
  5: {
    clinicalImpression: "Ekran kullanımı sosyal bağ kurma ihtiyacı ile uyku ve sorumlulukları aynı anda etkiliyor.",
    ethicalFocus: "Cezalandırıcı olmadan gelişimsel sınırlar ve dijital güvenliği gözetmek.",
  },
  6: {
    clinicalImpression: "Dışlanmanın duygusal etkisi ve tekrarlayan zorbalık olasılığı ayrı ayrı değerlendirilmeli.",
    ethicalFocus: "Çocuğu suçlamadan güvenli yetişkin desteğine erişimini kolaylaştırmak.",
  },
  7: {
    clinicalImpression: "Sert öz eleştiri ve karşılaştırma, denemeden vazgeçme örüntüsünü besliyor.",
    ethicalFocus: "Genel övgü yerine kişinin kendi kanıtlarını ve kaynaklarını keşfetmesini desteklemek.",
  },
  8: {
    clinicalImpression: "Sosyal karşılaştırma ve görünüş odaklı kaçınma, sosyal yaşamı sınırlamaya başlamış.",
    ethicalFocus: "Görünüş normlarını dayatmadan, kapsayıcı ve yargısız bir dil kullanmak.",
  },
  9: {
    clinicalImpression: "Mahremiyet ihlali ergen ile ebeveyn arasındaki güveni zedelemiş.",
    ethicalFocus: "Mahremiyet hakkını ve güvenlik durumlarındaki gizlilik sınırlarını açıkça anlatmak.",
  },
  10: {
    clinicalImpression: "Bedensel yakınmaların ardında kaygı, akran sorunu veya başka bir okul deneyimi olabilir.",
    ethicalFocus: "Çocuğu zorlamadan dinlemek ve olası güvenlik riskini gecikmeden değerlendirmek.",
  },
  11: {
    clinicalImpression: "Dikkat güçlüğü farklı ortamlar, uyku, kaygı ve öğrenme koşullarıyla birlikte incelenmeli.",
    ethicalFocus: "Yeterli değerlendirme olmadan etiketleyici veya kesin ifadeler kullanmamak.",
  },
  12: {
    clinicalImpression: "Yas dalgalı ilerliyor; hatırlatıcılar ve aile beklentileri duygusal yükü etkiliyor.",
    ethicalFocus: "Yası tek bir süreye sıkıştırmadan kültürel ve kişisel farklılıklara saygı duymak.",
  },
  13: {
    clinicalImpression: "Tekrarlayan ve dijital alana taşınan davranışlar güvenlik odaklı bir zorbalık değerlendirmesi gerektiriyor.",
    ethicalFocus: "Sorumluluğu çocuğa yüklemeden okul ve güvenilir yetişkinleri şeffafça sürece katmak.",
  },
  14: {
    clinicalImpression: "Çocuk sadakat çatışması ve yetişkinlerin kararlarına dair gereğinden büyük bir sorumluluk taşıyor.",
    ethicalFocus: "Çocuğu aracı yapmamak ve iki ebeveyne dair duygularına tarafsız alan açmak.",
  },
  15: {
    clinicalImpression: "Kendine zarar düşüncesi güvenlik değerlendirmesi ve gecikmeden destek ağı kurulmasını gerektirir.",
    ethicalFocus: "Gizliliğin güvenlik sınırlarını açıklamak; kişiyi yalnız bırakmadan destek almak.",
  },
};

const choiceReveals: Record<string, string> = {
  "1a": "Aslında sınavdan çok, sonuç açıklanınca ailemin yüzüne bakamamaktan korkuyorum.",
  "2b": "Ailemi kaybetmeden kendi hayatımı seçebileceğim bir yol var mı, onu merak ediyorum.",
  "3a": "Öfkelenmeden hemen önce sanki kimse beni dinlemeyecekmiş gibi geliyor.",
  "4c": "Sunuma sadece bir arkadaşımla prova yapmak daha mümkün hissettiriyor.",
  "5a": "Gece telefonu bırakınca arkadaş grubunda konuşulanları kaçırmaktan korkuyorum.",
  "6b": "Bu ilk kez olmadı; geçen hafta da teneffüste beni yanlarına çağırmadılar.",
  "8a": "Fotoğrafı silince rahatlıyorum ama sonra kendime daha çok kızıyorum.",
  "9c": "Annemle konuşmak istiyorum ama yine özelimi küçümsemesinden çekiniyorum.",
  "10b": "Bir grup çocuk teneffüste çantamla uğraşıyor; öğretmene söylememem için beni korkutuyorlar.",
  "11c": "Sessiz bir yerde ve kısa aralar verince ödevimi biraz daha kolay yapabiliyorum.",
  "13c": "Videonun hâlâ grupta olmasından korkuyorum; yanımda biri olursa öğretmenle konuşabilirim.",
  "15b": "Bunu tek başıma taşımak istemiyorum; güvendiğim bir yetişkini birlikte arayabiliriz.",
};

export const cases: CaseStudy[] = baseCases.map((caseStudy) => ({
  ...caseStudy,
  ...caseContexts[caseStudy.id],
  choices: caseStudy.choices.map((choice) => ({
    ...choice,
    reveal: choiceReveals[choice.id],
  })),
}));
