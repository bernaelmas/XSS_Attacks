# XSS Saldırı Türleri Demo Uygulaması

Bu proje, Cross-Site Scripting (XSS) saldırı türlerini ve güvenlik önlemlerini göstermek için tasarlanmış eğitim amaçlı bir demo uygulamasıdır.

## Dosya Yapısı

- `index.html`: Ana sayfa, tüm demo sayfalarına bağlantılar içerir
- `style.css`: Tüm sayfalar için ortak stil dosyası
- `stored-xss.html`: Stored XSS saldırı türü demonstrasyonu
- `reflected-xss.html`: Reflected XSS saldırı türü demonstrasyonu
- `dom-xss.html`: DOM-Based XSS saldırı türü demonstrasyonu
- `secure-version.html`: Güvenli kodlama yöntemleri ve önlemler
- `secure-code.js`: Güvenli kod örnekleri

## Saldırı Türleri

### 1. Stored XSS (Kalıcı XSS)

Bu saldırı türünde, kötü niyetli kod bir web uygulamasının veritabanına kaydedilir ve daha sonra diğer kullanıcılara sunulur.

**Örnek:**
```html
alert('Stored XSS Saldırısı Başarılı!');
```

### 2. Reflected XSS (Yansıtılan XSS)

Bu saldırı türünde, kötü niyetli kod genellikle bir URL parametresi veya form girdisi yoluyla gönderilir ve sunucu tarafından doğrudan yanıtta yansıtılır.

**Örnek:**
```html
alert('Reflected XSS Saldırısı Başarılı!');
```

### 3. DOM-Based XSS (DOM Tabanlı XSS)

Bu saldırı türü tamamen tarayıcı tarafında gerçekleşir ve sunucuya ulaşmaz. URL parametrelerinin güvenli olmayan bir şekilde DOM'a eklenmesiyle ortaya çıkar.

**Örnek:**
```
?name=<script>alert('DOM-Based XSS Saldırısı Başarılı!');</script>
```

## Güvenlik Önlemleri

1. **Girdi Doğrulama ve Temizleme**
   - Kullanıcı girdilerini HTML kodlaması yaparak kaydedin
   - DOMPurify gibi kütüphaneler kullanın

2. **Güvenli DOM Manipülasyonu**
   - innerHTML yerine textContent veya createTextNode kullanın
   - Template sistemleri kullanın

3. **Content Security Policy (CSP)**
   - Hangi kaynaklardan gelen içeriğin çalıştırılabileceğini belirleyin

4. **HttpOnly Çerezler**
   - JavaScript erişiminden çerezleri koruyun

## Kullanım

1. Tüm dosyaları bir klasöre indirin
2. `index.html` dosyasını bir web tarayıcısında açın
3. Demo sayfaları arasında gezinerek XSS saldırı türlerini test edin

## Uyarı

Bu demo uygulaması **yalnızca eğitim amaçlıdır**. Gösterilen güvenlik açıkları gerçek dünya uygulamalarında olmamalıdır. Gerçek web uygulamalarında her zaman uygun güvenlik önlemlerini alın.

## Lisans

Bu proje MIT lisansı altında dağıtılmaktadır.