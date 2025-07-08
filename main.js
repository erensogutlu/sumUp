// metni analiz eden fonksiyon
function analizYap() {
  const girdiMetni = document.getElementById("girdiMetni").value.trim()
  const sonucAlani = document.getElementById("sonuclar")
  document.getElementById("ozetAlani").innerHTML = ""

  if (girdiMetni === "") {
    sonucAlani.innerHTML = "<p>Lütfen analiz edilecek bir metin giriniz.</p>"
    return
  }

  // temel metin analizleri: kelime, karakter, cümle sayısı vb.
  const kelimeler = girdiMetni.split(/\s+/)
  const karakterSayisi = girdiMetni.length
  const kelimeSayisi = kelimeler.length
  const cumleSayisi = girdiMetni.split(/[.!?]+/).filter(c => c.trim() !== '').length
  const ortalamaKelimeUzunlugu = (karakterSayisi / kelimeSayisi).toFixed(2)

  // en çok geçen kelimeyi bul
  const enCokGecen = enCokKelimeBul(girdiMetni)

  // sonuçları HTML olarak yazdır
  sonucAlani.innerHTML = `
   <p><strong>Kelime Sayısı:</strong> ${kelimeSayisi}</p>
   <p><strong>Karakter Sayısı:</strong> ${karakterSayisi}</p>
   <p><strong>Cümle Sayısı:</strong> ${cumleSayisi}</p>
   <p><strong>Ortalama Kelime Uzunluğu:</strong> ${ortalamaKelimeUzunlugu}</p>
   <p><strong>En Çok Geçen Kelime:</strong> ${enCokGecen}</p>
  `
}

 // metindeki en sık geçen kelimeyi bulan yardımcı fonksiyon
 function enCokKelimeBul(metin) {
    if (typeof metin !== 'string') return "Yok"
    const kelimeDizisi = metin
     .toLowerCase()
     .replace(/[^\wçğıöşü\s]/gi, '')
     .split(/\s+/)

     const sayac = {}
     let enCok = ''
     let maksimum = 0

      for (let kelime of kelimeDizisi) {
      if (kelime.length < 3) continue
      sayac[kelime] = (sayac[kelime] || 0) + 1
      if (sayac[kelime] > maksimum) {
      maksimum = sayac[kelime]
      enCok = kelime
       }
     }

  return enCok || "Yok"
}

// basit bir özet çıkaran fonksiyon (en uzun cümleleri seçer)
function ozetCikar() {
    const metin = document.getElementById("girdiMetni").value.trim()
    const ozetAlani = document.getElementById("ozetAlani")

    if (!metin) {
    ozetAlani.innerHTML = "<p>Lütfen özetlenecek bir metin giriniz.</p>"
    return
    }

    // cümlelere ayır, en uzun 3 tanesini seç ve birleştir
    const cumleler = metin.match(/[^.!?\n]+[.!?]?/g) || []
    const onemliCumleler = cumleler.sort((a, b) => b.length - a.length).slice(0, Math.min(3, cumleler.length))

    ozetAlani.innerHTML = `
     <h3>Otomatik Özet</h3>
     <p>${onemliCumleler.join(" ").trim()}</p>
    `
}

// arayüzü sıfırlayan fonksiyon
function temizle() {
  document.getElementById("girdiMetni").value = ""
  document.getElementById("sonuclar").innerHTML = ""
  document.getElementById("ozetAlani").innerHTML = ""
}  