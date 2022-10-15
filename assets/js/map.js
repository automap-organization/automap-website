var map;
var markers = [];
var selectedMarker;

function Avertissement4() {
    var myModal1 = new bootstrap.Modal(document.getElementById('avertPhone'), {
        keyboard: false,
        backdrop: true,
      });
    myModal1.show()
    myModal1.addEventListener('hidden.bs.modal', function (event) {
        window.location.href = 'https://automap.tk';
    })
}

function Avertissement5() {
    var myModal1 = new bootstrap.Modal(document.getElementById('avertName'), {
        keyboard: false,
        backdrop: true,
      });
    myModal1.show()
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    Avertissement4()
}

function initMap() {
    const france = { lat: 48.841971703877924, lng: 2.296265910580467 };
    map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: france,
    mapTypeId: document.getElementById('type').value,
    streetViewControl: true,
    mapTypeControl: false,
    fullscreenControl: false,
    disableDoubleClickZoom: true,
    });

    map.addListener("dblclick", function(event) {
        const marker1 = new google.maps.Marker({
            position: { lat:  event.latLng.lat(), lng: event.latLng.lng() },
            map: map,
            icon: {                             
                url: "https://maps.google.com/mapfiles/ms/icons/"+ document.getElementById("color").value +"-dot.png"
            }
        });
        markers.push({lat: event.latLng.lat(), lng: event.latLng.lng(), color: document.getElementById("color").value})
        console.log(markers)

        marker1.addListener("rightclick", function(event2) {
            console.log(marker1)
            selectedMarker = marker1;
            console.log(selectedMarker)
            setTimeout(Avertissement3, 5)
        });
    });
}

function placeMarker() {
    const latitude = document.getElementById("gps-marker1").value;
    const longitude = document.getElementById("gps-marker2").value;
    const marker = new google.maps.Marker({
        position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        map: map,
        icon: {                             
            url: "https://maps.google.com/mapfiles/ms/icons/"+ document.getElementById("color").value +"-dot.png"
        }
      });
    markers.push(marker)
    console.log(markers)

    marker.addListener("rightclick", function(event2) {
        console.log(marker)
        selectedMarker = marker;
        console.log(selectedMarker)
        setTimeout(Avertissement3, 5)
    });
}

function deletePoint() {
    console.log(selectedMarker)
    selectedMarker.setMap(null);
    var index = markers.indexOf(selectedMarker);
    markers.splice(index, 1);
    console.log(markers)
}

function changeType() {
    map.setMapTypeId(document.getElementById('type').value);
}

function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
    
        element.style.display = 'none';
        document.body.appendChild(element);
    
        element.click();
    
        document.body.removeChild(element);
}
    
function download_map() {
    if (document.getElementById('name').value == "") {
        Avertissement5()
    } else {
        var text = "<?xml version =\"1.0\"?>\n"
        text += "<kml xmlns=\"http://earth.google.com/kml/2.2\">\n"
        text += "<Document>\n"
        text += "<Style id=\"blueicon\">\n"
        text += "<IconStyle>\n"
        text += "<Icon>\n"
        text += "<href>https://maps.google.com/mapfiles/ms/icons/blue-dot.png</href>\n"
        text += "</Icon>\n"
        text += "</IconStyle>\n"
        text += "</Style>\n"
        text += "<Style id=\"redicon\">\n"
        text += "<IconStyle>\n"
        text += "<Icon>\n"
        text += "<href>https://maps.google.com/mapfiles/ms/icons/red-dot.png</href>\n"
        text += "</Icon>\n"
        text += "</IconStyle>\n"
        text += "</Style>\n"
        text += "<Style id=\"purpleicon\">\n"
        text += "<IconStyle>\n"
        text += "<Icon>\n"
        text += "<href>https://maps.google.com/mapfiles/ms/icons/purple-dot.png</href>\n"
        text += "</Icon>\n"
        text += "</IconStyle>\n"
        text += "</Style>\n"
        text += "<Style id=\"greenicon\">\n"
        text += "<IconStyle>\n"
        text += "<Icon>\n"
        text += "<href>https://maps.google.com/mapfiles/ms/icons/green-dot.png</href>\n"
        text += "</Icon>\n"
        text += "</IconStyle>\n"
        text += "</Style>\n"
        text += "<Style id=\"yellowicon\">\n"
        text += "<IconStyle>\n"
        text += "<Icon>\n"
        text += "<href>https://maps.google.com/mapfiles/ms/icons/yellow-dot.png</href>\n"
        text += "</Icon>\n"
        text += "</IconStyle>\n"
        text += "</Style>\n"
        if (markers.length != 0) {
        for (const element of markers) {
            text += "<Placemark>\n<styleUrl>#" + element["color"] + "icon</styleUrl>\n"
            text += "<Point>\n"
            text += "<coordinates>" + element["lng"] + "," + element["lat"] + "</coordinates>\n"
            text += "</Point>\n"
            text += "</Placemark>\n"
        }
        }
        text += "</Document>\n"
        text += "</kml>\n"
        var filename = document.getElementById('name').value + ".kml";
        
        download(filename, text);
    }
}

function loadMap() {
    window.initMap = initMap;
}
