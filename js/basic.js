const join = document.querySelector("#join");
const btnSend = join.querySelector("input[type=submit]");
const items = ["userid", "pwd", "email", "hobby", "gender", "comments"];
const len = items.length;
let i = 0;
let isValid = false;


//전송 버튼 클릭 시
btnSend.onclick = function(){    
   
    //인증 함수 호출
    validate(join, items); 
    
    //인증 결과가 false면 i값을 다시 0으로 초기화하고
    //submit 기본 이벤트를 막음
    if(!isValid) {
        i=0;
        return false;
    }   
}


//validation 함수 정의
function validate(form, arr){

    //체크할 name항목의 갯수만큼 반복을 시작
    arr.forEach(function(item){
        let result = form[item];             


        //복수의 name값 일때
        if(result.length){

            let isChecked = false;

            //반복을 돌면서 하나라도 체크된게 있으면 isChecked = true저장
            result.forEach(function(item){             
                if(item.checked ) isChecked = true;                
            });

            //체크된게 있으면 부모 td에 error클래스를 지우고 i값 증가
            //체크된게 없으면 부모 td에 error클래스를 추가하고 i값 증가하지 않음
            if(isChecked) {
                i++;
                result[0].parentNode.classList.remove("error");
            }else{
                result[0].parentNode.classList.add("error");
            }

        //단수의 name값일떄
        }else{
            //해당 인풋에 값이 있으면 error클래스를 지우고 i값 증가
            //해당 인풋에 값이 없으면 error클래스 추가하고 i값 증가하지 않음
            if(result.value) {
                i++;
                result.parentNode.classList.remove("error");
            }else{
                result.parentNode.classList.add("error");
            }
        }   
        
        //배열의 체크할 항목 갯수와 i값이 동일하면 isValid에 true저장
        //그렇지 않으면 isValid에 false저장
        if(i ==len ) {
            isValid =  true;
        }else {            
            isValid =  false;
        }
      
    });

    console.log(i);

}

