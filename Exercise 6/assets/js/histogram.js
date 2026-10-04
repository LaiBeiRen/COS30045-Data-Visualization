const drawHistogram = (data, targetId = "histogram") => {
    const container = d3.select(`#${targetId}`);
    container.selectAll("svg").remove(); // Redrawing must not create a second chart.
    if (!data.length) {
        container.text("No TV records available.");
        return;
    }
    container.selectAll("*").remove();
    const bins = binGenerator(data);
    console.log("Histogram bins:", bins);
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);
    console.log({ minEng, maxEng, binsMaxLength });
    xScale.domain([minEng, maxEng]).range([0, innerWidth]);
    yScale.domain([0, binsMaxLength]).range([innerHeight, 0]).nice();

    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("role", "img")
        .attr("aria-labelledby", `${targetId}-title ${targetId}-description`);
    svg.append("title").attr("id", `${targetId}-title`).text("TV annual energy consumption histogram");
    svg.append("desc").attr("id", `${targetId}-description`)
        .text(`${data.length} TV records grouped into ${bins.length} energy-consumption bins. The axes show kWh per year and record frequency.`);
    const innerChart = svg.append("g").attr("class", "inner-chart")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    innerChart.selectAll("rect").data(bins).join("rect")
        .attr("class", "histogram-bar")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2)
        .append("title").text(d => `${d.x0}–${d.x1} kWh/year: ${d.length} TV records`);
    innerChart.append("g").attr("class", "axis x-axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(14).tickFormat(d3.format(",.0f")));
    innerChart.append("g").attr("class", "axis y-axis")
        .call(d3.axisLeft(yScale).ticks(10).tickFormat(d3.format(",.0f")));
    innerChart.append("text").attr("class", "axis-label")
        .attr("x", -margin.left + 8).attr("y", -18).text("Frequency");
    innerChart.append("text").attr("class", "axis-label")
        .attr("x", innerWidth).attr("y", innerHeight + 42)
        .attr("text-anchor", "end").text("Labelled Energy Consumption (kWh/year)");
};
