# Terapi Odası: Mini Vaka Simülatörü

Türkçe, mobil öncelikli ve psikoloji temalı eğitici bir mini karar simülasyonu. Oyuncu çocuk, ergen ve genç yetişkin alanından 15 kısa vakayı okur; üç yaklaşım arasından seçim yapar ve seçimin güven, empati, etik duruş ile klinik uygunluk üzerindeki eğitimsel yansımasını görür.

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
lib/results.ts       Puan, rozet, bağ ve final değerlendirme hesapları
types/simulator.ts   Ortak TypeScript tipleri
```

Yeni vakalar `data/cases.ts` içindeki veri modeli izlenerek eklenebilir. İçerik yazılırken yargılayıcı, kesinlik bildiren veya riskli davranışı ayrıntılandıran dilden kaçınılmalıdır.
