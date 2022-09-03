document.querySelector(".start span").onclick=function(){
    let name=prompt("Whats your name?");
    if(name==null||name==""){
        document.querySelector(".info .name span").innerHTML="Unknown";

    }else document.querySelector(".info .name span").innerHTML=name;  
    document.querySelector(".start").remove();  
};
let duration=1000;
let blockcont=document.querySelector(".game-block");
let blocks=Array.from(blockcont.children);
let orderRange=Array.from(Array(blocks.length).keys());
shuffle(orderRange);
blocks.forEach((block,index)=>{
    block.style.order=orderRange[index];
    block.addEventListener("click",function(){
        flip(block);
    })
});
function shuffle(array){
    let curnt=array.length,
        temp,
        random;
    
    while(curnt>0){
        random=Math.floor(Math.random() * curnt);
        curnt--;
        temp=array[curnt];
        array[curnt]=array[random];
        array[random]=temp;

    }
    return array;
};
function flip(selected){
    selected.classList.add("isflap");
    let allflip=blocks.filter(flibed => flibed.classList.contains("isflap"));
    if(allflip.length===2){

        stopclick();
        checkBlock(allflip[0],allflip[1]);
    };
};
function stopclick(){
    blockcont.classList.add("no-click");
    setTimeout(()=>{
        blockcont.classList.remove("no-click");
        

    },duration);
};


function checkBlock(fBlock,sBlock){
    let trys=document.querySelector(".tries span");
    if(fBlock.dataset.animal===sBlock.dataset.animal){
        fBlock.classList.remove("isflap");
        sBlock.classList.remove("isflap");
        fBlock.classList.add("ismatch");
        sBlock.classList.add("ismatch");
        document.getElementById("sucs").play();
    }else {
        setTimeout(()=>{

            fBlock.classList.remove("isflap");
            sBlock.classList.remove("isflap");
            document.getElementById("fill").play();
        },duration)
        trys.innerHTML=parseInt(trys.innerHTML)+1;
    }

};