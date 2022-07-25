let searchParam = location.search.split('=').pop();

const access_key= 'vyCGKvEXe_MGRa5XH85cOlTDL7XgazJCrftDqiTITRQ';

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=60`;
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&page_page=60`;


const gallery = document.querySelector('.gallery');

let currentImage = 0;
let allImages; // this will store all images data

const getImages = ()=> {
    fetch(random_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        makeImages(allImages);
        // makeImages(allImages);
        // makeImages(allImages);
    });
}

const searchImages = ()=> {
    fetch(search_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data.results;
        makeImages(allImages);
        makeImages(allImages);
        // makeImages(allImages);
    });
}

const makeImages = (data) => {
    data.forEach((item, index) => {

        let img = document.createElement('img');
        img.src = item.urls.regular;
        img.className = 'gallery-img'; 

        gallery.appendChild(img);

        // popup image

        img.addEventListener('click', ()=>{
            currentImage = index;
            showPopup(item);
        })

    });
}


const showPopup = (item) => {
    let popup = document.querySelector('.image-popup');
    const downloadBtn = document.querySelector('.download-btn');
    const closeBtn = document.querySelector('.close-btn');
    const image = document.querySelector('.large-img');

    popup.classList.remove('hide');
    downloadBtn.href = item.links.html;
    image.src = item.urls.regular;

    closeBtn.addEventListener('click',() =>{
        popup.classList.add('hide');
    })
}

if(searchParam == ''){
    getImages();
}
else{
    searchImages();
}

const preBtns = document.querySelector('.pre-btn');
const nxtBtns = document.querySelector('.nxt-btn');

preBtns.addEventListener('click', () => {
    if(currentImage > 0){
        currentImage--;
        showPopup(allImages[currentImage]);
    }
});

nxtBtns.addEventListener('click', () => {
    if(currentImage < allImages.length -1){
        currentImage++;
        showPopup(allImages[currentImage]);
    }
});
