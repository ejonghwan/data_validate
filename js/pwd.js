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
        this.pwd_arr;
    }


    bindingEvent() {

        this.btnSend.onclick = function(e){     
            //e.preventDefault();       
            this.validate(this.join, this.items);         
            
            console.log(this.isValid);
            if(!this.isValid) {
                this.i=0;            
                e.preventDefault();
            }  
        }.bind(this);
    }


    validate(form, arr){

        this.pwd_arr = [];   
       
        arr.forEach(function(item) {
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
                } else {
                    result[0].parentNode.classList.add("error");
                }
    
            //단수의 name값일떄
            } else {                
                if(result.value) {

                    //input 요소가 password 일떄
                    if(result.type == "password"){        
                        let pwd = result.value;

                        //특수문자와, 숫자, 영어가 있는지 판단
                        let num = /[0-9]/; 
                        let spc = /[~!@#$%^&*()_+<>?:;{}]/;
                        let eng = /[a-zA-Z]/;

                        //특수문자, 숫자,영어 조건을 통과하면 첫번째 비번 통과 i값 1증가후 
                        //this.pwd_arr 배열에 비번 저장
                        if(spc.test(pwd) && num.test(pwd) && eng.test(pwd) ){                          
                            this.i++;
                            result.parentNode.classList.remove("error");
                        } else {
                            console.log("비밀번호에 특수문자와 영문, 숫자를 포함해주세요.");
                            result.parentNode.classList.add("error");
                        }
                        this.pwd_arr.push(pwd);

                        //비밀번호 배열에 2개의 값이 저장이 되면.
                        //일단은 바로 인증되는 걸 막기 위해 i값을 1을 다시 빼줌
                        //이후 각 배열에 담겨있는 두개의 값이 같은지 비교후 값이 같으면 다시 1을 증가해줌
                        if(this.pwd_arr.length == 2){     
                            this.i--;                       
                            if(this.pwd_arr[0] == this.pwd_arr[1]){   
                                this.i++;                           
                                result.parentNode.classList.remove("error");
                            } else {
                                console.log("재 입력한 비밀번호가 틀립니다. 다시 확인해주세요.");
                                result.parentNode.classList.add("error");
                            }
                        }  

                    //인풋 요소가 그냥 일반 text입력 값일때
                    } else {
                        this.i++;
                        result.parentNode.classList.remove("error");
                    }
                    
                } else {
                    result.parentNode.classList.add("error");
                }
            }   
            
   
            if(this.i == this.len ) {
                this.isValid = true;
            } else {            
                this.isValid = false;
            }
          
        }.bind(this));
    
        console.log(this.i);
    }       
}





