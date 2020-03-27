function optionChanged(new_sample_id) {

    d3.json("samples.json").then((bbdata) => {
      // get list of values for selector from "names"
      var dataNames = bbdata.names;
  
      // prepare other data
      const samples = bbdata.samples; // sample.id, sample.sample_values, sample.otu_labels
      const metadata = bbdata.metadata; 
  
      // create the drop down menu of samples
      // adapted from https://blockbuilder.org/micahstubbs/d393bcfde0228430c00b
      var selector = d3.select("#selDataset")
        .selectAll("option")
        .data(dataNames)
        .enter().append("option")
        .text(function(d) { return d; })
        .attr("value", function (d) {
            return d;
        });
  
      // prepare default values for charts
      var sample_id = new_sample_id;
      var person = samples.filter(sample => sample.id == sample_id);
      var sample_values = person[0].sample_values;
      var ids = person[0].otu_ids;
      var otu_ids = ids.map(id => `OTU ${id}`);
      var otu_labels = person[0].otu_labels;
  
    // plotBar(new_sample_id);
    // plotBubble(new_sample_id);
    // panelUpdate(new_sample_id);
  });
  }
  
  function init() {
    d3.json("samples.json").then((bbdata) => {
      // get list of values for selector from "names"
      var dataNames = bbdata.names;
  
      // prepare other data
      const samples = bbdata.samples; // sample.id, sample.sample_values, sample.otu_labels
      const metadata = bbdata.metadata; 
  
      // create the drop down menu of samples
      // adapted from https://blockbuilder.org/micahstubbs/d393bcfde0228430c00b
      var selector = d3.select("#selDataset")
        .selectAll("option")
        .data(dataNames)
        .enter().append("option")
        .text(function(d) { return d; })
        .attr("value", function (d) {
            return d;
        });
  
      // prepare default values for charts
      var sample_id = "940";
      var person = samples.filter(sample => sample.id == sample_id);
      var sample_values = person[0].sample_values;
      var ids = person[0].otu_ids;
      var otu_ids = ids.map(id => `OTU ${id}`);
      var otu_labels = person[0].otu_labels;
      
      function plotBar(sample_id) {
        // bar plot
        //////// |||||||||| REFACTOR THIS TO SORT TOP 10 VALUES, DESCENDING WITHOUT BREAKING LABELS \\\\\\\\
      
        var trace1 = [{
          type: 'bar',
          x: sample_values.slice(0,10), // Use sample_values as the values for the bar chart.
          y: otu_ids, // Use otu_ids as the labels for the bar chart.
          text: otu_labels, // Use otu_labels as the hovertext for the chart.
          orientation: 'h'
        }];
      
        var layout1 = {
          title: 'Top microbial species present',
          xaxis: {title: 'Sample Values'},
          yaxis: {title: "Operational Taxonomic Units"}
        }
      
        Plotly.newPlot('bar', trace1, layout1); 
      }
  
      function plotBubble(sample_id) {
        var trace2 = [{
          x: ids, // Use otu_ids for the x values.
          y: sample_values, // Use sample_values for the y values.
          mode: 'markers',
          marker: {
              color: ids, 
              size: sample_values // Use sample_values for the marker size.
            },
          text: otu_labels            
        }]
      
        var layout2 = {
          xaxis: {title: 'OTU IDs'}
        }
      
        Plotly.newPlot('bubble', trace2, layout2); // bubble chart
      }
  
      function panelUpdate(sample_id) {
        // select sample-metadata
        var personMetadata = metadata.filter(sample => sample.id == sample_id);
        console.log(personMetadata[0].id);
        // create paragraph / list
        // print key, value for each item in "selection" sample
      }
  
      
  
  });
  }
  
  init();