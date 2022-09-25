//açılır kapanır sidebar

function onbtn() {
  document.getElementById("sidebar").style.width="20%";
  document.getElementById("onbutton").style.visibility="hidden";



  };
function offbtn() {
document.getElementById("sidebar").style.width="0";
document.getElementById("onbutton").style.visibility="visible";

};


  




//harita oluşturma
var map=L.map('map').setView([39.922336728815566,32.803],10 );
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// zoo kontrolü sağ alta alma işlemi
map.zoomControl.remove();

L.control.zoom({
  position: 'bottomright'
}).addTo(map);
var uni_icon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3311/3311565.png',
  iconSize: [60, 60]
  })
//---------------

// fltreleme FOnks
function filtrele(){
  // document.getElementById("sidebar").style.width="0";
  // document.getElementById("onbutton").style.visibility="visible";

var markerLayer = L.layerGroup();
map.eachLayer(function (layer) {
  if (layer instanceof L.Marker){
      map.removeLayer(layer);
  }
});
// filtelerin alınması
var bölüm  = document.getElementById('bölüm').value;
var sıralama = document.getElementById('sıralama').value;

if ( sıralama <0 || sıralama > 575)
{ alert("Lütfen geçerli bir puan giriniz (0-575) ");
return false;}

document.getElementById("p1").innerHTML = "Seçtiğiniz filtere uygun olarak yerleşebileceğiniz Üniversiteler Harita üzerinde işaretlenmiştir. Dilerseniz harita üzerinden sembole tıklayarak ilgili program hakkında daha detaylı alabilirsiniz.";

// obje sayısının belirlenmesi



const keys=Object.keys(data.okullar);
const keysLength = keys.length;


//bölüm==data.okullar[i]["PROGRAM ADI"]

// ilk for döngüsü ( bölüm adı ve sıralama taraması için)
for(i=0;i<keysLength;i++)
{

if(bölüm==data.okullar[i]["PROGRAM ADI"]  && sıralama > data.okullar[i]["EN KÜÇÜK PUAN"])
// ikinci for döngüsü (enlem boylam taraması için)
for(j=0;j<21;j++){
if(data.okullar[i]["ÜNİVERSİTE ADI"]===Üniversiteler[j].ADI)
{

var enlem=Üniversiteler[j].x;
var boylam=Üniversiteler[j].y;

//marker ekleme
var m= new L.Marker([enlem,boylam],{icon:uni_icon}).addTo(markerLayer);
markerLayer.addTo(map);

//popup ve tooltip eklenmesi
m.bindTooltip(Üniversiteler[j].ADI);
m.bindPopup(Üniversiteler[j].ADI + "<br>" + "Bölüm= " + data.okullar[i]["PROGRAM ADI"] + "<br>" + "Kontenjan = " +
data.okullar[i]["GENEL KONTENJAN"] + "<br>" + "Puan Türü= " + data.okullar[i]["PUAN TÜRÜ"] + "<br>"  + "taban puanı = "  +  data.okullar[i]["EN KÜÇÜK PUAN"] +"<br>"+
"Fakülte = " + data.okullar[i]["MESLEK YÜKSEKOKULU ADI"] + "<br>" + "Adres = " + Üniversiteler[j].ADRES );

map.flyTo([enlem,boylam],11);

}
}

}



}

