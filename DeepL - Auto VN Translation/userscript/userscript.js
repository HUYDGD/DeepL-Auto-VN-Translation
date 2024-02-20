// ==UserScript==
// @name     DeepL - Auto VN Translation Extension Helper
// @version  1
// @grant    GM.setClipboard
// @match        https://www.deepl.com/translator
// @description  Watch for target language element class change, copy new value of textarea to clipboard each time change has been detected.
// @author       Anon
// @icon     https://www.deepl.com/img/logo/deepl-logo-blue.svg
// ==/UserScript==
(function() {
    'use strict';

    function callback(mutationsList, observer) {
        console.log('Mutations:', mutationsList)
        console.log('Observer:', observer)
    }

    const mutationObserver = new MutationObserver(callback)

    mutationObserver.observe(
        document.getElementById('dl_translator'), {
            attributes: true
        }
    )

    function callback(mutationsList) {
        mutationsList.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                // If the source textarea is not empty, and there is not a sentence being actively translated...
                if (!document.getElementById('dl_translator').classList.contains('lmt--empty_source') &&
                    !document.getElementById('dl_translator').classList.contains('lmt--active_translation_request')) {
                    // Then copy the target textarea's content (English translation) to the clipboard.
                    GM.setClipboard(document.getElementsByClassName('lmt__target_textarea')[0].value.replace(/\"+|\'\'+/g, "").replace(/\.\.\.\.+/g, "..."))
                }
            }
        })
    }
})();