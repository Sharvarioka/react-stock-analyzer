/* App.js */
import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { Heading } from "@chakra-ui/react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function LineChart(props) {
  const favData = props.favData;
  let openValues = [], closeValues = [], highValues = [], lowValues = [];
  for (var i = 0; i < favData.length; i++) {
    openValues.push({
      y: favData[i].open,
      label: favData[i].companyAbbr
    })
    closeValues.push({
      y: favData[i].close,
      label: favData[i].companyAbbr
    })
    highValues.push({
      y: favData[i].high,
      label: favData[i].companyAbbr
    })
    lowValues.push({
      y: favData[i].low,
      label: favData[i].companyAbbr
    })
  }

  const options = {
    animationEnabled: true,
    title: {
      text: "OHLC Chart for your favorite companies",
      fontColor: "#57BA98",
      fontWeight: "normal",
      fontSize: 25
    },
    axisX: {
      title: "Companies",
      titleFontColor: "crimson"
    },
    axisY: {
      title: "OHLC values ",
      titleFontColor: "crimson"
    },
    toolTip: {
      shared: true
    },
    data: [
      {
        type: "spline",
        name: "Open",
        showInLegend: true,
        dataPoints: openValues
      },
      {
        type: "spline",
        name: "Close",
        showInLegend: true,
        dataPoints: closeValues
      },
      {
        type: "spline",
        name: "Low",
        showInLegend: true,
        dataPoints: lowValues
      },
      {
        type: "spline",
        name: "High",
        showInLegend: true,
        dataPoints: highValues
      },
    ]
  }

  return (
    <div>
      <Heading as="h1" id="chart-section" backgroundColor="#14532d" color={"#ffff"} padding={5}>
        Track Progress Of Your Favorite Stocks
      </Heading>
      <CanvasJSChart options={options} />
    </div>
  );
}
