//Create a dayjs object and set append it to the planner title.
dayjs.extend(window.dayjs_plugin_advancedFormat);
let currentDay = dayjs().format("dddd, MMMM Do");
$("#currentDay").text(currentDay);

//Add colorcodes to timeblock
let currentHour = dayjs().format("h A")
let timeblockEl = $(".container").children().children()

for (let index = 0; index < timeblockEl.length; index++) {
    let timeblockHour;
    let timeblockContent;
    if (index % 3 === 0){
        timeblockHour = timeblockEl[index].textContent;
        timeblockContent = timeblockEl[index + 1]
        console.log(timeblockHour)
    }
    else{
        continue;
    }
    
    let currentHourDigit = parseInt(currentHour.split(" ")[0]) % 12;
    let timeblockHourDigit = parseInt(timeblockHour.split(" ")[0]) % 12;

    if (currentHour.split(" ")[1] === timeblockHour.split(" ")[1]){
        if(timeblockHourDigit < currentHourDigit){
            timeblockContent.setAttribute("class", "form-control past")
        }
        else if(timeblockHourDigit > currentHourDigit){
            timeblockContent.setAttribute("class", "form-control future")
        }
        else if(timeblockHourDigit === currentHourDigit){
            timeblockContent.setAttribute("class", "form-control present")
        }
    }
    else if (currentHour.split(" ")[1] === "AM" && timeblockHour.split(" ")[1] === "PM"){
        timeblockContent.setAttribute("class", "form-control future")
    }
    else{
        timeblockContent.setAttribute("class", "form-control past")
    }
}