const $form = document.querySelector(".inputForm");
const $input = document.querySelector(".input");
const $p = document.querySelector("p");
const $bookimage = document.querySelector(".bookImage");
const $leftArrow = document.querySelector(".left i");
const $rightArrow = document.querySelector(".right i");
let currentSlide = 0;
let maxSlide;
let BookTitle;
// 120 * 174

function nextslide() {
    return function() {
        currentSlide += 1;
        $.ajax({
            method: "GET",
            url: "https://dapi.kakao.com/v3/search/book?target=title",
            data: {query: BookTitle},
            headers: {Authorization: "KakaoAK d4f9ae65ad92c24e98fa6b8c61900997"},
            success: function(temp1) {
                $p.textContent = `${temp1.documents[currentSlide].title}`;
                $bookimage.src = `${temp1.documents[currentSlide].thumbnail}`;
            } 
        })
        console.log(currentSlide);
        if(currentSlide < maxSlide && currentSlide > 0) {
            $rightArrow.style.display = 'block';
            $leftArrow.style.display = 'block';
        } else if (currentSlide == 0 ) {
            $leftArrow.style.display = 'none';
        } else if (currentSlide == maxSlide) {
            $rightArrow.style.display = 'none';
        }
    }
}   

function beforeslide() {
    return function() {
        currentSlide -= 1;
        $.ajax({
            method: "GET",
            url: "https://dapi.kakao.com/v3/search/book?target=title",
            data: {query: BookTitle},
            headers: {Authorization: "KakaoAK d4f9ae65ad92c24e98fa6b8c61900997"},
            success: function(temp1) {
                $p.textContent = `${temp1.documents[currentSlide].title}`;
                $bookimage.src = `${temp1.documents[currentSlide].thumbnail}`;
            } 
        })
        console.log(currentSlide);
        if(currentSlide == 0) {
            $leftArrow.style.display = 'none';
        } else if (currentSlide < maxSlide) {
            $rightArrow.style.display = 'block';
        }
    }
}

function BookPresent(temp1) {
    $p.textContent = `${temp1.documents[0].title}`;
    console.log("title shown");
    $bookimage.src = `${temp1.documents[0].thumbnail}`;
    console.log("thumbnail shown");
    return;
}

function NoBookToCall(value) {
    $p.textContent = `Can't Find A Book That Starts With "${value}" `;
    $bookimage.src = '';
    $rightArrow.style.display = 'none';
}


let flag = 0;
$form.addEventListener('submit', SearchBook = (event) => {
    event.preventDefault(); 
    BookTitle = $input.value;
    if(BookTitle == '') {
        return;
    }
    $.ajax({
        method: "GET",
        url: "https://dapi.kakao.com/v3/search/book?target=title",
        data: {query: BookTitle},
        headers: {Authorization: "KakaoAK d4f9ae65ad92c24e98fa6b8c61900997"},
        success: function(temp1) {
            console.log(temp1);    
            if(temp1.documents.length >= 1) {
                maxSlide = temp1.documents.length - 1;
                currentSlide = 0;
                $leftArrow.style.display = 'none';
                $rightArrow.style.display = 'block';
                BookPresent(temp1); 
            } else {
                NoBookToCall(BookTitle);
            }
        } 
    })
});

$input.addEventListener('click',() => {
    $input.value = '';
});

$rightArrow.addEventListener('click',nextslide());
$leftArrow.addEventListener('click',beforeslide());






