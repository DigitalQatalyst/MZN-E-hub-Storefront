import * as yup from "yup";
import { useFormik } from "formik";

import Box from "@component/Box";
import Rating from "@component/rating";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import Typography, { H2, H3, H5 } from "@component/Typography";
import ProductComment from "./ProductComment";
import Grid from "@component/grid/Grid";

export default function ProductReview() {
  const initialValues = {
    rating: "",
    comment: "",
    date: new Date().toISOString()
  };

  const validationSchema = yup.object().shape({
    rating: yup.number().required("required"),
    comment: yup.string().required("required")
  });

  const handleFormSubmit = async (values: any, { resetForm }: any) => {
    console.log(values);
    resetForm();
  };

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit
  });

  return (
    <div>
      <FlexBox>
        <Box width="100%">
          <Grid>
            <Grid md={6}>
              <Typography>
                <FlexBox color="#OOO" fontWeight={600} mt="3em" ml="1em" mb="1em">
                  1. Log in using UAE PASS. 
                </FlexBox>
                <FlexBox color="#OOO" fontWeight={600} ml="1em" mb="1em">
                  2. Submit the application and required documents 
                </FlexBox>
                <FlexBox color="#OOO" fontWeight={600} ml="1em" mb="1em">
                  3. Meeting with the specialised business counsellor during the field visit 
                </FlexBox>
                <FlexBox color="#OOO" fontWeight={600} ml="1em" mb="1em">
                  4. Get the approval from the management credit committee 
                </FlexBox>
                <FlexBox color="#OOO" fontWeight={600} ml="1em">
                  5. Sign the financing agreement
                </FlexBox>
              </Typography>

            </Grid>
          </Grid>
        </Box>
      </FlexBox>
    </div>
  );
}


