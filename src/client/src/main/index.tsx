import { Container } from 'reactstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Menu } from './Menu';
import { Us, usPath } from './Us';
import { OurPrayer, ourPrayerPath } from './our-life/OurPrayer';
import { OurWork, ourWorkPath } from './our-life/OurWork';
import { OurShop, ourShopPath } from './our-life/OurShop';
import { SisterAnn, sisterAnnPath } from './community/SisterAnn';
import { SisterClareAgnes, sisterClareAgnesPath } from './community/SisterClareAgnes';
import { SisterClareRuva, sisterClareRuvaPath } from './community/SisterClareRuva';
// import { SisterGabriel, sisterGabrielPath } from './community/SisterGabriel';
import { SisterGraca, sisterGracaPath } from './community/SisterGraca';
import { SisterJoseph, sisterJosephPath } from './community/SisterJoseph';
// import { SisterMaria, sisterMariaPath } from './community/SisterMaria';
import { Interviews, interviewsPath } from './community/Interviews';
import { Arundel, arundelPath } from './community/Arundel';
import { ClaresStory, claresStoryPath } from './beginnings/ClaresStory';
import { ClaresThoughts, claresThoughtsPath } from './beginnings/ClaresThoughts';
import { ClaresPrayers, claresPrayersPath } from './beginnings/ClaresPrayers';
import { FrancisLife, francisLifePath } from './beginnings/FrancisLife';
import { FrancisThoughts, francisThoughtsPath } from './beginnings/FrancisThoughts';
import { FrancisPrayers, francisPrayersPath } from './beginnings/FrancisPrayers';
import { Events, eventsPath } from './Events';
import { FAQs, faqsPath } from './misc/FAQs';
import { Links, linksPath } from './misc/Links';
import { Glossary, glossaryPath } from './misc/Glossary';
import { Addresses, addressesPath } from './misc/Addresses';
import { Vocation, vocationPath } from './community/Vocation';
import { Kenya, kenyaPath } from './community/Kenya';
import { PrayerRequests, prayerRequestsPath } from './PrayerRequests';
import { LightForTheWorld, lightForTheWorldPath } from './LightForTheWorld';
import { MyPeaceIGiveYou, myPeaceIGiveYouPath } from './MyPeaceIGiveYou';
import { Donate, donatePath } from './Donate';
import { Christmas, christmasPath } from './Christmas';
import { Footer } from '../components/Footer';

function Main() {
    return (
        <>
            <Menu />
            <Container>
                <Routes>
                    <Route path={usPath} element={<Us />} />
                    <Route path={ourPrayerPath} element={<OurPrayer />} />
                    <Route path={ourWorkPath} element={<OurWork />} />
                    <Route path={ourShopPath} element={<OurShop />} />
                    <Route path={sisterAnnPath} element={<SisterAnn />} />
                    <Route path={sisterClareAgnesPath} element={<SisterClareAgnes />} />
                    <Route path={sisterClareRuvaPath} element={<SisterClareRuva />} />
                    {/* <Route path={sisterGabrielPath} element={SisterGabriel} /> */}
                    <Route path={sisterGracaPath} element={<SisterGraca />} />
                    <Route path={sisterJosephPath} element={<SisterJoseph />} />
                    {/* <Route path={sisterMariaPath} element={SisterMaria} /> */}
                    <Route path={vocationPath} element={<Vocation />} />
                    <Route path={interviewsPath} element={<Interviews />} />
                    <Route path={arundelPath} element={<Arundel />} />
                    <Route path={kenyaPath} element={<Kenya />} />
                    <Route path={claresStoryPath} element={<ClaresStory />} />
                    <Route path={claresThoughtsPath} element={<ClaresThoughts />} />
                    <Route path={claresPrayersPath} element={<ClaresPrayers />} />
                    <Route path={francisLifePath} element={<FrancisLife />} />
                    <Route path={francisThoughtsPath} element={<FrancisThoughts />} />
                    <Route path={francisPrayersPath} element={<FrancisPrayers />} />
                    <Route path={eventsPath} element={<Events />} />
                    <Route path={faqsPath} element={<FAQs />} />
                    <Route path={linksPath} element={<Links />} />
                    <Route path={glossaryPath} element={<Glossary />} />
                    <Route path={addressesPath} element={<Addresses />} />
                    <Route path={donatePath} element={<Donate />} />
                    <Route path={prayerRequestsPath} element={<PrayerRequests />} />
                    <Route path={lightForTheWorldPath} element={<LightForTheWorld />} />
                    <Route path={christmasPath} element={<Christmas />} />
                    <Route path={myPeaceIGiveYouPath} element={<MyPeaceIGiveYou />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Container>
            <Footer />
        </>
    );
}

export default Main;
