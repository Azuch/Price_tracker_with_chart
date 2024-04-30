import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function ProductChart({ productData }) {
  const productName = productData.map((product) => product.name);
  const productPricesData = productData.flatMap((product) =>
    product.prices.map((price) => ({
      timestamp: new Date(price.timestamp).toLocaleDateString(),
      value: price.value,
    }))
  );

  const datasets = [
    {
      label: productName,
      data: productPricesData.map((price) => price.value),
      borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 1)`,
      backgroundColor: "#064FF0",
      fill: false,
    },
  ];

  const chartData = {
    labels: productPricesData.map((price) => price.timestamp),
    datasets: datasets,
  };

  const chartOption = {
    elements: {
      line: {
        tension: 0.25,
      },
    },
    plugins: {
      title: {
        text: "Monthly Revenue & Cost",
      },
    },
  };

  return (
    <div className="datacard">
      <Line data={chartData} options={chartOption} />
    </div>
  );
}



export default ProductChart;
