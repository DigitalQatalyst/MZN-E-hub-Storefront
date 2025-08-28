import { useRouter } from "next/router";

const ServiceDetails = () => {
  const { query } = useRouter();
  const { slug } = query;

  return (
    <div>
      <h1>Service Details for {slug}</h1>
      {/* Fetch and display more details about the service using the slug */}
    </div>
  );
};

export default ServiceDetails;
