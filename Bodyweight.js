function loadBodyWeight()
    {
    const dateInput = document.getElementById("DateInput");
    const weightInput = document.getElementById("BodyweightInput");
    const weightChangeInput = document.getElementById("weightChangeInput");

    const weightText = document.getElementById("weightArray");
    const averageText = document.getElementById("weeklyAverage");
    const calorieAdjustmentText = document.getElementById("calorieAdjustment");

    const submitButton = document.getElementById("SubmitBodyweightInput");
    const removeButton = document.getElementById("Remove");
    const applyWeightChange = document.getElementById("applyWeightChange");

    const graphDisplay = document.getElementById("graphDisplay")

    let weightData = JSON.parse(localStorage.getItem("weights")) || [];


    function displayWeights()
    {   
        weightText.innerHTML = "";


        weightData.forEach(entry =>
        {
            const p = document.createElement("p");
            p.textContent = `${entry.date} - ${entry.weight} kg`;
            weightText.appendChild(p);
        })
    }

    displayWeights();
    calculateWeeklyAverage();
    graph();

    if (submitButton)
    {
        submitButton.addEventListener("click", (event) =>
        {
            event.preventDefault()
            if (dateInput == null || weightInput == null) //null check
            {
                return;
            }
            const date = dateInput.value;
            const weight = parseFloat(weightInput.value);

            const dataenter =
            {
                date: date,
                weight: weight
            };

            weightData.push(dataenter);
            localStorage.setItem("weights", JSON.stringify(weightData));
        
            displayWeights();
            calculateWeeklyAverage();
            graph();

        })

        if (removeButton)
        {
            removeButton.addEventListener("click", (event) =>
            {
                localStorage.clear();
            
                weightData = [];
                displayWeights()
                graph();
            })
        }
    }

    if (applyWeightChange)
    {
        applyWeightChange.addEventListener("click", (event) =>
        {
            calculateWeeklyAverage();
            graph();
        })
    }
    function calculateWeeklyAverage() // get the weekly weight change avarage
    {
        if (weightData.length == 0)
        {
            return;
        }

        const now = new Date();
        const weekPrevious = new Date();
        weekPrevious.setDate(weekPrevious.getDate() - 7);

        const recentData = weightData.filter(entry =>
        {
            const entryDate = new Date(entry.date);
            return entryDate >= weekPrevious;
        })

        if (recentData.length == 0)
        {
            return;
        }

        let totalChange = 0;

        for (let i = 1; i < recentData.length; i++)
        {
            let change = recentData[i].weight - recentData[i - 1].weight;

            totalChange += change;
        }

        const average = totalChange / (recentData.length - 1);

        averageText.textContent = `Average daily change: ${average.toFixed(2)} kg`;

        let targetChange = parseFloat(weightChangeInput.value);
        let changeDifference = targetChange - average;

        let calorieAdjustment = (changeDifference * 7700) / 7; // adjust calories based on calories per kg of fat over 7 days

        if (calorieAdjustment < 0)
        {   
            calorieAdjustmentText.textContent = `Reduce calories by ${Math.abs(calorieAdjustment).toFixed(0)}  kcal`;
        }
        else if (calorieAdjustment > 0)
        {
            calorieAdjustmentText.textContent = `Increase calories by ${Math.abs(calorieAdjustment).toFixed(0)}  kcal`;
        }
        else
        {
            calorieAdjustmentText.textContent = `Target reached`;
        }
    
    }

    function graph()
    {
        graphDisplay.innerHTML = "";
    
        if (weightData.length == 0)
        {
            return;
        }


        let xWeight = Math.min(...weightData.map(x => x.weight)); //... = spread operator (items into seperate values)

        weightData.forEach(entry =>
        {
            const bar = document.createElement("div");

            bar.classList.add("bar");

            let height = ((entry.weight - xWeight) * 100) + 20; //20 is min height

            if (height >= 150) //cap height on bars
            {
                height = 120;
            }
            bar.style.height = `${height}px`
            bar.textContent = entry.weight;

            graphDisplay.appendChild(bar);
        })
    }
}