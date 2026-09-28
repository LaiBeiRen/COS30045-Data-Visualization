d3.csv("data/tvBrandCount.csv", d => ({
    brand: d.brand,
    count: +d.count
})).then(data => {
    console.log("Brand-count data:", data);
    console.log("Number of brands:", data.length);
    console.log("Maximum count:", d3.max(data, d => d.count));
    console.log("Minimum count:", d3.min(data, d => d.count));
    console.log("Count range:", d3.extent(data, d => d.count));

    data.sort((a, b) => d3.descending(a.count, b.count));
    console.log("Sorted brand-count data:", data);

    const status = document.querySelector("#csv-status");
    if (status) {
        status.textContent = `CSV loaded successfully: ${data.length} brands.`;
    }

    
    if (typeof drawBarChart === "function") {
        drawBarChart(data);
    }
}).catch(error => {
    console.error("Could not load tvBrandCount.csv:", error);

    const status = document.querySelector("#csv-status");
    if (status) {
        status.textContent = "Could not load the CSV. Check that data/tvBrandCount.csv is in the Exercise 4.4 folder.";
    }
});