import { read, write } from '#model'
import { InternalServerError } from '#errors'

const GET = (req, res, next) => {
  try {
    let categories = read("categories")
    let subCategories = read("subcategories")

    let { category_id } = req.params

    if(category_id) {
      let category = categories.find(category => category.category_id == category_id)
      category.subCategories = subCategories.filter(subCategory => category.category_id == subCategory.category_id)
      category.subCategories.map(category => {return delete category.category_id})
      res.status(200).send({
        statusCode: 200,
        message: "ok",
        data: category
      })
    }

    categories.map(category => {
      category.subCategories = subCategories.filter(subCategory => category.category_id == subCategory.category_id)
      category.subCategories.map(category => {return delete category.category_id})
      return category
    })

    res.status(200).send({
      statusCode: 200,
      message: "ok",
      data: categories
    })
    
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}


const POST = (req, res, next) => {
  try {
    let categories = read("categories")
    let { category_name } = req.body
    let newCategory = {
      category_id: categories.length ? categories.at(-1)?.category_id + 1 : 1,
      category_name
    }
    categories.push(newCategory)
    write("categories", categories)

    res.status(202).send({
      statusCode: 202,
      message: "created new category",
      data: newCategory
    })
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}

const PUT = (req, res, next) => {
  try {
    let categories = read("categories")
    let { category_name } = req.body
    let { category_id } = req.params

    let category = categories.find(category=>category.category_id == category_id)

    if(!category) {
      return res.status(400).json({ status: 404, message: 'Category not found' })
    }

    category.category_name = category_name
    write("categories", categories)

    res.status(202).send({
      statusCode: 202,
      message: "category updated",
      data: category
    })
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}

const DELETE = (req, res, next) => {
  try {
    let categories = read("categories")
    let subCategories = read("subcategories")
    let products = read("products")
    let { category_id } = req.params

    let categoryIndex = categories.findIndex(category=>category.category_id == category_id)

    if(categoryIndex == -1) {
      return res.status(400).json({ status: 404, message: 'Category not found' })
    }

    let deletedCaetgory = categories[categoryIndex]
    deletedCaetgory.subCategories = subCategories.filter(subCategory => deletedCaetgory.category_id == subCategory.category_id)
    deletedCaetgory.subCategories.map(category => {
      category.products = products.filter(product =>{
        return product.sub_category_id == category.sub_category_id
      })
      
      products = products.filter(product =>{
        return product.sub_category_id != category.sub_category_id
      })
      category.products.map(product => {return delete product.sub_category_id})
      return products
    })

    categories.splice(categoryIndex, 1)
    subCategories = subCategories.filter(category => category.category_id != deletedCaetgory.category_id)
    deletedCaetgory.subCategories.map(category => {return delete category.category_id})

    write("categories", categories)
    write("subcategories", subCategories)
    write("products", products)

    
    res.status(202).send({
      statusCode: 202,
      message: "category deleted",
      data: deletedCaetgory
    })
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}




export default {
  GET,
  POST,
  PUT,
  DELETE
}