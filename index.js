let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

//retrieving information from the local storage
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    //grab url of current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // since only one tab should be active and in the current window at once
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads){
    let listItems = ""
    for(let i = 0; i < leads.length; i++){
        //when you want to be redirected to another tab when you click a link you type    target='_blank'
        //so that the compiler reads the string as a html tag
        //you can use this 
        listItems += "<li><a target='_blank' href='" + leads[i] + "'>" + leads[i] + "</a></li>"
        //orr
        //const li = document.createElement("li")
        //li.textContent = myleads[i]
        //ulEl.append(li)
    
    
        //to prevent the struggle of switching between single and double quotes you can use template strings
        /*listItems += `
        <li>
            <a target='_blank' href='${myLeads[i]}'>
                ${myLeads[i]}
            </a>
        </li>
        `*/
    }
    
    ulEl.innerHTML = listItems
    }

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

//creating an event listener
inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    //to clear the input field when the save input button is clicked
    inputEl.value = ""

    //preventing data from disappearing when the page is refreshed using the local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    
   render(myLeads)
})