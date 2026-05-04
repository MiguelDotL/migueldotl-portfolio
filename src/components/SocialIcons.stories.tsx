import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { fn, userEvent, within } from 'storybook/test';
import SocialIcons from './SocialIcons';

import linkedInIcon from '../assets/images/icons/linked-in.svg';
import twitterXIcon from '../assets/images/icons/twitter-x.svg';
import githubIcon from '../assets/images/icons/github-2.svg';
import codepenIcon from '../assets/images/icons/codepen-icon.svg';
import npmIcon from 'devicon/icons/npm/npm-original-wordmark.svg';
import codewarsIcon from '../assets/images/icons/codewars-icon.svg';
import codecademyIcon from '../assets/images/icons/codecademy-icon.svg';
import duolingoIcon from '../assets/images/icons/duolingo-icon.svg';

const meta: Meta<typeof SocialIcons> = {
    title: 'Components/Primitives/SocialIcons',
    component: SocialIcons,
    decorators: [
        (Story) => (
            <div style={{ background: '#1a1a1a', padding: '2rem' }}>
                <Story />
            </div>
        )
    ],
    argTypes: {
        config: {
            control: { type: 'object' },
            description: 'Icons to render (className, icon, url, label)'
        },
        onHover: {
            action: 'iconHover',
            description: 'Fires on per-icon hover with the icon label'
        }
    },
    parameters: { docs: { description: { component: "Row of social media link icons used in NavBar (top), Footer (bottom-left), and ContactMe (side rail). Optional `onHover` callback fires the icon label." } } }
};

export default meta;

type Story = StoryObj<typeof SocialIcons>;

// Each story plays a hover/unhover on the first icon so per-story
// coverage exercises the onMouseEnter/onMouseLeave arrow handlers
// (lines 27-28 in SocialIcons.tsx). Without this the per-story panel
// shows funcs 3 and 4 as uncalled even though the aggregate report
// hits them via HoverInteracted.
const hoverFirstIcon = async ({
    canvasElement
}: {
    canvasElement: HTMLElement;
}) => {
    const link = within(canvasElement).getAllByRole('link')[0];
    await userEvent.hover(link);
    await userEvent.unhover(link);
};

export const NavBarSocials: Story = {
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
    },
    play: hoverFirstIcon
};

export const FooterSocials: Story = {
    args: {
        config: [
            { className: 'codepen', icon: codepenIcon, url: '//codepen.io/MiguelDotL', label: 'CodePen' },
            { className: 'npm', icon: npmIcon, url: '//www.npmjs.com/~migueldotl', label: 'npm' },
            { className: 'codewars', icon: codewarsIcon, url: '//www.codewars.com/users/MiguelDotL', label: 'Codewars' },
            { className: 'codecademy', icon: codecademyIcon, url: '//www.codecademy.com/profiles/MiguelDotL', label: 'Codecademy' },
            { className: 'duolingo', icon: duolingoIcon, url: '//www.duolingo.com/profile/MiguelDotL', label: 'Duolingo' }
        ]
    },
    play: hoverFirstIcon
};

export const Playground: Story = {
    args: {
        config: [
            {
                className: 'linked-in',
                icon: linkedInIcon,
                url: 'https://www.linkedin.com/in/migueldot/',
                label: 'LinkedIn'
            },
            {
                className: 'github',
                icon: githubIcon,
                url: '//github.com/MiguelDotL',
                label: 'GitHub'
            },
            { className: 'codepen', icon: codepenIcon, url: '//codepen.io/MiguelDotL', label: 'CodePen' }
        ],
        onHover: action('iconHover')
    },
    play: hoverFirstIcon
};

// Drives the onMouseEnter / onMouseLeave callbacks (only fire when the
// onHover prop is supplied — they're dead lines otherwise).
export const HoverInteracted: Story = {
    args: {
        config: [
            {
                className: 'linked-in',
                icon: linkedInIcon,
                url: 'https://www.linkedin.com/in/migueldot/',
                label: 'LinkedIn'
            }
        ],
        onHover: fn()
    },
    play: async ({ canvasElement }) => {
        const link = within(canvasElement).getByRole('link', { name: /LinkedIn/ });
        await userEvent.hover(link);
        await userEvent.unhover(link);
    }
};
