

export const registerForm = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Your name? ex: John",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Your@gmail.com",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Create a strong password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const loginForm = [
    {
      name: "email",
      label: "Email",
      placeholder: "Your@gmail.com",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Remembered password? Enter here",
      componentType: "input",
      type: "password",
    },
  ];

  export const addProductForm = [
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
      name: "Discount",
      label: "Discount (%)",
      componentType: "input",
      placeholder: "Enter discount percentage",
      type: "number",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
    {
      name: "outofStock",
      label: "Out of Stock",
      componentType: "select",
      options: [
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
      ],
    },
    {
      name: "Bestseller",
      label: "Bestseller",
      componentType: "select",
      options: [
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
      ],
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
  
  export const Options = {
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
  export const resetPasswordFormControls = [
    {
      id: 'newPassword',
      label: 'New Password',
      type: 'password',
      placeholder: 'Enter your new password',
      required: true,
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your new password',
      required: true,
    },
  ];
  export const forgotPasswordFormControls = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: 'Please enter a valid email address',
      },
    },
  ];
  
  