let input = document.querySelector("input");
let btn = document.querySelector("button");
let divData = document.querySelector(".data")

btn.onclick = function () {
    if (input.value !== "") {
        divData.innerHTML = ""
        fetchData(input.value)
    }
}
function fetchData(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response =>{
        if (response.ok) {
            return response.json()
        }else {
            throw new Error("User Not Found")
        }
    })
    .then((data)=> {        
        for (let dataa of data) {
            let name = dataa.name
            let url = `https://${dataa.owner.login}.github.io/${dataa.name}/`
            screen(url , name)
        }
    }).catch((erroe)=> {
        let h3 = document.createElement("h3")
        h3.textContent = "User Not Found"
        divData.appendChild(h3)
    })
}
  function screen (url , name) {
    let iframe = document.createElement("iframe")
    iframe.src =  url
    iframe.setAttribute("sandbox" , "allow-scripts allow-same-origin")

    let box = document.createElement("div")
    box.className = "box"
    let divContent = document.createElement("div")
    let a =  document.createElement("a")

    let span = document.createElement("span")
    span.onclick = function () {
        window.open(url , "_blank")
    }
    divContent.appendChild(span)
    divContent.appendChild(iframe)
    iframe.setAttribute("scrolling" , "no")
    box.appendChild(divContent)
    divData.appendChild(box)
    let p = document.createElement("p")
    p.className = "name"
    let spanName = document.createElement("span")
    spanName.textContent = name
    let icon = document.createElement("i")
    icon.className = "fa-solid fa-arrow-right"
    p.textContent = "Name"
    p.appendChild(icon)
    p.appendChild(spanName)
    divContent.after(p)
}



