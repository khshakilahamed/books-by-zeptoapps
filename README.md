## Important Links
- Live Project Link: [Click Me](https://books-by-zeptoapps.vercel.app/)

## Project Requirements
- Fetch data from the following public API:
[https://gutendex.com/books](https://gutendex.com/books)
           For API Documentations visit -[ https://gutendex.com/]( https://gutendex.com/)
- Display the list of books in a `clean` and `user-friendly` format.
- Each book should display the `title`, `author`, `cover image`, `author name`, `genre` and `id`.
- Functionalities:
      - Implement a search bar that allows users to filter books by title in `real-time`.
      - Add a dropdown filter to filter books based on `genre/topic`.
      - Make a wishlist and store to `localstorage`, `wishlisted` books should have a love or liked icon. Make the icon clickable to `save/remove` as a wishlist. 
      - Make `pagination` to paginate the books list, For example (next page, previous page) or (1, 2, 3….8) pagination. 
- User Interface:
      - Make a `homepage` that will show the books list, a wishlist page that will show the wishlisted books list and each book page that will show the book details. 
      - Make a `navbar`.
      - Design the layout using `HTML` and `CSS`.
      - Ensure that the application is `fully responsive` and works well on both desktop and mobile devices.
      - Use `Bootstrap` or `Tailwind CSS` to style the application. But `vanilla` css will be more preferable. 
- Optional Bonus Features: (Not Required but Encouraged)
      - Implement smooth `animations` for showing or hiding books.
      - Use `localStorage` to save the user’s search and filter preferences so they persist when the page is refreshed.
#### Notes:
- Don’t use any templates for the UI. 
- You can use React JS or vanilla JS for this task, but we recommend using vanilla JS only.
- You must create a public GitHub repository and upload files. Use proper commits. Send us the repository link once you complete the task.


## Some Bonus Part that I have done
- Create a banner on the home page
- Saved search and filter preferences in local storage to persist through page refreshes (as per the requirement).
- Implemented a debouncer to prevent unnecessary search request.
- Added an alert after saving a book to the wishlist or removing it.
- Stored books in local storage to reduce loading times and improve performance.
- Created a page to view book details.


## Images-
### Home Page
![Alt text](/assets/readme-file/landing-page.png)

### Book Details Page
![Alt text](/assets/readme-file/book-details.png)

### Wishlist Page
![Alt text](/assets/readme-file/wishlist.png)

### Empty Wishlist Page
![Alt text](/assets/readme-file/emplty%20wishlist.png)
