import * as yup from "yup";
import { useFormik } from "formik";

import Box from "@component/Box";
import Rating from "@component/rating";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import Typography, { H2, H5 } from "@component/Typography";
import ProductComment from "./ProductComment";
import Grid from "@component/grid/Grid";
import TextField from "@component/text-field";
import { SearchInputWithCategory } from "@component/search-box";

export default function ProductQuiz() {
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
                <FlexBox color="#OOO" fontWeight={600} mt="2em">
                Emiratis between 21 to 60 years old
                </FlexBox>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </FlexBox>
    </div>
  );
}


