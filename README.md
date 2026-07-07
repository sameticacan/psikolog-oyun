# Terapi Odası: Mini Vaka Simülatörü

Türkçe, mobil öncelikli ve psikoloji temalı eğitici bir mini karar simülasyonu. Visual novel tarzındaki gece kliniği sahnesinde 2D danışan karakterleriyle karşılaşır; üç yaklaşım arasından seçim yapar ve seçimin güven, empati, etik duruş ile klinik uygunluk üzerindeki eğitimsel yansımasını görür.

## Etik not

Bu simülasyon bilgilendirme ve eğitim amacı taşır. Gerçek psikolojik değerlendirme, tanı veya terapi yerine geçmez.

Uygulama terapi hizmeti sunmaz ve kişiye özel psikolojik yönlendirme üretmez. Kendine zarar riski içeren vakada güvenlik öncelenir: kişi yalnız bırakılmamalı, güvenilir bir yetişkin ve ruh sağlığı profesyonelinden destek alınmalı; yakın veya acil tehlikede 112 aranmalı ya da en yakın acil servise başvurulmalıdır.

## Özellikler

- Çocuk, ergen ve genç yetişkin alanından 15 vakalık havuz ve 45 nüanslı yaklaşım seçeneği
- Her oyun gününde ofis kapasitesine göre hazırlanan 2-4 danışanlık randevu kuyruğu
- Tıklanabilir masa, kapı, bilgisayar, kitaplık, bekleme alanı ve resepsiyon bölgelerine sahip 2D ofis hub'ı
- Seans geliri, itibar, etik güven, enerji, kira ve günlük giderlerden oluşan ofis ekonomisi
- Seans ücreti ve itibara bağlı randevu talebi; 400, 600, 800 ve koşullu 1000 TL seçenekleri
- Dört seviyeli asistan sistemi, randevu kapasitesi ve azalan no-show olasılığı
- Ofis sahnesini de görsel olarak değiştiren altı kalıcı geliştirme
- Gün sonu gelir/gider, itibar, etik güven ve enerji raporu
- Güven, empati, etik duruş ve klinik uygunluk göstergeleri
- Her seçimden sonra danışanla bağ ilerlemesi ve psikoeğitici açıklama
- Bazı seçimlerde danışanın anlatısını genişleten ek bilgi kartları
- Vaka bazında ilk klinik izlenim ve dikkat edilmesi gereken etik nokta
- Beş sonuç rozeti: Etik Pusula, Empati Ustası, Klinik Düşünür, Güven İnşa Eden ve Denge Arayan
- Kişiselleştirilmiş güçlü alan, gelişime açık alan, yaklaşım tarzı ve öğrenme özeti
- En iyi skor, son rozet, tamamlanan vaka/oturum sayısı ve yansıtma metni için localStorage desteği
- Mobil uyumlu, erişilebilir ve azaltılmış hareket tercihine duyarlı arayüz
- Gece kliniği atmosferine sahip visual novel sahnesi ve karakter tepkileri
- Opsiyonel PNG karakter/arka plan asset’leri için otomatik SVG ve CSS fallback sistemi

## Görsel asset sistemi

Uygulama aşağıdaki dosya yollarını otomatik olarak kullanır:

```text
public/backgrounds/therapy-room-night.png
public/characters/client-teen-anxious.png
public/characters/client-young-adult-tired.png
public/characters/client-child-worried.png
public/characters/client-parent-stressed.png
public/characters/therapist-avatar.png
```

Bu dosyalar zorunlu değildir. Klinik arka planı bulunamazsa CSS ile oluşturulan pencere, gece şehir ışıkları, kitaplık, lamba, bitki, koltuk ve sehpa sahnesi görünür. Karakter PNG’si yüklenemezse vaka yaş grubu ile duygu durumuna göre renklendirilen yarım vücut SVG portresi otomatik devreye girer.

Yeni görseller aynı dosya adlarıyla ilgili klasörlere kopyalandığında kod değişikliği gerekmez. Farklı bir karakter görseli kullanmak için `data/characters.ts` içindeki `image` alanı güncellenebilir. Şeffaf arka planlı, dikey karakter PNG’leri önerilir.

Arka plan ve karakter görsellerinin içine başlık, buton veya Türkçe metin gömülmemelidir. Tüm kullanıcı arayüzü metinleri okunabilirlik ve erişilebilirlik için HTML/CSS katmanında oluşturulur.

Oyun ekranı tek viewport düzenindedir; ana sayfa scrollbar’ı kapatılmıştır. Uzun vaka ve geri bildirim içerikleri gerektiğinde yalnızca ilgili cam panelin içinde sınırlı olarak kayar.

## Gezilebilir ofis hub'ı

Ofis sahnesinde zemine tıklayarak veya mobilde dokunarak psikolog avatarını hedef noktaya yürütebilirsiniz. Masaüstünde `WASD` ve ok tuşları da desteklenir. Hareket alanı ofis zeminiyle sınırlandırılır; avatar mobilyaların önünden ve arkasından geçerken zemin konumuna göre katmanlanır.

Kapı, bilgisayar, masa, kitaplık, bekleme alanı ve resepsiyon artık menüyü doğrudan açmaz. Avatar hedef halkasına yürür ve aksiyon varıştan sonra çalışır. Hedef yakındaysa etkileşim anında gerçekleşir. Modal veya panel açıkken hareket ve yeni hotspot aksiyonları kilitlenir.

Oyuncu avatarı için opsiyonel asset yolu `public/characters/therapist-avatar.png` dosyasıdır. Dosya bulunmadığında smart-casual görünümlü yerleşik SVG karakter otomatik kullanılır; uygulama eksik asset nedeniyle kırılmaz.

## Ofis yönetimi oyun döngüsü

Oyuncu güne ofis hub'ında başlar. Kapıdan veya takvimden sıradaki danışanı kabul eder; mevcut visual novel vaka ekranında bir yaklaşım seçer ve geri bildirimi okur. Tek vaka bir seansı temsil eder. Seans sonunda ödeme, itibar, etik güven ve 18 enerji kaybı işlenir; ardından oyuncu ofise döner.

Bir günde en fazla 2-4 randevu üretilir. Asistan ve geliştirilmiş bekleme alanı kapasiteyi artırırken yüksek ücret/düşük itibar birleşimi talebi azaltabilir. Enerji 18'in altına düştüğünde yeni seans başlatılmaz ve dinlenme sınırı önerilir. Oyuncu günü istediği zaman kapatabilir; günlük asistan gideri ve her beşinci gündeki kira ödemesi rapora yansır.

Asistan 2.300 TL işe alım ve 300 TL günlük giderle çalışır. İlk seviyede günlük kapasiteyi artırır; sonraki seviyeler no-show ihtimalini azaltır, ön bilgilendirme ve raporlama akışını geliştirir. Asistan idari destek sunar; klinik kararların veya danışan güvenliğinin yerini almaz.

Ofis ilerlemesi `terapi-odasi-office-state` localStorage anahtarında sürümlü bir snapshot olarak saklanır. Para, itibar, etik güven, enerji, gün, ücret, personel, ofis seviyesi, satın alınan geliştirmeler, günün gelir/gider defteri ve danışan kuyruğunun sırası/durumları sayfa yenilendiğinde korunur. Yeni gün başlatılana kadar aynı danışanlar yeniden üretilmez.

Ekonomi eğrisi erken oyunda daha yumuşaktır: düşük puanlı seanslarda finansal kesinti azaltılmış, orta sonuçlara küçük etik güven artışı eklenmiş ve başlangıç kira gideri 800 TL'ye çekilmiştir. Etik ihlallerin itibar ve güven yaptırımları caydırıcı kalır.

Risk vakaları ekonomik bonus olarak rastgele sunulmaz. Nadir ve öngörülebilir bir güvenlik olayı olarak kuyruğun sonunda yer alır; sonuç ekranı ekonomik sonuçtan önce güvenlik planını ve etik sorumluluğu vurgular.

## Kurulum

Gereksinimler:

- Node.js 20.9 veya üzeri
- npm

Bağımlılıkları kurun:

```bash
npm install
```

## Çalıştırma

Geliştirme sunucusu:

```bash
npm run dev
```

Ardından `http://localhost:3000` adresini açın.

Üretim derlemesi:

```bash
npm run build
npm run start
```

Kod denetimi:

```bash
npm run lint
```

## Proje yapısı

```text
app/                 Next.js sayfa ve global stiller
components/          Simülasyon ekranları ve arayüz bileşenleri
components/PlayerAvatar.tsx Gezilebilir psikolog avatarı ve SVG fallback
components/InteractionTargetMarker.tsx Zemin hedef halkası
data/cases.ts        Vaka, seçenek, atmosfer ve ek bilgi verileri
data/characters.ts   Vaka-karakter eşlemeleri ve opsiyonel asset yolları
data/upgrades.ts     Ofis geliştirmeleri ve kalıcı etkileri
data/staff.ts        Asistan seviyeleri ve maliyetleri
lib/results.ts       Puan, rozet, bağ ve final değerlendirme hesapları
lib/session.ts       Oturum karıştırma ve risk vakası konumlandırması
lib/economy.ts       Seans sonucu, talep, kapasite ve geliştirme hesapları
lib/officeStorage.ts Ofis state'i için güvenli localStorage katmanı
lib/playerMovement.ts Koordinat, sınır ve klavye hareket yardımcıları
public/backgrounds/  Opsiyonel klinik arka planları
public/characters/   Opsiyonel 2D danışan sprite’ları
types/simulator.ts   Ortak TypeScript tipleri
types/office.ts      Ofis, gün, ekonomi ve randevu tipleri
types/player.ts      Avatar ve etkileşim hedefi tipleri
```

Yeni vakalar `data/cases.ts` içindeki veri modeli izlenerek eklenebilir. İçerik yazılırken yargılayıcı, kesinlik bildiren veya riskli davranışı ayrıntılandıran dilden kaçınılmalıdır.
