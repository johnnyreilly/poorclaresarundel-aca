import { Card, CardImg } from "reactstrap";
import shop from "./images/shop.jpg";
import statues from "./images/olivewood_statue_selection.jpg";

export default function OurShop() {
  return (
    <>
      <h3 className="text-3xl font-bold dark:text-white">Our Shop</h3>

      <p>We have a small shop which you are very welcome to visit.</p>

      <Card>
        <CardImg src={shop} />
      </Card>

      <Card>
        <CardImg src={statues} />
      </Card>
    </>
  );
}
