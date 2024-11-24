// Calculate wind chill
function calculateWindChill(tempC, speedKmh) {
    return (tempC <= 10 && speedKmh > 4.8)
        ? 13.12 + 0.6215 * tempC - 11.37 * Math.pow(speedKmh, 0.16) + 0.3965 * tempC * Math.pow(speedKmh, 0.16)
        : "N/A";
}

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const lastModified = new Date(document.lastModified);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('last-modified').textContent = lastModified.toLocaleString('en-US', options);

    const temp = 10;
    const windSpeed = 5;
    const windChill = calculateWindChill(temp, windSpeed);
    document.getElementById('wind-chill').textContent = typeof windChill === 'number'
        ? windChill.toFixed(1) + '°C'
        : windChill;
});
