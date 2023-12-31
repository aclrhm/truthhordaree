const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: "X AK 1" },
  { minDegree: 31, maxDegree: 90, value: "X AK 2" },
  { minDegree: 91, maxDegree: 150, value: "X OTKP 1" },
  { minDegree: 151, maxDegree: 210, value: "X OTKP 2" },
  { minDegree: 211, maxDegree: 270, value: "X PM 1" },
  { minDegree: 271, maxDegree: 330, value: "X PM 2" },
  { minDegree: 331, maxDegree: 360, value: "X AK 1" },
];
//ukuran
const data = [16, 16, 16, 16, 16, 16];

var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Label
    labels: ["X AK 2", "X AK 1", "X PM 2", "X PM 1", "X OTKP 2", "X OTKP 1"],
    //datasets
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 1.5 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 18 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      // buat pop up
      Swal.fire({
        title: 'Selamat Bermain!',
        text: i.value,
        // showDenyButton: innerHTML = `<a href="/truth/index.html" style="color: white; text-decoration: none;">Truth</a>`,
        // showCancelButton: innerHTML = `<a href="/dare/index.html" style="color: white; text-decoration: none;">Dare</a>`,
        // showDenyButton: true,
        // showCancelButton: true,
        // denyButtonColor: '#d33',
        // cancelButtonColor: '#d33'

        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<a href="/truth/index.html" style="color: white; text-decoration: none;">Truth</a',
        cancelButtonText:
          '<a href="/dare/index.html" style="color: white; text-decoration: none;">Dare</a>',
        cancelButtonColor: '#d33'
      })
      // finalValue.innerHTML = `<p>Value: ${i.value}</p>`; 
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (360 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});