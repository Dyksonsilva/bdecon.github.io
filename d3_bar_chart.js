var margin = {top: 10, right: 30, bottom: 5, left: 140},
    width = 160,
    height = 270,
    shift = 10,
    numberOfTicks = 5,
    fig_height = height - margin.top - margin.bottom;

  d3.csv("mydata2.csv", function (data) {

    var x = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return +d.value2; }))
            .range([0, width]);

    var y_spacing = fig_height / data.length;

    var canvas = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right + 10)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    canvas.selectAll("rect.value_1")
      .data(data)
      .enter()
        .append("rect")
        .attr("class", "value_1")
        .attr("width", function (d) { return Math.abs(x(d.value) - x(0)); })
        .attr("height", y_spacing - 18)
        .attr("x", function (d) { return x(Math.min(0, d.value)); })
        .attr("y", function (d, i) { return i * y_spacing; })
        .attr("fill", "darkblue")
        .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "firebrick");
        })
        .on("mouseout", function() {
        d3.select(this)
          .attr("fill", "darkblue");
        })
        .attr("transform", "translate(" + shift + ", 0)");

    canvas.selectAll("rect.value_2")
      .data(data)
      .enter()
        .append("rect")
        .attr("class", "value_2")
        .attr("width", function (d) { return Math.abs(x(d.value2) - x(0)); })
        .attr("height", y_spacing - 18)
        .attr("x", function (d) { return x(Math.min(0, d.value2)); })
        .attr("y", function (d, i) { return i * y_spacing + y_spacing - 18; })
        .attr("fill", "deepskyblue")
        .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "orangered");
        })
        .on("mouseout", function() {
        d3.select(this)
          .attr("fill", "deepskyblue");
        })
        .attr("transform", "translate(" + shift + ", 0)");

    canvas.selectAll("text.y_label")
      .data(data)
      .enter()
        .append("text")
        .attr("class", "y_label")
        .attr("fill", "black")
        .style("font-size", "12px")
        .attr("text-anchor", "end")
        .attr("y", function (d, i) { return i * y_spacing + 13; })
        .attr("x", shift - 25)
        .text(function (d) { return d.name; });

    canvas.selectAll("text.value_label")
      .data(data)
      .enter().append("text")
        .attr("class", "value_label")
        .text(function(d) {return d3.format(".1f")(d.value);})
        .attr("text-anchor", "left")
        .attr("x", function(d, i) {
            if (d.value <= 0) {
                console.log(d.value);
                return  x(Math.min(0, d.value)) + shift - 18;
            }
            else {return  x(Math.min(0, d.value)) + Math.abs(x(d.value) - x(0)) + shift + 1;}
        })
        .attr("y", function (d, i) { return i * y_spacing + 8; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "9px")
        .attr("fill", "black");

    canvas.selectAll("text.value_label2")
      .data(data)
      .enter().append("text")
        .attr("class", "value_label2")
        .text(function(d) {return d3.format(".1f")(d.value2);})
        .attr("text-anchor", "left")
        .attr("x", function(d, i) {
            if (d.value <= 0) {
                console.log(d.value2);
                return  x(Math.min(0, d.value2)) + shift - 18;
            }
            else {return  x(Math.min(0, d.value2)) + Math.abs(x(d.value2) - x(0)) + shift + 1;}
        })
        .attr("y", function (d, i) { return i * y_spacing + 8 + y_spacing - 18; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "9px")
        .attr("fill", "black");

   canvas.append("g")
      .attr("transform", "translate(" + shift + "," + fig_height + ")")
      .attr("class", "x axis")
      .call(d3.axisBottom(x).ticks(numberOfTicks));

   canvas.append("line")
    .attr("x1", x(0))
    .attr("y1", -5)
    .attr("x2", x(0))
    .attr("y2", fig_height)
    .style("stroke-width", 2)
    .style("stroke", "gray")
    .style("fill", "none")
    .attr("transform", "translate(" + shift + ", 0)");

    canvas.append("rect")
      .attr("x", width - 40)
      .attr("y", height - 60)
      .attr("height", y_spacing - 20)
      .attr("width", 15)
      .attr("fill", "deepskyblue");

    canvas.append("rect")
      .attr("x", width - 40)
      .attr("y", height - 75)
      .attr("height", y_spacing - 20)
      .attr("width", 15)
      .attr("fill", "darkblue");

      canvas.append("text")
        .text("April 2017")
        .attr("x", width - 22)
        .attr("y", height - 68)
        .attr("font-family", "sans-serif")
        .attr("font-size", "9px")
        .attr("fill", "black")

      canvas.append("text")
        .text("March 2017")
        .attr("x", width - 22)
        .attr("y", height - 53)
        .attr("font-family", "sans-serif")
        .attr("font-size", "9px")
        .attr("fill", "black");

  });
