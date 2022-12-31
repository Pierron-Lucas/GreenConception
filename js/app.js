function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("../data/data.json", function(text){
    var data = JSON.parse(text);
    addElement(data);
});

function addElement(data){
    for(let i = 0; i < 546; i++){
        // create a new div element
        const contentDiv = document.createElement("div");
        const cycleDiv = document.createElement("div");
        const questionDiv = document.createElement("div");
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        const spanDiv = document.createElement("div");
        const addButton = document.createElement("button");

        cycleDiv.className = "content-title";
        questionDiv.className  = "content-question";
        spanDiv.className = "content-span";

        addButton.className = "addButton";
        addButton.textContent = "+" ;
        j = 0;
        addButton.onclick = function(){
            console.log(j);
            setBasket(j, data[i].field1, data[i].field7);
            j += 1;
        }

        if(data[i].field18 == "INCONTOURNABLE"){
            span1.className = "incontournable";
            const inc = document.createTextNode("Incontournable");
            span1.append(inc);
            spanDiv.append(span1);
            contentDiv.append(spanDiv);
        }

        switch(data[i].field15){
            case "RECO":
                span2.className = "reco";
                const reco = document.createTextNode("Recommandation");
                span2.append(reco);
                spanDiv.append(span2);
                questionDiv.style.borderLeft = "4px solid #2054a2";
                break;

            case "CONSEIL":
                span2.className = "conseil";
                const conseil = document.createTextNode("Conseil");
                span2.append(conseil);
                spanDiv.append(span2);
                questionDiv.style.borderLeft = "4px solid #fa983a";
                break;
        }

        if((data[i].field15 == "RECO" || data[i].field15 == "CONSEIL") && data[i].field18 == "INCONTOURNABLE")
            questionDiv.style.borderLeft = "4px solid #b71540";

        contentDiv.append(spanDiv);

        let currentDiv;
        if(data[i].field3 != ""){
            switch(data[i].field1){
                case "STRATEGIE":
                    contentDiv.className = "strategie";
                    currentDiv = document.getElementById("strategie-marker");
                    break;
                case "SPECIFICATIONS":
                    contentDiv.className = "specifications";
                    currentDiv = document.getElementById("specifications-marker");
                    break;
                case "UX/UI":
                    contentDiv.className = "uxui";
                    currentDiv = document.getElementById("uxui-marker");
                    break;
                case "CONTENUS":
                    contentDiv.className = "contenus";
                    currentDiv = document.getElementById("contenus-marker");
                    break;
                case "ARCHITECTURE":
                    contentDiv.className = "architecture";
                    currentDiv = document.getElementById("architecture-marker");
                    break;
                case "FRONTEND":
                    contentDiv.className = "frontend";
                    currentDiv = document.getElementById("frontend-marker");
                    break;
                case "BACKEND":
                    contentDiv.className = "backend";
                    currentDiv = document.getElementById("backend-marker");
                    break;
                case "HEBERGEMENT":
                    contentDiv.className = "hebergement";
                    currentDiv = document.getElementById("hebergement-marker");
                    break;
                default:
                    contentDiv.className = "strategie";
                    currentDiv = document.getElementById("strategie-marker");
                    break;
            }
            contentDiv.className += " questionField";
            // and give it some content
            if(data[i].field9 == "N/A"){
                let cycle = document.createTextNode("Aucune étape au cycle de vie");
                const question = document.createTextNode(data[i].field7);
                // add the text node to the newly created div
            
                // add the newly created element and its content into the DOM
                let parent = currentDiv.parentNode;
                parent.insertBefore(contentDiv, currentDiv);
                
                cycleDiv.appendChild(cycle);
                questionDiv.appendChild(question);
                
                contentDiv.append(cycleDiv);
                contentDiv.append(questionDiv);

                if(data[i].field18 == "")
                    contentDiv.append(addButton);
            }

            else{
                let cycle = document.createTextNode(data[i].field9);
                const question = document.createTextNode(data[i].field7);
                // add the text node to the newly created div
                
                // add the newly created element and its content into the DOM
                let parent = currentDiv.parentNode;
                parent.insertBefore(contentDiv, currentDiv);
                
                cycleDiv.appendChild(cycle);
                questionDiv.appendChild(question);
                
                contentDiv.append(cycleDiv);
                contentDiv.append(questionDiv);

                if(data[i].field18 == "")
                    contentDiv.append(addButton);
            }
        }
    }
}

function clearBasket(){
    var req = new XMLHttpRequest();

    req.open('GET', 'index.html');

    // Réglage du timeout en millesecondes
    req.timeout = 3000;

    req.addEventListener('load', function () {


    	if (req.status >= 200 && req.status < 400) {

            localStorage.clear();
            j = 0;
            k = 0;

        } else {

            console.error(req.status + " " + req.statusText);

        }

    });


    req.addEventListener('error', function () {
        console.error('La requête à recontrer un problème');
    });

    // Évènement timeout
    req.addEventListener('timeout', function () {
        console.error('timeout');
    });

    req.send();
}

function setBasket(indice, theme, question){
    var students = [];

    var student1 = { s: 1 };

    students.push(student1);

    localStorage.setItem("students", JSON.stringify(students));

    var stored = JSON.parse(localStorage.getItem("students"));

    var student2 = { s: 2 };

    stored.push(student2);

    localStorage.setItem("students", JSON.stringify(stored));

    var test = JSON.parse(localStorage.getItem("students"));
    var student3 = { s: 3};
    test.push(student3);
    localStorage.setItem("students", JSON.stringify((test)));

    var result = JSON.parse(localStorage.getItem("students"));
    
    console.log(result);
}

if(JSON.parse(localStorage.getItem("cart_key")) != null){
    cart_list = JSON.parse(localStorage.getItem("cart_key"));
}

else{
    cart_list = [];
    localStorage.setItem("cart_key", JSON.stringify(cart_list));
}

k = 0;

function loadBasket(){
    if(localStorage.length != 0){
        const basketContentDiv = document.createElement('div');
        console.log(k);
        switch(localStorage.key(k)){
            case k + "STRATEGIE":
                basketContentDiv.className = "basket-strategie";
                currentDiv = document.getElementById("basket-strategie-marker");
                basketContentDiv.append(localStorage.getItem(k + "STRATEGIE"));
                break;
            case k + "SPECIFICATIONS":
                basketContentDiv.className = "basket-specifications";
                currentDiv = document.getElementById("basket-specifications-marker");
                basketContentDiv.append(localStorage.getItem(k + "SPECIFICATIONS"));
                break;
            case k + "UX/UI":
                basketContentDiv.className = "basket-uxui";
                currentDiv = document.getElementById("basket-uxui-marker");
                basketContentDiv.append(localStorage.getItem(k + "UX/UI"));
                break;
            case k + "CONTENUS":
                basketContentDiv.className = "basket-contenus";
                currentDiv = document.getElementById("basket-contenus-marker");
                basketContentDiv.append(localStorage.getItem(k + "CONTENUS"));
                break;
            case k + "ARCHITECTURE":
                basketContentDiv.className = "basket-architecture";
                currentDiv = document.getElementById("basket-architecture-marker");
                basketContentDiv.append(localStorage.getItem(k + "ARCHITECTURE"));
                break;
            case k + "FRONTEND":
                basketContentDiv.className = "basket-frontend";
                currentDiv = document.getElementById("basket-frontend-marker");
                basketContentDiv.append(localStorage.getItem(k + "FRONTEND"));
                break;
            case k + "BACKEND":
                basketContentDiv.className = "basket-backend";
                currentDiv = document.getElementById("basket-backend-marker");
                basketContentDiv.append(localStorage.getItem(k + "BACKEND"));
                break;
            case k + "HEBERGEMENT":
                basketContentDiv.className= "basket-hebergement";
                currentDiv = document.getElementById("basket-hebergement-marker");
                basketContentDiv.append(localStorage.getItem(k + "HEBERGEMENT"));
                break;
            default:
                basketContentDiv.className = "basket-strategie";
                currentDiv = document.getElementById("basket-strategie-marker");
                basketContentDiv.append(localStorage.getItem(k + "STRATEGIE"));
                break;      
            }

        k += 1;

        let parent = currentDiv.parentNode;
        parent.insertBefore(basketContentDiv, currentDiv); 
    }
}

for (let i = 0; i < localStorage.length; i++) {
    console.log(localStorage.getItem(localStorage.key(i)));
  }
  