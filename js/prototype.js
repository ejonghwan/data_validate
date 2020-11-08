

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
    let self = this;

    self.btnSend.onclick = function(e){     
        //e.preventDefault();  
      
        self.validate(self.join, self.items);         
        
        console.log(self.isValid);
        if(!self.isValid) {
            self.i=0;
            return false;
        }  
    }
}

Validate.prototype.validate = function(form, arr){
    var self = this;
    arr.forEach(function(item){
        let result = form[item];   
   
        if(result.length){

            let isChecked = false;

            
            result.forEach(function(item){             
                if(item.checked ) isChecked = true;                
            });

            //체크된게 있으면 부모 td에 error클래스를 지우고 i값 증가
            //체크된게 없으면 부모 td에 error클래스를 추가하고 i값 증가하지 않음
            if(isChecked) {
                self.i++;
                result[0].parentNode.classList.remove("error");
            }else{
                result[0].parentNode.classList.add("error");
            }

        //단수의 name값일떄
        }else{
            //해당 인풋에 값이 있으면 error클래스를 지우고 i값 증가
            //해당 인풋에 값이 없으면 error클래스 추가하고 i값 증가하지 않음
            if(result.value) {
                self.i++;
                result.parentNode.classList.remove("error");
            }else{
                result.parentNode.classList.add("error");
            }
        }   
        
        //배열의 체크할 항목 갯수와 i값이 동일하면 isValid에 true저장
        //그렇지 않으면 isValid에 false저장
        if(self.i ==self.len ) {
            self.isValid =  true;
        }else {            
            self.isValid =  false;
        }
      
    });

    console.log(self.i);
}