const donutWidth = 1000;
const donutHeight = 500;
const donutRadius = Math.min(donutWidth, donutHeight) / 2 - 20;
const donutStatus = document.querySelector("#donut-chart-status");

const drawDonutChart = data => {
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.category))
        .range(d3.schemeSet2);

    const pie = d3.pie()
        .value(d => d.count)
        .sort(null)
        .sortValues(null);

    const arcGenerator = d3.arc()
        .innerRadius(donutRadius * 0.5)
        .outerRadius(donutRadius);

    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${donutWidth} ${donutHeight}`)
        .attr("role", "img")
        .attr("aria-label", "Donut chart of TV model counts by screen-size category");

    svg.append("title")
        .text("TV Models by Screen Size Category");

    const innerChart = svg.append("g")
        .attr("transform", `translate(${donutWidth / 2}, ${donutHeight / 2})`);

    const slices = innerChart.selectAll(".slice")
        .data(pie(data))
        .join("g")
        .attr("class", "slice");

    slices.append("path")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.category))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    slices.append("text")
        .attr("class", "donut-label")
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(d => d.data.category);
};

d3.csv("assets/data/tvScreenSizeCategoryCount.csv", row => ({
    category: String(row.Screensize_Category || "").trim(),
    count: Number(row.Count)
})).then(rows => {
    const data = rows.filter(d => d.category && Number.isFinite(d.count) && d.count > 0);

    if (data.length === 0) {
        throw new Error("No valid Screensize_Category and Count rows were found in the CSV.");
    }

    drawDonutChart(data);

    if (donutStatus) {
        donutStatus.textContent = `Chart created from ${data.length} screen-size categories (${d3.sum(data, d => d.count).toLocaleString()} TV models).`;
    }
}).catch(error => {
    console.error("Could not load the Exercise 5.3 TV size-count CSV:", error);

    if (donutStatus) {
        donutStatus.textContent = "Could not load the chart data. Check that assets/data/tvScreenSizeCategoryCount.csv exists and open this page through a local web server.";
    }
});
