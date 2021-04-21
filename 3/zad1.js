function ustaw() {
    var aside = document.getElementsByTagName("aside");
    for (let i = 0; i < aside.length; i++) {
        aside[i].style.width = "400px";
        aside[i].style.display = "inline-block";
        aside[i].style.position = "absolute";
        aside[i].style.right = "8px";
        aside[i].style.top = "64px";
    }

    var footer = document.getElementsByTagName("footer");
    for (let i = 0; i < footer.length; i++) {
        footer[i].style.paddingTop = "5px";
        footer[i].style.paddingBottom = "5px";
    }

    var main = document.getElementsByTagName("main");
    for (let i = 0; i < main.length; i++) {
        main[i].style.width = "435px";
    }

    var nav = document.getElementsByTagName("nav");
    for (let i = 0; i < nav.length; i++) {
        nav[i].style.width = "115px";
    }

    var azure = document.getElementsByClassName("azure");
    for (let i = 0; i < azure.length; i++) {
        azure[i].style.borderStyle = "solid";
        azure[i].style.borderWidth = "2px";
        azure[i].style.borderColor = "#A8A8A8";
        azure[i].style.backgroundColor = "#EFF";
        azure[i].style.margin = "10px";
        azure[i].style.paddingLeft = "10px";
        azure[i].style.boxShadow = "0 0 5px 1px #A8A8A8";
    }

    var singleline = document.getElementsByClassName("singleline");
    for (let i = 0; i < singleline.length; i++) {
        singleline[i].style.lineHeight = "7px"; 
    }

    var longtext = document.getElementsByClassName("longtext");
    for (let i = 0; i < longtext.length; i++) {
        longtext[i].style.paddingTop = "15px";
        longtext[i].style.paddingBottom = "15px";
        longtext[i].style.whiteSpace = "pre-line";
    }
}

function skasuj() {
    var aside = document.getElementsByTagName("aside");
    for (let i = 0; i < aside.length; i++) {
        aside[i].style.width = null;
        aside[i].style.display = null;
        aside[i].style.position = null;
        aside[i].style.right = null;
        aside[i].style.top = null;
    }

    var footer = document.getElementsByTagName("footer");
    for (let i = 0; i < footer.length; i++) {
        footer[i].style.paddingTop = null;
        footer[i].style.paddingBottom = null;
    }

    var main = document.getElementsByTagName("main");
    for (let i = 0; i < main.length; i++) {
        main[i].style.width = null;
    }

    var nav = document.getElementsByTagName("nav");
    for (let i = 0; i < nav.length; i++) {
        nav[i].style.width = null;
    }

    var azure = document.getElementsByClassName("azure");
    for (let i = 0; i < azure.length; i++) {
        azure[i].style.borderStyle = null;
        azure[i].style.borderWidth = null;
        azure[i].style.borderColor = null;
        azure[i].style.backgroundColor = null;
        azure[i].style.margin = null;
        azure[i].style.paddingLeft = null;;
        azure[i].style.boxShadow = null;
    }

    var singleline = document.getElementsByClassName("singleline");
    for (let i = 0; i < singleline.length; i++) {
        singleline[i].style.lineHeight = null; 
    }
    for (let i = 0; i < longtext.length; i++) {
        longtext[i].style.paddingTop = null;
        longtext[i].style.paddingBottom = null;
        longtext[i].style.whiteSpace = null;
    }

    var longtext = document.getElementsByClassName("longtext");
    for (let i = 0; i < longtext.length; i++) {
        longtext[i].style.paddingTop = null;
        longtext[i].style.paddingBottom = null;
        longtext[i].style.whiteSpace = null;
    }
}
