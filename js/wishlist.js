const wishlistSection = document.getElementById("wishlist");
const wishlistEmptyMessage = document.getElementById("wishlist-empty-message");

const localStorageKey = {
      searchData: "searchData",
      filter: "topic",
      page: "page",
      wishlist: "wishlist"
}

const removeFromWishlist = (book) => {
      const getWishlist = JSON.parse(localStorage.getItem(localStorageKey.wishlist)) || [];

      const newWishlist = getWishlist.filter(bookItem => bookItem.id != book.id);
      localStorage.setItem(localStorageKey.wishlist, JSON.stringify(newWishlist));

      location.reload();
}

const displayBooks = (books) => {
      console.log(books);  // Log the books object
      wishlistSection.innerHTML = "";

      if(!books.length){
            wishlistEmptyMessage.classList.remove('hidden');
            return;
      }

      wishlistEmptyMessage.classList.add('hidden');

      books?.forEach(book => {
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
                        <ion-icon name="trash-outline" class="text-2xl text-red-500 cursor-pointer remove-from-wishlist" data-book-id="${book.id}"></ion-icon>
                  </div>
            </div>
            `
            wishlistSection.appendChild(bookCard)
      });


      // Attach event listeners after the book cards are rendered
      document.querySelectorAll('.remove-from-wishlist').forEach(button => {
            button.addEventListener('click', function (event) {
                  event.preventDefault(); // Prevent the default anchor behavior
                  const bookId = this.getAttribute('data-book-id');
                  const book = books.find(b => b.id == bookId);
                  console.log(book);
                  removeFromWishlist(book); // Call the remove function directly

            });
      });
}

window.addEventListener('load', () => {
      const books = JSON.parse(localStorage.getItem('wishlist'));
      displayBooks(books);
})
