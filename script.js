const fromText = document.querySelector(".from-text"),
      toText = document.querySelector(".to-text"),
      fromLang = document.getElementById("from-lang"),
      toLang = document.getElementById("to-lang"),
      translateBtn = document.getElementById("translate-btn");

const languages = {
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
    "hi": "Hindi",
    "ar": "Arabic",
    "zh": "Chinese",
    "ru": "Russian",
    "ja": "Japanese"
};

// Populate language dropdowns
for (let code in languages) {
    let optionFrom = document.createElement("option");
    let optionTo = document.createElement("option");
    optionFrom.value = optionTo.value = code;
    optionFrom.textContent = optionTo.textContent = languages[code];
    fromLang.appendChild(optionFrom);
    toLang.appendChild(optionTo);
}
fromLang.value = "en";
toLang.value = "hi";

translateBtn.addEventListener("click", () => {
    const text = fromText.value.trim();
    const source = fromLang.value;
    const target = toLang.value;
    if (!text) return;

    const apiKey = "YOUR_GOOGLE_API_KEY"; // Replace this
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            q: text,
            source,
            target,
            format: "text"
        })
    })
    .then(res => res.json())
    .then(data => {
        toText.value = data.data.translations[0].translatedText;
    })
    .catch(err => {
        console.error(err);
        toText.value = "Translation failed.";
    });
});