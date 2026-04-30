import type { Meta } from '@storybook/react-vite';
import SocialIcons from './SocialIcons';

import linkedInIcon from '../assets/images/icons/linked-in.svg';
import twitterXIcon from '../assets/images/icons/twitter-x.svg';
import githubIcon from '../assets/images/icons/github-2.svg';
import codepenIcon from '../assets/images/icons/codepen-icon.svg';
import codewarsIcon from '../assets/images/icons/codewars-icon.svg';
import codecademyIcon from '../assets/images/icons/codecademy-icon.svg';
import udemyIcon from '../assets/images/icons/udemy-icon.svg';
import duolingoIcon from '../assets/images/icons/duolingo-icon.svg';

const meta: Meta<typeof SocialIcons> = {
    title: 'Components/SocialIcons',
    component: SocialIcons,
    decorators: [
        (Story) => (
            <div style={{ background: '#1a1a1a', padding: '2rem' }}>
                <Story />
            </div>
        )
    ]
};

export default meta;

export const NavBarSocials = {
    args: {
        config: [
            {
                className: 'linked-in',
                icon: linkedInIcon,
                url: 'https://www.linkedin.com/in/migueldot/',
                label: 'LinkedIn'
            },
            {
                className: 'twitter',
                icon: twitterXIcon,
                url: '//twitter.com/MiguelDotL',
                label: 'X (Twitter)'
            },
            {
                className: 'github',
                icon: githubIcon,
                url: '//github.com/MiguelDotL',
                label: 'GitHub'
            }
        ]
    }
};

export const FooterSocials = {
    args: {
        config: [
            { className: 'codepen', icon: codepenIcon, url: '//codepen.io/MiguelDotL', label: 'CodePen' },
            { className: 'codewars', icon: codewarsIcon, url: '//www.codewars.com/users/MiguelDotL', label: 'Codewars' },
            { className: 'codecademy', icon: codecademyIcon, url: '//www.codecademy.com/profiles/MiguelDotL', label: 'Codecademy' },
            { className: 'udemy', icon: udemyIcon, url: '//www.udemy.com/user/miguel-lozano-4/', label: 'Udemy' },
            { className: 'duolingo', icon: duolingoIcon, url: '//www.duolingo.com/profile/MiguelDotL', label: 'Duolingo' }
        ]
    }
};
