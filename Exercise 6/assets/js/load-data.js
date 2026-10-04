// Defer + DOMContentLoaded ensure all drawing functions exist before loading data.
document.addEventListener("DOMContentLoaded", () => {
    const status = document.getElementById("chart-status");
    d3.csv("assets/data/Ex6_TVdata_withStar.csv", d => ({
        brand: d.brand,
        model: d.model,
        screenSize: d.screenSize.trim() === "" ? NaN : +d.screenSize,
        screenTech: d.screenTech,
        star: d.star.trim() === "" ? NaN : +d.star,
        energyConsumption: d.energyConsumption.trim() === "" ? NaN : +d.energyConsumption
    })).then(data => {
        console.log("Loaded TV data:", data);
        allTVData = data.filter(d => Number.isFinite(d.energyConsumption) && d.energyConsumption >= 0);
        drawHistogram(allTVData);
        // Freeze full-dataset bin edges so filtering changes counts, not intervals.
        const fullBins = binGenerator(allTVData);
        if (fullBins.length) {
            binGenerator.domain([fullBins[0].x0, fullBins[fullBins.length - 1].x1])
                .thresholds(fullBins.slice(1).map(bin => bin.x0));
        }
        drawHistogram(allTVData, "filtered-histogram");
        populateFilters(allTVData);
        drawScatterplot(allTVData);
        drawScatterplot(allTVData, "tooltip-scatterplot");
        createTooltip();
        handleMouseEvents();
        const excluded = data.length - allTVData.length;
        status.textContent = `${allTVData.length.toLocaleString()} TV records shown.${excluded ? ` ${excluded} records excluded because energy consumption is missing or invalid.` : " No records excluded."}`;
    }).catch(error => {
        console.error("Error loading TV data:", error);
        document.getElementById("filter-status").textContent = "Unable to load filter data.";
        document.getElementById("scatterplot-status").textContent = "Unable to load scatterplot data.";
        document.getElementById("tooltip-scatterplot-status").textContent = "Unable to load tooltip data.";
        status.textContent = "Unable to load the TV data. Open this page using a local web server (such as VS Code Live Server), and check the CSV file path.";
    });
});
