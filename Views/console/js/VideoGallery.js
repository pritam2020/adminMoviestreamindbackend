var moviedetails = "NoData";

fetch("/protected-route/videodetails")
  .then((response) => {
    if (!response.ok) {
      // console.log("VideoGallery---line 44...");
      throw new Error("Network response was not ok");
    }
    console.log("VideoGallery---line 47...");
    return response.json(); // Parse the response body as JSON
  })
  .then((data) => {
    moviedetails = data;
    var count = 0;
    // console.log("tabs length..." + data.tabs);
    var pagination = document.getElementsByClassName("pagination")[0];
    for (let i = 1; i <= data.tabs; i++) {
      var link = document.createElement("a");
      link.href = "#";
      link.id = count + count;
      count++;
      link.onclick = function () {
        Array.from(pagination.children).forEach((Childnode) => {
          Childnode.classList.remove("active");
        });
        this.classList.add("active");
        loadMovies({ firstIndex: 50 * (i - 1), lastIndex: 50 * i - 1 });
      };
      // console.log(50 * (i - 1) + "  line...215");
      // console.log(50 * i - 1 + "  line...216");
      link.textContent = i;
      pagination.appendChild(link);
    }
    let arrowNode = document.createTextNode("»");
    var rigthArrow = document.createElement("a");

    rigthArrow.onclick = (n) => {
      tabIncrement();
    };
    rigthArrow.appendChild(arrowNode);
    pagination.appendChild(rigthArrow);

    var first_link = document.getElementById("0");
    // console.log(first_link);
    first_link.classList.add("active");
    loadMovies({ firstIndex: 0, lastIndex: 49 });
  })
  .catch((error) => {
    // console.log("VideoGallery---line 54...");
    // console.error("There was a problem with the fetch operation:", error);
  });
// dynamically creating video element and populating it

// function for the menu button toggle
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

function tabIncrement() {
  var host = "/protected-route/tab?";

  var parentDiv = document.getElementsByClassName("pagination")[0];
  var childrenDivs = parentDiv.querySelectorAll("a");

  for (var i = 1; i < childrenDivs.length - 1; i++) {
    var div = childrenDivs[i];

    div.textContent = parseInt(div.textContent) + 1;
    div.href = host + div.textContent;
  }
}
//        }

function tabDecrement() {
  var host = "/protected-route/tab?";
  var parentDiv = document.getElementsByClassName("pagination")[0];
  var childrenDivs = parentDiv.querySelectorAll("a");

  for (var i = 1; i < childrenDivs.length - 1; i++) {
    var div = childrenDivs[i];

    div.textContent = parseInt(div.textContent) - 1;
    div.href = host + div.textContent;
  }
}

function loadMovies(tab) {
  var Container = document.getElementsByClassName("container")[0];
  while (Container.firstChild) {
    Container.removeChild(Container.firstChild);
  }
  for (let i = tab.firstIndex; i <= tab.lastIndex; i++) {
    if (moviedetails.result[i] != undefined) {

      var videoContainer = document.createElement("div");
      videoContainer.classList.add("videoContainer");

      var movieName = document.createElement('div');
      movieName.width = '100%'
      movieName.height = '100%'
      movieName.style.overflow = 'hidden'
      movieName.style.marginLeft = '10px'
      movieName.style.marginBottom = '10px'
      movieName.textContent = moviedetails.result[i].MovieName;

      var videoElement = document.createElement("video");
      videoElement.controls = true;
      videoElement.width = "100%";
      videoElement.height = "200%";


      var sourceElement = document.createElement("source");
      sourceElement.src = `/protected-route/videos/${moviedetails.result[i].FileName}`;
      sourceElement.type = "video/mp4";

      videoElement.appendChild(sourceElement);


      var menuContainer = document.createElement("menuContainer");
      menuContainer.style.position = "absolute";
      menuContainer.style.top = "0";
      menuContainer.style.left = "0";
      menuContainer.style.width = "100%";
      menuContainer.style.backgroundColor = "rgba(220,220,220,0.7)";
      menuContainer.style.padding = "5px";
      menuContainer.style.boxSizing = "border-box";

      // Create the unordered list
      var ul = document.createElement("ul");
      ul.style.listStyleType = "none";
      ul.style.margin = "0";
      ul.style.padding = "0";

      // Create menu items
      var menuItems = ["Option 1"];
      menuItems.forEach(function (itemText) {
        var li = document.createElement("li");
        li.style.display = "inline-block";
        li.style.marginRight = "10px";

        var link = document.createElement("a");
        link.href = `/protected-route/deletemovie?MovieID=${moviedetails.result[i].MovieID}&MovieName=${moviedetails.result[i].MovieName}`;


        link.style.color = "white";
        link.style.textDecoration = "none";


        var DeleteImage = document.createElement("img");
        DeleteImage.style.width = "18px";
        DeleteImage.style.height = "18px";
        DeleteImage.src = "/protected-route/images/delete.png";

        link.appendChild(DeleteImage);
        li.appendChild(link);
        ul.appendChild(li);
      });




      menuContainer.appendChild(ul);
      videoContainer.appendChild(videoElement);
      videoContainer.appendChild(menuContainer);
      videoContainer.appendChild(movieName);
      Container.appendChild(videoContainer);
    }
  }
}
