// Build filter buttons after the complete dataset and charts have loaded.
const populateFilters = data => {
    const updateHistogram = filterId => {
        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);
        const updatedBins = binGenerator(updatedData);
        const bars = d3.select("#filtered-histogram .inner-chart")
            .selectAll(".histogram-bar")
            .data(updatedBins, d => d.x0)
            .join("rect")
            .attr("class", "histogram-bar")
            .attr("x", d => xScale(d.x0))
            .attr("width", d => xScale(d.x1) - xScale(d.x0))
            .attr("fill", barColor)
            .attr("stroke", bodyBackgroundColor)
            .attr("stroke-width", 2);
        bars.interrupt(); // A new click replaces any animation still in progress.
        const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 500;
        bars.transition().duration(duration).ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
        bars.selectAll("title").data(d => [d]).join("title")
            .text(d => `${d.x0}–${d.x1} kWh/year: ${d.length} TV records`);
        const label = filterId === "all" ? "All screen technologies" : filterId;
        d3.select("#filter-status").text(`${label}: ${updatedData.length.toLocaleString()} TV records shown.`);
        d3.select("#filtered-histogram-description")
            .text(`${label}: ${updatedData.length} TV records grouped into ${updatedBins.length} bins. Bin boundaries and axes are fixed to the complete dataset.`);
    };

    const buttons = d3.select("#filters_screen").selectAll(".filter")
        .data(filters_screen, d => d.id).join("button")
        .attr("type", "button")
        .attr("class", d => `filter${d.isActive ? " active" : ""}`)
        .attr("aria-pressed", d => String(d.isActive))
        .text(d => d.label)
        .on("click", (event, selected) => {
            if (selected.isActive) return;
            filters_screen.forEach(filter => { filter.isActive = filter.id === selected.id; });
            buttons.classed("active", d => d.isActive)
                .attr("aria-pressed", d => String(d.isActive));
            updateHistogram(selected.id);
        });
    updateHistogram(filters_screen.find(filter => filter.isActive).id);
};

// Exercise 6.4: show only screen size, as required by the basic tutorial.
const createTooltip = () => {
    if (!innerChartS) return;
    innerChartS.selectAll(".tooltip").remove();
    const tooltip = innerChartS.append("g")
        .attr("class", "tooltip")
        .attr("aria-hidden", "true")
        .style("pointer-events", "none")
        .style("opacity", 0);
    tooltip.append("rect")
        .attr("width", tooltipWidth).attr("height", tooltipHeight)
        .attr("rx", 3).attr("ry", 3)
        .attr("fill", barColor).attr("fill-opacity", 0.75);
    tooltip.append("text").text("NA")
        .attr("x", tooltipWidth / 2).attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .style("font-size", "16px").style("font-weight", 900);
};

const handleMouseEvents = () => {
    if (!innerChartS) return;
    const tooltip = innerChartS.select(".tooltip");
    innerChartS.selectAll(".scatterplot-point")
        .on("mouseenter.tooltip", (event, d) => {
            const cx = +event.currentTarget.getAttribute("cx");
            const cy = +event.currentTarget.getAttribute("cy");
            tooltip.select("text").text(Number.isFinite(d.screenSize) ? d.screenSize : "NA");
            // Keep the tooltip inside the plot, including for points near its edges.
            const x = Math.max(0, Math.min(innerWidth - tooltipWidth, cx - tooltipWidth / 2));
            const above = cy - 1.5 * tooltipHeight;
            const y = above >= 0 ? above : Math.min(innerHeight - tooltipHeight, cy + 12);
            tooltip.interrupt().attr("transform", `translate(${x},${y})`)
                .attr("aria-hidden", "false");
            const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 200;
            tooltip.transition().duration(duration).style("opacity", 1);
        })
        .on("mouseleave.tooltip", () => {
            tooltip.interrupt().style("opacity", 0)
                .attr("aria-hidden", "true")
                .attr("transform", `translate(0,${height + 100})`);
        });
};
