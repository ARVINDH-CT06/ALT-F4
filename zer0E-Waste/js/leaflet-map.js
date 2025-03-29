// Initialize pickup request map
function initPickupMap() {
    const map = L.map('map').setView([11.0168, 76.9558], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    // Add random E-Man location marker
    const emanLat = 11.0168 + (Math.random() * 0.02 - 0.01);
    const emanLng = 76.9558 + (Math.random() * 0.02 - 0.01);
    
    const emanIcon = L.icon({
        iconUrl: '../assets/icons/eman-marker.png',
        iconSize: [40, 40]
    });
    
    L.marker([emanLat, emanLng], {icon: emanIcon})
        .addTo(map)
        .bindPopup('E-Man will arrive here')
        .openPopup();
    
    // Add user's location marker
    L.circleMarker([11.0168, 76.9558], {
        radius: 8,
        fillColor: "#4CAF50",
        color: "#fff",
        weight: 2
    }).addTo(map).bindPopup('Your location');
    
    // Add line between user and E-Man
    L.polyline([
        [11.0168, 76.9558],
        [emanLat, emanLng]
    ], {
        color: '#4CAF50',
        dashArray: '10, 10'
    }).addTo(map);
}

// Initialize facility locator map
function initFacilityMap() {
    const map = L.map('map').setView([11.0168, 76.9558], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    // Facility icons
    const recyclingIcon = L.divIcon({
        className: 'recycling-icon',
        html: '<div style="background:green">R</div>',
        iconSize: [30, 30]
    });
    
    const dropoffIcon = L.divIcon({
        className: 'dropoff-icon',
        html: '<div style="background:blue">D</div>',
        iconSize: [30, 30]
    });
    
    // Sample facilities
    const facilities = [
        { name: "GreenTech Recycling", lat: 11.018, lng: 76.963, type: "recycling" },
        { name: "EcoDrop Center", lat: 11.016, lng: 76.958, type: "dropoff" }
    ];
    
    facilities.forEach(facility => {
        const icon = facility.type === 'recycling' ? recyclingIcon : dropoffIcon;
        L.marker([facility.lat, facility.lng], { icon })
            .addTo(map)
            .bindPopup(`<b>${facility.name}</b><br>Type: ${facility.type}`);
    });
}