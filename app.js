console.log("I am here!");

let viz;
const containerDiv = document.getElementById("vizContainer");
const btn = document.getElementById("btn");
const showBtn = document.getElementById("showBtn");
const exportPDF = document.getElementById("exportPDF");
const exportImage = document.getElementById("exportImage");
const exportData = document.getElementById("exportData");

const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
const options = {
  hideTabs: true,
  height: 800,
  width: 1000,
  onFirstInteractive: function () {
    console.log("Hey, my dashboard is interactive!");
  },
  onFirstVizSizeKnown: function () {
    console.log("Hey, my dashboard has a size!");
  },
};

function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}

document.addEventListener("DOMContentLoaded", initViz);
// listen for clicks to hide the viz
btn.addEventListener("click", function () {
  console.log("Hello from my button!");
  viz.hide();
});
// listen for clicks to show the viz
showBtn.addEventListener("click", function () {
  viz.show();
});
// listen for clicks to export to PDF
exportPDF.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

// listen for clicks to export data
exportData.addEventListener("click", function () {
  viz.showExportCrossTabDialog();
});

// listen for click to export an Image
exportImage.addEventListener("click", function () {
  viz.showExportImageDialog();
});

function getRangeValues() {
  // get the values from the input
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  // get the workbook object
  const workbook = viz.getWorkbook();
  // get the active sheet in the window - this is the dashboard
  const activeSheet = workbook.getActiveSheet();
  // get all the sheets in the dashboard
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Filter applied!"));
}

document.getElementById("applyFilter").addEventListener("click", function () {
  getRangeValues();
});

function switchViz() {
  console.log("Switching to a different viz");
  const anotherVizUrl =
    "https://public.tableau.com/views/GoogleMobilityReport-UKLockdown/GMR1";
  if (viz) {
    viz.dispose();
    viz = new tableau.Viz(containerDiv, anotherVizUrl, options);
    console.log(document.querySelectorAll(".button-primary"));
    document.querySelector(".button-primary").disabled = true;
  }
}

document.getElementById("switchViz").addEventListener("click", switchViz);
