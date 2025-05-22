const navigations = [
  {
    icon: "all_inclusive",
    title: "Non-Financial",
    href: "/product/search/automotive",
    menuComponent: "MegaMenu1"
  },
  {
    icon: "money_bag",
    title: "Financial",
    href: "/product/search/home&garden",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          title: "Business Funding",
          href: "/product/search/man-clothes",
          subCategories: [
            {
              title: "Term Loans",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png"
            },
            {
              title: "Business Develoment",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png"
            },
            {
              title: "Project Financing Loans",
              href: "/product/search/pant",
              imgUrl: "/assets/images/products/categories/pant.png"
            }
          ]
        },
        {
          title: "Loan Management",
          href: "/product/search/accessories",
          subCategories: [
            {
              title: "Loan Term Extension",
              href: "/product/search/belt",
              imgUrl: "/assets/images/products/categories/belt.png"
            }
          ]
        },
        {
          title: "Specialized Financing",
          href: "/product/search/shoes",
          subCategories: [
            {
              title: "International Trade Loans",
              href: "/product/search/Sneakers",
              imgUrl: "/assets/images/products/categories/sneaker.png"
            }
          ]
        }
      ]
    }
  },
  {
    icon: "local_library",
    title: "Courses",
    href: "/product/search/baby-toys",
    menuComponent: "MegaMenu1"
  },
  {
    icon: "forum",
    title: "Communities",
    href: "/product/search/automotive",
    menuComponent: "MegaMenu1"
  },
  {
    icon: "brand_awareness",
    title: "Media",
    href: "/product/search/music",
    menuComponent: "MegaMenu1"
  },
  {
    icon: "crowdsource",
    title: "Investment",
    href: "/product/search/health&beauty",
    menuComponent: "MegaMenu1"
  },
  {
    icon: "calendar_month",
    title: "Calender",
    href: "/product/search/pets",
    menuComponent: "MegaMenu1"
  },
  {
    icon: "rocket_launch",
    title: "Opportunities",
    href: "/product/search/baby-toys",
    menuComponent: "MegaMenu1"
  }
];

export default navigations;
