import { drawCirclePlot } from './circlePlot.mjs';
import { drawNormalPlot } from './normalPlot.mjs';

export {drawCirclePlot, drawNormalPlot}

export function createLabelRow(name, color, amount) {
    const row = document.createElement("p");
    row.style.display = "flex";
    row.style.alignItems = "center";
    const colorBox = document.createElement("div");
    colorBox.style.width = "15px";
    colorBox.style.height = "15px";
    colorBox.style.backgroundColor = color;
    row.append(colorBox);
    const text = document.createTextNode(" - " + name + "(" + amount + ")");
    row.append(text);
    return row;
}