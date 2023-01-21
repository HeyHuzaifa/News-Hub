// Initializing Variables

let business = document.getElementById('Business')
let sports = document.getElementById('Sports')
let entertainment = document.getElementById('Entertainment')
let technology = document.getElementById('Technology')

let newsLocation = document.getElementById('newsLocation');
let search = document.getElementById('search');
let searchInput = document.getElementById('searchInput');


displayNews("Trending Topic", "Headlines")
search.classList.add('hidden')

business.addEventListener('click', () => {
  newsLocation.innerHTML = "";
  displayNews("Business", "Business News");
})
sports.addEventListener('click', () => {
  newsLocation.innerHTML = "";
  displayNews("Sports", "Sports News");
})
entertainment.addEventListener('click', () => {
  newsLocation.innerHTML = "";
  displayNews("Entertainment", "Entertainment News");
})
technology.addEventListener('click', () => {
  newsLocation.innerHTML = "";
  displayNews("Technology", "Technology News");
})
searchInput.addEventListener('input', () => {
  var val = searchInput.value
  if (val == "") {
    search.classList.remove('inline-flex')
    search.classList.add('hidden')
  } else {
    search.classList.add('inline-flex')
    search.classList.remove('hidden')
  }
})
search.addEventListener('click', () => {
  newsLocation.innerHTML = "";
  let searchVal = searchInput.value;
  displayNews(`${searchVal}`, "Results are given below");
  searchInput.value = "";
})

function displayNews(api, text) {
  document.getElementById("load").style.display = "block";
  document.getElementById('newsTxt').innerHTML = text;

  fetch(`https://api.worldnewsapi.com/search-news?text=${api}&api-key=bf9d59dbdbe24e80bdf0faab9065e2d0&source-countries=pk`)
    .then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      document.getElementById("load").style.display = "none";
      let articles = data.news;
      let ihtml = ""
      for (news in articles) {
        // console.log(articles[news]);
        try {
          ihtml += `
          <div class="p-4 lg:w-1/3 mobile:p-0">
          <div
            class="h-[90%] bg-gray-200 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
            <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">${articles[news].title}</h2>
            <img src="${articles[news].image}" alt="" class="width">
            <p class="leading-relaxed mb-3">Publish Date: ${articles[news].publish_date}</p>
            <span> Author: ${articles[news].author} </span>
            <button class="learn-more mt-1">
            <span class="circle" aria-hidden="true">
            <span class="icon arrow"></span>
            </span>
            <span class="button-text"> <a href = "${articles[news].url}" class="text-white"> Learn More </a></span>
              </button>
          </div>
        </div>
                `
        } catch (error) {
          console.log(error);
        }

      }
      let newsLocation = document.getElementById('newsLocation');
      newsLocation.innerHTML = ihtml
    })
  //  .catch(error => {
  //    // Hide the loading icon
  //    document.getElementById("load").style.display = "none";
  //    console.log(error);
  //  });
}