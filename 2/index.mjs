import { drawCirclePlot, drawNormalPlot } from './modules/plots.mjs';
console.log(drawCirclePlot)
const colors = ["#34eb95", "#3459eb", "#eb346b", "#ff9c38"]; // parameter
const mapOfObjects = new Map();
// example data:
mapOfObjects.set("cuk", 1);
mapOfObjects.set("mateusz", 2);
mapOfObjects.set("mieszanka krakowska", 3);
drawCirclePlot(mapOfObjects, "canvas", "label", colors);
drawNormalPlot(mapOfObjects, "canvas2", null, colors);

document.getElementById("add").addEventListener('click', add);
document.getElementById("remove").addEventListener('click', remove);

function add() {
    const el = document.getElementById("elementName").value;
    if (mapOfObjects.has(el)) {
        mapOfObjects.set(el, mapOfObjects.get(el)+1);
    }
    else {
        mapOfObjects.set(el, 1);
    }
    drawCirclePlot(mapOfObjects, "canvas", "label", colors);
    drawNormalPlot(mapOfObjects, "canvas2", null, colors);
}

function remove() {
    const el = document.getElementById("elementName").value;
    if (mapOfObjects.has(el)) {
        mapOfObjects.set(el, mapOfObjects.get(el)-1);
        if ( mapOfObjects.get(el) == 0) {
            mapOfObjects.delete(el);
        }
    }
    drawCirclePlot(mapOfObjects, "canvas", "label", colors);
    drawNormalPlot(mapOfObjects, "canvas2", null, colors);
}