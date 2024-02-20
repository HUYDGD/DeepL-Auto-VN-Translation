var hiragana = /[\u3040-\u309f]/;
var katakana = /[\u30a0-\u30ff]/;
var kanji = /[\u4e00-\u9faf]/;
var maxLineLength = 200;

(() => {
    const processMessage = msg => {
	switch(msg.action) {
	case "insert":
	    // Get current Japanese text from URL
		var currentJapaneseText = decodeURIComponent(document.URL.replace('https://www.deepl.com/translator#ja/en/',''));
		// If the Japanese text in the URL and the text in your clipboard is different...
		if (currentJapaneseText !== msg.text) {
			// If the text in your clipboard has kana or kanji, and also doesn't go past the max character length...
			if ((hiragana.test(msg.text) || katakana.test(msg.text) || kanji.test(msg.text)) && maxLineLength >= msg.text.length) {
				// Then change the URL to your clipboard's content, starting the translation process.
				document.location.href = "https://www.deepl.com/translator#ja/en/" + msg.text.replace(/…+|‥+/g, "...").replace(/―+/g, "-")
			}
		}
	    break
	case "uninject":
	    chrome.runtime.onMessage.removeListener(processMessage)
	    break
	}    
    }

    chrome.runtime.onMessage.addListener(processMessage)
})()
