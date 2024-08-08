// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: orange;
// icon-glyph: dollar-sign;
async function loadItems() {
  let at = endpoint
  let req = new Request(at)
  let corpo = await req.loadJSON()  
  return corpo  
}

function newLine(label, value, w) {
 let lfont = new Font("Avenir-Heavy", 15)
 let vfont = new Font("Avenir-Book", 15)

 line1 = w.addStack()
 line1.setPadding(1, 0, 1, 0)
 line1.layoutHorizontally()

 labelText = line1.addText(label)
 labelText.font = lfont
 labelText.textColor = Color.white()
 line1.addSpacer()

 valueText = line1.addText(value)    
 valueText.textColor = Color.orange()
 valueText.font = vfont
}

function createWidget(json) {
  

 oficial = json['oficial'][1].toString()
 oficial1 = oficial.substring(0,oficial.indexOf(","));
 oficial2 = parseInt(oficial1, 10).toString()

 blue = json['informal'][1].toString()
 blue1 = blue.substring(0,blue.indexOf(","));
 blue2 = parseInt(blue1, 10).toString()

 tarjeta = json['turista'][1].toString()
 tarjeta1 = parseInt(tarjeta, 10).toString()
 
 mep = json['mep'][1].toString()
 mep1 = parseInt(mep, 10).toString()
 
 ccl = json['ccl'][1].toString()
 ccl1 = parseInt(ccl, 10).toString()
 
 cripto = json['ccb'][1].toString()
 cripto1 = parseInt(cripto, 10).toString()


 let w = new ListWidget()
 w.backgroundColor = new Color('#1C1C1E')


  newLine("oficial", oficial2, w)
  newLine("blue", blue2, w)
  newLine("tarjeta", tarjeta1, w)
  newLine("mep", mep1, w)
  newLine("ccl", ccl1, w)
  newLine("cripto", cripto1, w)
  
 return w
}

const endpoint = "https://api.ambito-dolar.app/fetch"

let json = await loadItems()

let widget = createWidget(json)

Script.setWidget(widget)
Script.complete()