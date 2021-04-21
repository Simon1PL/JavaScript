const input = document.forms.form1.elements.input;
let liczba = parseInt(input.value);
window.setInterval(dekrementation, 1000);

function changeSpans() {
    let spans = document.getElementsByTagName("span");
    for (let i = 0; i < spans.length; i++) {
        var text = document.createTextNode(liczba);
        spans[i].replaceChild(text, spans[i].childNodes[0]);
    }
}

function changeInput() {
    if (input.value > 0)
        liczba = input.value-1;
    input.value = liczba;
}

function dekrementation() {
    changeInput();
    changeSpans();
}

class HelloWorld extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = liczba;
        window.setInterval(()=>{
            var text = document.createTextNode(liczba);
            shadowRoot.replaceChild(text, shadowRoot.childNodes[0]);
            // shadowRoot.innerHTML = liczba;
        }, 1000);
    }
  }
  customElements.define('hello-world', HelloWorld);