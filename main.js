// importing dom to
// import domtoimage from 'dom-to-image';
// var domtoimage = require('dom-to-image');



const url = "https://www.abibliadigital.com.br/api/verses/nvi/random";
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const versesList = document.querySelector('.right--verses');
const cards = document.getElementById('card');
const noVerses = document.getElementById('noVerse');
const closeBtn = document.getElementById('close');
const popUp = document.getElementById('popup');
const modalText = document.querySelector('.left--text');
const verse = document.querySelectorAll('.verse');
const iconsF = document.querySelector('.left--icons'); 
const canvas = document.querySelector('.conteiner__left')
var item = "";



// events 
generateBtn.addEventListener('click', generate_verse);
clearBtn.addEventListener('click', clear_all);
closeBtn.addEventListener('click', closeM);
versesList.addEventListener('click', getVerse);
iconsF.addEventListener('click', functionalities);

//Funcion generete verse
function generate_verse() {
    // axios.get(url)
    noVerses.style.display ="none";

    fetch(`${url}`, { 
        hearders: new Headers({
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNhdCBPY3QgMTUgMjAyMiAwMTowODo0OCBHTVQrMDAwMC5nZXR1cmV1c2ViaW9AZ21haWwuY29tIiwiaWF0IjoxNjY1Nzk2MTI4fQ.qLbeYiQeSn-bO0w1m5yBNa-aJELm7-nrw-N_5dmqk7U'
        })
    })
    .then(response=> response.json())
    .then(data =>{
        console.log(JSON.stringify(data.text));
        // verses.push(data);
        

        let html = " ";
        if(data){
            html+= `
                <li data-id="${data.chapter}" class="${data.book.abbrev.pt} ${data.number} verse verse1">
                    <span class="titleParagraph"> ${data.book.name} ${data.chapter}:${data.number} </span>
                    <p class="verseParagraph">
                        ${data.text}
                    </p>
                </li>
            `

        }
        noVerses.style.display = 'none';
        cards.innerHTML += html;
    })
    .catch(error=> console.log(error))
 }



//  clear all functions
function clear_all (){
    let html = `
        <div id="noVerse" class="conteiner__noVerse">
            <img class="noVerse" src="_assets/Bibliophile-bro 1.png" alt="no verse yet image">
            <div class="txt__noVerse">
                <h2 class="noVerse">No verses yet</h2>
                <span class="subtext noVerse"> Generate one clicking in generate verse button</span>
            </div>
        </div>
    `;
    cards.innerHTML = html;
    noVerses.style.display = "flex";
    closeM();
} 


// close function
function closeM(){
    selected = cards.querySelectorAll('.verse');
     selected.forEach(element => {
        element.classList.remove('activeVerse');
     });
    popUp.style.display = "none";
}

// get verse of verseslist
function getVerse(e){
    e.preventDefault();
     
     item = e.target;

     let chap = item.dataset.id;
     let number = item.classList[1];
     let abb = item.classList[0];

    //  removing and adding activeVerse class
     selected = cards.querySelectorAll('.verse');
     selected.forEach(element => {
        element.classList.remove('activeVerse');
     });

     
     item.classList.add('activeVerse');


     fetch(`https://www.abibliadigital.com.br/api/verses/nvi/${abb}/${chap}/${number}`, { 
        hearders: new Headers({
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNhdCBPY3QgMTUgMjAyMiAwMTowODo0OCBHTVQrMDAwMC5nZXR1cmV1c2ViaW9AZ21haWwuY29tIiwiaWF0IjoxNjY1Nzk2MTI4fQ.qLbeYiQeSn-bO0w1m5yBNa-aJELm7-nrw-N_5dmqk7U'
        })
    })
    .then(response=> response.json())
    .then(data =>{
        console.log(JSON.stringify(data.text));
        let html = " ";
        if(data){
            html += `
                    <P class="left--verse">
                    ${data.text}
                    </P>
                    <span class="left--bookVerse">${data.book.name} ${data.chapter}:${data.number}</span>
            `;
        }
        modalText.innerHTML = html;
        popUp.style.display = "flex";
    })
    .catch(error=> console.log(error))
     
}


//verse funtionanalities 

function functionalities(e, cards){
    e.preventDefault();
    const icon = e.target;
    const iconClass = icon.classList[1];

    // console.log(iconClass);
    // console.log(cards);

    switch (iconClass) {
        case "reload": 
            deleteVerse();
            break;
        case "delete": 
            deleteVerse();
            break;
        case "copy": 
            copyVerse();
            break;
        case "download": 
            downloadVerse();
            break;
        case "share": 
            shareVerse();
            break;
    
        default:
            break;
    }
}


function copyVerse(){
    const verseText = document.querySelector('.left--verse');
    const bookVerse = document.querySelector('.left--bookVerse');

    const copy = document.createElement("div");
    copy.classList.add('copiedText');
    copy.style.display = 'none';
    copy.innerHTML = `${verseText.textContent} - ${bookVerse.textContent}`;
    verseText.appendChild(copy); 
    const copyed = document.querySelector('.copiedText');

    console.log(copyed.textContent);

    var r = document.createRange();
    r.selectNode(copyed);
    r.selectNode(copyed);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    copy.remove();
}

function deleteVerse(versesList) {
    item.remove();
    closeM();
}

function downloadVerse(){

    domtoimage.toPng(canvas)
    .then(function (dataUrl) {
        var img=new Image();
        var link = document.createElement('a');
        img.src=dataUrl;
        link.download = 'verse.jpeg';
        link.href = dataUrl;
        link.click();
    });
}


async function shareVerse(){

    const shareData = {
        // Files;
        title: 'Test',
        text: ``,
      }

      const share = async () => {
        try {
          await navigator.share(shareData);
          console.log(shareData);
        } catch (err) {
          console.log(`Error: ${err}`);
        }
      };

      share();
}








