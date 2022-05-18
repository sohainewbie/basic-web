
//author: sohay
//18 may 2022


var listRules = {
    'pizza' : {
        'pizza1' : 8,
        'pizza2' : 10,
        'pizza3' : 12
    },
    'size' : {
        'small' : -1,
        'medium': +1,
        'large' : +2,
    },
    'toppings':{   
        "avocado" :1,
         "broccoli" : 1,
         "onions" : 1,
         "zucchini" : 1,
         "lobster" : 2,
         "oyster" : 2,
         "salmon" : 2,
         "tuna" : 2,
         "bacon" : 3,
         "duck" : 3,
         "ham" : 3,
         "sausage": 3
     }
}

function calcaultePizaAndTopping(){
    var total = 0;
    var pizzaTypes = document.getElementsByName("pizza-type")
    for(i=0;i<pizzaTypes.length;i++){
        if(pizzaTypes[i].checked){
            total += listRules['pizza'][pizzaTypes[i].value];
        }
    }

    var topping = document.getElementsByName("toppings")
    for(i=0;i<topping.length;i++){
        if(topping[i].checked){
            total += listRules['toppings'][topping[i].value];
        }        
    }
    return total;
}

function componentPizza(){
    var pizzaTypes = document.getElementsByName("pizza-type")
    for(i=0;i<pizzaTypes.length;i++){
        pizzaTypes[i].addEventListener("click", function(e) {

            var pizzaPrice = 0;// init prize 
            var pizzaType = e.target.value; //this data from value radio

            //check the pizzaType for get the prize
            pizzaPrice = listRules['pizza'][pizzaType];

            disableComponentToppings(pizzaType); //check for the what topping are available for that pizza
            document.getElementById("total-prize").innerHTML =  `$`+ `${pizzaPrice}`
        }, false);
    }
}

function componentPizzaSize(){
    var totalPrizeInt = 0;    
    var pizzaSize = document.getElementsByName("pizza-size")
    var pizzaSizeType = "";
    var totalPrizeStr = 0;


    for(i=0;i<pizzaSize.length;i++){
        pizzaSize[i].addEventListener("click", function(e) {

            totalPrizeStr = document.getElementById("total-prize").innerHTML; //get the current value from document by id (total-prize)
            totalPrizeInt = parseInt(totalPrizeStr.replace("$","")); //replace prefix $ and convert into integer
            if(totalPrizeInt <= 0 ){
                return  alert("Please choose the pizza first if you wanna buy!");
            }            
            pizzaSizeType = e.target.value;
            if(this.checked){
                totalPrizeInt = listRules['size'][pizzaSizeType] + calcaultePizaAndTopping()
                document.getElementById("total-prize").innerHTML =  `$`+ `${totalPrizeInt}`
            }
        })
    }
}

function disableComponentToppings(pizzaType){
    var rules = [];
    if(pizzaType === "pizza1"){
        rules = ["lobster", "oyster", "salmon", "bacon", "duck", "sausage"]
    }else if(pizzaType === "pizza2"){
        rules = ["avocado", "tuna", "duck", "sausage"]
    }else if(pizzaType === "pizza3"){
        rules = ["avocado", "lobster", "salmon"]
    }

    rules.forEach(rule => { // loop the rules and disable that.
        document.getElementById(rule).disabled = true;
    });
}

function componentToppings(){
    //calculate the pizza prize with the topping
     var totalPrizeStr = 0;
     var totalPrizeInt = 0;
     var toppingPrize = 0;
     var totalPriceWithTopping = 0;
     var topping = document.getElementsByName("toppings")
     for(i=0;i<topping.length;i++){
         topping[i].addEventListener("click", function(e) {

            totalPrizeStr = document.getElementById("total-prize").innerHTML; //get the current value from document by id (total-prize)
            totalPrizeInt = parseInt(totalPrizeStr.replace("$","")); //replace prefix $ and convert into integer

            if(totalPrizeInt <= 0 ){
                return alert("Please choose the pizza first if you wanna buy!");
            }

            toppingPrize = listRules['toppings'][e.target.value]; //get the price
            totalPriceWithTopping = this.checked ? (totalPrizeInt + toppingPrize) : (totalPrizeInt - toppingPrize);
           
            document.getElementById("total-prize").innerHTML =  `$`+ totalPriceWithTopping;
        })
    }
}

window.onload=function(){
    componentPizza();
    componentToppings();
    componentPizzaSize();
}