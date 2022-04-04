function getFile (inp){
  //no return
  let file = inp.files[0];
  let fr = new FileReader();
  fr.readAsText(file);
  fr.onload = function(){
    let hexCodes = colorCode (fr.result, file['name']);
    let imgMain = document.createElement ("canvas");
    imgMain.width = hexCodes.length;
    imgMain.height = 100;
    document.body.appendChild(imgMain);
    let ctx = imgMain.getContext("2d");
    for (let i=0;i<hexCodes.length;++i){
      ctx.fillStyle = hexCodes[i];
      ctx.fillRect (i,0,i+1,100);
    }
  };
  
  fr.onerror = function(){
    console.log (fr.error);
  };
}

function rgb10(r,g,b){
  //returns an HTML color code
  let rR = "0"+r.toString(16);
  let rG = "0"+g.toString(16);
  let rB = "0"+b.toString(16);
  rR = rR.substr(rR.length - 2);
  rG = rG.substr(rG.length - 2);
  rB = rB.substr(rB.length - 2);
  return "#" + rR + rG + rB;
}

function colorCode (strInp, strName){
  //returns an array of color codes;
  let colors    = [[],[],[]];
  let colorsHex = [];
  while(strName.length<256)
    strName += String.fromCharCode (0);
  let wholeStr = strName + strInp;
  for(let i=0;i<wholeStr.length;++i){
    colors[i%3].push(wholeStr[i].charCodeAt(0));
  }
  if (colors[0].length>colors[1].length)
    colors[1].push(0);
  if (colors[1].length>colors[2].length)
    colors[2].push(0);
  for (let i=0;i<colors[0].length;++i){
    colorsHex.push(rgb10(colors[0][i],colors[1][i],colors[2][i]));
  }
  return colorsHex;
}
