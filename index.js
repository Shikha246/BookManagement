const express = require("express");
const app= express()
const {initializeDatabase} =require("./db/db.connect");

const Book = require("./models/book.models");
// we have to write middleware before initializing database
app.use(express.json())
initializeDatabase();



async function createBook(newBook){
    try{
        const book = new Book(newBook)
        // movie saved in database
        const saveBook =await book.save()
        return saveBook     
    }
    catch(error){
        throw error 
    }
}
// createMovie(newMovie);
app.post("/books", async (req,res) =>{
    console.log("Request body:", req.body);
    try{
        const savedBook = await createBook(req.body)
        res.status(201).json({message:"Book added sucessfully"})
    }catch(error){
        res.status(500).json({error:"Failed to add book"})
        console.error(error.message);
    }
});

async function readAllBooks(){
    try{
        const allBooks = await Book.find();
        return allBooks
    }catch(error){
        console.log(error);
    }
}
// readAllMovies();

app.get("/books", async (req,res) => {
    try{
        const books = await readAllBooks()
        if(books.length != 0){
            res.json(books)
        } else{
            res.status(404).json({error:'No books found'})
        }
    }
        catch(error){
            res.status(500).json({error:"Failed to fetch books."})
        }
    
})


async function readBookByTitle(titleName){
    try{
        const bookByTitle = await Book.findOne({title:titleName})
        return bookByTitle
    }
    catch(error){
        console.log(error);
    }
}
app.get("/books/:title", async (req, res) => {
    try {
        const book = await readBookByTitle(req.params.title);

        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch book" });
    }
});

async function readBookByAuthor(authorName){
    try{
        const bookByAuthor = await Book.find({author:authorName});
        return bookByAuthor
    }
    catch(error){
        console.log(error);
    }
}
// readMovieByGenre(Co
app.get("/books/author/:authorName", async(req,res)=>{
    try{
        const books = await readBookByAuthor(req.params.authorName)
        if(books.length != 0){
            res.json(books)
        }else{
            res.status(404).json({error: "No books found"})
        }
    }catch(error){
      res.status(500).json({error:"Failed to fetch books"})
    }
})

async function readBookByGenre(genreName){
    try{
        const bookByGenre = await Book.find({genre:genreName});
        return bookByGenre
    }
    catch(error){
        console.log(error);
    }
}
// readMovieByGenre(Comedy);

app.get("/books/genre/:genreName", async(req,res)=>{
    try{
        const books = await readBookByGenre(req.params.genreName)
        if(books.length != 0){
            res.json(books)
        }else{
            res.status(404).json({error: "No books found"})
        }
    }catch(error){
      res.status(500).json({error:"Failed to fetch books"})
    }
})

async function readBookByYear(pubYear){
    try{
        const bookByYear = await Book.find({publishedYear:pubYear});
        return bookByYear
    }
    catch(error){
        console.log(error);
    }
}
// readMovieByGenre(Comedy);
app.get("/books/publishedYear/:pubYear", async(req,res)=>{
    try{
        const books = await readBookByYear(req.params.pubYear)
        if(books.length != 0){
            res.json(books)
        }else{
            res.status(404).json({error: "No books found"})
        }
    }catch(error){
      res.status(500).json({error:"Failed to fetch books"})
    }
})

async function updateBook(bookId,dataToUpdate){
    try{
        const updatedBook = await Book.findByIdAndUpdate(bookId,dataToUpdate,{new:true});
        return updatedBook;
    }
    catch(error){
        console.log("Error in updating Book Rating",error);
    }
}
// updateMovie("6941308b18ac1dfc641d39f0",{rating:8.0});
app.post("/books/:bookId",async(req,res) => {
    try{
        const updatedBook = await updateBook(req.params.bookId,req.body);
        if(updatedBook){
            res.status(200).json({message:"Book updated successfully.",updatedBook:updatedBook})
        }else{
            res.status(500).json({error:"Failed to update book."});
        }
    }catch(error){
        res.status(500).json({error:"failed to update book."})
    }
});

async function updatedBookDetail(bookTitle,dataToUpdate){
    try{
        const updatedBook = await Book.findOneAndUpdate({title:bookTitle}, dataToUpdate,{new:true});
        return updatedBook;
    }
    catch(error){
        console.log("Error in changing data:",error);
    } 
}
app.post("/books/title/:bookTitle",async(req,res) => {
    try{
        const updatedBook = await updatedBookDetail(req.params.bookTitle,req.body);
        if(updatedBook){
            res.status(200).json({message:"Book updated successfully.",updatedBook:updatedBook})
        }else{
            res.status(500).json({error:"Book does not exist."});
        }
    }catch(error){
        res.status(500).json({error:"failed to update book."})
    }
})

async function deleteBook(bookId){
    try{
        const deletedBook = await Book.findByIdAndDelete(bookId);
        return deletedBook;
    }
    catch(error){
        console.log("Error in Deleting Book",error);
    }
}
app.delete("/books/:bookId",async(req,res) => {
    try{
        const deletedBook = await deleteBook(req.params.bookId,req.body);
        if(deletedBook){
            res.status(200).json({message:"Book data deleted.",deletedBook:deletedBook})
        }else{
            res.status(500).json({error:"Book does not exist."});
        }
    }catch(error){
        res.status(500).json({error:"failed to update book."})
    }
})

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
})