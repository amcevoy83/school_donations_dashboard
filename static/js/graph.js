/**
 * Created by aoife_000 on 22/11/2015.
 */
queue()
    .defer(d3.json,"/donorsUS/projects")
    .await (makeGraphs);

function makeGraphs(error,projectsJson) {
    var donorsUSProjects = projectsJson;
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    donorsUSProjects.forEach(function (d) {
        d["date_posted"]= dateFormat.parse(d["date_posted"]);
        d["date_posted"].setDate(1);
        d["total_donations"]= +d["total_donations"];
});

//Create a crossfilter instance
var ndx=crossfilter(donorsUSProjects);


var dateDim = ndx.dimension(function(d){
    return d["date_posted"];
});

var resourceTypeDim = ndx.dimension(function(d){
    return d["resource_type"];
});

var primaryFocusDim = ndx.dimension(function(d){
    return d["primary_focus_area"];
});

var povertyLevelDim = ndx.dimension(function(d){
    return d["poverty_level"];
});

var stateDim = ndx.dimension(function(d){
    return d["school_state"];
});

var totalDonationsDim = ndx.dimension(function(d){
    return d["total_donations"];
});

var fundingStatus = ndx.dimension(function(d){
    return d["funding_status"];
});

var numProjectsByDate = dateDim.group();
var numProjectsByResourceType = resourceTypeDim.group();
var numProjectsByPovertyLevel = povertyLevelDim.group();
var numProjectsByFundingStatus = fundingStatus.group();
var numProjectsByPrimaryFocus = primaryFocusDim.group();

var totalDonationsByState = stateDim.group().reduceSum(function (d) {
    return d["total_donations"];
});

var stateGroup = stateDim.group();

var all = ndx.groupAll();

var totalDonations = ndx.groupAll().reduceSum(function (d){
    return d["total_donations"];
});

var max_state = totalDonationsByState.top(1)[0].value;

//Define values (to be used in charts)
var minDate = dateDim.bottom(1)[0]["date_posted"];
var maxDate = dateDim.top(1)[0]["date_posted"] ;

// Charts
var timeChart = dc.lineChart("#time-chart");
var resourceTypeChart = dc.rowChart("#resource-type-row-chart");
var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
var numberProjectsND = dc.numberDisplay("#number-projects-nd");
var totalDonationsND = dc.numberDisplay("#total-donations-nd");
var fundingStatusChart = dc.pieChart("#funding-chart");
var primaryFocusChart = dc.pieChart("#primary-focus-row-chart");

    var widthTime = document.getElementById('time-chart').offsetWidth;
    console.log(widthTime)

    var widthFund = document.getElementById('funding-chart').offsetWidth;
    console.log(widthFund)

    var rowWidth = document.getElementById('resource-type-row-chart').offsetWidth;
    console.log(rowWidth)

    selectField = dc.selectMenu("#menu-select")
    .dimension(stateDim)
    .group(stateGroup);

numberProjectsND
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
        return d;
    })
    .group(all);

totalDonationsND
    .formatNumber(d3.format("d"))
    .valueAccessor(function(d){
        return d;
    })
    .group(totalDonations)
    .formatNumber(d3.format(".3s"));

timeChart
    .width(widthTime)
    .margins({top: 10, right: 40,bottom: 60,left: 50})
    .dimension(dateDim)
    .group(numProjectsByDate)
    .transitionDuration(500)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .renderArea(true)
    .elasticY(true)
    .elasticX(true)
    .xAxisLabel("Year")
    .yAxis().ticks(4)


resourceTypeChart
    .width(rowWidth)
    //.width(550)
    .height(250)
    .dimension(resourceTypeDim)
    .group(numProjectsByResourceType)
    .xAxis().ticks(4)

primaryFocusChart
    .height(250)
    .radius(120)
    .dimension(primaryFocusDim)
    .group(numProjectsByPrimaryFocus)
    .legend(dc.legend().x(360).y(50).itemHeight(10).gap(10))

povertyLevelChart
    //.width(550)
    .width(rowWidth)
    .height(250)
    .dimension(povertyLevelDim)
    .group(numProjectsByPovertyLevel)
    .xAxis().ticks(4)


fundingStatusChart
    .height(250)
    .radius(120)
    .innerRadius(30)
    .transitionDuration(1500)
    .dimension(fundingStatus)
    .group(numProjectsByFundingStatus)
    .legend(dc.legend().x(360).y(50).itemHeight(10).gap(10))


    dc.renderAll("myTimeChart", "primaryFocusChart", "fundingChart", "povertyLevelChart", "resourceChart");
    dc.renderAll();

    d3.select("#primary-focus-row-chart > svg > g").attr("transform", "translate(180,120)");
    d3.select("#funding-chart > svg > g").attr("transform", "translate(180,120)");

    //
    //    var rowWidth = document.getElementById('resource-type-row-chart').offsetWidth;
    //console.log(rowWidth)


    window.onresize = function(event) {
       var newTimeWidth = document.getElementById('time-chart').offsetWidth;
       timeChart.width(newTimeWidth);

        var newrowWidth = document.getElementById('resource-type-row-chart').offsetWidth;
        resourceTypeChart.width(newrowWidth);

        var newradius = document.getElementsByClassName('funding-chart').offsetWidth;
     //   dc.renderAll("myTimeChart", "primaryFocusChart", "fundingChart", "povertyLevelChart", "resourceChart");
        dc.renderAll();

    };

}

