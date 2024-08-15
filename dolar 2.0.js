// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;
async function loadItems() {
    let at = endpoint;
    let req = new Request(at);
    let corpo = await req.loadJSON();
    return corpo;
}
function newLine(label, precio, cambio, w) {
    let lfont = new Font("Avenir-Heavy", 15);
    let line1 = w.addStack();
    line1.setPadding(1, 0, 1, 0);
    line1.layoutHorizontally();
    let labelText = line1.addText(label);
    labelText.font = lfont;
    labelText.textColor = Color.white();
    line1.addSpacer();
    let precioText = line1.addText(precio);
    precioText.textColor = Color.orange();
    precioText.font = lfont;
    let cambioText = line1.addText(cambio.toString());
    // Change color based on the value of cambio
    if (parseFloat(cambio) > 0) {
        cambioText.textColor = new Color('##32D25A'); // Green if positive
    } else if (parseFloat(cambio) < 0) {
        cambioText.textColor = new Color('#F71A1B'); // Red if negative
    } else {
        cambioText.textColor = Color.gray(); // Default gray if zero
    }
    cambioText.font = lfont;
}
function createWidget(json) {
    let oficial = json['oficial'][1].toString();
    let oficial1 = oficial.substring(0, oficial.indexOf(","));
    let oficial2 = parseInt(oficial1, 10).toString();
    let oficial_cambio = json['oficial'][2];
    let blue = json['informal'][1].toString();
    let blue1 = blue.substring(0, blue.indexOf(","));
    let blue2 = parseInt(blue1, 10).toString();
    let blue_cambio = json['informal'][2];
    let tarjeta = json['turista'][1].toString();
    let tarjeta1 = parseInt(tarjeta, 10).toString();
    let tarjeta_cambio = json['turista'][2];
    let mep = json['mep'][1].toString();
    let mep1 = parseInt(mep, 10).toString();
    let mep_cambio = json['mep'][2];
    let ccl = json['ccl'][1].toString();
    let ccl1 = parseInt(ccl, 10).toString();
    let ccl_cambio = json['ccl'][2];
    let cripto = json['ccb'][1].toString();
    let cripto1 = parseInt(cripto, 10).toString();
    let cripto_cambio = json['ccb'][2];
    let w = new ListWidget();
    w.backgroundColor = new Color('#1C1C1E');
    newLine("oficial", "$ " + oficial2 + "\t".repeat(3), oficial_cambio + " %", w);
    newLine("blue", "$ " + blue2 + "\t".repeat(3), blue_cambio + " %", w);
    newLine("tarjeta", "$ " + tarjeta1 + "\t".repeat(3), tarjeta_cambio + " %", w);
    newLine("mep", "$ " + mep1 + "\t".repeat(3), mep_cambio + " %", w);
    newLine("ccl", "$ " + ccl1 + "\t".repeat(3), ccl_cambio + " %", w);
    newLine("cripto", "$ " + cripto1 + "\t".repeat(3), cripto_cambio + " %", w);
    return w;
}
const endpoint = "https://api.ambito-dolar.app/fetch";
let json = await loadItems();
let widget = createWidget(json);
Script.setWidget(widget);
Script.complete();
