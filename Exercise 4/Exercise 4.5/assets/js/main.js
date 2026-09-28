const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .attr("role", "img")
    .attr("aria-label", "TV model count by brand, shown as horizontal bars");

svg.append("title").text("D3 TV Brand Data Count");

const drawBarChart = data => {
    const barHeight = 20;
    const barSpacing = 5;

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("fill", "blue")
        .attr("x", 0)
        .attr("y", (d, i) => i * (barHeight + barSpacing));
};

d3.csv("../Exercise%204.4/data/tvBrandCount.csv", d => ({
    brand: d.brand,
    count: +d.count
})).then(data => {
    data.sort((a, b) => d3.descending(a.count, b.count));
    console.log("Exercise 4.5 data:", data);
    drawBarChart(data);

    const status = document.querySelector("#chart-status");
    if (status) {
        status.textContent = `Chart created from ${data.length} TV brands.`;
    }
}).catch(error => {
    console.error("Could not load the brand-count CSV:", error);
    const status = document.querySelector("#chart-status");
    if (status) {
        status.textContent = "Could not load the CSV from Exercise 4.4/data/tvBrandCount.csv.";
    }
});
