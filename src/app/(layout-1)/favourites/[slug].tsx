import { useRouter } from "next/router";

const ServiceDetails = () => {
  const { query } = useRouter();
  const { slug } = query;

  return (
    <div>
      <h1>Service Details for {slug}</h1>
    </div>
  );
};

export default ServiceDetails;
