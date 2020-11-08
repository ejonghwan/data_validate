

function Validate(selector, option){

    this.initDOM(selector, option);
    this.bindingEvent();    
}

Validate.prototype.initDOM = function(selector, option){
    this.join = document.querySelector(selector);
    this.btnSend = this.join.querySelector("input[type=submit]");
    this.items = option.items;
    this.len = this.items.length;
    this.i = 0;
    this.isValid = false;
}

Validate.prototype.bindingEvent = function(){   
    
    this.btnSend.onclick = function(e){          
        console.log(this);
        this.validate(this.join, this.items);         
        
        console.log(this.isValid);
        if(!this.isValid) {
            this.i=0;
            return false;
        }  
    }.bind(this); //내부의 this값을 함수 외부에서 지정가능 (해당 함수 안쪽의 this --> 인스턴스 지정)
}

Validate.prototype.validate = function(form, arr){
    //var self = this;
    arr.forEach(function(item){
        let result = form[item];   

        console.log(this);
        
        //복수개의 name값일때
        if(result.length){

            let isChecked = false;
            
            result.forEach(function(item){             
                if(item.checked ) isChecked = true;                
            });

            
            if(isChecked) {
                this.i++;
                result[0].parentNode.classList.remove("error");
            }else{
                result[0].parentNode.classList.add("error");
            }

        //단수의 name값일떄
        }else{           
            if(result.value) {
                this.i++;
                result.parentNode.classList.remove("error");
            }else{
                result.parentNode.classList.add("error");
            }
        }           
       
        if(this.i ==this.len ) {
            this.isValid =  true;
        }else {            
            this.isValid =  false;
        }      
    }.bind(this));

    console.log(this.i);
}