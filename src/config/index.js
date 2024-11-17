

export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];

  export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "Whole Spices", label: "Whole Spices" },
        { id: "aromatic spices", label: "Aromatic Spices" },
        { id: "herbs and leafy spices", label: "Herbs and Leafy Spices" },
        { id: "sweet spices", label: "Sweet Spices" },
        { id: "seeds", label: "Seeds" },
        { id: "exotic/regional spices", label: "Exotic/Regional Spices" },
        { id: "ground spices", label: "Ground Spices" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];
  export const shoppingViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
    {
      id: "search",
      label: "Search",
      path: "/shop/search",
    },
  ];
  export const categoryOptionsMap = {
  
   WholeSpices: "Whole Spices" ,
     aromaticspices: "Aromatic Spices" ,
     herbsndleafyspices: "Herbs and Leafy Spices" ,
     sweetspices: "Sweet Spices" ,
     seeds: "Seeds" ,
     exoticndregionalspices: "Exotic/Regional Spices" ,
     groundspices: "Ground Spices",
  };
  
  export const filterOptions = {
    category: [
      { id: "Whole Spices", label: "Whole Spices" },
        { id: "aromatic spices", label: "Aromatic Spices" },
        { id: "herbs and leafy spices", label: "Herbs and Leafy Spices" },
        { id: "sweet spices", label: "Sweet Spices" },
        { id: "seeds", label: "Seeds" },
        { id: "exotic/regional spices", label: "Exotic/Regional Spices" },
        { id: "ground spices", label: "Ground Spices" },
    ],
  };
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];