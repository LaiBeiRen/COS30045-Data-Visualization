const chartWidth = 1000;
const chartHeight = 500;
const margin = { top: 40, right: 170, bottom: 25, left: 40 };
const innerWidth = chartWidth - margin.left - margin.right;
const innerHeight = chartHeight - margin.top - margin.bottom;
const status = document.querySelector("#line-chart-status");

const drawLineChart = data => {
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${chartWidth} ${chartHeight}`)
        .attr("role", "img")
        .attr("aria-label", "Average Australian electricity spot prices by year from 1998 to 2024");

    svg.append("title")
        .text("Average Spot Price ($ per MWh)");

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);

    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));
    const leftAxis = d3.axisLeft(yScale);

    innerChart.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    innerChart.append("g")
        .attr("class", "axis y-axis")
        .call(leftAxis);

    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("x", -margin.left)
        .attr("y", -10)
        .attr("text-anchor", "start")
        .text("Average Price ($ per MWh)");

    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    innerChart.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2);

    innerChart.selectAll(".dot")
        .data(data)
        .join("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("r", 3)
        .attr("fill", "green");
};

d3.csv("assets/data/ARE_Spot_Prices.csv", row => {
    const yearColumn = Object.keys(row).find(key => key.replace(/^\uFEFF/, "").trim() === "Year");
    const priceColumn = Object.keys(row).find(key => key.trim().toLowerCase().startsWith("average price"));

    return {
        year: Number(row[yearColumn]),
        averagePrice: Number(row[priceColumn])
    };
}).then(rows => {
    const data = rows
        .filter(d => Number.isFinite(d.year) && Number.isFinite(d.averagePrice))
        .sort((a, b) => d3.ascending(a.year, b.year));

    if (data.length === 0) {
        throw new Error("No valid Year and average-price values were found in the CSV.");
    }

    drawLineChart(data);

    if (status) {
        status.textContent = `Chart created from ${data.length} annual values (${data[0].year}–${data[data.length - 1].year}).`;
    }
}).catch(error => {
    console.error("Could not load the Exercise 5.2 spot-price CSV:", error);

    if (status) {
        status.textContent = "Download ARE_Spot_Prices.csv from the course and place it in Exercise 5/assets/data, then open this page through a local web server.";
    }
});
