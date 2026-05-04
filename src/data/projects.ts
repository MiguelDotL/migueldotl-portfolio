import type { ReactNode } from 'react';
import type { ProjectAction } from '../components/ProjectActionLink';

// ── Types ────────────────────────────────────────────────────────────────────

export type Project = {
    title: string;
    description: string;
    imageURL: string;
    /** Optional WebP source. When provided, browsers that support WebP
        get the smaller file via <picture>; PNG stays as the universal
        fallback. */
    imageURLWebp?: string;
    url: string;
};

export type FeaturedProject = {
    title: string;
    subtitle?: string;
    description: ReactNode;
    techStack?: string[];
    imageURL?: string;
    /** Optional WebP source for the imageURL fallback path. */
    imageURLWebp?: string;
    imageSlot?: ReactNode;
    actions?: ProjectAction[];
};

// ── Image imports (re-exported for consumers like Projects.tsx) ───────────────

import generalProvision from '../assets/images/projects/general-provision-512.png';
import generalProvisionWebp from '../assets/images/projects/general-provision-512.webp';
import trimAgency from '../assets/images/projects/trim-agency-512.png';
import trimAgencyWebp from '../assets/images/projects/trim-agency-512.webp';
import cSolutions from '../assets/images/projects/c-solutions-512.png';
import cSolutionsWebp from '../assets/images/projects/c-solutions-512.webp';
import filthyFood from '../assets/images/projects/filthy-food-512.png';
import filthyFoodWebp from '../assets/images/projects/filthy-food-512.webp';
import federated from '../assets/images/projects/federated-512.png';
import federatedWebp from '../assets/images/projects/federated-512.webp';
import exoticCarTrader from '../assets/images/projects/exotic-car-trader-512.png';
import exoticCarTraderWebp from '../assets/images/projects/exotic-car-trader-512.webp';
import bcbsMain from '../assets/images/projects/bcbs-main.png';
import bcbsMainWebp from '../assets/images/projects/bcbs-main.webp';
import bcbsLitehouse from '../assets/images/projects/bcbs-litehouse.png';
import bcbsLitehouseWebp from '../assets/images/projects/bcbs-litehouse.webp';
import bcbsProviders from '../assets/images/projects/bcbs-providers.png';
import bcbsProvidersWebp from '../assets/images/projects/bcbs-providers.webp';
import voicepoolImg from '../assets/images/projects/voicepool.png';
import voicepoolImgWebp from '../assets/images/projects/voicepool.webp';
import branchBeaconImg from '../assets/images/projects/branch-beacon.png';
import branchBeaconImgWebp from '../assets/images/projects/branch-beacon.webp';
import patternArchiveDashboard from '../assets/images/projects/pattern-archive-dashboard.png';
import patternArchiveDashboardWebp from '../assets/images/projects/pattern-archive-dashboard.webp';
import patternArchiveWizard from '../assets/images/projects/pattern-archive-wizard-editor.png';
import patternArchiveWizardWebp from '../assets/images/projects/pattern-archive-wizard-editor.webp';
import patternArchiveLibrary from '../assets/images/projects/pattern-archive-library.png';
import patternArchiveLibraryWebp from '../assets/images/projects/pattern-archive-library.webp';

export {
    generalProvision,
    generalProvisionWebp,
    trimAgency,
    trimAgencyWebp,
    cSolutions,
    cSolutionsWebp,
    filthyFood,
    filthyFoodWebp,
    federated,
    federatedWebp,
    exoticCarTrader,
    exoticCarTraderWebp,
    bcbsMain,
    bcbsMainWebp,
    bcbsLitehouse,
    bcbsLitehouseWebp,
    bcbsProviders,
    bcbsProvidersWebp,
    voicepoolImg,
    voicepoolImgWebp,
    branchBeaconImg,
    branchBeaconImgWebp,
    patternArchiveDashboard,
    patternArchiveDashboardWebp,
    patternArchiveWizard,
    patternArchiveWizardWebp,
    patternArchiveLibrary,
    patternArchiveLibraryWebp
};

// ── Data arrays ───────────────────────────────────────────────────────────────

export const CLIENT_PROJECTS: Project[] = [
    {
        title: 'T R I M Agency',
        description: 'Web Development',
        imageURL: trimAgency,
        imageURLWebp: trimAgencyWebp,
        url: '//www.trimagency.com/'
    },
    {
        title: 'C Solutions',
        description: 'Web Development',
        imageURL: cSolutions,
        imageURLWebp: cSolutionsWebp,
        url: '//csolutions-us.com/'
    },
    {
        title: 'Exotic Car Trader',
        description: 'Web Development',
        imageURL: exoticCarTrader,
        imageURLWebp: exoticCarTraderWebp,
        url: '//www.exoticcartrader.com/'
    },
    {
        title: 'Federated Insurance',
        description: 'Web Development',
        imageURL: federated,
        imageURLWebp: federatedWebp,
        url: '//www.federated.ca/'
    },
    {
        title: 'Filthy Food',
        description: 'Ecommerce',
        imageURL: filthyFood,
        imageURLWebp: filthyFoodWebp,
        url: '//filthyfood.com/'
    },
    {
        title: 'General Provision',
        description: 'Web Development',
        imageURL: generalProvision,
        imageURLWebp: generalProvisionWebp,
        url: '//generalprovision.com/'
    }
];

// FEATURED_PROJECTS and PERSONAL_PROJECTS contain JSX in their description
// fields (anchor tags) and ReactNode imageSlot / actions, so they must be
// composed in Projects.tsx where JSX is available.
// The image assets are re-exported above for Projects.tsx to compose them.
