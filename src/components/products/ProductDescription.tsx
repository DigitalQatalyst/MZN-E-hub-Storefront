import Box from "@component/Box";
import Typography, { H3, H5, H6 } from "@component/Typography";

export default function ProductDescription() {
  return (
    <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
      <Box ml="40px">
        <H6 mb="2rem" mt="30px" color="#OOO">
          The following documents must be submitted during the application
        </H6>

        <Box mb="20px">
          <Typography>
            <H6 mb="1rem">
              Passport
            </H6>
          </Typography>
        </Box>

        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                Family book
              </H6>
            </Typography>
          </Box>
        </Typography>

        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                Salary credentials or proof of income not older than 3 months
              </H6>
            </Typography>
          </Box>
        </Typography>


        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                Personal bank account statements for the last 6 months
              </H6>
            </Typography>
          </Box>
        </Typography>

        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                Entrepreneur's scored report from Al Etihad Credit Bureau (AECB) not older than 3 months
              </H6>
            </Typography>
          </Box>
        </Typography>

        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                Valid trade licence of the Enterprise
              </H6>
            </Typography>
          </Box>
        </Typography>

        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                Audited financial statements (minimum 1 year)
              </H6>
            </Typography>
          </Box>
        </Typography>

        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                Enterprise bank account statements (last 6 months)
              </H6>
            </Typography>
          </Box>
        </Typography>

        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                Business plan and forecast
              </H6>
            </Typography>
          </Box>
        </Typography>

        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                Wage Protection System (WPS) report from MoHRE (last 6 months)
              </H6>
            </Typography>
          </Box>
        </Typography>

        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                Account receivable statements (if applicable)
              </H6>
            </Typography>
          </Box>
        </Typography>

        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                Utility bills
              </H6>
            </Typography>
          </Box>
        </Typography>

        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                List of main customers (if applicable)
              </H6>
            </Typography>
          </Box>
        </Typography>

        <Typography>
          <Box mt="40px">
            <Typography>
              <H6 mb="1rem" color="#OOO">
                Tax Statement or TRN Certificate (if applicable)
              </H6>
            </Typography>
          </Box>
        </Typography>
      </Box>
    </div>
  );
}