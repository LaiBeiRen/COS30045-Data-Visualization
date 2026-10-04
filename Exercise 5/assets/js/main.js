const chartWidth = 1000;
const chartHeight = 500;
const margin = { top: 40, right: 170, bottom: 25, left: 40 };
const innerWidth = chartWidth - margin.left - margin.right;
const innerHeight = chartHeight - margin.top - margin.bottom;
const status = document.querySelector("#chart-status");

const drawBarChart = data => {
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${chartWidth} ${chartHeight}`)
        .attr("role", "img")
        .attr("aria-label", "Average energy consumption by screen technology for 55-inch TVs");

    svg.append("title")
        .text("Energy Consumption (kWh)");

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.screenTech))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energyConsumption)])
        .range([innerHeight, 0]);

    const bottomAxis = d3.axisBottom(xScale)
        .tickSizeOuter(0);
    const leftAxis = d3.axisLeft(yScale)
        .ticks(7)
        .tickSizeOuter(0);

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
        .attr("y", -24)
        .attr("text-anchor", "start")
        .text("Energy Consumption (kWh)");

    innerChart.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.energyConsumption))
        .attr("x", d => xScale(d.screenTech))
        .attr("y", d => yScale(d.energyConsumption));

    innerChart.selectAll(".value-label")
        .data(data)
        .join("text")
        .attr("class", "value-label")
        .text(d => `${Math.round(d.energyConsumption)} kWh`)
        .attr("x", d => xScale(d.screenTech) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.energyConsumption) - 6)
        .attr("text-anchor", "middle");
};

d3.csv("assets/data/tvEnergyByScreenTech55.csv", row => {
    const energyColumn = Object.keys(row).find(key =>
        key === "Energy_Consumption" || key.toLowerCase().startsWith("mean(")
    );

    return {
        screenTech: String(row.Screen_Tech || "").trim().toUpperCase(),
        energyConsumption: Number(row[energyColumn])
    };
}).then(data => {
    const validData = data.filter(d => d.screenTech && Number.isFinite(d.energyConsumption));

    if (validData.length === 0) {
        throw new Error("No valid rows found. Check the Screen_Tech and energy-consumption columns.");
    }

    validData.sort((a, b) => d3.descending(a.energyConsumption, b.energyConsumption));
    drawBarChart(validData);

    if (status) {
        status.textContent = `Chart created for ${validData.length} screen technologies.`;
    }
}).catch(error => {
    console.error("Could not load the Exercise 5.1 CSV:", error);

    if (status) {
        status.textContent = "Could not load the chart data. Check that assets/data/tvEnergyByScreenTech55.csv exists and open the page through a local web server.";
    }
});
