const loading = document.getElementById("loading");

// Fetch book details using the API and book ID
const fetchBookById = async (id) => {
      loading.classList.remove("hidden");

      try {
            const response = await fetch(`https://gutendex.com/books/${id}/`);
            const book = await response.json();
            return book;  // Return the book details
      } catch (error) {
            console.error('Error fetching book details:', error);
      } finally {
            loading.classList.add("hidden");
      }
};

// Get the book ID from the query parameter in the URL
const getBookIdFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      return params.get('id');
};

// Display book details on the page
const displayBookDetails = async () => {
      const bookId = getBookIdFromUrl();  // Get the book ID from the URL
      const book = await fetchBookById(bookId);  // Fetch the book details

      console.log(book);

      const bookDetailsSection = document.getElementById('book-details');
      // bookDetailsSection.classList.add("flex")
      if (book) {
            bookDetailsSection.innerHTML = `
            <div class="flex flex-col sm:flex-row gap-5">
                  <div class="w-full sm:w-[50%]">
                        <img src="${book.formats['image/jpeg']}" alt="${book.title}" class="w-full h-auto mb-3" />
                  </div>
                  <div class"w-full sm:w-[50%]">
                        <h1 class="text-xl sm:text-xl md:text-3xl font-bold mb-4">${book.title}</h1>
                        
                        <p><strong>Author/s:</strong> ${book.authors.map(author => author.name).join(', ')}</p>
                        <p>
                              <strong>Subjects:</strong>
                              <ul class="list-disc ml-5">
                              ${book.subjects.map(subject => `<li>${subject}</li>`).join('')
                  }
                              </ul>
                        </p>
                        <p>
                        <strong>Bookshelves:</strong> 
                        <ul class="list-disc ml-5">
                              ${book.bookshelves.map(shelve => `<li>${shelve}</li>`).join('')
                  }
                              </ul>
                        </p>
                        <p><strong>Download:</strong></p>
                        <ul class="list-disc pl-5">
                              <li><a href="${book.formats['application/epub+zip']}" target="_blank">EPUB</a></li>
                              <li><a href="${book.formats['text/html']}" target="_blank">Read Online</a></li>
                        </ul>
                  </div>
            </div>
             
          `;
      } else {
            bookDetailsSection.innerHTML = `<p>Book details not found.</p>`;
      }
};

// Load the book details when the page loads
window.addEventListener('load', displayBookDetails);