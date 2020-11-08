class Validate {

    constructor(selector, option){
        this.initDOM(selector, option);
        this.bindingEvent(); 
    }


    initDOM(selector, option){
        this.join = document.querySelector(selector);
        this.btnSend = this.join.querySelector("input[type=submit]");
        this.items = option.items;
        this.len = this.items.length;
        this.i = 0;
        this.isValid = false;
    }


    bindingEvent(){

        this.btnSend.onclick = function(e){            
            this.validate(this.join, this.items);         
            
            console.log(this.isValid);
            if(!this.isValid) {
                this.i=0;
                //return false;
                e.preventDefault();
            }  
        }.bind(this);
    }


    validate(form, arr){
       
        arr.forEach(function(item){
            let result = form[item];   
            
            //복수의 name값일때
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
}





