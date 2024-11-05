function movieSelect(event){
    var videoInput=document.getElementsByClassName('form-input')[0];
    var MovieName = document.getElementById('movieName');
    console.log(event.target.files[0].name);
    MovieName.textContent=event.target.files[0].name;
}

function toggleMenu() {
    var menu = document.getElementsByClassName("menu")[0]; // Access the first element
    var mainContent = document.getElementById("main-content");
    if (menu.classList.contains("open-menu")) {
        menu.classList.remove("open-menu");
        mainContent.style.marginLeft = "0";
    } else {
        menu.classList.add("open-menu");
        mainContent.style.marginLeft = "250px";
    }
}
// function for the menu button toggle

var count = 0;

var rangeInput = document.getElementById('rating');
var rangeValue = document.getElementById('ratingValue');
rangeInput.addEventListener('input', function () {
    rangeValue.textContent = rangeInput.value;
});


function addTextBox(currentNode,inputName) {
    console.log(currentNode);
    var newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = inputName

    var div = document.createElement('div');
    var remove = document.createElement('button');
    var span = document.createElement('span');
    var br = document.createElement('br');

    remove.textContent = "Remove";
    remove.classList.add("remove");
    remove.onclick = function () { removeTextBox(remove) };
    span.textContent = " ";

    div.appendChild(br);
    div.appendChild(newInput);
    div.appendChild(span);
    div.appendChild(remove);

    currentNode.parentNode.appendChild(div);
    // document.getElementById(container).appendChild(document.createElement('br'));
}

function removeTextBox(removeNode) {
    console.log(removeNode);
    var PNode = removeNode.parentNode;
    PNode.parentNode.removeChild(PNode);

}

function triggerFileInput(event) {
    event.preventDefault(); // Prevent default behavior (form submission)
    document.getElementById('nail').click(); // Trigger file input click
}



function previewImage(event) {
    var input = event.target;
    var preview = document.getElementById('preview');

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block'; // Show the preview
        }

        reader.readAsDataURL(input.files[0]); // Read the selected file as a data URL
    }
}

function removePreview() {
    var preview = document.getElementById('preview');
    var fileInput = document.getElementById('nail');
    preview.src = '#'; // Clear the image source
    preview.style.display = 'none'; // Hide the preview
    fileInput.value = ''; // Clear the file input
}