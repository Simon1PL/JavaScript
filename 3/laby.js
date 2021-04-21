const headers = ["h1", "h2", "h3", "h4", "h5", "h6"];
let counter = 1;
headers.forEach(h => {
    [...document.getElementsByTagName(h)].forEach(element => {
        element.addEventListener("click", add);
    });
});


list = document.getElementsByTagName("ul")[0];

function add(e) {
    if (e.target.id.startsWith("myIdentityId_98742344cdss")) {
        const el = document.getElementById("LINK" + e.target.id).remove();
        e.target.removeAttribute("id");
        return;
    }
    e.target.id = "myIdentityId_98742344cdss" + counter;
    const li = document.createElement("li");
    li.id = "LINKmyIdentityId_98742344cdss" + counter;
    const link = document.createElement("a");
    const text = document.createTextNode(e.target.textContent);
    link.appendChild(text);
    link.href = "#" + counter;
    li.append(link);
    list.append(li);
    counter++;
}