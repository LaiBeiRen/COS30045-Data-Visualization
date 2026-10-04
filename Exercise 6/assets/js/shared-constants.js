// Shared dimensions, colours and generators for the Week 6 charts.
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const barColor = "#606464";
const bodyBackgroundColor = "#ffffff";
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
// Default D3 thresholds choose the bin spacing from the data.
const binGenerator = d3.bin().value(d => d.energyConsumption);
let allTVData = [];

// One active screen-technology filter at a time.
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// Separate scatterplot scales keep histogram filtering independent.
let innerChartS;
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

// Screen-size tooltip dimensions in SVG coordinates.
const tooltipWidth = 65;
const tooltipHeight = 32;
