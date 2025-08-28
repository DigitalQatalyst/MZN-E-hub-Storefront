// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import type MockAdapter from "axios-mock-adapter";
import * as db from "./data";
import shops from "../shop/data";
import { Princess_Sofia } from "next/font/google";

export const market1ApiEndpoints = (Mock: MockAdapter) => {
  Mock.onGet("/api/market-1/main-carousel").reply(async () => {
    try {
      return [200, db.mainCarouselData];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/top-categories").reply(async () => {
    try {
      // const topCategories = db.categories.filter((item) => item.for.type === "top-categories");
      const topCategories = [
        {
          id: "01",
          name: "01. Connect with Us",
          icon: null,
          slug: "connect-with-us",
          image: "/assets/images/banners/connect-with-us.png",
          price: 200,
          description:
            "Browse our comprehensive service catalog. Once you've identified a service that aligns with your needs, click the \"Enquire button to initiate the process. You'll be prompted to provide necessary information about your business and specific requirement. ",
          parent: [],
          for: { demo: "market-1", type: "top-categories" },
        },
        {
          id: "02",
          name: "02. Enquiry Acknowledgment",
          icon: null,
          slug: "enquiry-acknowledgment",
          image: "/assets/images/banners/enquiry-acknowledgment.png",
          price: 180,
          description:
            "Our team acknowledges receipt of your request and may contact you for additional information or clarification regarding your needs and eligibility. We strive to respond to enquiries promptly and provide clear guidance on the next steps.",
          parent: [],
          for: { demo: "market-1", type: "top-categories" },
        },
        {
          id: "03",
          name: "03. Assessment and Planning",
          icon: null,
          slug: "assessment-and-planning",
          image: "/assets/images/banners/assessment-and-planning.png",
          price: 220,
          description:
            "Our team carefully reviews your request, considering your business sector, stage of development, and desired outcomes. We'll work with you to assess your requirements, develop a tailored plan, and connect you with potential funding sources, mentors, and guidance on legal and regulatory matters.",
          parent: [],
          for: { demo: "market-1", type: "top-categories" },
        },
      ];

      console.log(topCategories);
      return [200, topCategories];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/bot-categories").reply(async () => {
    try {
      // const topCategories = db.categories.filter((item) => item.for.type === "top-categories");
      const bottomCategories = [
        {
          id: "01",
          name: "01. Explore Partnership Opportunities",
          icon: null,
          slug: "connect-with-us",
          image: "/assets/images/banners/connect-with-us.png",
          price: 200,
          description:
            "Browse available partnerships, including service providers, investors, and mentors, Identify the partnership type that aligns with your goals and expertise, whether it's funding, mentorship, legal services, or other SME support",
          parent: [],
          for: { demo: "market-1", type: "bot-categories" },
        },
        {
          id: "02",
          name: "02. Enquire and Apply",
          icon: null,
          slug: "Enquire and Apply",
          image: "/assets/images/banners/enquiry-acknowledgment.png",
          price: 180,
          description:
            'Submit your application by clicking the "Enquire" button. Provide necessary business details about your company and upload relevant documents, such as company profiles, certifications, or qualifications based on the partnership type.',
          parent: [],
          for: { demo: "market-1", type: "bot-categories" },
        },
        {
          id: "03",
          name: "03. Review and Assessment",
          icon: null,
          slug: "assessment-and-planning",
          image: "/assets/images/banners/assessment-and-planning.png",
          price: 220,
          description:
            "Our team evaluates your application for alignment with the platform's goals. We assess your organization's expertise and reputation to ansure ecosystem on the platform. ",
          parent: [],
          for: { demo: "market-1", type: "bot-categories" },
        },
        {
          id: "04",
          name: "04. Partnership Approval and Onboarding",
          icon: null,
          slug: "assessment-and-planning",
          image: "/assets/images/banners/assessment-and-planning.png",
          price: 220,
          description:
            "Once approved, you'll receive a notification and partnership agreement for signing. The onboarding process includes gaining access to partner resources, training materials, and guidelines for platform integration. ",
          parent: [],
          for: { demo: "market-1", type: "bot-categories" },
        },
        {
          id: "05",
          name: "05. Intergrate and start collaborating",
          icon: null,
          slug: "assessment-and-planning",
          image: "/assets/images/banners/assessment-and-planning.png",
          price: 220,
          description:
            "Your services will be listed on the platform for entrepreneurs to access. Begin collaborating by offering mentorship, services, funding programs, and other support to contribute to the success of SMES on the platform.",
          parent: [],
          for: { demo: "market-1", type: "bot-categories" },
        },
      ];

      console.log(bottomCategories);
      return [200, bottomCategories];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/flash-deals").reply(async () => {
    try {
      const products = [
        {
          id: "847b3a0e-a0db-4179-ba51-9ee601434db8",
          slug: "request-for-fund",
          title: "Request For Fund",
          subTitle: "by Khalifa Fund",
          description:
            "Through this service, you can apply for financial services for SMEs in a new package of financing",
          price: 200,
          discount: 10,
          thumbnail: "/images/image_48.png",
          images: ["/images/image_48.png"],
          categories: ["automotive"],
          rating: 4.5,
          for: { type: "flash-deals" },
        },
        {
          id: "4e2474bb-726b-4489-a20f-6ccde6e4da43",
          slug: "loan-amendment-service",
          title: "Loan Amendment Service",
          subTitle: "by Khalifa Fund",
          description:
            "Allow SMEs to amend the terms or details of their existing loans with khalifa funds.",
          price: 239,
          discount: 5,
          thumbnail: "/images/image_48.png",
          images: ["/images/image_48.png"],
          categories: ["automotive"],
          rating: 3.8,
          for: { type: "flash-deals" },
        },
        {
          id: "267f027d-c356-4ed0-a247-dc804e79f098",
          slug: "sme-loan-reallocation",
          title: "SME Loan Reallocation",
          subTitle: "by Khalifa Fund",
          description:
            "Provide the option of SME to reallocate the loan funds to different areas of their business.",
          price: 147,
          discount: 15,
          thumbnail: "/images/image_48.png",
          images: ["/images/image_48.png"],
          categories: ["automotive"],
          rating: 4.2,
          for: { type: "flash-deals" },
        },
        {
          id: "44529b0e-6313-46af-a5b0-130d6c983119",
          slug: "sme-loan-disbursement",
          title: "SME Loan Disbursement",
          subTitle: "by Khalifa Fund",
          description:
            "Disburses loans to SMEs once their funding applications has been approved.",
          price: 236,
          discount: 20,
          thumbnail: "/images/image_48.png",
          images: ["/images/image_48.png"],
          categories: ["automotive"],
          rating: 4.0,
          for: { type: "flash-deals" },
        },
        {
          id: "2ca15d13-7004-43d7-9a27-d709f013a079",
          slug: "training-services",
          title: "Training Services",
          subTitle: "by Khalifa Fund",
          description:
            "Empowering your team with tranformative trainging services for enhanced skills and growth.",
          price: 216,
          discount: 12,
          thumbnail: "/images/image_48.png",
          images: ["/images/image_48.png"],
          categories: ["automotive"],
          rating: 4.3,
          for: { type: "flash-deals" },
        },
      ];
      return [200, products];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/big-discounts").reply(async () => {
    try {
      const products = db.products.filter(
        (item) => item.for.type === "big-discounts"
      );
      return [200, products];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/toprated-product").reply(async () => {
    try {
      const products = db.products.filter(
        (item) => item.for.type === "top-ratings"
      );
      return [200, products];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/new-arrivals").reply(async () => {
    try {
      const products = db.products.filter(
        (item) => item.for.type === "new-arrivals"
      );
      return [200, products];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/toprated-brand").reply(async () => {
    try {
      const featureBrands = db.brands.filter(
        (item) => item.for.type === "featured-brands"
      );
      return [200, featureBrands];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/car-brand-list").reply(async () => {
    try {
      const carBrands = db.brands.filter(
        (item) => item.for.type === "car-brands"
      );
      return [200, carBrands];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/car-list").reply(async () => {
    try {
      const products = db.products.filter((item) => item.for.type === "cars");
      return [200, products];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/mobile-brand-list").reply(async () => {
    try {
      const mobileBrands = db.brands.filter(
        (item) => item.for.type === "mobile-brands"
      );
      return [200, mobileBrands];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/mobile-shop-list").reply(async () => {
    try {
      const imageNames = ["herman miller", "otobi", "hatil", "steelcase"];
      const shopList = shops
        .slice(4, 8)
        .map((item, i) => ({ ...item, thumbnail: imageNames[i] }));

      return [200, shopList];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/mobile-list").reply(async () => {
    try {
      const products = db.products.filter(
        (item) => item.for.type === "mobile-phones"
      );
      return [200, products];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/optics/watch-brands").reply(async () => {
    try {
      const opticsBrands = db.brands.filter(
        (item) => item.for.type === "optics-brands"
      );
      return [200, opticsBrands];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/optics/watch-shops").reply(async () => {
    try {
      const imageNames = ["herman miller", "zeiss", "hatil", "steelcase"];
      const shopList = shops
        .slice(0, 4)
        .map((item, i) => ({ ...item, thumbnail: imageNames[i] }));

      return [200, shopList];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/optics-list").reply(async () => {
    try {
      const products = db.products.filter((item) => item.for.type === "optics");
      return [200, products];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/bottom-categories").reply(async () => {
    try {
      const categories = db.categories.filter(
        (item) => item.for.type === "categories"
      );
      return [200, categories];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/get-more-items").reply(async () => {
    try {
      const products = db.products.filter(
        (item) => item.for.type === "more-products"
      );
      return [200, products];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/get-service-list").reply(async () => {
    try {
      return [200, db.serviceList];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });
};
