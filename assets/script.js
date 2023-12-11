//Create a dayjs object and set append it to the planner title.
dayjs.extend(window.dayjs_plugin_advancedFormat);
let currentDay = dayjs().format("dddd, MMMM Do");
$("#currentDay").text(currentDay);

//Add colorcodes to timeblock
let currentHour = dayjs().format("h A");

//Loop through all the elements in each timeblock
let timeblockEl = $(".container").children().children()
for (let index = 0; index < timeblockEl.length; index++) {
    let timeblockHour;
    let timeblockContent;
    let saveButtonEl;

    let addCalendarEvent = function(e){
        e.preventDefault();
        localStorage.setItem(timeblockHour, timeblockContent.value);
    }

    let persistSchedule = function(e){
        e.preventDefault();
        timeblockContent.value = localStorage.getItem(timeblockHour);
    }


    if (index % 3 === 0){
        timeblockHour = timeblockEl[index].textContent;  //Content of the 'span' element
        timeblockContent = timeblockEl[index + 1];        //Select the 'textarea' element
        saveButtonEl = timeblockEl[index + 2];
    }
    else{
        continue;
    }
    
    let currentHourDigit = parseInt(currentHour.split(" ")[0]) % 12;
    let timeblockHourDigit = parseInt(timeblockHour.split(" ")[0]) % 12;

    if (currentHour.split(" ")[1] === timeblockHour.split(" ")[1]){
        if(timeblockHourDigit < currentHourDigit){
            timeblockContent.setAttribute("class", "form-control past");
        }
        else if(timeblockHourDigit > currentHourDigit){
            timeblockContent.setAttribute("class", "form-control future");
        }
        else if(timeblockHourDigit === currentHourDigit){
            timeblockContent.setAttribute("class", "form-control present");
        }
    }
    else if (currentHour.split(" ")[1] === "AM" && timeblockHour.split(" ")[1] === "PM"){
        timeblockContent.setAttribute("class", "form-control future");
    }
    else{
        timeblockContent.setAttribute("class", "form-control past");
    }

    //Save calendar event to local storage
    saveButtonEl.addEventListener("click", addCalendarEvent);

    //Persist data of each timeblock upon reloading page
    window.addEventListener("load", persistSchedule);

}