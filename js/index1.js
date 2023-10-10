const getBooks = ()=>{
    let myReq = new XMLHttpRequest();
    let URL = "https://www.googleapis.com/books/v1/volumes?q=1";

    myReq.addEventListener('readystatechange' , function (){
        if (this.readyState === 4 && this.status === 200){
            let myRes = JSON.parse(this.responseText);
            const books = myRes.items;
            let row = document.querySelector(".row");
            let columns = "";
            books.forEach( book =>{
                let title = book.volumeInfo.title.substr(0,20);
                let imgURL =book.volumeInfo.imageLinks.thumbnail;
                let des =book.volumeInfo.description || "no descriptin";
                des= des.substr(0,80) + "....."
                let LinkInfo =book.volumeInfo.infoLink;
               columns +=`
               <div class="col-xl-3 col-lg-4 col-sm-12 mt-4 p-4 " >
               <div class="card bg-dark text-center text-white p-3 ">
               <img src="${imgURL}"class="w-50 card-img m-auto alt=">
               <h4 class=" mt-3 mb-4">${title}</h4>
               <p>${des}</p>
               <a href="${LinkInfo}" class="btn btn-light w-50 m-auto d-block">more info</a>
           </div>
               </div>
          
               `;
            });
            row.innerHTML=columns;
        }
    });
    myReq.open("GET" , URL , true);
    myReq.send();
}
let btn = document.getElementById("btn");
btn.addEventListener('click', getBooks);