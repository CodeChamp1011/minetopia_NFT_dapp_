/** @format */

import { Helmet } from "react-helmet-async";

const GenerateSeoTags = ({ title, description }) => {
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='title' content={`${title} | Boax`} />
    </Helmet>
  );
};

export default GenerateSeoTags;
