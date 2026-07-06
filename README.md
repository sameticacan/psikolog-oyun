# Terapi Odası: Mini Vaka Simülatörü

Türkçe, mobil öncelikli ve psikoloji temalı eğitici bir mini karar simülasyonu. Visual novel tarzındaki gece kliniği sahnesinde 2D danışan karakterleriyle karşılaşır; üç yaklaşım arasından seçim yapar ve seçimin güven, empati, etik duruş ile klinik uygunluk üzerindeki eğitimsel yansımasını görür.

## Etik not

Bu simülasyon bilgilendirme ve eğitim amacı taşır. Gerçek psikolojik değerlendirme, tanı veya terapi yerine geçmez.

Uygulama terapi hizmeti sunmaz ve kişiye özel psikolojik yönlendirme üretmez. Kendine zarar riski içeren vakada güvenlik öncelenir: kişi yalnız bırakılmamalı, güvenilir bir yetişkin ve ruh sağlığı profesyonelinden destek alınmalı; yakın veya acil tehlikede 112 aranmalı ya da en yakın acil servise başvurulmalıdır.

## Özellikler

- Çocuk, ergen ve genç yetişkin alanından 15 vakalık havuz ve 45 nüanslı yaklaşım seçeneği
- Her başlangıçta karıştırılan 10 vakalık oturumlar; seçilen risk vakasının son iki sıraya güvenli biçimde yerleştirilmesi
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
```

Bu dosyalar zorunlu değildir. Klinik arka planı bulunamazsa CSS ile oluşturulan pencere, gece şehir ışıkları, kitaplık, lamba, bitki, koltuk ve sehpa sahnesi görünür. Karakter PNG’si yüklenemezse vaka yaş grubu ile duygu durumuna göre renklendirilen yarım vücut SVG portresi otomatik devreye girer.

Yeni görseller aynı dosya adlarıyla ilgili klasörlere kopyalandığında kod değişikliği gerekmez. Farklı bir karakter görseli kullanmak için `data/characters.ts` içindeki `image` alanı güncellenebilir. Şeffaf arka planlı, dikey karakter PNG’leri önerilir.

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
data/cases.ts        Vaka, seçenek, atmosfer ve ek bilgi verileri
data/characters.ts   Vaka-karakter eşlemeleri ve opsiyonel asset yolları
lib/results.ts       Puan, rozet, bağ ve final değerlendirme hesapları
lib/session.ts       Oturum karıştırma ve risk vakası konumlandırması
public/backgrounds/  Opsiyonel klinik arka planları
public/characters/   Opsiyonel 2D danışan sprite’ları
types/simulator.ts   Ortak TypeScript tipleri
```

Yeni vakalar `data/cases.ts` içindeki veri modeli izlenerek eklenebilir. İçerik yazılırken yargılayıcı, kesinlik bildiren veya riskli davranışı ayrıntılandıran dilden kaçınılmalıdır.
