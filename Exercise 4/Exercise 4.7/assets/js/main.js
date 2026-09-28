const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 500 700")
    .attr("role", "img")
    .attr("aria-label", "TV model counts by brand, with brand and count labels");

svg.append("title").text("D3 TV Brand Data Count");

const drawBarChart = data => {
    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 700])
        .padding(0.1);

    const barAndLabel = svg.selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    barAndLabel.append("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue")
        .attr("x", 100)
        .attr("y", 0);

    barAndLabel.append("text")
        .attr("class", "brand-label")
        .text(d => d.brand)
        .attr("x", 90)
        .attr("y", yScale.bandwidth() / 2)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .style("font-size", "13px");

    barAndLabel.append("text")
        .attr("class", "count-label")
        .text(d => d.count)
        .attr("x", d => 100 + xScale(d.count) + 4)
        .attr("y", yScale.bandwidth() / 2)
        .attr("dominant-baseline", "middle")
        .style("font-size", "13px");
};

d3.csv("../Exercise%204.4/data/tvBrandCount.csv", d => ({
    brand: d.brand,
    count: +d.count
})).then(data => {
    data.sort((a, b) => d3.descending(a.count, b.count));
    console.log("Exercise 4.7 data:", data);
    drawBarChart(data);

    const status = document.querySelector("#chart-status");
    if (status) {
        status.textContent = `Labeled chart created from ${data.length} TV brands.`;
    }
}).catch(error => {
    console.error("Could not load the brand-count CSV:", error);
    const status = document.querySelector("#chart-status");
    if (status) {
        status.textContent = "Could not load the CSV from Exercise 4.4/data/tvBrandCount.csv.";
    }
});
