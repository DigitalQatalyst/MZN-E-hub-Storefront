import Icon from "@component/icon/Icon";
import Container from "@component/Container";
import { H4, Span } from "@component/Typography";  // Removed P since it doesn't exist
import { ResultsTitle, DescriptionText } from "./styles"; // Importing the updated ResultsTitle and DescriptionText styled components
// STYLED COMPONENTS
import { ServiceItem, Wrapper, HeaderWrapper, ButtonWrapper } from "./styles";
// API FUNCTIONS
import api from "@utils/__api__/market-2";

// Button component directly in the code
const Button = ({ children, variant }) => (
  <button className={`btn ${variant}`}>
    {children}
  </button>
);

export default async function Section2() {
  const serviceList = await api.getServices();

  return (
    <Container pt="2rem">
      <HeaderWrapper>
        <div>
          <ResultsTitle>Results</ResultsTitle>  {/* Using the left-aligned ResultsTitle styled component */}
          <DescriptionText>Explore our latest business support solutions and financial services.</DescriptionText>  {/* Using the styled description text */}
        </div>
        <ButtonWrapper>
          <Button variant="outlined">New Additions</Button>
          <Button variant="outlined">Top Services</Button>
          <Button variant="outlined">Popular Picks</Button>
        </ButtonWrapper>
      </HeaderWrapper>

      {/* <Wrapper>
        {serviceList.map((item, ind) => (
          <ServiceItem key={ind}>
            <Icon size="40px">{item.icon}</Icon>

            <div>
              <H4 lineHeight={1.3}>{item.title}</H4>
              <Span color="grey.600">{item.description}</Span>
            </div>
          </ServiceItem>
        ))}
      </Wrapper> */}
    </Container>
  );
}
