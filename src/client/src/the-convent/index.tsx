import { PageContent } from '../components/PageContent';
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
            <PageContent>
                <Routes>
                    <Route path={homePath} element={<Home />} />
                    <Route path={whyPath} element={<Why />} />
                    <Route path={angelaPath} element={<Angela />} />
                    <Route path={debiPath} element={<Debi />} />
                    <Route path={ionaPath} element={<Iona />} />
                    <Route path={vikPath} element={<Vik />} />
                    <Route path={producersCommentsPath} element={<ProducerComments />} />
                    <Route path={photoGalleryPath} element={<PhotoGallery />} />
                    <Route path={guidedPrayerPath} element={<GuidedPrayer />} />
                    <Route path="*" element={<Navigate to={`${conventRootPath}${homePath}`} replace />} />
                </Routes>
            </PageContent>
        </>
    );
}
