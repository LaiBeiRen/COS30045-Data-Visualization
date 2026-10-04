const drawScatterplot = (data, targetId = "scatterplot") => {
    const validData = data.filter(d => Number.isFinite(d.star) && d.star >= 0
        && Number.isFinite(d.energyConsumption) && d.energyConsumption >= 0);
    const container = d3.select(`#${targetId}`);
    container.selectAll("*").remove();
    const excluded = data.length - validData.length;
    d3.select(`#${targetId}-status`).text(`${validData.length.toLocaleString()} TV records shown.${excluded ? ` ${excluded} records excluded because star rating is missing or invalid.` : " No records excluded."}`);
    if (!validData.length) {
        container.text("No TV records available for the scatterplot.");
        return;
    }
    xScaleS.domain([0, d3.max(validData, d => d.star) || 1])
        .range([0, innerWidth]);
    yScaleS.domain([0, d3.max(validData, d => d.energyConsumption) || 1])
        .range([innerHeight, 0]);
    colorScale.domain(validData.map(d => d.screenTech)).range(d3.schemeCategory10);

    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("role", "img")
        .attr("aria-labelledby", `${targetId}-title ${targetId}-description`);
    svg.append("title").attr("id", `${targetId}-title`)
        .text("TV energy consumption by star rating and screen technology");
    svg.append("desc").attr("id", `${targetId}-description`)
        .text(`${validData.length} TV records. The horizontal axis shows star rating and the vertical axis shows annual energy consumption in kWh. Colours identify screen technology; overlapping points may obscure individual records.`);
    innerChartS = svg.append("g")
        .attr("class", "scatterplot-inner-chart")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    innerChartS.selectAll("circle").data(validData).join("circle")
        .attr("class", "scatterplot-point")
        .attr("r", 4)
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);
    innerChartS.append("g").attr("class", "axis x-axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScaleS).ticks(8));
    innerChartS.append("g").attr("class", "axis y-axis")
        .call(d3.axisLeft(yScaleS).ticks(10).tickFormat(d3.format(",.0f")));
    innerChartS.append("text").attr("class", "axis-label")
        .attr("x", -margin.left + 8).attr("y", -18)
        .text("Labelled Energy Consumption (kWh/year)");
    innerChartS.append("text").attr("class", "axis-label")
        .attr("x", innerWidth).attr("y", innerHeight + 42)
        .attr("text-anchor", "end").text("Star Rating");

    // Category labels are placed inside the SVG, at the upper right.
    const legend = svg.append("g").attr("class", "scatterplot-legend")
        .attr("transform", `translate(${width - 100},${margin.top})`);
    colorScale.domain().forEach((screenTech, i) => {
        const row = legend.append("g").attr("transform", `translate(0,${i * 20})`);
        row.append("rect").attr("width", 10).attr("height", 10)
            .attr("fill", colorScale(screenTech));
        row.append("text").attr("x", 20).attr("y", 10)
            .attr("dominant-baseline", "middle").text(screenTech);
    });
};
