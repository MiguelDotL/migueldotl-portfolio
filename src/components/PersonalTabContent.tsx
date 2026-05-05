import { Row } from 'react-bootstrap';
import FeaturedProjectCard from './FeaturedProjectCard';
import FeaturedImageSlider from './FeaturedImageSlider';

import {
    voicepoolImg,
    voicepoolImgWebp,
    patternArchiveDashboard,
    patternArchiveDashboardWebp,
    patternArchiveWizard,
    patternArchiveWizardWebp,
    patternArchiveLibrary,
    patternArchiveLibraryWebp
} from '../data/projects';

/** Tab content for the "Personal" tab in the Projects section. */
const PersonalTabContent = () => (
    <Row>
        <FeaturedProjectCard
            title="Voicepool"
            subtitle="Custom dashboard"
            description="Open-source dashboard for managing a fleet of ElevenLabs accounts. Tracks account usage, routes TTS calls to whichever account has the most capacity, and provisions new accounts end-to-end with one click."
            techStack={[
                'TypeScript',
                'React',
                'Vite',
                'Express',
                'Playwright',
                'ElevenLabs API'
            ]}
            imageSlot={
                <FeaturedImageSlider
                    images={[
                        {
                            src: voicepoolImg,
                            srcWebp: voicepoolImgWebp,
                            alt: 'Voicepool fleet dashboard'
                        }
                    ]}
                />
            }
            actions={[
                {
                    label: 'Repo',
                    url: 'https://github.com/MiguelDotL/voicepool',
                    icon: <i className="devicon-github-original" aria-hidden />
                }
            ]}
        />
        <FeaturedProjectCard
            title="Pattern Archive"
            subtitle="Automated video pipeline"
            description="Video production pipeline with a Storybook-driven React UI, AI-assisted script generation driven by a structured prompt guide, and end-to-end automation from script to publish. Each iteration informed by real use."
            techStack={[
                'React',
                'FastAPI',
                'Whisper',
                'FFmpeg',
                'YouTube Data API'
            ]}
            imageSlot={
                <FeaturedImageSlider
                    images={[
                        {
                            src: patternArchiveDashboard,
                            srcWebp: patternArchiveDashboardWebp,
                            alt: 'Pattern Archive dashboard with active build queue'
                        },
                        {
                            src: patternArchiveLibrary,
                            srcWebp: patternArchiveLibraryWebp,
                            alt: 'Pattern Archive library with ready-to-publish queue and uploaded videos'
                        },
                        {
                            src: patternArchiveWizard,
                            srcWebp: patternArchiveWizardWebp,
                            alt: 'Pattern Archive wizard editor with timeline and clip pool'
                        }
                    ]}
                    controls={['arrows', 'keyboard', 'swipe']}
                    imagePosition="top"
                />
            }
            actions={[
                {
                    label: 'Repo',
                    url: 'https://github.com/MiguelDotL/PatternArchive',
                    icon: <i className="devicon-github-original" aria-hidden />,
                    disabled: true,
                    disabledReason: 'Private repo'
                }
            ]}
        />
    </Row>
);

export default PersonalTabContent;
