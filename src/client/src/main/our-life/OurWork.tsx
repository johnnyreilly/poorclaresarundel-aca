import * as React from 'react';
import { Card, CardText, CardImg, CardBody } from 'reactstrap';
import sisterCooking from './images/sister-cooking.webp';
import work1 from './images/Work1.jpg';
import work2 from './images/Work2.jpg';
import knittedBabyClothes from './images/knitted-baby-clothes.webp';
import leatherWork from './images/leather-work.webp';
import vestments2 from './images/vestments2.jpg';
import selectionOfCards from './images/selection-of-cards.webp';
import tripAroundGuestHouse from '../../static/tripAroundGuestHouse.pdf';

export const ourWorkPath = '/our-work';

export const OurWork: React.FC<React.PropsWithChildren<unknown>> = (_props) => (
    <>
        <Card className="float-end" style={{ marginLeft: '1em', marginTop: '1em' }}>
            <CardImg top src={sisterCooking} />
            <CardBody>
                <CardText>Sister cooking</CardText>
            </CardBody>
        </Card>

        <h3>Our Work</h3>

        <p>
            We not only work to earn our living, but still more we work as a way of sharing in God’s work of creation
            and in the work and struggles of the rest of humanity. Every sister contributes to the care of the house and
            garden according to her capacity. There is a rota for those who cook and another for answering the Front
            Door bell; parts of the house are shared out for the cleaning. Several others work in the garden. One or two
            are involved in the teaching and formation of new members. The Infirmarian and her helpers are closely
            involved with the care of the elderly and the sick. Each does what she can, just as each receives from the
            community what she needs, and this will be different for each person.
        </p>

        <p>
            We have a small guest house where people can come to find rest and refreshment, sharing our prayer with us
            in our chapel and staying in simple, but attractive rooms. We try to share the gifts God has given us by
            enabling others to share our prayer in Chapel, and by praying constantly in response to people’s needs.
        </p>

        <p>
            You can see round our guest house <a href={tripAroundGuestHouse}>here</a>.
        </p>

        <p>
            Sisters do a variety of craft work, some of which is on sale in our shop and some things can be made on
            request (eg. leather work).
        </p>

        <div className="row">
            <div className="col-md-4">
                <div className="thumbnail">
                    <img src={work1} alt="Sister painting an ikon" />
                    <p>Sister painting an ikon</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="thumbnail">
                    <img src={work2} alt="Candles" />
                    <p>Candles</p>
                </div>
            </div>
            <div className="col-md-4">
                <img src={knittedBabyClothes} alt="Knitted baby clothes photo" />
                <p>Knitted baby clothes</p>
            </div>
        </div>

        <div className="row">
            <div className="col-md-4">
                <div className="thumbnail">
                    <img src={leatherWork} alt="Leather work photo" />
                    <p>Leather work</p>
                </div>
            </div>
            <div className="col-md-4">
                <img src={vestments2} alt="Small alter linen photo" />
                <p>Small alter linen</p>
            </div>
            <div className="col-md-4">
                <img src={selectionOfCards} alt="Selection of cards photo" />
                <p>Selection of cards</p>
            </div>
        </div>
    </>
);
