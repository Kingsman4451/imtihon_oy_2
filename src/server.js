import express from 'express';
import handleError from "./middlewares/handleError.js"
import categoryRouter from "./routes/categories.router.js"
import subCategoryRouter from "./routes/subCategories.router.js"
import productsRouter from "./routes/products.router.js"
import adminRouter from "./routes/admin.router.js"
const PORT = process.env.PORT || 3000;

let app = express();
app.use(express.json());

app.use(categoryRouter)
app.use(subCategoryRouter)
app.use(productsRouter)
app.use(adminRouter)


app.use(handleError)
app.listen(PORT, ()=>console.log('http://localhost:' + PORT))