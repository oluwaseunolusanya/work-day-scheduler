//Create a dayjs object and set append it to the planner title.
dayjs.extend(window.dayjs_plugin_advancedFormat);
let currentDay = dayjs().format("dddd, MMMM Do");
$("#currentDay").text(currentDay);
