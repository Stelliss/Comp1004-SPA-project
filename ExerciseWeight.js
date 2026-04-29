function LoadExercise(exerciseName)
{
    const exerciseDateInput = document.getElementById("exerciseDateInput");
    const exerciseWeightInput = document.getElementById("exerciseWeightInput");

    const submitExerciseWeightInput = document.getElementById("submitExerciseWeightInput");
    const applyWeightChange = document.getElementById("applyWeightChange");
    const weightText = document.getElementById("exerciseWeightArray");

    const graphDisplay = document.getElementById("graphDisplay")

    const exerciseStore = "exerciseWeights_" + exerciseName; // store data for each unique exercise
    let exerciseWeightData = JSON.parse(localStorage.getItem(exerciseStore)) || [];

    const exerciseTitle = document.getElementById("exerciseTitle");


    displayExerciseWeights();
    exerciseGraph();

    function displayExerciseWeights()
    {   
        weightText.innerHTML = "";


        exerciseWeightData.forEach(entry =>
        {
            const p = document.createElement("p");
            p.textContent = `${entry.date} - ${entry.weight} kg`;
            weightText.appendChild(p);
        })

        exerciseTitle.textContent = exerciseName;
    }

    if (submitExerciseWeightInput)
    {
        submitExerciseWeightInput.addEventListener("click", (event) =>
        {
            event.preventDefault()
            if (exerciseDateInput == null || exerciseWeightInput == null) //null check
            {
                return;
            }
            const exerciseDate = exerciseDateInput.value;
            const exerciseWeight = parseFloat(exerciseWeightInput.value);

            const exercisedataenter =
            {
                date: exerciseDate,
                weight: exerciseWeight
            };

            exerciseWeightData.push(exercisedataenter);
            localStorage.setItem(exerciseStore, JSON.stringify(exerciseWeightData));
        
            displayExerciseWeights();
            exerciseGraph();

        })
    }

    function exerciseGraph()
    {
        graphDisplay.innerHTML = "";
    
        if (exerciseWeightData.length == 0)
        {
            return;
        }


        let xWeight = Math.min(...exerciseWeightData.map(x => x.weight)); //... = spread operator (items into seperate values)

        exerciseWeightData.forEach(entry =>
        {
            const bar = document.createElement("div");

            bar.classList.add("bar");

            let height = ((entry.weight - xWeight) * 100) + 20; //20 is min height

            if (height >= 150) //cap height on bars
            {
                height = 100;
            }

            bar.style.height = `${height}px`
            bar.textContent = entry.weight;

            graphDisplay.appendChild(bar);
        })
    }
}