import { createLabelRow } from './plots.mjs';

export function drawNormalPlot(mapOfObjects, canvasId, labelId=null, colors=null) {
    const canvas = document.getElementById(canvasId);
    const label = labelId ? document.getElementById(labelId) : null;
    if (label) label.innerHTML = "";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    let maxValue = Number.NEGATIVE_INFINITY;
    for (let key of mapOfObjects.keys()) {
        maxValue = mapOfObjects.get(key) > maxValue ? mapOfObjects.get(key) : maxValue;
    }

    const topGap = 20;
    const leftGap = 20; 
    const bottomGap = 60; 
    const plotMargin = 100;
    const yDiff = 1;
    const textHeight = 8;
    const width = canvas.offsetWidth - plotMargin*2 - leftGap;
    const height =  canvas.offsetHeight - bottomGap;
    let lastPoint = [leftGap, height];
    ctx.beginPath();
    let y = height;
    let value = 0;
    while (y > topGap) {
        y -= (height-topGap)/(maxValue/yDiff);
        value += yDiff;
        ctx.moveTo(leftGap-7, y);
        ctx.lineTo(leftGap+7, y);
        ctx.fillText(value, 0, y+textHeight/2);
    }
    ctx.moveTo(leftGap, 0);
    ctx.lineTo(leftGap, height+1);
    ctx.lineTo(canvas.offsetWidth, height+1);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.textAlign = "center";
    let size = mapOfObjects.size;
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
        ctx.font = 7+4*20/key.length + "px Arial";
        ctx.fillText(key, leftGap + plotMargin + width/(size-1)*keyIndex+25, height+30);
        ctx.moveTo(leftGap + plotMargin + width/(size-1)*keyIndex+25, height);
        ctx.lineTo(leftGap + plotMargin + width/(size-1)*keyIndex+25, height-(height-topGap)/maxValue*amount);
        ctx.lineWidth = 20;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(lastPoint[0], lastPoint[1]);
        ctx.lineTo(leftGap + plotMargin + width/(size-1)*keyIndex+25, height - (height-topGap)/maxValue*amount);
        lastPoint[0] = leftGap + plotMargin + width/(size-1)*keyIndex+25;
        lastPoint[1] =  height - (height-topGap)/maxValue*amount;
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke();
        keyIndex ++;
        if (label) label.append(createLabelRow(key, color, amount));
    }
}
