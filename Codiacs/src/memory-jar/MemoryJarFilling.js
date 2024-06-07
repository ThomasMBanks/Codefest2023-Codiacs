import { useEffect, useState } from "react";

import Memory from "./Memory";
import memoryJarImage from "../images/memory-jar.jpg";
import Button from "../components/Button/Button.tsx";

function MemoryJarFilling(props) {
  const memories = props.memories;
  const amounts = props.amounts;
  const setFillingJar = props.setFillingJar;

  const [percentages, setPercentages] = useState(
    Array(memories.length).fill(
      (0.715 * (100 / memories.length)).toString() + "%"
    )
  );
  const [cumulativePercentages, setCumulativePercentages] = useState(
    Array(memories.length)
      .fill()
      .map(
        (_, index) =>
          (0.715 * (100 / memories.length) * (index + 1) + 2.5).toString() + "%"
      )
  );

  function createPercentages() {
    const total = amounts.reduce((partialSum, a) => partialSum + +a, 0);
    var counter = 0;
    var temp;
    var previous;

    var tempPercentages = [];
    var tempCumulativePercentages = [];

    for (const amount of amounts) {
      const percentage = 0.715 * (amount / total) * 100;
      if (counter === 0) {
        temp = percentage + 2.5;
      } else {
        temp = previous + percentage;
      }
      tempPercentages.push(percentage.toString() + "%");
      tempCumulativePercentages.push(temp.toString() + "%");
      previous = temp;
      counter += 1;
    }

    setPercentages(tempPercentages);
    setCumulativePercentages(tempCumulativePercentages);

    for (var i = 0; i < memories.length; i++) {
      const sandSection = document.getElementById("overlay" + i);
      sandSection.style.height = percentages[i];
      sandSection.style.background = memories[i].jarColour;
      if (i > 0) {
        sandSection.style.bottom = cumulativePercentages[i - 1];
      }
    }
  }

  useEffect(() => {
    createPercentages();
  }, []);

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-sm-3" style={{ zIndex: 1 }}>
            <Button onClick={() => setFillingJar(false)}>
              &#9998; Edit memories
            </Button>
          </div>

          <div className="memory-jar-container col-sm-6">
            <img
              src={memoryJarImage}
              alt="Memory Jar"
              style={{ width: "40%" }}
            />
            <div className="overlay first" id="overlay0"></div>
            <div className="overlay second" id="overlay1"></div>
            <div className="overlay third" id="overlay2"></div>
            <div className="overlay fourth" id="overlay3"></div>
            <div className="overlay fifth" id="overlay4"></div>
          </div>
        </div>
      </div>

      <div className="col-sm-6">
        {props.memories.slice(0, 3).map((memoryObj, index) => (
          <Memory
            key={index}
            memory={memoryObj.memory}
            amounts={props.amounts}
            counter={index}
            memoryColour={memoryObj.memoryColour}
            showSlider={true}
            createPercentages={createPercentages}
          />
        ))}
      </div>

      <div className="col-sm-6">
        {props.memories.slice(3, 5).map((memoryObj, index) => (
          <Memory
            key={index}
            memory={memoryObj.memory}
            amounts={props.amounts}
            counter={index + 3}
            memoryColour={memoryObj.memoryColour}
            showSlider={true}
            createPercentages={createPercentages}
          />
        ))}
      </div>
    </>
  );
}

export default MemoryJarFilling;
