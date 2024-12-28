import { Container } from 'reactstrap';
import { Navigate, Route, Routes } from 'react-router';
import { Menu } from './Menu';
import { Home, homePath } from './Home';
import { Why, whyPath } from './Why';
import { Angela, angelaPath } from './seekers/Angela';
import { Debi, debiPath } from './seekers/Debi';
import { Iona, ionaPath } from './seekers/Iona';
import { Vik, vikPath } from './seekers/Vik';
import { ProducerComments, producersCommentsPath } from './production-team/ProducersComments';
import { PhotoGallery, photoGalleryPath } from './production-team/PhotoGallery';
import { GuidedPrayer, guidedPrayerPath } from './GuidedPrayer';

export default function TheConvent() {
    const conventRootPath = '/the-convent';
    return (
        <>
            <Menu conventRootPath={conventRootPath} />
            <Container>
                <Routes>
                    <Route path={`${conventRootPath}${homePath}`} element={<Home />} />
                    <Route path={`${conventRootPath}${whyPath}`} element={<Why />} />
                    <Route path={`${conventRootPath}${angelaPath}`} element={<Angela />} />
                    <Route path={`${conventRootPath}${debiPath}`} element={<Debi />} />
                    <Route path={`${conventRootPath}${ionaPath}`} element={<Iona />} />
                    <Route path={`${conventRootPath}${vikPath}`} element={<Vik />} />
                    <Route path={`${conventRootPath}${producersCommentsPath}`} element={<ProducerComments />} />
                    <Route path={`${conventRootPath}${photoGalleryPath}`} element={<PhotoGallery />} />
                    <Route path={`${conventRootPath}${guidedPrayerPath}`} element={<GuidedPrayer />} />
                    <Route path="*" element={<Navigate to={`${conventRootPath}${homePath}`} replace />} />
                </Routes>
            </Container>
        </>
    );
}
