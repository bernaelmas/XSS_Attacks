// XSS'e karşı güvenli kod örnekleri

// HTML özel karakterlerini escape etme fonksiyonu
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ----------------- STORED XSS GÜVENLİ VERSİYON -----------------
document.getElementById('secureCommentForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const commentTextElement = document.getElementById('secureCommentText');
    const commentText = commentTextElement.value;
    
    if (commentText.trim() === '') {
        alert('Lütfen bir yorum yazın!');
        return;
    }
    
    // GÜVENLİ KOD: Kullanıcı girdisi temizleniyor
    const escapedComment = escapeHTML(commentText);
    
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    
    // GÜVENLİ KOD: textContent kullanılıyor
    const commentHeader = document.createElement('strong');
    commentHeader.textContent = 'Yorum: ';
    
    const commentContent = document.createElement('span');
    
    // GÜVENLİ KOD: innerHTML yerine textContent kullanılıyor
    commentContent.textContent = commentText;
    
    commentElement.appendChild(commentHeader);
    commentElement.appendChild(commentContent);
    
    // Alt kısım temizlenen HTML ile nasıl gösterileceğini göstermek için
    const noteElement = document.createElement('div');
    noteElement.style.fontSize = '12px';
    noteElement.style.color = '#666';
    noteElement.style.marginTop = '5px';
    noteElement.innerHTML = `<em>HTML escape edilmiş hali: ${escapedComment}</em>`;
    
    commentElement.appendChild(noteElement);
    
    document.getElementById('secureCommentSection')?.appendChild(commentElement);
    commentTextElement.value = '';
});

// ----------------- REFLECTED XSS GÜVENLİ VERSİYON -----------------
document.getElementById('secureSearchForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchQuery = document.getElementById('secureSearchQuery').value;
    
    // URL'ye parametreyi ekle (tarayıcı geçmişinde görünmesi için)
    const url = new URL(window.location.href);
    url.searchParams.set('secure_q', escapeHTML(searchQuery));
    window.history.pushState({}, '', url);
    
    displaySecureSearchResults(searchQuery);
});

// URL'den parametreleri oku ve arama sonuçlarını göster
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('secure_q');
    
    if (searchQuery) {
        document.getElementById('secureSearchQuery').value = searchQuery;
        displaySecureSearchResults(searchQuery);
    }
});

function displaySecureSearchResults(query) {
    if (query.trim() === '') {
        document.getElementById('secureSearchResults').textContent = 'Lütfen aranacak bir ürün girin.';
        return;
    }
    
    // GÜVENLİ KOD: Çıktı kodlaması ve güvenli DOM manipülasyonu
    const resultsContainer = document.getElementById('secureSearchResults');
    
    // Konteyner içeriğini temizle
    while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }
    
    // Başlık oluştur
    const heading = document.createElement('h3');
    heading.textContent = 'Arama Sonuçları';
    resultsContainer.appendChild(heading);
    
    // Sorgu metni oluştur
    const queryText = document.createElement('p');
    queryText.textContent = '"' + query + '" için sonuçlar:';
    resultsContainer.appendChild(queryText);
    
    // Sonuç listesi oluştur
    const resultsList = document.createElement('ul');
    const listItem = document.createElement('li');
    listItem.textContent = 'Ürün bulunamadı';
    resultsList.appendChild(listItem);
    resultsContainer.appendChild(resultsList);
    
    // Güvenlik açıklaması ekle
    const securityNote = document.createElement('p');
    securityNote.className = 'warning';
    securityNote.textContent = 'Güvenli versiyon: Kullanıcı girdisi doğrudan DOM\'a eklenmedi, textContent kullanıldı.';
    resultsContainer.appendChild(securityNote);
}

// ----------------- DOM-BASED XSS GÜVENLİ VERSİYON -----------------
function displaySecureWelcomeMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('secure_name');
    
    const welcomeContainer = document.getElementById('secureWelcomeMessage');
    
    if (!welcomeContainer) return;
    
    // Konteyner içeriğini temizle
    while (welcomeContainer.firstChild) {
        welcomeContainer.removeChild(welcomeContainer.firstChild);
    }
    
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'comment';
    
    const welcomeHeading = document.createElement('h3');
    welcomeHeading.textContent = 'Hoş geldiniz!';
    welcomeDiv.appendChild(welcomeHeading);
    
    const welcomeText = document.createElement('p');
    
    if (name) {
        // GÜVENLİ KOD: Kullanıcı girdisi textContent ile ekleniyor
        welcomeText.textContent = 'Merhaba, ' + name + '! Profilinize hoş geldiniz.';
    } else {
        welcomeText.textContent = 'Karşılama mesajı görmek için URL\'ye "?secure_name=AdınızSoyadınız" ekleyin.';
        
        const exampleCode = document.createElement('p');
        exampleCode.innerHTML = 'Örnek: <code>secure-version.html?secure_name=Ahmet Yılmaz</code>';
        welcomeDiv.appendChild(exampleCode);
    }
    
    welcomeDiv.appendChild(welcomeText);
    welcomeContainer.appendChild(welcomeDiv);
    
    // URL'de XSS denendiğini gösteren demonstrasyon
    if (name && (name.includes('<') || name.includes('>') || name.includes('script'))) {
        const securityNote = document.createElement('p');
        securityNote.className = 'warning';
        securityNote.textContent = 'Not: Girdiğiniz isim HTML veya script içeriyor, ama güvenli işleme sayesinde XSS saldırısı engellendi.';
        welcomeDiv.appendChild(securityNote);
        
        const originalInput = document.createElement('p');
        originalInput.textContent = 'Orijinal girdi: ' + name;
        originalInput.style.fontSize = '12px';
        welcomeDiv.appendChild(originalInput);
    }
}

// Sayfa yüklendiğinde güvenli fonksiyonları çağır
window.addEventListener('load', function() {
    displaySecureWelcomeMessage();
    
    // URL'ye kullanıcıyı yönlendirmek için linkler ekle
    const container = document.querySelector('.info-box');
    if (container) {
        const testLinksHeading = document.createElement('h4');
        testLinksHeading.textContent = 'Güvenli DOM-XSS Test Linkleri';
        container.appendChild(testLinksHeading);
        
        const testLinks = document.createElement('div');
        testLinks.className = 'code-example';
        testLinks.innerHTML = `
            <p>Aşağıdaki linkleri güvenli versiyonu test etmek için kullanabilirsiniz:</p>
            <ul>
                <li><a href="?secure_name=Kullanıcı">?secure_name=Kullanıcı</a> (normal parametre)</li>
                <li><a href="?secure_name=&lt;b&gt;Kalın Yazı&lt;/b&gt;">?secure_name=&lt;b&gt;Kalın Yazı&lt;/b&gt;</a> (HTML etiketi)</li>
                <li><a href="?secure_name=&lt;script&gt;alert('Bu çalışmayacak');&lt;/script&gt;">?secure_name=&lt;script&gt;alert('Bu çalışmayacak');&lt;/script&gt;</a> (XSS denemesi)</li>
            </ul>
        `;
        container.appendChild(testLinks);
    }
});