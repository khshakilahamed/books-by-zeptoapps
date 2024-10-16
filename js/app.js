const bookSection = document.getElementById("books");
const totalResult = document.getElementById("totalResult");
const loading = document.getElementById("loading");
const countResultDisplay = document.getElementById("countResult");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const paginationDiv = document.getElementById("paginationDiv");
const pageDiv = document.getElementById("page");
const filterByTopic = document.getElementById("filterByTopic");
const searchInput = document.getElementById("searchInput");
const successAlert = document.getElementById("successAlert");
const dangerAlert = document.getElementById("dangerAlert");

const topics = [
      {
            label: "Children",
            value: "children",
      },
      {
            label: "Dream",
            value: "dream",
      },
      {
            label: "Cook",
            value: "cook",
      },
      {
            label: "History",
            value: "history",
      },
];

const localStorageKey = {
      searchData: "searchData",
      filter: "topic",
      page: "page",
      wishlist: "wishlist"
}

let searchData = "";
let currentPage = 1, countTotalResult = 0, topic = "", allBooks;

const showAlert = (element, text) => {

      element.innerText = text;
      element.classList.remove('hidden', "-right-8");

      // Hide the alert after 3 seconds
      setTimeout(function () {
            element.classList.add('hidden', '-right-8');
      }, 3000);
}

const addToWishlist = (book, button) => {
      const getWishlist = JSON.parse(localStorage.getItem(localStorageKey.wishlist)) || [];

      const isExist = getWishlist?.find(bookItems => bookItems?.id == book.id);

      if (isExist) {
            showAlert(dangerAlert, '❌ Already exist in the wishlist');
            return;
      }

      const newWishlist = [...getWishlist, book];
      localStorage.setItem(localStorageKey.wishlist, JSON.stringify(newWishlist));

      showAlert(successAlert, '✅ Successfully added in the wishlist');

      // Add 'wishlist-active' class to change the icon background and style
      button.classList.add('text-red-600');
}

const fetchBooks = async (searchData = "", page = currentPage, topic = "") => {
      loading.classList.remove("hidden");

      nextButton.disabled = true;
      nextButton.classList.add("bg-gray-300");
      nextButton.disabled = true;
      prevButton.classList.add("bg-gray-300");

      if (countTotalResult === 0) {
            paginationDiv.classList.add("hidden");
      }

      try {
            const response = await fetch(`https://gutendex.com/books?search=${searchData}&page=${page}&topic=${topic}`);
            const books = await response.json();
            allBooks = books;
            countTotalResult = books.count;

            return books;
      } catch (error) {
            console.error("Error fetching books:", error);
      } finally {
            loading.classList.add("hidden");
            if (countResultDisplay) {
                  paginationDiv.classList.remove("hidden");
            }
            nextButton.disabled = true;
            prevButton.classList.remove("bg-gray-300");
            nextButton.disabled = true;
            prevButton.classList.remove("bg-gray-300");

      }
}

const displayBooks = (books) => {
      bookSection.innerHTML = "";
      totalResult.innerText = "";

      totalResult.innerText = `Total Result: ${books.count}`;

      books?.results.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("border", "border-2", "border-amber-300", "rounded-lg", "p-3")

            bookCard.innerHTML = `
            <div class="p-1 sm:p-2">
                  <div class="flex justify-center overflow-hidden h-[250px] xxs:h-[150px] sm:h-[200px] lg:h-[300px] rounded-lg">
                        <img class="hover:scale-125 transform-transition duration-200 w-full" src=${book.formats["image/jpeg"]} alt=${book.title}/>
                  </div>
                  <h3 class="text-base md:text-lg lg:text-xl font-bold">${book.title.length > 30 ? book.title.slice(0, 27) + "..." : book.title}</h3>
                  <p>By: ${book.authors.map(author => author.name).join(",")}</p>
                  <div class="flex flex-wrap items-center justify-between">
                        <a href="/details.html?id=${book.id}" class="bg-orange-500 text-white inline-block px-3 py-1 my-2 rounded-lg">Book Details</a>
                        <ion-icon name="heart-circle-outline" class="text-2xl cursor-pointer add-to-wishlist" data-book-id="${book.id}"></ion-icon>
                  </div>
            </div>
            `
            bookSection.appendChild(bookCard)
      });

      countResultDisplay.innerText = `Showing ${(currentPage - 1) * 32 + 1} to ${countTotalResult > currentPage * 32 ? currentPage * 32 : countTotalResult} | ${countTotalResult}`
      pageDiv.innerText = currentPage;

      // Button disable
      if (books.previous) {
            prevButton.disabled = false;
            prevButton.classList.remove("bg-gray-300");
      } else {
            prevButton.disabled = true;
            prevButton.classList.add("bg-gray-300");
      }

      if (books.next) {
            nextButton.disabled = false;
            nextButton.classList.remove("bg-gray-300");
      } else {
            nextButton.disabled = true;
            nextButton.classList.add("bg-gray-300");
      }

      // Attach event listeners after the book cards are rendered
      document.querySelectorAll('.add-to-wishlist').forEach(button => {
            button.addEventListener('click', function (event) {
                  event.preventDefault(); // Prevent the default anchor behavior
                  const bookId = this.getAttribute('data-book-id');
                  const book = books.results.find(b => b.id == bookId);
                  addToWishlist(book, this); // Call the addToWishlist function directly

            });
      });
}

let debounceTimeout;
const debounce = (func, delay) => {
      return (...args) => {
            console.log(args);

            clearTimeout(debounceTimeout); // Clear any existing timeout
            debounceTimeout = setTimeout(() => {
                  func(...args); // Execute the function after the delay
            }, delay);
      };
};


const handlePage = async (btn, value) => {
      if (btn === 'prev' && currentPage > 1) {
            currentPage = currentPage + value;
            const books = await fetchBooks(searchData, currentPage, topic);
            displayBooks(books)
      }
      if (btn === 'next') {
            currentPage = currentPage + value;
            const books = await fetchBooks(searchData, currentPage, topic);
            displayBooks(books)
      }
      localStorage.setItem(localStorageKey.page, currentPage);
}

const handleFilterByGenre = async () => {
      topic = filterByTopic.value;
      localStorage.setItem(localStorageKey.filter, topic || "");

      const books = await fetchBooks(searchData, currentPage, topic);
      displayBooks(books);
}


const handleSearch = async (e) => {
      if (searchData !== e.target.value) {
            currentPage = 1;
      }
      searchData = e.target.value;
      localStorage.setItem(localStorageKey.searchData, searchData || "");

      const books = await fetchBooks(searchData, currentPage, topic);
      displayBooks(books);
}
// Wrap the handleSearch function with the debouncer
searchInput.addEventListener("input", debounce(handleSearch, 500)); // 500ms delay

// Wait for the DOM to fully load before fetching books
window.addEventListener("load", async () => {
      searchData = localStorage.getItem(localStorageKey.searchData) || "";
      topic = localStorage.getItem(localStorageKey.filter) || "";
      currentPage = Number(localStorage.getItem(localStorageKey.page)) || 1;

      topics.forEach(topic => {
            const option = document.createElement("option");
            option.value = topic.value;
            option.textContent = topic.label;
            filterByTopic.appendChild(option);
            filterByTopic.appendChild(option)
      })

      if (searchData) {
            searchInput.value = searchData;
      }
      if (topic) {
            filterByTopic.value = topic;
      }
      const books = await fetchBooks(searchData, currentPage, topic);
      displayBooks(books);
});
