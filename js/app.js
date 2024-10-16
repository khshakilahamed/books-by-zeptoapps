const bookSection = document.getElementById("books");
const totalResult = document.getElementById("totalResult");
const loading = document.getElementById("loading");
const countResultDisplay = document.getElementById("countResult");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const paginationDiv = document.getElementById("paginationDiv");
const pageDiv = document.getElementById("page");

let searchData = "";
let currentPage = 1, countTotalResult = 0;

const fetchBooks = async (searchData = "", page = currentPage) => {
      loading.classList.remove("hidden");

      nextButton.disabled = true;
      nextButton.classList.add("bg-gray-300");
      nextButton.disabled = true;
      prevButton.classList.add("bg-gray-300");

      if (countTotalResult === 0) {
            paginationDiv.classList.add("hidden");
      }


      console.log(page);

      try {
            const response = await fetch(`https://gutendex.com/books?search=${searchData}&page=${page}`);
            const books = await response.json();
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
      console.log(books);  // Log the books object
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
                  <a href="/details.html?id=${book.id}" class="bg-orange-500 text-white inline-block px-3 py-1 my-2 rounded-lg">Book Details</a>
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

const handleSearch = async (e) => {
      if (searchData !== e.target.value) {
            currentPage = 1;
      }
      searchData = e.target.value;
      const books = await fetchBooks(searchData);
      displayBooks(books);
}
// Wrap the handleSearch function with the debouncer
document.getElementById("searchInput").addEventListener("input", debounce(handleSearch, 500)); // 500ms delay

const handlePrevPage = async () => {
      if (currentPage > 1) {
            currentPage = currentPage - 1;
            const books = await fetchBooks(searchData, currentPage);
            displayBooks(books)
      }
}

const handleNextPage = async () => {
      // if(currentPage > 1){
      currentPage = currentPage + 1;
      const books = await fetchBooks(searchData, currentPage);
      displayBooks(books)
      // }
}

// Wait for the DOM to fully load before fetching books
window.addEventListener("load", async () => {
      const books = await fetchBooks();
      displayBooks(books);
});

// fetchBooks()