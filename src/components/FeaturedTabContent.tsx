import { Globe } from 'react-bootstrap-icons';
import { Row } from 'react-bootstrap';
import FeaturedProjectCard from './FeaturedProjectCard';
import FeaturedImageSlider from './FeaturedImageSlider';
import HoverZoomPan from './HoverZoomPan';
import NpmPlainIcon from './NpmPlainIcon';

import {
    bcbsMain,
    bcbsMainWebp,
    bcbsLitehouse,
    bcbsLitehouseWebp,
    bcbsProviders,
    bcbsProvidersWebp,
    branchBeaconImg,
    branchBeaconImgWebp
} from '../data/projects';

/** Tab content for the "Featured" tab in the Projects section. */
const FeaturedTabContent = () => (
    <Row>
        <FeaturedProjectCard
            title="BCBS NC — LiteHouse"
            subtitle="Component library"
            description="Reusable component library standardizing UI and expediting development across internal products in Blue Cross Blue Shield of North Carolina's ecosystem."
            techStack={['Lit', 'Web Components', 'TypeScript', 'Storybook']}
            imageSlot={
                <FeaturedImageSlider
                    images={[
                        {
                            src: bcbsMain,
                            srcWebp: bcbsMainWebp,
                            alt: 'BCBS NC homepage'
                        },
                        {
                            src: bcbsLitehouse,
                            srcWebp: bcbsLitehouseWebp,
                            alt: 'BCBS NC vision plan page'
                        },
                        {
                            src: bcbsProviders,
                            srcWebp: bcbsProvidersWebp,
                            alt: 'BCBS NC providers page'
                        }
                    ]}
                    controls={['arrows', 'keyboard', 'swipe']}
                />
            }
            actions={[
                {
                    label: 'See Library in Use',
                    url: 'https://www.bluecrossnc.com/',
                    icon: <Globe />
                }
            ]}
        />
        <FeaturedProjectCard
            title="Branch Beacon"
            subtitle="npm package"
            description={
                <>
                    A lightweight{' '}
                    <a
                        href="https://www.npmjs.com/package/branch-beacon"
                        rel="noreferrer"
                        target="_blank"
                        className="accent"
                    >
                        React
                    </a>
                    {' / '}
                    <a
                        href="https://www.npmjs.com/package/branch-beacon-element"
                        rel="noreferrer"
                        target="_blank"
                        className="accent"
                    >
                        Web Component
                    </a>{' '}
                    that keeps your current git branch visible in the browser as a
                    sanity check. Automatically styled to the host project's design
                    tokens, with color-coding that alerts you to protected branches.
                    Published to npm with Storybook docs and backend references for
                    Express, FastAPI, Flask, and Go.
                </>
            }
            techStack={['TypeScript', 'React', 'Vite', 'npm']}
            imageSlot={
                <HoverZoomPan
                    src={branchBeaconImg}
                    srcWebp={branchBeaconImgWebp}
                    alt="Branch Beacon"
                />
            }
            actions={[
                {
                    label: 'React',
                    url: 'https://www.npmjs.com/package/branch-beacon',
                    icon: <NpmPlainIcon />
                },
                {
                    label: 'Web Component',
                    url: 'https://www.npmjs.com/package/branch-beacon-element',
                    icon: <NpmPlainIcon />
                },
                {
                    label: 'Repo',
                    url: 'https://github.com/MiguelDotL/branch-beacon',
                    icon: <i className="devicon-github-original" aria-hidden />
                }
            ]}
        />
    </Row>
);

export default FeaturedTabContent;
