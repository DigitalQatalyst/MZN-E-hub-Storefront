"use client";

import { useState } from "react";

import Box from "@component/Box";
import Shop from "@models/shop.model";
import FlexBox from "@component/FlexBox";
import { H4,} from "@component/Typography";
import Product from "@models/product.model";
import ProductReview from "@component/products/ProductReview";
import RelatedProducts from "@component/products/RelatedProducts";
import ProductDescription from "@component/products/ProductDescription";
import ProductCost from "./ProductCost";
import ProductQuiz from "./ProductQuiz";

// ==============================================================
type Props = {
  shops: Shop[];
  relatedProducts: Product[];
  frequentlyBought: Product[];
};
// ==============================================================

export default function ProductView({ shops, relatedProducts, frequentlyBought }: Props) {
  const [selectedOption, setSelectedOption] = useState("description");
  const handleOptionClick = (opt: any) => () => setSelectedOption(opt);

  return (
    <>
      <Box padding={"12px"} border="2px solid #e0e0e0" borderTop="1px solid #e0e0e0" borderRadius="8px" mt="8vh" mb="8vh">
        <FlexBox
          mt="20px"
          mb="26px"
        >
          <H4
            mr="40px"
            p="4px 10px"
            className="cursor-pointer"
            borderColor="primary.main"
            onClick={handleOptionClick("description")}
            borderBottom={selectedOption === "description" ? "2px solid" : ""}
            color={
              selectedOption === "description" ? "primary.step" : "text.muted"
            }
          >
            Required Documents
          </H4>
          <H4
            mr="40px"
            p="4px 10px"
            className="cursor-pointer"
            borderColor="primary.main"
            onClick={handleOptionClick("information")}
            borderBottom={selectedOption === "information" ? "2px solid" : ""}
            color={selectedOption === "information" ? "primary.step" : "text.muted"}
          >
            Cost
          </H4>
          <H4
            mr="40px"
            p="4px 10px"
            className="cursor-pointer"
            borderColor="primary.main"
            onClick={handleOptionClick("review")}
            borderBottom={selectedOption === "review" ? "2px solid" : ""}
            color={selectedOption === "review" ? "primary.step" : "text.muted"}
          >
            Steps
          </H4>
          <H4
            p="4px 10px"
            className="cursor-pointer"
            borderColor="primary.main"
            onClick={handleOptionClick("questions")}
            borderBottom={selectedOption === "questions" ? "2px solid" : ""}
            color={selectedOption === "questions" ? "primary.step" : "text.muted"}
          >
            Terms Of Service
          </H4>
        </FlexBox>

        {/* DESCRIPTION AND REVIEW TAB DETAILS */}
        <Box mb="50px">
          {selectedOption === "description" && <ProductDescription />}
          {selectedOption === "information" && <ProductCost />}
          {selectedOption === "review" && <ProductReview />}
          {selectedOption === "questions" && <ProductQuiz />}
        </Box>
      </Box>



      {/* FREQUENTLY BOUGHT TOGETHER PRODUCTS */}
      {/* {frequentlyBought && <FrequentlyBought products={frequentlyBought} />} */}

      {/* AVAILABLE SHOPS */}
      {/* {shops && <AvailableShops shops={shops} />} */}

      {/* RELATED PRODUCTS */}
      {relatedProducts && <RelatedProducts products={relatedProducts} />}
    </>
  );
}
