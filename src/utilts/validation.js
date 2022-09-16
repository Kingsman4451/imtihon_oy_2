import Joi from "joi";

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})


export const validationCategories = Joi.object({
  category_name: Joi.string().required(30)
});

export const validationCategoriesPut = Joi.object({
  body: {
    category_name: Joi.string().required(30)
  },
  params: {
    category_id: Joi.number().required()
  }
});

export const validationCategoriesDelete = Joi.object({
  params: {
    category_id: Joi.number().required()
  }
});

export const validationSubCategories = Joi.object({
  sub_category_name: Joi.string().required(30)
});

export const validationSubCategoriesPut = Joi.object({
  body: {
    category_id: Joi.number().required(),
    sub_category_name: Joi.string().required(30)
  },
  params: {
    sub_category_id: Joi.number().required()
  }
});

export const validationSubCategoriesDelete = Joi.object({
  params: {
    sub_category_id: Joi.number().required()
  }
});


export const validationProducts = Joi.object({
  sub_category_id: Joi.number().required(),
  product_name: Joi.string().required(60),
  model: Joi.string().required(),
  color: Joi.string().required(),
  price: Joi.number().required()
});

export const validationProductsPut = Joi.object({
  body: {
    sub_category_id: Joi.number(),
    product_name: Joi.string(),
    model: Joi.string(),
    color: Joi.string(),
    price: Joi.number()
  },
  params: {
    product_id: Joi.number().required()
  }
});

export const validationProductsDelete = Joi.object({
  params: {
    product_id: Joi.number().required()
  }
});
