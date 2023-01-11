// API key

let apiKey = "94da383a8e0446098e4988026f5168e5"

// API'S

const HEADLINES_NEWS = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const BUSINESS_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
const SPORTS_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`;
const ENTERTAINMENT_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${apiKey}`;
const TECHNOLOGY_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=8&apiKey=${apiKey}`;
const SEARCH_NEWS = `https://newsapi.org/v2/everything?q=`;

let business = document.getElementById('Business')
let sports = document.getElementById('Sports')
let entertainment = document.getElementById('Entertainment')
let technology = document.getElementById('Technology')

let newsLocation = document.getElementById('newsLocation');
let search = document.getElementById('search');
let searchInput = document.getElementById('searchInput');


displayNews(HEADLINES_NEWS, "Headlines")
search.classList.add('hidden')

business.addEventListener('click', () => {
  newsLocation.innerHTML = "";
  displayNews(BUSINESS_NEWS, "Business News");
})
sports.addEventListener('click', () => {
  newsLocation.innerHTML = "";
  displayNews(SPORTS_NEWS, "Sports News");
})
entertainment.addEventListener('click', () => {
  newsLocation.innerHTML = "";
  displayNews(ENTERTAINMENT_NEWS, "Entertainment News");
})
technology.addEventListener('click', () => {
  newsLocation.innerHTML = "";
  displayNews(TECHNOLOGY_NEWS, "Technology News");
})
searchInput.addEventListener('input', () =>{
  var val = searchInput.value
  if(val == ""){
    search.classList.remove('inline-flex')
    search.classList.add('hidden')
  }else{
    search.classList.add('inline-flex')
    search.classList.remove('hidden')
  }
})
search.addEventListener('click', () => {
  newsLocation.innerHTML = "";
  let searchVal = searchInput.value;
  displayNews(SEARCH_NEWS + searchVal + "&apiKey=" + `${apiKey}`, "Results are given below");
  searchInput.value ="";
})

function displayNews(api, text) {
  document.getElementById("load").style.display = "block";
  document.getElementById('newsTxt').innerHTML = text
  let response = fetch(api);
  response.then((response) => {
    return response.json();
  }).then((data) => {
    document.getElementById("load").style.display = "none";
    let articles = data.articles
    let ihtml = ""
    for (news in articles) {
      // console.log(articles[news]);
      ihtml += `

      <div class="p-4 lg:w-1/3">
      <div
        class="h-[90%] bg-gray-200 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">${articles[news].title}</h2>
        <img src="${articles[news].urlToImage}" alt="">
        <p class="leading-relaxed mb-3">${articles[news].description}</p>
        <a href = "${articles[news].url}" class="text-indigo-400 flex justify-evenly">
          Details
          <span>${articles[news].source.name}</span>
        </a>
      </div>
    </div>
            `
    }
    let newsLocation = document.getElementById('newsLocation');
    newsLocation.innerHTML = ihtml
  }).catch(error => {
    // Hide the loading icon
    document.getElementById("load").style.display = "none";
    console.log(error);
  });
}
