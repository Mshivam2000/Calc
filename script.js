const inputslider = document.querySelector("[data-lengthslider]");
const lengthdisplay = document.querySelector("[data-lengthNumber]");

const passworddisplay =document.querySelector("[data-PasswordDisplay]");
const copybtn = document.querySelector("[datacopy]");
const copymsg = document.querySelector("[data-copyMsg]");
const uppercasecheck = document.querySelector("#uppercase");
const lowercasecheck = document.querySelector("#lowercase");
const numbercheck = document.querySelector("#numbers");
const symbolcheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generatebutton");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbol = '@#$%^&*()_+}{":?><//';

let password = "";
let passwordlength = 10;
let checkcount =0;

handleslider();

setindicator("#ccc");



function handleslider() {
    inputslider.value = passwordlength;
    lengthdisplay.innerText=passwordlength;

    const min = inputslider.min;
    const max = inputslider.max;
    inputslider.style.backgroundSize = ( (passwordlength - min)*100/(max - min)) + "% 100%"

}

function setindicator(color) {

    indicator.style.backgroundColor = color;

}

function getrndinteger(min,max) {

return Math.floor(Math.random()*(max-min))+min;

}

function generaterandomumber()
{
    return getrndinteger(0,9);
}

function generatelowercase() 
{
    return String.fromCharCode(getrndinteger(97,123));
}

function generateuppercase() 
{
    return String.fromCharCode(getrndinteger(65,91));
}


function generatesymbol() {

    const randnum = getrndinteger(0,symbol.length);
    return symbol.charAt(randnum);
}

function calcstrength() {
    let hasupper = false;
    let haslower = false;
    let hasnum = false;
    let hassym = false;
    if (uppercasecheck.checked) hasupper = true;
    if (lowercasecheck.checked) haslower = true;
    if (numbercheck.checked) hasnum = true;
    if (symbolcheck.checked) hassym = true;
  
    if (hasupper && haslower && (hasnum || hassym) && passwordlength >= 8) {
      setindicator("#0f0");
    } else if (
      (haslower || hasupper) &&
      (hasnum || hassym) &&
      passwordlength >= 6
    ) {
      setindicator("#ff0");
    } else {
      setindicator("#f00");
    }
}

async function copycontent() {

    try{
        await navigator.clipboard.writeText(passworddisplay.value);               //
        copymsg.innerText="coppied";
    }

    catch(e){
              copymsg.innerText = "failed";
    }
    //to make copy wala span visible

    copymsg.classList.add("active");

    setTimeout( () => {
        copymsg.classList.remove("active");
    },2000);
}

function shufflepassword(array){

     //Fisher Yates Method
     for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handlecheckboxchange() {
    checkcount=0;
    allcheckbox.forEach( (checkbox) => {
        if(checkbox.checked)
        checkcount++;
    });

    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
}

allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change',handlecheckboxchange);
})





inputslider.addEventListener('input', (e)=>{
    passwordlength=e.target.value;
    handleslider();
})


copybtn.addEventListener('click',() => {
    if(passworddisplay.value)
    copycontent();
})


generatebtn.addEventListener('click', ()=> {


    if(checkcount<=0)
    return;

    if(passwordlength<checkcount){
    passwordlength=checkcount;
    handleslider();
    }

    password="";

    let funcArr=[];

    if(uppercasecheck.checked)
    funcArr.push(generateuppercase);

    if(lowercasecheck.checked)
    funcArr.push(generatelowercase);

    if(numbercheck.checked)
    funcArr.push(generaterandomumber);

    if(symbolcheck.checked)
    funcArr.push(generatesymbol);

    for(let i=0; i<funcArr.length; i++)
    {
        password += funcArr[i]();

    }


    for(let i=0; i<passwordlength-funcArr.length; i++){
     let randindex = getrndinteger(0, funcArr.length);
    password += funcArr[randindex]();
    }

    password=shufflepassword(Array.from(password));

    passworddisplay.value=password;

    calcstrength();
})