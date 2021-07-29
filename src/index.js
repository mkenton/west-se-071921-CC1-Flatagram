// used defer in script, so all code below will run after DOM Content loads

//declare reused variables
const baseURL = 'http://localhost:3000';
const imgURL = 'http://localhost:3000/images/1';
let fetchedDataObject = {};
let ul = document.querySelector('#fg-comments');
let form = document.querySelector('#fg-comment-form');
let likeBttn = document.querySelector('#fg-like-button');
let span = document.querySelector("#fg-likes");
let h2 = document.querySelector('#fg-title')
let likes;
form.addEventListener('submit', addNewComment) // add event listener to formfor more comments
likeBttn.addEventListener('click', incrementLikes); ///add event listener to like button 


// fetch data from server (image, title, likes and comments when page loads
function getAllData() {
    fetch(imgURL)
        .then(resp => resp.json())
        .then(handleData)
}

function handleData(data) {
    fetchedDataObject = data; //create js object with data in case we need it to manipulate later
    
    likes = data.likes; //start dog off with correct likes from fetched data
    span.textContent = `${likes} likes`
    //run deliverable functionality
    h2.textContent = data.title
    addImage(data);
    addComments(data);
}

function addImage(data) {
    //console.log(data);
    let img = document.querySelector('#fg-image');
    img.src = data.image;
}

function addComments(data) {
    //add initial comments
    //console.log(data.comments[1].content)
    ul.innerHTML = `
    <li> ${data.comments[0].content} </li>
    <li> ${data.comments[1].content} </li>
    <li> ${data.comments[2].content} </li>`;
}

// add new comment when text is typed in form and submitted
function addNewComment(e) {
    e.preventDefault();
    //console.log(e.target.comment.value)
    const li = document.createElement('li')
    li.textContent = e.target.comment.value
    ul.append(li)
}

//increase likes when like button is cliekd
function incrementLikes() {
    likes = likes + 1
    //console.log(likes)
    span.textContent = `${likes} likes`

    //try patch request 
    fetchedDataObject.likes = likes;
    fetch(imgURL,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fetchedDataObject)
        })
        .then(resp = resp.json())
        .then(update => console.log(update))

}

function initialize() {
    getAllData()
}

initialize()