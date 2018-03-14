DROP DATABASE IF EXISTS blogarticles;
CREATE DATABASE blogarticles;

\c blogarticles;

CREATE TABLE bloglist
(
  id SERIAL NOT NULL,
  shopurl text,
  describe text NOT NULL,
  contentype text NOT NULL,
  productdata text NOT NULL,
  createdat timestamp with time zone NOT NULL
);

INSERT INTO bloglist (shopurl, describe, contenType, productData, createdat)
  VALUES ('abc.com', 'describeval', 'Test', 'ProductData', '2018-03-13 21:06:40.719+05:30');
