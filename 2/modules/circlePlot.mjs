import { createLabelRow } from './plots.mjs';

export function drawCirclePlot(mapOfObjects, canvasId, labelId=null, colors=null) {
    const canvas = document.getElementById(canvasId);
    const label = labelId ? document.getElementById(labelId) : null;
    if (label) label.innerHTML = "";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    let amountSum = 0;
    for (let key of mapOfObjects.keys()) {
        amountSum += mapOfObjects.get(key);
    }

    let alreadyPainted = 0;
    let keyIndex = 0;
    for (let key of mapOfObjects.keys()) {
        let color;
        if (keyIndex < colors.length) {
            color = colors ? colors[keyIndex] : ctx.fillStyle = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
        else {
            color = ctx.fillStyle = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
        const amount = mapOfObjects.get(key);
        ctx.beginPath();
        ctx.moveTo(canvas.offsetWidth/2, canvas.offsetHeight/2);
        ctx.arc(canvas.offsetWidth/2, canvas.offsetHeight/2, canvas.offsetHeight/2, 0 + alreadyPainted*2*Math.PI/amountSum, (alreadyPainted +amount)*2*Math.PI/amountSum)+1;
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.fillStyle = color;
        ctx.fill();
        alreadyPainted += amount;
        keyIndex ++;
        if (label) label.append(createLabelRow(key, color, amount));
    }
}