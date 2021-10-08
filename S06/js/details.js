const urlParams = {};
(window.onpopstate = function () {
    let match;
    const pl = /\+/g; // Regex for replacing addition symbol with a space
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = function (s) {
        return decodeURIComponent(s.replace(pl, ' '));
    };
    const query = window.location.search.substring(1);

    while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
})();

$(document).ready(() => {
    getPlanet(urlParams.href);

    $('#btnAddPortal').click(() => {
        addPortal();
    });

});

function addPortal() {
    const position = $('#txtPosition').val();
    const affinity = $('#cboAffinity').val();

    const color = $('#clpTest').val();

    console.log(position);
    console.log(affinity);
    
    console.log(color);

}


async function getPlanet(href) {
    const response = await axios.get(href);
    if(response.status === 200) {
        const planet = response.data;
        console.log(planet);
        document.title = planet.name;

        $('#imgIcon').attr('src', planet.icon); 
        $('#lblName').html(planet.name);
        $('#lblDiscoveredBy').html(planet.discoveredBy);

        $('#lblDiscoveryDate').html(planet.discoveryDate);
        $('#lblTemperature').html(planet.temperature);
        const position = `(${planet.position.x.toFixed(3)} ; ${planet.position.y.toFixed(3)} ; ${planet.position.z.toFixed(3)})`;
        $('#lblPosition').html(position); 
        
        //Satellites
        if(planet.satellites.length === 0) {
            $('#satellites').append(`<li>Aucun satellite</li>`);
        } else {
            planet.satellites.forEach(s => {
                $('#satellites').append(`<li>${s}</li>`);
            });
        }

        displayPortals(planet.portals);
    }
}

function displayPortals(portals) {

    portals.forEach(p => {
        let portalHtml = '<tr>';
        portalHtml += `<td>${p.position}</td>`;
        portalHtml += `<td><img src="img/${p.affinity}.png" title="${p.affinity}"></td>`;
        portalHtml += '</tr>';

        $('#portals tbody').append(portalHtml);
    });



}