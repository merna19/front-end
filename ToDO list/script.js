//generate element objects
var title_in= document.getElementById("title_in");
var desc_in= document.getElementById("desc_in");
var search_in= document.getElementById("search_in");
var Task_display=document.getElementById("Task_display");
var entry_btn=document.getElementById("entry_btn")

var Task;
//declare task array
var Tasks=[];
//declare task display array
var display=[];

//define add btn method
function addTask()
{   
    display=[];
    //fill new task info
    Task=
    {
        title: title_in.value, 
        description: desc_in.value,
        status: "grey"
    }
    //push the new task into the array
    Tasks.push(Task);
    //clear the input bars
    title_in.value=""
    desc_in.value=""
    //display the new task array
    Display()
}

//define the search btn method
function search()
{
    //use regular expression to find search token in the array
    var regex= new RegExp(search_in.value,"i");
    for (var i=0;i<Tasks.length;i++)
    {   //loop over the whole task array to find all matches
        if(regex.test(JSON.stringify(Tasks[i].title)))
        {   //if found push it into the task display array
            display.push(Tasks[i])
        }
    }    
    //display the matches if found
    Display()
    //clear the search bar
    search_in.value=""
}
//define the display function
function Display()
{   
    //check if there's a matched task pre-pushed into the display array
        if(display.length==0)
    {
        //if not found clone the task array into the display array
        display=structuredClone(Tasks);
    }

    //prepare the content to change InnerHtml for the display section
    var content="";
    for(var i=0; i<display.length;i++)
        {
            content +=`<div class="Task_display">
                            <div >
                                <h3>
                                    ${display[i].title}
                                </h3>
                            </div>
                            <div class="Task" style="background-color: ${display[i].status}">
                                ${display[i].description}
                            </div>
                            <div>
                                <button onclick="edit(${i})">&#9935</button>
                            </div>
                            <div>
                                <button onclick="done(${i})">&#9745</button>
                            </div>
                            <div>
                                <button onclick="rmv(${i})">&#9746</button>
                            </div>
                        </div>`
            
        }
    //update the HTML file
    Task_display.innerHTML=content;
    //clear the display array
    display=[]
}
//define the remove btn method
function rmv(i)
{
    //takes the task index and removes it from the tasks array
    Tasks.splice(i,1)
    //clears the display array
    display=[]
    //display the tasks after removal
    Display()
}
//define the done btn method
function done(i)
{   //if task is finished change status color from grey to green
    Tasks[i].status="green"
    //then display the task array
    Display()
}
//define the edit btn method
function edit(i)
{   
    //shift the entry section btn from ADD to Update
    entry_btn.innerHTML=`<button onclick="update(${i})" style="background-color: cyan">
                            Update
                        </button>`
}
//define update btn method
function update(i)
{
    //updates the task info
    if(title_in.value!="")
    {
        Tasks[i].title=title_in.value
    }
    if(desc_in.value!="")
    {
        Tasks[i].description=desc_in.value
    }
    //clears the entry bars
    title_in.value=""
    desc_in.value=""
    //shifts the entry section btn from Update to ADD
    entry_btn.innerHTML=`<button onclick="addTask()">
                            ADD
                        </button>`
    //displays the tasks array
    Display()
}


