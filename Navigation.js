const bodyWeightNav = document.getElementById("bodyWeightNav");
const exerciseWeightNav = document.getElementById("exerciseWeightNav");
const createExercise = document.getElementById("createExercise");
const newExerciseNameInput = document.getElementById("newExerciseNameInput");
const removeExercise = document.getElementById("removeExercise");
const removeExerciseNameInput = document.getElementById("removeExerciseNameInput");

const pageInput = document.getElementById("pageInput");

const bodyweightTemplate = document.getElementById("bodyweightTemplate");
const exerciseTemplate = document.getElementById("exerciseTemplate");

let exerciseList = JSON.parse(localStorage.getItem("exerciseList")) || [];

loadExerciseList();

setPage(bodyweightTemplate); // set the default page to bodyWeight template

loadBodyWeight();



if (bodyWeightNav)
{
    bodyWeightNav.addEventListener("click", (event) =>
    {
        setPage(bodyweightTemplate);
        loadBodyWeight();
    })
}

if (createExercise)
{
    createExercise.addEventListener("click", (event) =>
    {
        const exerciseName = newExerciseNameInput.value.trim();

        if (exerciseName == "")
        {
            alert("You need to enter the exercise's name!")
            return;
        }

        if (exerciseList.includes(exerciseName))
        {
            alert("Exercise is already present in the list!")
            return;
        }

        exerciseList.push(exerciseName);

        localStorage.setItem("exerciseList", JSON.stringify(exerciseList));

        createExerciseButton(exerciseName);

        newExerciseNameInput.value = "";
    })
}
if (exerciseWeightNav)
{
    exerciseWeightNav.addEventListener("click", (event) =>
    {
        setPage(exerciseTemplate);
        LoadExercise();
    })
}

function setPage(template)
{
    pageInput.innerHTML = "";
    const clone = template.content.cloneNode(true);

    pageInput.appendChild(clone);
}

function createExerciseButton(exerciseName)
{
    const button = document.createElement("button");
    button.textContent = exerciseName;
    button.classList.add("exerciseButton");
    button.addEventListener("click", () => 
    {
        setPage(exerciseTemplate);
        LoadExercise(exerciseName);
    })

    document.getElementById("sidebar").appendChild(button);
}

if (removeExercise)
{
    removeExercise.addEventListener("click", (event) =>
    {
        const exerciseRemove = removeExerciseNameInput.value.trim();

        if (exerciseRemove == "")
        {
            return;
        }

        const i = exerciseList.indexOf(exerciseRemove);

        if (i == -1)
        {
            alert("Exercise does not exist")
            return;
        }

        exerciseList.splice(i, 1);
        localStorage.setItem("exerciseList", JSON.stringify(exerciseList));
        //button.remove();
        //loadExerciseList();

        const buttons = document.querySelectorAll(".exerciseButton"); //find and delete every exercise button then reload
        buttons.forEach(button => button.remove());

        removeExerciseNameInput.value = "";
        loadExerciseList();
    })

}

function loadExerciseList()
{
    for (let i = 0; i < exerciseList.length; i++)
    {
        createExerciseButton(exerciseList[i]);
    }
}

